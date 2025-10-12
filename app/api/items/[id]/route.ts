// app/api/items/[id]/route.ts
import { NextRequest } from 'next/server';
import { frappeClient, isFrappeError } from '@/lib/frappe-client';
import { handleApiRequest, withEndpointLogging } from '@/lib/api-template';
import { Item } from '@/types/item';

// Helper function to properly format image URLs using the file proxy API
function formatImageUrl(imagePath: string | null): string | null {
  if (!imagePath) return null;
  
  // Handle HTML entities in the image path
  const formattedPath = imagePath.replace(/&apos;/g, "'");
  
  // If the path starts with /files/, convert it to use our proxy API
  if (formattedPath.startsWith('/files/')) {
    // Remove the /files/ prefix and use our proxy API
    const fileName = formattedPath.substring(7); // Remove "/files/"
    // Encode the file name to handle special characters
    const encodedFileName = encodeURIComponent(fileName);
    return `/api/files/${encodedFileName}`;
  }
  
  // Otherwise, add the /api/files/ prefix
  // Encode the file name to handle special characters
  const encodedFileName = encodeURIComponent(formattedPath);
  return `/api/files/${encodedFileName}`;
}

// GET - Fetch a single item with detailed information
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return handleApiRequest<{ item: Item }>(
    withEndpointLogging('/api/items/[id] - GET')(async () => {
      const resolvedParams = await params;
      const itemId = resolvedParams.id;

      if (!itemId) {
        throw new Error('Item ID is required');
      }

      // Get the item with basic information
      const items = await frappeClient.db.getDocList('Item', {
        fields: ["*"],
        filters: [['name', '=', itemId]],
        limit: 1,
      });

      if (items.length === 0) {
        throw new Error('Item not found');
      }

      const item = items[0];

      try {
        // Get item price
        let itemPrice = null;
        try {
          const priceResult = await frappeClient.db.getDocList('Item Price', {
            filters: [['item_code', '=', item.item_code]],
            fields: ['price_list_rate', 'currency'],
            limit: 1
          });
          itemPrice = priceResult.length > 0 ? priceResult[0] : null;
        } catch (error) {
          console.error(`Error fetching price for item ${item.name}:`, error);
        }

        // Get stock information
        let stockInfo = null;
        try {
          const stockResult = await frappeClient.db.getDocList('Bin', {
            filters: [['item_code', '=', item.item_code]],
            fields: ['actual_qty', 'warehouse'],
            limit: 1
          });
          stockInfo = stockResult.length > 0 ? stockResult[0] : null;
        } catch (error) {
          console.error(`Error fetching stock for item ${item.name}:`, error);
        }

        // Get item weight
        let itemWeight = null;
        try {
          const weightResult = await frappeClient.db.getDocList('Item', {
            filters: [['name', '=', item.name]],
            fields: ['weight_per_unit'],
            limit: 1
          });
          itemWeight = weightResult.length > 0 ? weightResult[0].weight_per_unit : null;
        } catch (error) {
          console.error(`Error fetching weight for item ${item.name}:`, error);
        }

        // Get minimum order quantity
        let minOrderQty = null;
        try {
          const minOrderResult = await frappeClient.db.getDocList('Item', {
            filters: [['name', '=', item.name]],
            fields: ['min_order_qty'],
            limit: 1
          });
          minOrderQty = minOrderResult.length > 0 ? minOrderResult[0].min_order_qty : null;
        } catch (error) {
          console.error(`Error fetching min order qty for item ${item.name}:`, error);
        }

        // Get item tags
        let itemTags = [];
        try {
          const tagResult = await frappeClient.db.getDocList('Tag Link', {
            filters: [
              ['document_type', '=', 'Item'],
              ['document_name', '=', item.name]
            ],
            fields: ['tag'],
            limit: 10
          });
          itemTags = tagResult.map(tag => tag.tag);
        } catch (error) {
          console.error(`Error fetching tags for item ${item.name}:`, error);
          if (isFrappeError(error) && error.exc_type === 'DoesNotExistError') {
            console.log(`Tag Link doctype not available for item ${item.name}`);
          }
        }

        // Get item group details
        let itemGroupDetails = null;
        try {
          if (item.item_group) {
            const groupResult = await frappeClient.db.getDocList('Item Group', {
              filters: [['name', '=', item.item_group]],
              fields: ['parent_item_group', 'is_group'],
              limit: 1
            });
            itemGroupDetails = groupResult.length > 0 ? groupResult[0] : null;
          }
        } catch (error) {
          console.error(`Error fetching item group for item ${item.name}:`, error);
        }

        // Get related items (same category, excluding current item)
        let relatedItems = [];
        try {
          const relatedResult = await frappeClient.db.getDocList('Item', {
            fields: ["name", "item_name", "item_group", "image"],
            filters: [
              ['item_group', '=', item.item_group],
              ['name', '!=', item.name],
              ['disabled', '=', 0]
            ],
            limit: 4
          });
          
          relatedItems = relatedResult.map(relatedItem => ({
            ...relatedItem,
            image: formatImageUrl(relatedItem.image)
          }));
        } catch (error) {
          console.error(`Error fetching related items for ${item.name}:`, error);
        }

        return {
          item: {
            ...item,
            image: formatImageUrl(item.image),
            price: itemPrice ? itemPrice.price_list_rate : null,
            currency: itemPrice ? itemPrice.currency : null,
            stock: stockInfo ? stockInfo.actual_qty : 0,
            warehouse: stockInfo ? stockInfo.warehouse : null,
            weight_per_unit: itemWeight,
            min_order_qty: minOrderQty || 1,
            tags: itemTags,
            item_group_details: itemGroupDetails,
            related_items: relatedItems
          }
        };
      } catch (error) {
        console.error(`Error processing item ${item.name}:`, error);
        return {
          item: {
            ...item,
            image: formatImageUrl(item.image),
            price: null,
            currency: null,
            stock: 0,
            warehouse: null,
            weight_per_unit: null,
            min_order_qty: 1,
            tags: [],
            item_group_details: null,
            related_items: []
          }
        };
      }
    })
  );
}