"use client";

import ModeToggle from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { UserProfile } from "@/components/user-profile";
import config from "@/config";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import {
  Banknote,
  Folder,
  HomeIcon,
  Settings,
  Edit,
  Image,
  Handshake,
  BarChart2,
  List,
  Clapperboard,
} from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import { FaTasks } from "react-icons/fa";

export default function DashboardTopNav({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col">
      <header className="flex h-14 items-center gap-4 border-b px-3 lg:h-[55px]">
        <Dialog>
          <SheetTrigger className="p-2 transition min-[1024px]:hidden">
            <HamburgerMenuIcon />
            <Link href="/dashboard">
              <span className="sr-only">Home</span>
            </Link>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <Link href="/">
                <SheetTitle>Contentflow</SheetTitle>
              </Link>
            </SheetHeader>
            <div className="mt-[1rem] flex flex-col space-y-3">
              <DialogClose asChild>
                <Link href="/dashboard">
                  <Button variant="outline" className="w-full">
                    <HomeIcon className="mr-2 h-4 w-4" />
                    Home
                  </Button>
                </Link>
              </DialogClose>
              <DialogClose asChild>
                <Link href="/dashboard/content-planning">
                  <Button variant="outline" className="w-full">
                    <List className="mr-2 h-4 w-4" />
                    Content Planning
                  </Button>
                </Link>
              </DialogClose>
              <DialogClose asChild>
                <Link href="/dashboard/scripting">
                  <Button variant="outline" className="w-full">
                    <Edit className="mr-2 h-4 w-4" />
                    Scripting
                  </Button>
                </Link>
              </DialogClose>
              <DialogClose asChild>
                <Link href="/dashboard/visual-assets">
                  <Button variant="outline" className="w-full">
                    <Image className="mr-2 h-4 w-4" />
                    Visual Assets
                  </Button>
                </Link>
              </DialogClose>
              {/* <DialogClose asChild>
                <Link href="/dashboard/brand-collaboration">
                  <Button variant="outline" className="w-full">
                    <Handshake className="mr-2 h-4 w-4" />
                    Brand Collaboration
                  </Button>
                </Link>
              </DialogClose> */}
              <DialogClose asChild>
                <Link href="/dashboard/resources">
                  <Button variant="outline" className="w-full">
                    <Folder className="mr-2 h-4 w-4" />
                    Resources
                  </Button>
                </Link>
              </DialogClose>
              {/* <DialogClose asChild>
                <Link href="/dashboard/analytics">
                  <Button variant="outline" className="w-full">
                    <BarChart2 className="mr-2 h-4 w-4" />
                    Analytics
                  </Button>
                </Link>
              </DialogClose> */}
              {/* <DialogClose asChild>
                <Link href="/dashboard/workflow">
                  <Button variant="outline" className="w-full">
                    <FaTasks className="mr-2 h-4 w-4" />
                    Workflow
                  </Button>
                </Link>
              </DialogClose> */}
            </div>
          </SheetContent>
        </Dialog>
        <div className="ml-auto flex items-center justify-center gap-2">
          {config?.auth?.enabled && <UserProfile />}
          <ModeToggle />
        </div>
      </header>
      {children}
    </div>
  );
}
