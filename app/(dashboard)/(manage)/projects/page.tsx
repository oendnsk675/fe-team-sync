"use client";

import Modal from "@/app/components/modal";
import Pagination from "@/app/components/paggination";
import { axiosWithAuth } from "@/app/utils/axiosInstance";
import { formatImage, loadTeamImage } from "@/app/utils/common/image";
import queryClient from "@/app/utils/queryClient";
import {
  faBoxArchive,
  faFolderClosed,
  faFolderOpen,
  faSort,
  faUsersLine,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";

export default function ProjectPage() {
  const [newImagePath, setNewImagePath] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [project_name, setProject_name] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState("");
  const [statusProject, setStatusProject] = useState("open");

  const fetchTeam = () => {
    let team_id = localStorage.getItem("instanceSelected");
    return axiosWithAuth
      .get(`team/${team_id}`)
      .then(({ data }) => data.data)
      .catch(({ response }) => {
        throw new Error(response.data.message);
      });
  };

  const fetchProjects = (status?: string) => {
    let team_id = localStorage.getItem("instanceSelected");
    let limit = 5;
    let page = localStorage.getItem("page");
    let endpoint = `project/${team_id}?page=${page}&limit=${limit}`;
    if (status) endpoint += `&status=${status}`;

    return axiosWithAuth
      .get(endpoint)
      .then(({ data }) => data.data)
      .catch(({ response }) => {
        throw new Error(response.data.message);
      });
  };

  const createProject = (payload: any) => {
    return axiosWithAuth
      .post(`project`, payload)
      .then(({ data }) => data.message)
      .catch(({ response }) => response.data.message);
  };

  const closeProject = (project_id: any, payload: any) => {
    return axiosWithAuth
      .patch(`project/${project_id}`, payload)
      .then(({ data }) => data.message)
      .catch(({ response }) => response.data.message);
  };

  const { mutate, isLoading: isLoadingCreateProject } = useMutation({
    mutationFn: createProject,
    mutationKey: "createProject",
    onSuccess: (data: string) => {
      toast.success(data);
      queryClient.invalidateQueries(["projects"]);
    },
    onError: (data: string) => {
      toast.error(data);
    },
  });

  const { mutate: mutateCloseProject, isLoading: isLoadingCloseProject } =
    useMutation({
      mutationFn: ({
        project_id,
        payload,
      }: {
        project_id: any;
        payload: any;
      }) => closeProject(project_id, payload),
      mutationKey: "closeProject",
      onSuccess: (data: string) => {
        toast.success(data);
        queryClient.invalidateQueries(["projects"]);
      },
      onError: (data: string) => {
        toast.error(data);
      },
    });

  const { data: team, isLoading: isLoadingTeam } = useQuery("team", fetchTeam, {
    onError: (err: string) => {
      toast.error(err);
    },
  });

  const { data: projects, isLoading: isLoadingProject } = useQuery(
    ["projects", statusProject],
    () => fetchProjects(statusProject),
    {
      onError: (err: string) => {
        toast.error(err);
      },
    }
  );

  const handleSubmit = (e: any) => {
    e.preventDefault();

    let team_id = localStorage.getItem("instanceSelected");
    let payload = {
      project_name,
      description,
      teamId: team_id,
      visibility,
    };

    mutate(payload);
  };

  const handleCloseProject = (project_id: any) => {
    let payload = {
      status: statusProject == "close" ? "open" : "close",
    };
    mutateCloseProject({ project_id, payload });
  };

  return (
    <div className="w-full">
      {/* header */}
      <div className=" mb-14">
        <div className="flex items-center gap-4 mb-4 text-slate-600">
          <FontAwesomeIcon icon={faFolderOpen} size="lg" />
          <h1 className="text-xl font-semibold">Projects</h1>
        </div>
        <span className="block">Manage your project here.</span>
      </div>
      <div className="flex gap-3">
        {/* project container */}
        <div className="w-[65%] h-full p-3 rounded bg-white">
          {/* search and btn add project */}
          <div className="w-full flex gap-3 mb-3">
            <div className="w-[75%]">
              <label className="input input-bordered input-sm flex items-center gap-2">
                <input type="text" className="grow" placeholder="Search" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>
            </div>
            <button
              onClick={() => setModalOpen(true)}
              className="btn btn-sm btn-primary flex-1"
            >
              New Project
            </button>
            <Modal open={isModalOpen} close={(state) => setModalOpen(state)}>
              <div className="">
                {/* header */}
                <h2 className="text-center text-2xl mb-5">
                  Create New Project
                </h2>
                <form onSubmit={(e) => handleSubmit(e)}>
                  <div className="flex flex-col mb-2">
                    <label htmlFor="project-name" className="text-sm">
                      Project Name
                    </label>
                    <input
                      value={project_name}
                      onChange={(e) => setProject_name(e.target.value)}
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered input-sm w-full"
                    />
                  </div>
                  <div className="flex flex-col mb-2">
                    <label htmlFor="description" className="text-sm">
                      Description
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      id="description"
                      className="textarea textarea-bordered h-24 w-full"
                      placeholder="Type here"
                    ></textarea>
                  </div>
                  <div className="flex flex-col mb-2">
                    <label htmlFor="visibility" className="text-sm">
                      Visibility
                    </label>
                    <select
                      id="visibility"
                      onChange={(e) => setVisibility(e.target.value)}
                      className="select select-bordered select-sm w-full"
                    >
                      <option value={"public"}>Public</option>
                      <option value={"private"}>Private</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-sm btn-primary w-full"
                  >
                    {isLoadingCreateProject ? (
                      <span className="loading loading-dots loading-sm"></span>
                    ) : (
                      <span>Create</span>
                    )}
                  </button>
                </form>
              </div>
            </Modal>
          </div>
          {/* container projects */}
          <div className="w-full rounded border">
            {/* header */}
            <div className="flex justify-between items-center p-4 py-5 bg-slate-300 bg-opacity-35 border-b">
              {/* filter */}
              <div className="flex gap-5 items-center">
                <button
                  onClick={() => {
                    setStatusProject("open");
                    queryClient.invalidateQueries(["projects", statusProject]);
                  }}
                  className={`${
                    statusProject == "close" ? "opacity-60" : ""
                  } font-semibold flex gap-1 items-center`}
                >
                  <FontAwesomeIcon icon={faFolderOpen} />
                  <span>{projects?.openCount} Open</span>
                </button>
                <button
                  onClick={() => {
                    setStatusProject("close");
                    queryClient.invalidateQueries(["projects", statusProject]);
                  }}
                  className={`${
                    statusProject == "open" ? "opacity-60" : ""
                  } font-semibold flex gap-1 items-center`}
                >
                  <FontAwesomeIcon icon={faFolderClosed} />
                  <span>{projects?.closeCount} Closed</span>
                </button>
              </div>

              {/* sort */}
              <div className="flex gap-1 items-center">
                <FontAwesomeIcon icon={faSort} />
                <span>Sort</span>
              </div>
            </div>
            {/* list project */}
            <div className="">
              {!isLoadingProject && projects.data.length > 0 ? (
                projects.data.map((project: any, index: number) => (
                  <Link
                    href={`projects/${project.project_id}`}
                    key={index}
                    className={`flex justify-between items-center hover:bg-emerald-200/30 p-4`}
                  >
                    {/* title & type */}
                    <div className="">
                      <div className="flex gap-3 mb-1">
                        <div className="flex gap-1">
                          <FontAwesomeIcon icon={faFolderOpen} />
                          <span className="font-semibold capitalize">
                            {project.project_name}
                          </span>
                        </div>

                        {/* label */}
                        <div
                          className={`badge ${
                            project.visibility == "public"
                              ? "border-purple-400 text-purple-400"
                              : "border-red-400 text-red-400"
                          } badge-outline rounded text-xs`}
                        >
                          {project.visibility}
                        </div>
                      </div>
                      {/* metadata */}
                      <span className="text-xs opacity-70">
                        #Created at {project.createdAt}
                      </span>
                    </div>

                    <button
                      onClick={() => handleCloseProject(project.project_id)}
                      className="btn btn-sm w-[8rem] text-xs flex items-center gap-1"
                    >
                      <FontAwesomeIcon icon={faFolderClosed} />
                      <span>
                        {statusProject == "close" ? "Open" : "Close"} Project
                      </span>
                    </button>
                  </Link>
                ))
              ) : (
                <div className="p-4 pb-6">
                  <span className="flex flex-col gap-3 justify-center items-center opacity-75">
                    <FontAwesomeIcon icon={faBoxArchive} size="xl" />
                    <span>
                      Project with Status{" "}
                      {statusProject == "close" ? "Close" : "Open"} is Empty
                    </span>
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* pagination */}
          <Pagination
            page={+projects?.page}
            totalPages={+projects?.totalPages}
            totalData={+projects?.total}
            total={+projects?.data?.length}
            onPageChange={(newPage) => {
              localStorage.setItem("page", String(newPage));
              queryClient.invalidateQueries(["projects"]);
            }}
          />
        </div>
        {/* profile team */}
        <div className="">
          <div className="flex-1 p-3 rounded bg-white mb-4">
            {/* image team */}
            <div className="w-full h-[19rem] rounded bg-slate-500 overflow-hidden flex item">
              {!isLoadingTeam ? (
                <Image
                  src={
                    newImagePath == ""
                      ? team?.image == "" || team?.image == undefined
                        ? loadTeamImage(team?.team_name, 304)
                        : formatImage(team?.image, "teams/images")
                      : newImagePath
                  }
                  width={"334"}
                  height={"304"}
                  alt="avatar"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="loading loading-dots loading-sm"></span>
                </div>
              )}
            </div>
          </div>
          {/* info & action */}
          <div className="flex flex-col gap-4 items-end">
            {/* info */}
            <div className="">
              <span className="text-2xl font-semibold block mb-2 capitalize">
                {team?.team_name}
              </span>
              <span className="text-wrap text-end block">
                {team?.description}
              </span>
            </div>

            {/* actions */}
            <Link
              href={""}
              className="w-full p-2 rounded btn btn-accent btn-sm"
            >
              Edit Team
            </Link>

            {/* metadata */}
            <div className="flex items-center">
              <div className="flex items-center gap-1">
                <FontAwesomeIcon icon={faUsersLine} />
                <span>
                  <span className="font-semibold">
                    {team?.userTeams?.length}
                  </span>{" "}
                  Member
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
