"use client";

import { Separator } from "@/components/ui/separator";
import clsx from "clsx";
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
import { usePathname } from "next/navigation";
import { FaTasks } from "react-icons/fa";

export default function DashboardSideBar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", icon: HomeIcon, label: "Home" },
    {
      href: "/dashboard/content-planning",
      icon: List,
      label: "Content Planning",
    },
    { href: "/dashboard/scripting", icon: Edit, label: "Scripting" },
    { href: "/dashboard/visual-assets", icon: Image, label: "Visual Assets" },
    { href: "/dashboard/resources", icon: Folder, label: "Resources" },
  ];

  return (
    <div className="hidden h-full border-r lg:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-[55px] w-full items-center justify-between border-b px-3">
          <Link className="ml-1 flex items-center gap-2 font-semibold" href="/">
            <span className="">ContentFlow</span>
            <Clapperboard aria-hidden="true" />
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.href}
                className={clsx(
                  "text-foreground flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                  {
                    "text-foreground flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50":
                      pathname === item.href,
                  },
                )}
                href={item.href}
              >
                <div className="rounded-lg border border-gray-400 bg-white p-1 dark:border-gray-800 dark:bg-black">
                  <item.icon className="h-3 w-3" />
                </div>
                {item.label}
              </Link>
            ))}
            <Separator className="my-3" />
            <Link
              className={clsx(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                {
                  "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50":
                    pathname === "/dashboard/settings",
                },
              )}
              href="/dashboard/settings"
              id="onboarding"
            >
              <div className="rounded-lg border border-gray-400 bg-white p-1 dark:border-gray-800 dark:bg-black">
                <Settings className="h-3 w-3" />
              </div>
              Settings
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
