"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { axiosWithAuth } from "../utils/axiosInstance";
import useUserStore from "../stores/userStore";
import { useRouter } from "next/navigation";
import queryClient from "../utils/queryClient";

export const AppProvider = ({ children }: any) => {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const setUser = useUserStore((state: any) => state.setUser);

  const {
    data: userProfile,
    isLoading,
    isError,
  } = useQuery("profile", fetchProfile, {
    enabled: false, // Tidak aktifkan permintaan secara otomatis, akan diaktifkan saat token tersedia
    onSuccess: ({ data }) => {
      setUser(data);
      setAuthenticated(true);
    },
    onError: () => {
      setAuthenticated(false);
      router.replace("/sign-in");
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      // Aktifkan permintaan data profil jika token tersedia
      queryClient.prefetchQuery("profile", fetchProfile); // Pre-fetch data profil untuk caching
    } else {
      setAuthenticated(false);
      router.replace("/sign-in");
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <span className="loading loading-infinity w-36 text-[#1db88e] text-3xl"></span>
      </div>
    );
  }

  return <>{children}</>;
};

const fetchProfile = async () => {
  const response = await axiosWithAuth.get("/user/profile");
  return response.data;
};
