import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { PrismaClient } from '@prisma/client';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const reqText = await req.text();
  return webhooksHandler(reqText, req);
}

async function getCustomerEmail(customerId: string): Promise<string | null> {
  try {
    const customer = await stripe.customers.retrieve(customerId);
    return (customer as Stripe.Customer).email;
  } catch (error) {
    console.error("Error fetching customer:", error);
    return null;
  }
}

async function handleSubscriptionEvent(
  event: Stripe.Event,
  type: "created" | "updated" | "deleted"
) {
  const subscription = event.data.object as Stripe.Subscription;
  const customerEmail = await getCustomerEmail(subscription.customer as string);

  if (!customerEmail) {
    return NextResponse.json({
      status: 500,
      error: "Customer email could not be fetched",
    });
  }

  const subscriptionData: any = {
    subscription: subscription.id,
    subscriptionPlan: 'PREMIUM', // Assuming you only have FREE and PREMIUM plans
    subscriptionStatus: type === 'deleted' ? 'INACTIVE' : 'ACTIVE',
    subscriptionStartDate: new Date(subscription.current_period_start * 1000),
    subscriptionEndDate: new Date(subscription.current_period_end * 1000),
    cancelAtPeriodEnd: subscription.cancel_at_period_end,
    lastBillingDate: new Date(subscription.current_period_start * 1000),
    stripeCustomerId: subscription.customer
  };
  console.log("Logger -> subscriptionData:", subscriptionData)

  try {
    await prisma.user.update({
      where: { email: customerEmail },
      data: subscriptionData,
    });

    return NextResponse.json({
      status: 200,
      message: `Subscription ${type} success`,
    });
  } catch (error) {
    console.error(`Error during subscription ${type}:`, error);
    return NextResponse.json({
      status: 500,
      error: `Error during subscription ${type}`,
    });
  }
}

async function handleCheckoutSessionCompleted(event: Stripe.Event) {
  const session = event.data.object as Stripe.Checkout.Session;
  const metadata: any = session?.metadata;

  try {
    const user = await prisma.user.findUnique({
      where: { clerkId: metadata?.userId },
    });
    if (!user) throw new Error("User not found");

    // Update user's subscription status
    const updatedUser = await prisma.user.update({
      where: { clerkId: metadata?.userId },
      data: {
        subscriptionPlan: 'PREMIUM',
        subscriptionStatus: 'ACTIVE',
        subscription: session.subscription as string,
        subscriptionStartDate: new Date(),
        subscriptionEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        lastBillingDate: new Date(),
      },
    });

    return NextResponse.json({
      status: 200,
      message: "User subscription updated successfully",
      updatedUser,
    });
  } catch (error) {
    console.error("Error handling checkout session:", error);
    return NextResponse.json({
      status: 500,
      error,
    });
  }
}

async function webhooksHandler(
  reqText: string,
  request: NextRequest
): Promise<NextResponse> {
  const sig = request.headers.get("Stripe-Signature");

  try {
    const event = await stripe.webhooks.constructEventAsync(
      reqText,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    switch (event.type) {
      case "customer.subscription.created":
        return handleSubscriptionEvent(event, "created");
      case "customer.subscription.updated":
        return handleSubscriptionEvent(event, "updated");
      case "customer.subscription.deleted":
        return handleSubscriptionEvent(event, "deleted");
      case "checkout.session.completed":
        return handleCheckoutSessionCompleted(event);
      default:
        return NextResponse.json({
          status: 400,
          error: "Unhandled event type",
        });
    }
  } catch (err) {
    console.error("Error constructing Stripe event:", err);
    return NextResponse.json({
      status: 500,
      error: "Webhook Error: Invalid Signature",
    });
  }
}