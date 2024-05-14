import React from "react";
import Header from "@/app/components/dashboard/header";
import { Sidebar } from "@/app/components/dashboard/sidebar";

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="p-6 flex-1 relative">{children}</main>
    </div>
  );
}
