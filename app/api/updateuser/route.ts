import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();
    console.log(userId);
    // await client.users.updateUserMetadata(userId, {
    //   publicMetadata: {
    //     credit_left: 5,
    //     subscribed: 0,
    //   },
    // });
    return NextResponse.json({ message: "working" });
  } catch (error) {
    console.log(error);
  }
}
