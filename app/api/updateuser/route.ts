import { NextRequest, NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  try {
    const { userId, first_name, last_name, linked_in_url, credit_left } =
      await req.json();
    const client = await clerkClient();

    await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        first_name: first_name,
        last_name: last_name,
        linked_in_url: linked_in_url,
        credit_left: credit_left,
      },
    });
    return NextResponse.json({ message: "working" });
  } catch (error) {
    console.log(error);
  }
}
