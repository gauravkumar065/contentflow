import NotAuthorized from "@/components/not-authorized";
import { isAuthorized } from "@/utils/data/user/isAuthorized";
import { currentUser } from "@clerk/nextjs/server";
import { ReactNode } from "react";
import DashboardSideBar from "./_components/dashboard-side-bar";
import DashboardTopNav from "./_components/dashbord-top-nav";
import config from "@/config";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <DashboardSideBar />
      <DashboardTopNav>
        <main style={{ flex: "1 1" }} className="flex flex-col">
          {children}
        </main>
      </DashboardTopNav>
    </div>
  );
}
