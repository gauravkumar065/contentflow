import { AccordionComponent } from "@/components/homepage/accordion-component";
import BlogSample from "@/components/homepage/blog-samples";
import HeroSection from "@/components/homepage/hero-section";
import MarketingCards from "@/components/homepage/marketing-cards";
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
      {/* <div className="flex w-full flex-col items-center justify-center p-2">
        <MarketingCards />
      </div> */}
      {/* <div className="max-w-[1200px] p-8 mt-[2rem] lg:mt-[6rem] lg:mb-[5rem]">
        <BlogSample />
      </div> */}
      {config.auth.enabled && config.payments.enabled && (
        <div>
          <Pricing />
        </div>
      )}
      {/* <div className="my-[8rem] flex w-full items-center justify-center">
        <AccordionComponent />
      </div> */}
    </PageWrapper>
  );
}
