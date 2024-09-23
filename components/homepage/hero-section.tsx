import { ArrowRight, Github } from "lucide-react";
import Link from "next/link";
import { BorderBeam } from "../magicui/border-beam";
import { Button } from "../ui/button";
import Image from "next/image";
import { TITLE_TAILWIND_CLASS } from "@/utils/constants";

export default function HeroSection() {
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
            <Image
              src="https://utfs.io/f/31dba2ff-6c3b-4927-99cd-b928eaa54d5f-5w20ij.png"
              alt="Nextjs Starter Kit Dashboard Preview"
              width={1100}
              height={550}
              priority={true}
              className="block rounded-[inherit] border object-contain shadow-lg dark:hidden"
            />
            <Image
              src="https://utfs.io/f/69a12ab1-4d57-4913-90f9-38c6aca6c373-1txg2.png"
              width={1100}
              height={550}
              alt="Nextjs Starter Kit Dark Mode Dashboard Preview"
              priority={true}
              className="hidden rounded-[inherit] border object-contain shadow-lg dark:block"
            />
            <BorderBeam size={250} duration={12} delay={9} />
          </div>
        </div>
      </div>
    </section>
  );
}
