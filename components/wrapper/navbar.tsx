"use client";
import Link from "next/link";
import * as React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Button } from "../ui/button";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { UserProfile } from "../user-profile";
import ModeToggle from "../mode-toggle";
import { Clapperboard } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import config from "@/config";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { Dialog, DialogClose } from "@radix-ui/react-dialog";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Idea page",
    href: "/dashboard",
    description: "Manage your idea and keep track for progress",
  },
  {
    title: "Scripting page",
    href: "/dashboard/scripting",
    description: "Write and play script in best user interface",
  },
  {
    title: "AI tools",
    href: "/dashboard/resources",
    description:
      "Use AI for generating title, hashtags, scripts, content and many more.",
  },
];

export default function NavBar() {
  let userId = null;
  if (config?.auth?.enabled) {
    const user = useAuth();
    userId = user?.userId;
  }

  return (
    <div className="fixed z-10 flex min-w-full justify-between border-b bg-white p-2 dark:bg-black dark:bg-opacity-50">
      <div className="flex w-full justify-between min-[825px]:hidden">
        <Dialog>
          <SheetTrigger className="p-2 transition">
            <Button
              size="icon"
              variant="ghost"
              className="h-4 w-4"
              aria-label="Open menu"
              asChild
            >
              <GiHamburgerMenu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Contentflow</SheetTitle>
            </SheetHeader>
            <div className="mt-[1rem] flex flex-col space-y-3">
              <DialogClose asChild>
                <Link href="/">
                  <Button variant="outline" className="w-full">
                    Home
                  </Button>
                </Link>
              </DialogClose>
              <DialogClose asChild>
                <Link
                  href="/dashboard"
                  legacyBehavior
                  passHref
                  className="cursor-pointer"
                >
                  <Button variant="outline">Dashboard</Button>
                </Link>
              </DialogClose>
            </div>
          </SheetContent>
        </Dialog>
        <ModeToggle />
      </div>
      <NavigationMenu>
        <NavigationMenuList className="flex w-[100%] justify-between gap-3 max-[825px]:hidden">
          <Link href="/" className="flex items-center pl-2" aria-label="Home">
            <Clapperboard aria-hidden="true" />
            <span className="sr-only">Home</span>
          </Link>
        </NavigationMenuList>
        <NavigationMenuList>
          <NavigationMenuItem className="ml-5 max-[825px]:hidden">
            <NavigationMenuTrigger className="dark:bg-black dark:bg-opacity-50">
              Features
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="flex w-[400px] flex-col gap-3 p-4 lg:w-[500px]">
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem className="max-[825px]:hidden">
            <Link href="/dashboard" legacyBehavior passHref>
              <Button variant="ghost">Dashboard</Button>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex items-center gap-2 max-[825px]:hidden">
        {userId && <UserProfile />}
        <ModeToggle />
      </div>
    </div>
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
