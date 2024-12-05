import { NextRequest, NextResponse } from "next/server";
import stripe from "stripe";

import { clerkClient } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.text();
    const client = await clerkClient();

    const sig = req.headers.get("Stripe-Signature");

    const event = stripe.webhooks.constructEvent(
      payload,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET_KEY!
    );
    if (event.type === "checkout.session.completed") {
      //@ts-ignore
      const { userId, productId } = event.data.object.metadata;
      const user = await client.users.getUser(userId);
      await client.users.updateUserMetadata(userId, {
        publicMetadata: {
          credit_left: productId * 5000,
          subscribed: productId,
          entry: user.publicMetadata.entry,
        },
      });
    }

    return NextResponse.json({ message: "working" });
  } catch (error) {
    console.log(error);
  }
}
