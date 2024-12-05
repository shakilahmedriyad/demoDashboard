import { NextRequest, NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  try {
    const { data } = await req.json();
    const client = await clerkClient();

    await client.users.updateUser(data.id, {
      publicMetadata: {
        credit_left: 5,
        subscribed: 0,
        entry: [],
      },
    });

    return NextResponse.json({ message: "success" });
  } catch (err) {
    console.log(err);
  }
}
