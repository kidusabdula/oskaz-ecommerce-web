// app/api/clerk-user/route.ts
import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

export async function GET(request: NextRequest) {
  try {
    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const email = user.emailAddresses[0]?.emailAddress;

    if (!email) {
      return NextResponse.json({ error: "No email found" }, { status: 400 });
    }

    return NextResponse.json({ 
      email,
      firstName: user.firstName,
      lastName: user.lastName
    });
  } catch (error) {
    console.error("Error fetching clerk user:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}