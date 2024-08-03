"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { axiosWithAuth } from "../utils/axiosInstance";
import { usePathname, useRouter } from "next/navigation";
import queryClient from "../utils/queryClient";
import { useInstanceSelected, useUserActions } from "../stores/userStore";

export const AppProvider = ({ children }: any) => {
  const router = useRouter();
  const pathname = usePathname();
  const [authenticated, setAuthenticated] = useState(false);
  const { setUser, setInstance } = useUserActions();
  const instanceSelected = useInstanceSelected();

  const {
    data: userProfile,
    isLoading,
    isError,
  } = useQuery("profile", fetchProfile, {
    onSuccess: ({ data }) => {
      let instanceSelectedLS = localStorage.getItem("instanceSelected");
      setUser(data);
      setAuthenticated(true);

      if (!instanceSelected && pathname !== "/teams/add") {
        if (!instanceSelectedLS) {
          router.push("/teams");
        } else {
          setInstance(instanceSelectedLS);
        }
      }
    },
    onError: () => {
      setAuthenticated(false);
      router.push("/sign-in");
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    let instanceSelectedLS = localStorage.getItem("instanceSelected");

    if (!instanceSelected && pathname !== "/teams/add") {
      if (!instanceSelectedLS) {
        router.push("/teams");
      } else {
        setInstance(instanceSelectedLS);
      }
    }
    if (!token) {
      router.replace("/sign-in");
      setAuthenticated(false);
    }
  }, [pathname]);

  if (isLoading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <span className="loading loading-infinity w-36 text-[#1db88e] text-3xl"></span>
      </div>
    );
  }

  return <div className="xl:text-sm 2xl:text-base">{children}</div>;
};

const fetchProfile = async () => {
  const response = await axiosWithAuth.get("/user/profile");
  return response.data;
};
