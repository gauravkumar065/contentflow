"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { loadStripe } from "@stripe/stripe-js";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import config from "@/config";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Settings() {
  const [stripePromise, setStripePromise] = useState<Promise<any> | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    setStripePromise(loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!));
  }, []);

  useEffect(() => {
    if (user?.id && config?.auth?.enabled) {
      fetchUserData(user?.id);
    } else {
      setIsLoading(false);
    }
  }, [user]);

  const fetchUserData = async (userId: string) => {
    try {
      const response = await fetch(`/api/user?userId=${userId}`);
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBilling = async () => {
    try {
      const { data } = await axios.post(
        `/api/payments/create-billing-session`,
        {
          userId: user?.id,
          email: user?.emailAddresses?.[0]?.emailAddress,
          customerId: userData.stripeCustomerId,
          billingPage: true,
        },
      );
      console.log("Logger -> handleCheckout -> data:", data);

      if (data.sessionId) {
        const stripe = await stripePromise;
        return router.push(data.sessionId);
      } else {
        console.error("Failed to create checkout session");
        toast("Failed to create checkout session");
        return;
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      toast("Error during checkout");
      return;
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-wrap items-center justify-start gap-4 px-4 pt-5">
      <div className="mb-[5rem] flex w-full max-w-[700px] flex-col gap-3">
        <h2 className="mt-10 w-full scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          My Profile
        </h2>
        <div className="mt-3 flex w-full gap-3">
          <div className="flex w-full flex-col gap-3">
            <Label>First Name</Label>
            <Input defaultValue={user?.firstName || ""} />
          </div>
          <div className="flex w-full flex-col gap-3">
            <Label>Last Name</Label>
            <Input defaultValue={user?.lastName || ""} />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-3">
            <Label>E-mail</Label>
            <Input
              defaultValue={user?.emailAddresses?.[0]?.emailAddress || ""}
            />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Label className="text-lg font-medium text-gray-800">
            Subscription Plan
          </Label>
          <span className="text-base text-gray-600">
            {userData?.subscriptionPlan || "FREE"}
          </span>
        </div>
        <div className="flex flex-col gap-3">
          <Label className="text-lg font-medium text-gray-800">
            Subscription Status
          </Label>
          <span className="text-base text-gray-600">
            {userData?.subscriptionStatus || "INACTIVE"}
          </span>
        </div>
        <div className="flex flex-col gap-3">
          <Label className="text-lg font-medium text-gray-800">
            Start Date
          </Label>
          <span className="text-base text-gray-600">
            {userData?.subscriptionStartDate || "N/A"}
          </span>
        </div>
        <div className="flex flex-col gap-3">
          <Label className="text-lg font-medium text-gray-800">End Date</Label>
          <span className="text-base text-gray-600">
            {userData?.subscriptionEndDate || "N/A"}
          </span>
        </div>
        <button
          onClick={handleBilling}
          className="mt-4 rounded-md bg-gray-600 px-4 py-2 text-white transition duration-200 hover:bg-black"
        >
          Manage Billing
        </button>
      </div>
    </div>
  );
}
