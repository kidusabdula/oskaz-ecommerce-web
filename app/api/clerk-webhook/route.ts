// app/api/webhooks/clerk/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "svix";
import { headers } from "next/headers";
import { getServerBaseUrl } from "@/lib/server-urls";

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET!;
const baseUrl =  getServerBaseUrl();

export async function POST(req: NextRequest) {
  console.log("🔔 Clerk webhook received");
  
  const payload = await req.text();
  const headerPayload = await headers();

  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error("❌ Missing Svix headers");
    return new NextResponse("Missing Svix headers", { status: 400 });
  }

  if (!webhookSecret) {
    console.error("❌ CLERK_WEBHOOK_SECRET is not configured");
    return new NextResponse("Webhook secret not configured", { status: 500 });
  }

  const wh = new Webhook(webhookSecret);

  let event;
  try {
    event = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
    console.log("✅ Webhook verification successful");
  } catch (err) {
    console.error("⚠️ Webhook verification failed:", err);
    return new NextResponse("Invalid signature", { status: 400 });
  }
 // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { type, data } = event as any;
  console.log(`📝 Processing event type: ${type}`);

  // Handle sign-up events
  if (type === "user.created") {
    try {
      // Only send required fields: first name, last name, and email
      const userData = {
        firstName: data.first_name || "",
        lastName: data.last_name || "",
        email: data.email_addresses?.[0]?.email_address || "",
      };

      console.log("🔄 Calling internal API to create customer:", userData);

      // Call your INTERNAL Next.js API route
      const apiResponse = await fetch(`${baseUrl}/api/customers`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      console.log(`📊 Internal API Response Status: ${apiResponse.status}`);

      const responseText = await apiResponse.text();
      console.log("📄 Internal API Response Body:", responseText);

      if (!apiResponse.ok) {
        console.error("❌ Failed to create customer via internal API:", responseText);
        return NextResponse.json(
          { 
            success: false, 
            error: responseText,
            status: apiResponse.status 
          }, 
          { status: 500 }
        );
      }

      let result;
      try {
        result = JSON.parse(responseText);
      } catch {
        result = responseText;
      }

      console.log("✅ Customer created successfully via internal API:", result);
      
      return NextResponse.json({ 
        success: true, 
        message: "Customer created successfully",
        data: result 
      });

    } catch (error) {
      console.error("❌ Error in webhook processing:", error);
      return NextResponse.json(
        { 
          success: false, 
          error: error instanceof Error ? error.message : "Unknown error",
        }, 
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ 
    received: true, 
    type: type,
    message: "Event processed successfully" 
  });
}