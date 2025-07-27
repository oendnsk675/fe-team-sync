'use client';

import Pagination from '@/app/components/paggination';
import { TEAM_ROLES } from '@/app/shared/constant/team';
import { AddMemberTeam } from '@/app/shared/types/team';
import { useUser } from '@/app/stores/userStore';
import { axiosWithAuth } from '@/app/utils/axiosInstance';
import queryClient from '@/app/utils/queryClient';
import {
  faFilter,
  faMagnifyingGlass,
  faSitemap,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'react-toastify';

export default function Page() {
  const user = useUser();

  const [instanceSelected, setInstanceSelected] = useState<string | null>(
    localStorage.getItem('instanceSelected')
  );

  const fetchTeam = () => {
    let page = localStorage.getItem('page') || 1;
    let limit = localStorage.getItem('limit') || 10;

    return axiosWithAuth
      .get(`teams?page=${page}&limit=${limit}`)
      .then(({ data }) => data.data)
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const { data: teams, isLoading } = useQuery(['teams'], fetchTeam);

  const addMemberTeam = async (payload: AddMemberTeam) => {
    try {
      const { data } = await axiosWithAuth.post('member/invite', payload);
      return data.data;
    } catch (error: any) {
      throw error;
    }
  };
  const { mutate } = useMutation(addMemberTeam, {
    onSuccess: ({ data }) => {
      console.log(data);

      toast.success(data.message, {
        autoClose: 2000,
      });
      localStorage.setItem('instanceSelected', data?.team_id.toString());
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });

  function handleSelectInstance(instance: string): void {
    setInstanceSelected(instance);
    console.log(instanceSelected);
    mutate({
      team_id: +instance,
      description: 'test',
      role: TEAM_ROLES.DEVELOPER,
      user_id: user?.user_id,
    });
  }

  return (
    <div className="w-full">
      {/* header */}
      <div className=" mb-14">
        <div className="flex items-center gap-4 mb-4 text-slate-600">
          <FontAwesomeIcon icon={faSitemap} size="lg" />
          <h1 className="text-xl font-semibold">Teams</h1>
        </div>
        <span className="block">
          Manage your team and their permission here.
        </span>
      </div>

      {!teams && (
        <div className="w-full min-h-screen flex justify-center items-center -mt-10">
          <div className="flex flex-col items-center gap-4">
            <FontAwesomeIcon icon={faSitemap} size="4x" />
            <Link
              href={'/teams/add'}
              className="btn btn-primary btn-sm px-10 rounded hover:opacity-75 transition-all duration-150 mt-4"
            >
              Add Team
            </Link>
          </div>
        </div>
      )}

      {teams && (
        <div className="">
          {/* header */}
          <div className="flex justify-between items-center mb-6 bg-white p-5 rounded">
            <h2 className="text-xl font-semibold">
              All Teams <span className="text-slate-500">{teams.length}</span>
            </h2>

            <div className="flex gap-5">
              <div className="input input-bordered input-sm flex items-center gap-2">
                <input type="text" className="grow" placeholder="Search" />
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="text-slate-500"
                />
              </div>

              <div className="dropdown dropdown-end">
                <button
                  tabIndex={0}
                  role="button"
                  className=" btn btn-sm border border-slate-500 bg-white rounded mb-2"
                >
                  <FontAwesomeIcon icon={faFilter} />
                  <span>Filters</span>
                </button>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                >
                  <li>
                    <a>Item 1</a>
                  </li>
                  <li>
                    <a>Item 2</a>
                  </li>
                </ul>
              </div>
              <Link
                href={'/teams/add'}
                className="btn btn-accent btn-sm px-10 rounded hover:opacity-75 transition-all duration-150"
              >
                Add Team
              </Link>
            </div>
          </div>
          {/* table */}
          <div className="overflow-x-auto mb-6">
            <table className="table">
              {/* head */}
              <thead className="bg-emerald-500/20 text-slate-900">
                <tr>
                  <th className="text-center tracking-wider py-4 rounded-tl"></th>
                  <th className="text-center tracking-wider py-4 w-[360px]">
                    Name
                  </th>
                  <th className="text-center tracking-wider py-4 w-[800px]">
                    Description
                  </th>
                  <th className="text-center tracking-wider py-4 rounded-tr">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {isLoading && (
                  <span className="loading loading-ball loading-lg"></span>
                )}
                {!isLoading &&
                  teams.data.map((team: any, index: number) => (
                    <tr key={index + 1}>
                      <th>{index + 1}</th>
                      <td className="text-center">
                        <div className="flex gap-3 items-center">
                          <div className="w-11 h-11 rounded-lg bg-emerald-400/50"></div>
                          <span>{team.team_name}</span>
                        </div>
                      </td>
                      <td className="text-center">{team.description}</td>
                      <td className="flex justify-center w-full">
                        <button
                          onClick={() => handleSelectInstance(team.team_id)}
                          className={`px-7 btn btn-sm  ${
                            instanceSelected == team.team_id
                              ? 'bg-accent text-white'
                              : 'btn-primary'
                          }`}
                        >
                          Select
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          {/* metadata pagination */}
          <Pagination
            page={+teams.page}
            totalPages={+teams.totalPages}
            onPageChange={(newPage) => {
              localStorage.setItem('page', String(newPage));
              queryClient.invalidateQueries(['teams']);
            }}
          />
        </div>
      )}
    </div>
  );
}
