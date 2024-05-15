import React from "react";
import Header from "@/app/components/dashboard/header";
import { Sidebar } from "@/app/components/dashboard/sidebar";

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex overflow-hidden">
      <Sidebar />
      <div className="2xl:w-[15%] lg:w-[20%]"></div>
      <main className="p-6 flex-1 relative overflow-hidden">{children}</main>
    </div>
  );
}
