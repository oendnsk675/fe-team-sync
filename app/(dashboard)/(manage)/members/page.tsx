'use client';

import AlertCustom from '@/app/components/alert';
import Modal from '@/app/components/modal';
import Pagination from '@/app/components/paggination';
import SelectSearch from '@/app/components/selectSearch';
import { useUser } from '@/app/stores/userStore';
import { axiosWithAuth } from '@/app/utils/axiosInstance';
import queryClient from '@/app/utils/queryClient';
import {
  faFilter,
  faMagnifyingGlass,
  faUserAstronaut,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import Link from 'next/link';
import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'react-toastify';

export default function Page() {
  const user = useUser();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = (state: boolean) => {
    console.log(searchQuery);

    setModalOpen(state);
  };

  const doInvite = (users: never[]) => {
    const team_id = localStorage.getItem('instanceSelected');
    const data = users.map((user: any) => {
      return {
        user_id: user.user_id,
        team_id,
        role: 'MEMBER',
      };
    });
    return axiosWithAuth
      .post(`team/member/invite`, data)
      .then(({ data }) => data.data)
      .catch((error) => error.response.data.message);
  };

  const fetchUsers = async (query: any) => {
    let team_id = localStorage.getItem('instanceSelected');

    return axiosWithAuth
      .get(`users/${team_id}?query=${query}`)
      .then(({ data }) => data.data)
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const {
    data: users,
    isLoading: isLoadingUserSearch,
    isError,
  } = useQuery(['users', searchQuery], () => fetchUsers(searchQuery), {
    enabled: !!searchQuery,
  });

  const handleSearch = (query: any) => {
    // alert(query);
    setSearchQuery(query);
  };

  const { mutate } = useMutation({
    mutationFn: doInvite,
    onSuccess: () => {
      toast.success('User successfully invited');
      queryClient.invalidateQueries(['members']);
    },
    onError: () => {
      toast.error('Failed to invite user');
    },
  });

  const handleInvite = (e: any) => {
    e.preventDefault();
    mutate(selectedUsers);
  };

  const fetchTeamMember = () => {
    let page = localStorage.getItem('page') || 1;
    let limit = localStorage.getItem('limit') || 10;
    const team_id = localStorage.getItem('instanceSelected');

    return axiosWithAuth
      .get(`team/members/${team_id}?page=${page}&limit=${limit}`)
      .then(({ data }) => data.data)
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const fetchTeam = () => {
    const team_id = localStorage.getItem('instanceSelected');

    return axiosWithAuth
      .get(`team/${team_id}`)
      .then(({ data }) => data.data)
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const { data: members, isLoading } = useQuery(['members'], fetchTeamMember);

  const { data: team, isLoading: isLoadingTeam } = useQuery(
    ['team'],
    fetchTeam
  );

  const suspendUser = (user_id: string) => {
    const team_id = localStorage.getItem('instanceSelected');

    return axiosWithAuth
      .post(`team/member/suspend/`, {
        user_id,
        team_id,
      })
      .then(({ data }) => data.data)
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const { isLoading: isLoadingSuspend, mutate: mutationSuspend } = useMutation({
    mutationFn: suspendUser,
    onSuccess: () => {
      toast.success('User successfully suspended');
      queryClient.invalidateQueries(['members']);
    },
    onError: () => {
      toast.error('Failed to suspend user');
    },
  });

  const handleSuspend = (user_id: string) => {
    AlertCustom('Are you sure you want to suspend this user?', () => {
      mutationSuspend(user_id);
    });
  };

  return (
    <div className="w-full">
      {/* header */}
      <div className=" mb-14">
        <div className="flex items-center gap-4 mb-4 text-slate-600">
          <FontAwesomeIcon icon={faUsers} size="lg" />
          <h1 className="text-xl font-semibold">Member</h1>
        </div>
        <span className="block">
          Manage your members and their permission here.
        </span>
      </div>

      {members && (
        <div className="">
          {/* header */}
          <div className="flex justify-between items-center mb-6 bg-white p-5 rounded">
            <h2 className="text-xl font-semibold">
              All members{' '}
              <span className="text-slate-500">{members.length}</span>
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
              <button
                onClick={handleOpenModal}
                className="btn btn-accent btn-sm w-[120px] px-10 rounded hover:opacity-75 transition-all duration-150"
              >
                {isLoading && (
                  <span className="loading loading-dots loading-xs"></span>
                )}
                {!isLoading && <span>Invite</span>}
              </button>
              <Modal open={isModalOpen} close={handleCloseModal}>
                {!isLoadingTeam && (
                  <>
                    <div className="w-full flex flex-col items-center gap-3 mb-6">
                      <FontAwesomeIcon
                        icon={faUserAstronaut}
                        size="2x"
                        className="text-emerald-600"
                      />
                      <h2 className="text-lg font-semibold text-center">
                        Invite a member to{' '}
                        <span className="text-emerald-600">
                          {team?.team_name}
                        </span>{' '}
                        Team
                      </h2>
                    </div>

                    <form>
                      <label htmlFor="" className="text-sm mb-1 block">
                        Search by username, full name or email address
                      </label>
                      <div className="flex w-full items-center gap-2">
                        <SelectSearch
                          onSearch={handleSearch}
                          data={users}
                          isLoading={isLoadingUserSearch}
                          onSelectedUser={setSelectedUsers}
                        />
                        <button
                          type="submit"
                          onClick={(e) => handleInvite(e)}
                          className="btn btn-secondary btn-sm p-3 rounded h-full"
                        >
                          {isLoading && (
                            <span className="loading loading-dots loading-xs"></span>
                          )}
                          {!isLoading && <span>Invites</span>}
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </Modal>
            </div>
          </div>
          {/* table */}
          <div className="overflow-x-auto overflow-y-hidden mb-6">
            <table className="table">
              {/* head */}
              <thead className="bg-emerald-500/20 text-slate-900">
                <tr>
                  <th className="text-center tracking-wider py-4 rounded-tl"></th>
                  <th className="text-center tracking-wider py-4">Name</th>
                  <th className="text-center tracking-wider py-4">Username</th>
                  <th className="text-center tracking-wider py-4">Email</th>
                  <th className="text-center tracking-wider py-4">Role</th>
                  <th className="text-center tracking-wider py-4">Status</th>
                  <th className="text-center tracking-wider py-4">Joined At</th>
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
                  members.data.map((member: any, index: number) => (
                    <tr key={index + 1}>
                      <th>{index + 1}</th>
                      <td className="text-center">
                        <div className="flex gap-3 items-center">
                          <div className="w-11 h-11 rounded-lg bg-emerald-400/50"></div>
                          <span className="text-start">
                            {member.user.fullname}
                          </span>
                        </div>
                      </td>
                      <td className="text-center text-emerald-600 underline">
                        <Link href={''}>@{member.user.username}</Link>
                      </td>
                      <td className="text-center">{member.user.email}</td>
                      <td className="text-center">{member.role}</td>
                      <td className="text-center">
                        {member.user.status ? 'Online' : 'Offline'}
                      </td>
                      <td className="text-center">
                        {moment(member.joined_at).startOf('hour').fromNow()}
                      </td>
                      <td className="flex justify-center items-center h-full w-full mt-2">
                        <button
                          onClick={() => handleSuspend(member.user.user_id)}
                          disabled={member.user.user_id == user.user_id}
                          className={`xl:w-[112px] btn btn-sm btn-error ${
                            member.user.user_id == user.user_id
                              ? 'cursor-not-allowed opacity-60'
                              : ''
                          }`}
                        >
                          {isLoadingSuspend && (
                            <span className="loading loading-dots loading-xs"></span>
                          )}
                          {!isLoadingSuspend && <span>Suspend</span>}
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          {/* metadata */}
          <div className="flex items-center justify-between">
            <div>
              <span className="font-light">
                Total <span className="font-semibold">10</span> data dari{' '}
                <span className="font-semibold">20</span>
              </span>
            </div>
            {/* paggination */}
            <Pagination
              page={+members.page}
              totalPages={+members.totalPages}
              onPageChange={(newPage) => {
                localStorage.setItem('page', String(newPage));
                queryClient.invalidateQueries(['members']);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
