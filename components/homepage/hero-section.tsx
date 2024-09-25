"use client";
import { ArrowRight, Github } from "lucide-react";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BorderBeam } from "../magicui/border-beam";
import { Button } from "../ui/button";
import Image from "next/image";
import { TITLE_TAILWIND_CLASS } from "@/utils/constants";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function HeroSection() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const plugin = Autoplay({ delay: 2000, stopOnInteraction: false });
  return (
    <section
      className="mt-[3rem] flex flex-col items-center justify-center leading-6"
      aria-label="Nextjs Starter Kit Hero"
    >
      <h1
        className={`${TITLE_TAILWIND_CLASS} max-w-[1120px] scroll-m-20 bg-gradient-to-b text-center font-semibold tracking-tight dark:text-white`}
      >
        Turn your creative sparks into content that ignites.
      </h1>
      <p className="mx-auto mt-2 max-w-[700px] text-center text-gray-500 dark:text-gray-400">
        Streamline Your Content Creation Pipeline
      </p>
      <div className="flex items-center justify-center gap-3">
        <Link href="/dashboard" className="mt-5">
          <Button className="animate-buttonheartbeat rounded-md bg-blue-600 text-sm font-semibold text-white hover:bg-blue-500">
            Get Started
          </Button>
        </Link>
      </div>
      <div>
        <div className="relative mt-7 flex max-w-6xl justify-center overflow-hidden">
          <div className="relative rounded-xl">
            {isClient && (
              <Carousel
                plugins={[plugin]}
                className="w-full max-w-6xl"
                opts={{
                  align: "start",
                  loop: true,
                }}
              >
                <CarouselContent>
                  <CarouselItem>
                    <Image
                      src="https://nruhnevvqgdhoxxaauxi.supabase.co/storage/v1/object/public/images/Screenshot%202024-09-25%20at%2010.03.34%20AM.png"
                      alt="Nextjs Starter Kit Dashboard Preview"
                      width={1100}
                      height={550}
                      priority={true}
                      className="block rounded-[inherit] border object-contain shadow-lg dark:hidden"
                    />
                    <Image
                      src="https://nruhnevvqgdhoxxaauxi.supabase.co/storage/v1/object/public/images/Screenshot%202024-09-25%20at%2010.03.24%20AM.png"
                      width={1100}
                      height={550}
                      alt="Nextjs Starter Kit Dark Mode Dashboard Preview"
                      priority={true}
                      className="hidden rounded-[inherit] border object-contain shadow-lg dark:block"
                    />
                  </CarouselItem>
                  <CarouselItem>
                    <Image
                      src="https://nruhnevvqgdhoxxaauxi.supabase.co/storage/v1/object/public/images/Screenshot%202024-09-25%20at%2012.46.43%20PM.png"
                      alt="Nextjs Starter Kit Dashboard Preview"
                      width={1100}
                      height={550}
                      priority={true}
                      className="block rounded-[inherit] border object-contain shadow-lg dark:hidden"
                    />
                    <Image
                      src="https://nruhnevvqgdhoxxaauxi.supabase.co/storage/v1/object/public/images/Screenshot%202024-09-25%20at%2012.46.29%20PM.png"
                      width={1100}
                      height={550}
                      alt="Nextjs Starter Kit Dark Mode Dashboard Preview"
                      priority={true}
                      className="hidden rounded-[inherit] border object-contain shadow-lg dark:block"
                    />
                  </CarouselItem>
                  <CarouselItem>
                    <Image
                      src="https://nruhnevvqgdhoxxaauxi.supabase.co/storage/v1/object/public/images/Screenshot%202024-09-25%20at%2012.49.03%20PM.png"
                      alt="Nextjs Starter Kit Dashboard Preview"
                      width={1100}
                      height={550}
                      priority={true}
                      className="block rounded-[inherit] border object-contain shadow-lg dark:hidden"
                    />
                    <Image
                      src="https://nruhnevvqgdhoxxaauxi.supabase.co/storage/v1/object/public/images/Screenshot%202024-09-25%20at%2012.48.48%20PM.png"
                      width={1100}
                      height={550}
                      alt="Nextjs Starter Kit Dark Mode Dashboard Preview"
                      priority={true}
                      className="hidden rounded-[inherit] border object-contain shadow-lg dark:block"
                    />
                  </CarouselItem>
                  <CarouselItem>
                    <Image
                      src="https://nruhnevvqgdhoxxaauxi.supabase.co/storage/v1/object/public/images/Screenshot%202024-09-25%20at%2012.49.20%20PM.png"
                      alt="Nextjs Starter Kit Dashboard Preview"
                      width={1100}
                      height={550}
                      priority={true}
                      className="block rounded-[inherit] border object-contain shadow-lg dark:hidden"
                    />
                    <Image
                      src="https://nruhnevvqgdhoxxaauxi.supabase.co/storage/v1/object/public/images/Screenshot%202024-09-25%20at%2012.49.36%20PM.png"
                      width={1100}
                      height={550}
                      alt="Nextjs Starter Kit Dark Mode Dashboard Preview"
                      priority={true}
                      className="hidden rounded-[inherit] border object-contain shadow-lg dark:block"
                    />
                  </CarouselItem>
                  {/* Add more CarouselItems here if you have more images */}
                </CarouselContent>
              </Carousel>
            )}
            <BorderBeam size={250} duration={12} delay={9} />
          </div>
        </div>
      </div>
    </section>
  );
}
