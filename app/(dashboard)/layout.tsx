'use client';

import { Sidebar } from '@/app/components/dashboard/sidebar';
import React from 'react';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { AppProvider } from '../providers/AppProvider';
import { WebSocketProvider } from '../providers/WebSocketProvider';
import queryClient from '../utils/queryClient';

function MainLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <WebSocketProvider>
          <div className="flex bg-base-200">
            <Sidebar />
            <div className="2xl:w-[15%] lg:w-[18%]"></div>
            <main className="2xl:p-6 xl:px-2 xl:py-5 flex-1 relative h-screen overflow-y-auto">
              {children}
            </main>
          </div>
        </WebSocketProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </AppProvider>
    </QueryClientProvider>
  );
}

export default MainLayout;
