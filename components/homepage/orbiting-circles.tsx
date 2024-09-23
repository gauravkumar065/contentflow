import OrbitingCircles from "@/components/magicui/orbiting-circles";
import { IconProps } from "@radix-ui/react-icons/dist/types";
import Image from "next/image";

export function OrbitingCirclesComponent() {
  return (
    <div className="relative flex h-[500px] w-full max-w-[32rem] items-center justify-center overflow-hidden rounded-lg">
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-500/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
        Publish Fast
      </span>
      {/* Inner Circles */}
      <OrbitingCircles
        className="h-[30px] w-[30px] border-none bg-transparent"
        duration={20}
        delay={20}
        radius={80}
      >
        <Icons.instagram />
      </OrbitingCircles>
      <OrbitingCircles
        className="h-[30px] w-[30px] border-none bg-transparent"
        duration={20}
        delay={10}
        radius={80}
      >
        <Icons.youtubeShorts />
      </OrbitingCircles>
      {/* Outer Circles (reverse) */}
      <OrbitingCircles
        className="h-[50px] w-[50px] border-none bg-transparent"
        reverse
        radius={190}
        duration={20}
      >
        <Icons.youtube />
      </OrbitingCircles>
      <OrbitingCircles
        className="h-[50px] w-[50px] border-none bg-transparent"
        reverse
        radius={190}
        duration={20}
        delay={20}
      >
        <Icons.facebook />
      </OrbitingCircles>
    </div>
  );
}

const Icons = {
  instagram: (props: IconProps) => (
    <Image
      src="https://img.icons8.com/?size=100&id=Xy10Jcu1L2Su&format=png&color=000000"
      alt="Instagram"
      width={30}
      height={30}
    />
  ),
  youtubeShorts: (props: IconProps) => (
    <Image
      src="https://img.icons8.com/?size=100&id=V5rVzStr5qA9&format=png&color=000000"
      alt="YouTube Shorts"
      width={30}
      height={30}
    />
  ),
  youtube: (props: IconProps) => (
    <Image
      src="https://img.icons8.com/?size=100&id=Fzmez16u38Xl&format=png&color=000000"
      alt="YouTube"
      width={50}
      height={50}
    />
  ),
  facebook: (props: IconProps) => (
    <Image
      src="https://img.icons8.com/?size=100&id=118497&format=png&color=000000"
      alt="Facebook"
      width={50}
      height={50}
    />
  ),
};
