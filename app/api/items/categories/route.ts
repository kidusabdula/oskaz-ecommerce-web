// app/api/item/categories/route.ts
import { NextRequest } from 'next/server';
import { frappeClient } from '@/lib/frappe-client';
import { handleApiRequest, withEndpointLogging } from '@/lib/api-template';
import { ItemGroup } from '@/types/item';

// GET - Fetch item categories (item groups) under the "Products" parent
export async function GET(request: NextRequest) {
  return handleApiRequest<{ categories: ItemGroup[] }>(
    withEndpointLogging('/api/items/categories - GET')(async () => {
      const { searchParams } = new URL(request.url);
      const search = searchParams.get('search');
      
      // Build filters for item groups under "Products" parent
      const filters = [
        ['parent_item_group', '=', 'Products'],
        ['is_group', '=', 0] // Only get leaf item groups (not parent groups)
      ];
      
      // Add search filter if provided
      if (search) {
        filters.push(['name', 'like', `%${search}%`]);
      }

      // Get item groups
      const categories = await frappeClient.db.getDocList<ItemGroup>('Item Group', {
        fields: [
          'name',
          'item_group_name',
          'parent_item_group',
          'is_group',
        ],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        filters: filters as any,
        orderBy: { field: 'item_group_name', order: 'asc' }
      });

      return { categories };
    })
  );
}