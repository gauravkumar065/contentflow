"use client";
import HeroSection from "@/components/homepage/hero-section";
import Pricing from "@/components/homepage/pricing";
import SideBySide from "@/components/homepage/side-by-side";
import PageWrapper from "@/components/wrapper/page-wrapper";
import config from "@/config";

export default function Home() {
  return (
    <PageWrapper>
      <div className="mt-[1rem] flex w-full flex-col items-center justify-center p-3">
        <HeroSection />
      </div>
      <div className="my-[8rem] flex w-full items-center justify-center">
        <SideBySide />
      </div>

      {config.auth.enabled && config.payments.enabled && (
        <div>
          <Pricing />
        </div>
      )}
    </PageWrapper>
  );
}
