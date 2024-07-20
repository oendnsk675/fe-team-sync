"use client";

import React from "react";
import Header from "@/app/components/dashboard/header";
import { Sidebar } from "@/app/components/dashboard/sidebar";
import withAuth from "../hoc/withAuth";
import { AppProvider } from "../providers/AppProvider";
import queryClient from "../utils/queryClient";
import { QueryClientProvider } from "react-query";

function MainLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <div className="flex overflow-hidden bg-base-200">
          <Sidebar />
          <div className="2xl:w-[15%] lg:w-[20%]"></div>
          <main className="p-6 flex-1 relative overflow-hidden">
            {children}
          </main>
        </div>
      </AppProvider>
    </QueryClientProvider>
  );
}

export default MainLayout;
