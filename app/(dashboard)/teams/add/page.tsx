"use client";

import { axiosWithAuth } from "@/app/utils/axiosInstance";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";

export default function Page() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const addTeam = (payload: any) => {
    return axiosWithAuth
      .post("team", payload)
      .then(({ data }) => {
        toast.success(data.message, {
          autoClose: 2000,
        });
      })
      .catch((error) => toast.error(error.response.data.message));
  };

  const { mutate, isLoading, isError } = useMutation(addTeam);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    let payload = { team_name: name, description };

    mutate(payload);
  };

  return (
    <div className="w-full flex flex-col xl:px-28 2xl:px-[24rem]">
      <Link
        href={"/teams"}
        className="mt-6 mb-10 flex items-center gap-4 hover:opacity-70 transition-all duration-150"
      >
        <FontAwesomeIcon icon={faAngleLeft} size="2xl" />
        <span>See All Team</span>
      </Link>

      <div className="flex flex-col items-center">
        <span className="opacity-75 mb-2">Tell us about your team</span>
        <h1 className="block text-3xl font-semibold mb-12">
          Set up your teams
        </h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="w-full mb-4">
          <label htmlFor="name" className="text-sm mb-2 block opacity-75">
            Organization name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Type here"
            className={`input input-bordered input-md w-full rounded-md ${
              isLoading && "cursor-not-allowed"
            }`}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="w-full mb-4">
          <label htmlFor="name" className="text-sm mb-2 block opacity-75">
            Description (Optional)
          </label>
          <textarea
            name="description"
            placeholder="Type here"
            rows={10}
            className={`textarea textarea-bordered w-full rounded-md text-sm ${
              isLoading && "cursor-not-allowed"
            }`}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="flex gap-3 items-center mb-6">
          <input id="checkbox" type="checkbox" className="w-5 h-5 rounded-md" />
          <label htmlFor="checkbox" className="text-sm">
            I hereby accept the{" "}
            <Link
              href={""}
              className="text-secondary hover:opacity-75 transition-all duration-150"
            >
              Terms of Service
            </Link>
            . For more information about Team Sync privacy practices, see the{" "}
            <Link
              href={""}
              className="text-secondary hover:opacity-75 transition-all duration-150"
            >
              Team Sync Privacy Statement.
            </Link>
          </label>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`btn btn-primary w-full rounded-md ${
            isLoading && "cursor-not-allowed disabled"
          }`}
        >
          Create
        </button>
      </form>
    </div>
  );
}
