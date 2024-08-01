"use client";

import React from "react";
import { Sidebar } from "@/app/components/dashboard/sidebar";
import { AppProvider } from "../providers/AppProvider";
import queryClient from "../utils/queryClient";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

function MainLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <div className="flex bg-base-200">
          <Sidebar />
          <div className="2xl:w-[15%] lg:w-[20%]"></div>
          <main className="2xl:p-6 xl:px-2 xl:py-5 flex-1 relative h-screen overflow-y-auto">
            {children}
          </main>
        </div>
        <ReactQueryDevtools initialIsOpen={false} />
      </AppProvider>
    </QueryClientProvider>
  );
}

export default MainLayout;
