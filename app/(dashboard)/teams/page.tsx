"use client";

import { useInstanceSelected } from "@/app/stores/userStore";
import { axiosWithAuth } from "@/app/utils/axiosInstance";
import { faSitemap } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { error } from "console";
import Link from "next/link";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

export default function Page() {
  let instanceSelected = useInstanceSelected();

  const fetchTeam = () => {
    return axiosWithAuth
      .get("teams")
      .then(({ data }) => data.data)
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const { data: teams, isLoading } = useQuery("teams", fetchTeam);

  return (
    <div className="w-full px-8">
      {/* headerr */}
      <div className="flex items-center gap-4 mb-8 text-slate-600">
        <FontAwesomeIcon icon={faSitemap} size="lg" />
        <h1 className="text-xl font-semibold">Teams</h1>
      </div>

      {!teams && (
        <div className="w-full min-h-screen flex justify-center items-center -mt-10">
          <div className="flex flex-col items-center gap-4">
            <FontAwesomeIcon icon={faSitemap} size="4x" />
            <Link
              href={"/teams/add"}
              className="btn btn-primary btn-sm px-10 rounded hover:opacity-75 transition-all duration-150 mt-4"
            >
              Add Team
            </Link>
          </div>
        </div>
      )}

      {teams && (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th className="text-center"></th>
                <th className="text-center">Name</th>
                <th className="text-center">Contact</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team: any, index: number) => (
                <tr key={index + 1}>
                  <th>{index + 1}</th>
                  <td>{team.team_name}</td>
                  <td>{team.description}</td>
                  <td className="flex justify-center w-full">
                    <button className="px-7 btn btn-sm btn-primary">
                      Select
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
