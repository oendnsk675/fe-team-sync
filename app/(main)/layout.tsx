"use client";

import React, { useState } from "react";
import Header from "@/app/components/header";
import { QueryClientProvider } from "react-query";
import queryClient from "../utils/queryClient";

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="px-16">
        <Header></Header>
        <main>{children}</main>
      </div>
    </QueryClientProvider>
  );
}
