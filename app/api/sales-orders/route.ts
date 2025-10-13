// app/api/sales-orders/route.ts
import { NextRequest } from "next/server";
import { frappeClient } from "@/lib/frappe-client";
import { handleApiRequest, withEndpointLogging } from "@/lib/api-template";
import { getServerBaseUrl } from "@/lib/server-urls";
/**
 * GET - fetch sales orders for a customer by email
 * Example: GET /api/sales-orders?email=user@example.com
 */
export async function GET(request: NextRequest) {
  return handleApiRequest(
    withEndpointLogging("/api/sales-orders - GET")(async () => {
      const { searchParams } = new URL(request.url);
      const email = searchParams.get("email");
      
      if (!email) {
        throw new Error("email query parameter is required");
      }

      // First, get customer by email
      const customers = await frappeClient.db.getDocList("Customer", {
        fields: ["name", "customer_name"],
        filters: [["email_id", "=", email]],
        limit: 1,
      });

      if (customers.length === 0) {
        return { salesOrders: [] };
      }

      const customer = customers[0];

      // Then, get sales orders for this customer
      const salesOrders = await frappeClient.db.getDocList("Sales Order", {
        fields: [
          "name",
          "customer",
          "customer_name",
          "transaction_date",
          "delivery_date",
          "grand_total",
          "status",
          "currency",
          "items",
          "per_billed",
          "per_delivered"
        ],
        filters: [["customer", "=", customer.name]],
        orderBy: {
          field: "creation",
          order: "desc",
        },
        limit: 50, // Limit to recent 50 orders
      });

      return { 
        salesOrders: salesOrders.map(order => ({
          ...order,
          items: typeof order.items === 'string' ? JSON.parse(order.items) : order.items
        }))
      };
    })
  );
}


/**
 * POST - create sales order for a customer (email must be provided)
 * Body: { email, items: [{ item_code, item_name, quantity, price }], deliveryDate?, notes? }
 */
interface SalesOrderItem {
  item_code: string;
  item_name: string;
  quantity: number;
  price: number;
  description?: string;
}

interface SalesOrderPayload {
  customer: string;
  order_type: string;
  delivery_date: string;
  items: { 
    item_code: string;
    item_name: string;
    warehouse: string;
    description: string;
    qty: number;
    rate: number;
    amount: number;
  }[];
  notes: string;
  status: string;
}

export async function POST(request: NextRequest) {
  return handleApiRequest(
    withEndpointLogging("/api/sales-orders - POST")(async () => {
      const body = await request.json().catch(() => ({}));
      const { email, items, deliveryDate, notes } = body || {};

      if (!email) throw new Error("email is required");
      if (!items || !Array.isArray(items) || items.length === 0) {
        throw new Error("items array is required");
      }

      // 1) Try to get existing customer from our API by email
      const base =  getServerBaseUrl();
      const lookupRes = await fetch(`${base}/api/customers?email=${encodeURIComponent(email)}`);
      const lookupJson = await lookupRes.json().catch(() => ({}));

      let customer = lookupJson?.data?.customer || lookupJson?.customer || null;

      // 2) If not found, call POST /api/customers to create
      if (!customer) {
        const createRes = await fetch(`${base}/api/customers`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        const createJson = await createRes.json().catch(() => ({}));
        if (!createRes.ok || !createJson?.success && !createJson?.data?.customer && !createJson?.customer) {
          console.error("Failed to create customer:", createJson);
          throw new Error("Failed to create customer");
        }
        customer = createJson?.data?.customer || createJson?.customer;
      }

      if (!customer || !customer.name) {
        throw new Error("Customer could not be resolved");
      }

      // 3) Build order items in shape expected by your ERPNext
      const orderItems = items.map((it: SalesOrderItem) => ({
        item_code: it.item_code,
        item_name: it.item_name,
        warehouse: "Stores - OD",
        description: it.description || "",
        qty: it.quantity || 1,
        rate: it.price || 0,
        amount: (it.price || 0) * (it.quantity || 1),
      }));

      // Minimal Sales Order payload: only required fields included
      const salesOrderPayload: SalesOrderPayload = {
        customer: customer.name,
        order_type: "Sales",
        delivery_date:
          deliveryDate ||
          new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        items: orderItems,
        notes: notes || "",
        status: "Draft",
      };

      // Create Sales Order in ERPNext
      const salesOrder = await frappeClient.db.createDoc("Sales Order", salesOrderPayload);

      return { salesOrder };
    })
  );
}