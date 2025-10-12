// app/api/customers/route.ts
import { NextRequest } from "next/server";
import { frappeClient, isFrappeError } from "@/lib/frappe-client";
import { handleApiRequest, withEndpointLogging } from "@/lib/api-template";

/**
 * GET - fetch customer by email
 * Example: GET /api/customers?email=...
 */
export async function GET(request: NextRequest) {
  return handleApiRequest(
    withEndpointLogging("/api/customers - GET")(async () => {
      const { searchParams } = new URL(request.url);
      const email = searchParams.get("email");
      if (!email) throw new Error("email query parameter is required");

      const customers = await frappeClient.db.getDocList("Customer", {
        fields: ["*"],
        filters: [["email_id", "=", email]],
        limit: 1,
      });

      if (customers.length > 0) {
        return { customer: customers[0] };
      }

      return { customer: null };
    })
  );
}

/**
 * POST - create (or return existing) customer
 * Accepts payload { firstName, lastName, email }
 */
export async function POST(request: NextRequest) {
  return handleApiRequest(
    withEndpointLogging("/api/customers - POST")(async () => {
      const payload = await request.json().catch(() => ({}));
      const { firstName, lastName, email } = payload || {};

      if (!email) throw new Error("Email must be provided");

      // Check if customer already exists by email
      const existing = await frappeClient.db.getDocList("Customer", {
        fields: ["*"],
        filters: [["email_id", "=", email]],
        limit: 1,
      });
      
      if (existing.length > 0) return { customer: existing[0] };

      const customerName =
        `${firstName || ""} ${lastName || ""}`.trim() ||
        email ||
        "Unknown Customer";

      // Create customer in Frappe
      try {
        const newCustomer = await frappeClient.db.createDoc("Customer", {
          customer_name: customerName,
          customer_type: "Individual",
          email_id: email,
          // No clerkId, no phone number
        });

        return { customer: newCustomer };
      } catch (err) {
        console.error("Frappe createDoc error:", err);
        if (isFrappeError(err)) {
          throw new Error(`Frappe API Error: ${err.message || err}`);
        }
        throw new Error("Failed to create customer");
      }
    })
  );
}