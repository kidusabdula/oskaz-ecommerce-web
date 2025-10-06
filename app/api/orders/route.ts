import { NextRequest } from 'next/server';
import { frappeClient } from '@/lib/frappe-client';
import { handleApiRequest, withEndpointLogging } from '@/lib/api-template';
import { SalesOrder, SalesOrderCreateRequest } from '@/types/order';

// GET - Fetch all orders
export async function GET(request: NextRequest) {
  return handleApiRequest<{ orders: SalesOrder[] }>(
    withEndpointLogging('/api/orders - GET')(async () => {
      const { searchParams } = new URL(request.url);
      const limit = searchParams.get('limit') || '20';

      const orders = await frappeClient.db.getDocList('Sales Order', {
        fields: ['name', 'customer', 'title', 'delivery_date', 'grand_total', 'status'],
        orderBy: { field: 'creation', order: 'desc' },
        limit: parseInt(limit),
      });

      return { orders };
    })
  );
}

// POST - Create new order
export async function POST(request: NextRequest) {
  return handleApiRequest<{ order: SalesOrder }>(
    withEndpointLogging('/api/orders - POST')(async () => {
      const data: SalesOrderCreateRequest = await request.json();

      if (!data.customer || !data.items || data.items.length === 0) {
        throw new Error('Missing required fields: customer and items');
      }

      // Calculate amount for each item
      const items = data.items.map(item => ({
        ...item,
        amount: item.qty * item.rate
      }));

      const orderData = {
        ...data,
        items
      };

      const order = await frappeClient.db.createDoc('Sales Order', orderData);
      return { order };
    })
  );
}