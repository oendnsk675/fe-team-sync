import React from "react";
import Header from "@/app/components/header";

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="px-16">
      <Header></Header>
      <main>{children}</main>
    </div>
  );
}
