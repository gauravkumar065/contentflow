"use client";

import Link from "next/link";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { UserProfile } from "@/components/user-profile";
import ModeToggle from "@/components/mode-toggle";
import { Clapperboard, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const features = [
  {
    title: "Idea Board",
    href: "/dashboard",
    description: "Visualize and manage your creative concepts",
  },
  {
    title: "Script Studio",
    href: "/dashboard/scripting",
    description: "Craft compelling narratives with our intuitive interface",
  },
  {
    title: "AI Toolkit",
    href: "/dashboard/resources",
    description: "Harness AI power for content creation and optimization",
  },
];

export default function NavBar() {
  const { userId } = useAuth();

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 fixed z-10 w-full border-b backdrop-blur">
      <div className="container flex h-14 items-center">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" className="mr-6 flex items-center space-x-2">
                <Clapperboard className="h-6 w-6" />
                <span className="hidden font-bold sm:inline-block">
                  Content.Ai
                </span>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="hidden md:flex">
              <NavigationMenuTrigger>Features</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="from-muted/50 to-muted flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b p-6 no-underline outline-none focus:shadow-md"
                        href="/"
                      >
                        <Clapperboard className="h-6 w-6" />
                        <div className="mb-2 mt-4 text-lg font-medium">
                          ContentFlow
                        </div>
                        <p className="text-muted-foreground text-sm leading-tight">
                          Streamline your content creation process with our
                          all-in-one platform.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  {features.map((feature) => (
                    <ListItem
                      key={feature.title}
                      title={feature.title}
                      href={feature.href}
                    >
                      {feature.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem className="hidden md:flex">
              <Link href="/dashboard" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Dashboard
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            {userId && <UserProfile />}
            <ModeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-9 w-9 px-0 md:hidden"
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="pr-0">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col space-y-4">
                  <Link
                    href="/"
                    className="flex items-center px-2 py-1 text-lg"
                  >
                    Home
                  </Link>
                  <Link
                    href="/dashboard"
                    className="flex items-center px-2 py-1 text-lg"
                  >
                    Dashboard
                  </Link>
                  {features.map((feature) => (
                    <Link
                      key={feature.title}
                      href={feature.href}
                      className="flex items-center px-2 py-1 text-lg"
                    >
                      {feature.title}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </nav>
        </div>
      </div>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

function navigationMenuTriggerStyle() {
  return cn(
    "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
  );
}
