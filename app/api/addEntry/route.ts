import { getClient } from "@/lib/clerkClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId, data } = await req.json();
    console.log(data);
    const client = await getClient();
    const user = await client.users.getUser(userId);

    await client.users.updateUser(userId, {
      publicMetadata: {
        credit_left: Number(user.publicMetadata.credit_left) - 1,
        subscribed: user.publicMetadata.subscribed,
        //@ts-expect-error
        entry: [...user.publicMetadata.entry, data],
      },
    });

    return NextResponse.json({ message: "success" });
  } catch (err) {
    console.log(err);
  }
}
