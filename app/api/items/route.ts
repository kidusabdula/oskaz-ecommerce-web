// app/api/items/route.ts
import { NextRequest } from 'next/server';
import { frappeClient, isFrappeError } from '@/lib/frappe-client';
import { Filter } from 'frappe-js-sdk/lib/db/types';
import { handleApiRequest, withEndpointLogging } from '@/lib/api-template';
import { Item } from '@/types/item';

// Helper function to get all child item groups for a parent group
async function getChildItemGroups(parentGroupName: string): Promise<string[]> {
  try {
    // Get all direct child groups
    const childGroups = await frappeClient.db.getDocList('Item Group', {
      filters: [['parent_item_group', '=', parentGroupName]],
      fields: ['name'],
    });
    
    // Extract names
    const childGroupNames = childGroups.map(group => group.name);
    
    // Recursively get child groups of each child group
    const allChildGroups = [...childGroupNames];
    for (const childGroupName of childGroupNames) {
      const grandChildGroups = await getChildItemGroups(childGroupName);
      allChildGroups.push(...grandChildGroups);
    }
    
    return allChildGroups;
  } catch (error) {
    console.error(`Error fetching child item groups for ${parentGroupName}:`, error);
    return [];
  }
}

// Helper function to properly format image URLs using the file proxy API
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

// GET - Fetch all items with detailed information
export async function GET(request: NextRequest) {
  return handleApiRequest<{ items: Item[] }>(
    withEndpointLogging('/api/items - GET')(async () => {
      const { searchParams } = new URL(request.url);
      const item_group = searchParams.get('item_group');
      const category = searchParams.get('category');
      const search = searchParams.get('search');
      const sort_by = searchParams.get('sort_by') || 'modified';
      const sort_order = searchParams.get('sort_order') || 'desc';
      const page = parseInt(searchParams.get('page') || '1');
      const page_length = parseInt(searchParams.get('page_length') || '20');

      // Build filters
      const filters: Filter<Item>[] = [['disabled', '=', 0]];
      
      // If no specific item_group is provided, default to "Products" and its children
      if (!item_group && !category) {
        // Get all child groups of "Products"
        const productGroups = await getChildItemGroups('Products');
        // Include "Products" itself
        productGroups.push('Products');
        
        // Add filter to include items from any of these groups
        if (productGroups.length > 0) {
          filters.push(['item_group', 'in', productGroups]);
        }
      } else if (item_group) {
        filters.push(['item_group', '=', item_group]);
      } else if (category) {
        filters.push(['item_group', '=', category]);
      }
      
      if (search) {
        filters.push(['item_name', 'like', `%${search}%`]);
      }

      // Get items with basic information
      const items = await frappeClient.db.getDocList('Item', {
        fields: ["*"],
        filters: filters,
        orderBy: { field: sort_by, order: sort_order as 'asc' | 'desc' },
        limit: page_length,
        limit_start: (page - 1) * page_length,
      });

      // Get additional details for each item
      const itemsWithDetails = await Promise.all(
        items.map(async (item) => {
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

            // Get item tags - CORRECTED VERSION
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
              // Check if it's a "DoesNotExistError" for Tag Link doctype
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

            return {
              ...item,
              image: formatImageUrl(item.image), // Format the image URL to use the proxy API
              price: itemPrice ? itemPrice.price_list_rate : null,
              currency: itemPrice ? itemPrice.currency : null,
              stock: stockInfo ? stockInfo.actual_qty : 0,
              warehouse: stockInfo ? stockInfo.warehouse : null,
              weight_per_unit: itemWeight,
              min_order_qty: minOrderQty || 1,
              tags: itemTags,
              item_group_details: itemGroupDetails
            };
          } catch (error) {
            console.error(`Error processing item ${item.name}:`, error);
            return {
              ...item,
              image: formatImageUrl(item.image), // Format the image URL to use the proxy API
              price: null,
              currency: null,
              stock: 0,
              warehouse: null,
              weight_per_unit: null,
              min_order_qty: 1,
              tags: [],
              item_group_details: null
            };
          }
        })
      );

      // Get total count for pagination
      const countResult = await frappeClient.db.getCount('Item', filters);
      const totalCount = Array.isArray(countResult) ? countResult[0] : countResult;

      return { 
        items: itemsWithDetails,
        pagination: {
          page,
          page_length,
          total_count: totalCount,
          has_more: (page * page_length) < totalCount
        }
      };
    })
  );
}

// Helper function to get tags for a specific item
async function getItemTags(itemName: string): Promise<string[]> {
  try {
    const tagResult = await frappeClient.db.getDocList('Tag Link', {
      filters: [
        ['document_type', '=', 'Item'],
        ['document_name', '=', itemName]
      ],
      fields: ['tag'],
      limit: 10
    });
    return tagResult.map(tag => tag.tag);
  } catch (error) {
    console.error(`Error fetching tags for item ${itemName}:`, error);
    return [];
  }
}

// POST - Create new item with tags
export async function POST(request: NextRequest) {
  return handleApiRequest<{ item: Item }>(
    withEndpointLogging('/api/items - POST')(async () => {
      const data = await request.json();

      if (!data.item_name || !data.stock_uom) {
        throw new Error('Missing required fields: item_name and stock_uom');
      }

      if (!data.item_code) {
        data.item_code = data.item_name
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '');
      }

      // Extract tags from data if provided
      const tags = data.tags || [];
      delete data.tags; // Remove tags from item data

      const item = await frappeClient.db.createDoc('Item', data);
      
      // Create tag links if tags are provided
      if (tags.length > 0) {
        try {
          for (const tagName of tags) {
            await frappeClient.db.createDoc('Tag Link', {
              tag: tagName,
              document_type: 'Item',
              document_name: item.name
            });
          }
        } catch (error) {
          console.error('Error creating tag links:', error);
        }
      }
      
      // Create stock entry if stock is provided
      if (data.stock_qty && data.warehouse) {
        try {
          await frappeClient.db.createDoc('Stock Entry', {
            stock_entry_type: 'Material Receipt',
            items: [{
              item_code: data.item_code,
              qty: data.stock_qty,
              warehouse: data.warehouse
            }]
          });
        } catch (error) {
          console.error('Error creating stock entry:', error);
        }
      }
      
      // Fetch the created item with tags
      const itemWithTags = {
        ...item,
        tags: await getItemTags(item.name)
      };
      
      return { item: itemWithTags };
    })
  );
}