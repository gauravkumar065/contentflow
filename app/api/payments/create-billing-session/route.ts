import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
    const { userId, email, customerId, billingPage } = await req.json();
    console.log("Logger -> POST -> userId, email, customerId, billingPage:", userId, email, customerId, billingPage)

    // New billing page creation logic
    if (billingPage) {
        try {
            const session = await stripe.billingPortal.sessions.create({
                customer: customerId, // Assuming userId is the Stripe customer ID
                return_url: `${process.env.FRONTEND_URL}/dashboard/settings`,
            });
            console.log("Logger -> POST -> session:", session)

            return NextResponse.json({ sessionId: session.url });
        } catch (error) {
            console.error("Error creating billing session:", error);
            return NextResponse.json({ error: "Failed to create billing session" });
        }
    } else {
        console.error("Error creating billing session:");
        return NextResponse.json({ error: "Failed to create billing session" });
    }
}