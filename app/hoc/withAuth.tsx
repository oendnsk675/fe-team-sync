"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { axiosWithAuth } from "../utils/axiosInstance";
import useUserStore from "../stores/userStore";

const queryClient = new QueryClient();

const withAuth = (WrappedComponent: any) => {
  const AuthHOC = (props: any) => {
    const router = useRouter();
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const setUser = useUserStore((state) => state.setUser);

    const {
      data: userProfile,
      isLoading,
      isError,
    } = useQuery("profile", fetchProfile, {
      enabled: false, // Tidak aktifkan permintaan secara otomatis, akan diaktifkan saat token tersedia
      onSuccess: (data) => {
        setUser(data);
        setAuthenticated(true);
      },
      onError: () => {
        setAuthenticated(false);
        router.replace("/login");
      },
    });

    useEffect(() => {
      const token = localStorage.getItem("access_token");
      if (token) {
        // Aktifkan permintaan data profil jika token tersedia
        queryClient.prefetchQuery("profile", fetchProfile); // Pre-fetch data profil untuk caching
      } else {
        setAuthenticated(false);
        router.replace("/login");
        setLoading(false);
      }
    }, [router]);

    if (loading || isLoading) {
      return <p>Loading...</p>; // Atau tampilkan loader lain
    }

    return authenticated ? (
      <QueryClientProvider client={queryClient}>
        <WrappedComponent {...props} />
      </QueryClientProvider>
    ) : null;
  };

  AuthHOC.displayName = `withAuth(${getDisplayName(WrappedComponent)})`;

  return AuthHOC;
};

const getDisplayName = (WrappedComponent: any) => {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
};

const fetchProfile = async () => {
  const response = await axiosWithAuth.get("/user/profile");
  return response.data;
};

export default withAuth;
