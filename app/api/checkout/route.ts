import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/Stripe";
import Stripe from "stripe";

import PlanData from "@/app/(dashboard)/plans/plansData";
export async function POST(req: NextRequest) {
  try {
    const { productId, userId } = await req.json();
    if (!productId || !userId) {
      return NextResponse.json({ error: "Product not found" });
    }

    const line_item: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    const selectedProduct = PlanData.find((p) => p.id == productId);
    const data = {
      quantity: 1,
      price_data: {
        currency: "USD",
        product_data: {
          name: selectedProduct?.plansName as string,
        },

        unit_amount: Number(selectedProduct?.price.substring(1)) * 100,
      },
    };

    line_item.push(data);

    const session = await stripe.checkout.sessions.create({
      line_items: line_item,
      mode: "payment",
      billing_address_collection: "required",
      success_url: process.env.SUCCESS_URL,
      metadata: {
        productId,
        userId,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error(err);
  }
}
