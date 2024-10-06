"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, PenTool, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { BorderBeam } from "../magicui/border-beam";
import { Button } from "../ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const TITLE_TAILWIND_CLASS = "text-4xl sm:text-5xl md:text-6xl";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }, // Moved transition here
};

const staggerChildren = {
  animate: { transition: { staggerChildren: 0.1 } },
};

export default function HeroSection() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const plugin = Autoplay({ delay: 4000, stopOnInteraction: false });

  return (
    <motion.section
      initial="initial"
      animate="animate"
      className="mt-16 flex flex-col items-center justify-center leading-6"
      aria-label="ContentFlow Hero"
    >
      <motion.h1
        variants={fadeInUp}
        className={`${TITLE_TAILWIND_CLASS} from-primary max-w-[800px] scroll-m-20 bg-gradient-to-r via-purple-500 to-pink-500 bg-clip-text text-center font-bold tracking-tight text-transparent`}
      >
        Transform Ideas into Compelling Content
      </motion.h1>
      <motion.p
        variants={fadeInUp}
        className="text-muted-foreground mx-auto mt-4 max-w-[700px] text-center text-xl"
      >
        Streamline your content creation journey from spark to publication
      </motion.p>
      <motion.div
        variants={staggerChildren}
        className="mt-8 flex flex-wrap items-center justify-center gap-4"
      >
        <motion.div variants={fadeInUp}>
          <Link href="/dashboard">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 group relative overflow-hidden rounded-full px-6 py-2 text-lg font-semibold transition-all">
              <span className="relative z-10">Start Creating</span>
              <motion.div
                className="absolute inset-0 z-0 bg-gradient-to-r from-purple-600 to-pink-600"
                initial={{ x: "100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <ArrowRight className="relative z-10 ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
        <motion.div variants={fadeInUp}>
          <Link href="/features">
            <Button
              variant="outline"
              className="rounded-full px-6 py-2 text-lg"
            >
              Explore Features
            </Button>
          </Link>
        </motion.div>
      </motion.div>
      <motion.div
        variants={staggerChildren}
        className="mt-12 flex flex-wrap items-center justify-center gap-8 text-center"
      >
        {[
          { icon: Sparkles, text: "AI-Powered Ideation" },
          { icon: PenTool, text: "Collaborative Editing" },
          { icon: Zap, text: "Instant Publishing" },
        ].map(({ icon: Icon, text }, index) => (
          <motion.div
            key={index}
            variants={fadeInUp}
            className="flex items-center space-x-2"
          >
            <Icon className="text-primary h-6 w-6" />
            <span className="text-lg font-medium">{text}</span>
          </motion.div>
        ))}
      </motion.div>
      <motion.div
        variants={fadeInUp}
        className="relative mt-16 w-full max-w-6xl overflow-hidden rounded-xl"
      >
        {isClient && (
          <Carousel
            plugins={[plugin]}
            className="w-full"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent>
              {[
                {
                  light: "darkmode.png.png",
                  dark: "dashboard-dark.png",
                  desc: "ContentFlow Dashboard",
                },
              ].map((item, index) => (
                <CarouselItem key={index}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Image
                      src={`https://nruhnevvqgdhoxxaauxi.supabase.co/storage/v1/object/public/images/lightmode.png?t=2024-10-05T07%3A21%3A25.786Z`}
                      width={1100}
                      height={550}
                      priority={index === 0}
                      className="block rounded-xl border object-contain shadow-lg dark:hidden"
                      alt={`ContentFlow ${item.desc} - Light Mode`}
                    />
                    <Image
                      src={`https://nruhnevvqgdhoxxaauxi.supabase.co/storage/v1/object/public/images/darkmode.png`}
                      width={1100}
                      height={550}
                      priority={index === 0}
                      className="hidden rounded-xl border object-contain shadow-lg dark:block"
                      alt={`ContentFlow ${item.desc} - Dark Mode`}
                    />
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}
        <BorderBeam size={300} duration={15} delay={7} />
      </motion.div>
    </motion.section>
  );
}
