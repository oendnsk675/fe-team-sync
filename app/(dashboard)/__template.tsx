"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import userStore from "../stores/userStore";
import { QueryClientProvider, useQuery } from "react-query";
import { axiosWithAuth } from "../utils/axiosInstance";
import queryClient from "../utils/queryClient";
import { ReactQueryDevtools } from "react-query/devtools";

export default function Template({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const setUser = userStore((state: any) => state.setUser);

  const {
    data: userProfile,
    isLoading,
    isError,
  } = useQuery("profile", fetchProfile, {
    onSuccess: ({ data }) => {
      // let instanceSelected = localStorage.getItem("instanceSelected");
      setUser(data);
      setAuthenticated(true);

      // if (!instanceSelected) {
      //   router.push("/teams");
      // }
    },
    onError: () => {
      setAuthenticated(false);
      router.push("/sign-in");
    },
  });

  console.log("asd");

  if (isLoading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <span className="loading loading-infinity w-36 text-[#1db88e] text-3xl"></span>
      </div>
    );
  }

  return (
    <div className="xl:text-sm 2xl:text-base template">
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}

const fetchProfile = async () => {
  const response = await axiosWithAuth.get("/user/profile");
  return response.data;
};
