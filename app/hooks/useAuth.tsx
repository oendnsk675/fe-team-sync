"use client";

import { useMutation, useQuery, useQueryClient } from "react-query";
import { axiosInstance, axiosWithAuth } from "../utils/axiosInstance";
import { toast } from "react-toastify";
import queryClient from "../utils/queryClient";

const createUser = async (url: string, user: any) => {
  return await axiosInstance.post(url, user, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const useAuth = (url: string, onSuccessCallback: any) => {
  return useMutation((user) => createUser(url, user), {
    onSuccess: ({ data }: any) => {
      toast.success(data.message);

      if (url == "auth/sign-in") {
        let { access_token, refresh_token } = data.data;
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);
        onSuccessCallback();
      }

      queryClient.invalidateQueries("users");
    },

    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });
};

export const useSignUp = (onSuccessCallback: any) =>
  useAuth("auth/sign-up", onSuccessCallback);
export const useSignIn = (onSuccessCallback: any) =>
  useAuth("auth/sign-in", onSuccessCallback);
