"use client";

import { faHouse, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@/app/stores/userStore";
import { InputComponent } from "@/app/components/formComponent";
import { formatAvatarImage, loadAvatarImage } from "@/app/utils/common/image";
import { useMutation } from "react-query";
import { axiosWithAuth } from "@/app/utils/axiosInstance";
import { toast } from "react-toastify";
import queryClient from "@/app/utils/queryClient";

export default function Page() {
  const user = useUser();
  const [newImagePath, setNewImagePath] = useState("");
  const [image, setImage] = useState(null);

  const [fullname, setFullname] = useState(user.fullname);
  const [email, setEmail] = useState(user.email);
  const [username, setUsername] = useState(user.username);

  const handleAvatarChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setNewImagePath(objectUrl);
      setImage(file);
    }
  };

  const updateAvatar = (file: any) => {
    const formData = new FormData();
    formData.append("avatar", file);

    return axiosWithAuth
      .patch("user/avatar", formData)
      .then(({ data }) => {
        toast.success("Successfully update avatar");
        queryClient.invalidateQueries(["profile"]);
      })
      .catch((error) => toast.error("Failed to update"));
  };

  const updateProfile = (payload: any) => {
    return axiosWithAuth
      .patch("user", payload)
      .then(() => {
        toast.success("Successfully update avatar");
        queryClient.invalidateQueries(["profile"]);
      })
      .catch((error) => toast.error("Failed to update"));
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: updateAvatar,
  });

  const { mutate: mutateUpdateProfile, isLoading: isLoadingUpdateProfile } =
    useMutation({
      mutationFn: updateProfile,
    });

  const handleUpdateAvatar = () => {
    mutate(image);
  };

  const handleUpdateProfile = () => {
    let payload = { fullname, email, username };
    mutateUpdateProfile(payload);
  };

  return (
    <div className="w-full">
      <div className="relative">
        {/* header */}
        <div className="sticky inset-0 flex justify-between items-center mb-3 bg-white shadow-md p-4 rounded-md z-40">
          <div className="mb-5">
            <h1 className="text-xl font-semibold mb-1">Account Settings</h1>
            <span className="block text-sm">
              Update your photo and personal details here
            </span>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleUpdateProfile}
              disabled={isLoadingUpdateProfile}
              className={`btn btn-sm btn-primary rounded w-[7rem] ${
                isLoadingUpdateProfile ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              {isLoadingUpdateProfile ? (
                <span className="loading loading-dots loading-xs"></span>
              ) : (
                <span>Save</span>
              )}
            </button>
          </div>
        </div>

        {/* content */}
        <div className="flex gap-4 relative">
          {/* content setting */}
          <div className="2xl:w-[75%] xl:w-[79%] flex gap-4">
            <div className="w-[58%] 2xl:w-[70%]">
              {/* personal information */}
              <div className="rounded-md border shadow-sm bg-primary-content mb-4">
                {/* sub header */}
                <div className="p-5 font-semibold w-full border-b">
                  My profile{" "}
                  <span
                    id="my-profile-section"
                    className="text-emerald-600 font-semibold"
                  >
                    #
                  </span>
                </div>

                {/* personal information */}
                <div className="">
                  <div className="px-5 pt-5 font-semibold w-full">
                    Personal Information{" "}
                    <span
                      id="personal-information-section"
                      className="text-emerald-600 font-semibold"
                    >
                      #
                    </span>
                  </div>

                  <div className="p-5">
                    <label className="form-control w-full mb-2">
                      <div className="label">
                        <span className="label-text">Fullname</span>
                      </div>
                      <InputComponent
                        type={"text"}
                        value={fullname}
                        onChangeState={(e: any) => setFullname(e.target.value)}
                      />
                    </label>
                    <label className="form-control w-full mb-2">
                      <div className="label">
                        <span className="label-text">Email Address</span>
                      </div>
                      <InputComponent
                        type={"text"}
                        value={email}
                        onChangeState={(e: any) => setEmail(e.target.value)}
                      />
                    </label>
                    <label className="form-control w-full mb-2">
                      <div className="label">
                        <span className="label-text">Username</span>
                      </div>
                      <InputComponent
                        type={"text"}
                        value={username}
                        onChangeState={(e: any) => setUsername(e.target.value)}
                      />
                    </label>
                    <label className="form-control w-full mb-2 hidden">
                      <div className="label">
                        <span className="label-text">Timezone</span>
                      </div>
                      <select className="select select-bordered rounded-md w-full">
                        <option disabled selected>
                          Who shot first?
                        </option>
                        <option>Han Solo</option>
                        <option>Greedo</option>
                      </select>
                    </label>
                  </div>
                </div>

                {/* Address */}
                <div className="hidden">
                  {/* sub header */}
                  <div className="px-5 pt-5 font-semibold w-full border-t">
                    Address{" "}
                    <span
                      id="address-section"
                      className="text-emerald-600 font-semibold"
                    >
                      #
                    </span>
                  </div>

                  <div className="p-5">
                    <label className="form-control w-full mb-2">
                      <div className="label">
                        <span className="label-text">Fullname</span>
                      </div>
                      <input
                        type="text"
                        placeholder="Type here"
                        className="input input-bordered rounded-md w-full"
                      />
                    </label>
                    <label className="form-control w-full mb-2">
                      <div className="label">
                        <span className="label-text">Email Address</span>
                      </div>
                      <input
                        type="text"
                        placeholder="Type here"
                        className="input input-bordered rounded-md w-full"
                      />
                    </label>
                    <label className="form-control w-full mb-2">
                      <div className="label">
                        <span className="label-text">Username</span>
                      </div>
                      <input
                        type="text"
                        placeholder="Type here"
                        className="input input-bordered rounded-md w-full grow"
                      />
                    </label>
                    <label className="form-control w-full mb-2">
                      <div className="label">
                        <span className="label-text">Timezone</span>
                      </div>
                      <select className="select select-bordered rounded-md w-full">
                        <option disabled selected>
                          Who shot first?
                        </option>
                        <option>Han Solo</option>
                        <option>Greedo</option>
                      </select>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1">
              {/* update photo */}
              <div className="rounded-md border shadow-sm bg-primary-content w-full mb-4">
                {/* sub header */}
                <div className="p-5 font-semibold w-full border-b">
                  Your Photo
                </div>

                <div className="p-5">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="avatar">
                      <div
                        role="button"
                        className="w-14 hover:opacity-70 transition duration-100 rounded border-2"
                      >
                        <Image
                          src={
                            newImagePath == ""
                              ? user.avatar == ""
                                ? loadAvatarImage(user, 56)
                                : formatAvatarImage(user.avatar)
                              : newImagePath
                          }
                          width={"56"}
                          height={"56"}
                          alt="avatar"
                        />
                      </div>
                    </div>
                    <div className="">
                      <h3 className="font-semibold mb-2">Edit your photo</h3>
                      <div className="flex text-xs gap-3">
                        <button className="text-red-600 hover:opacity-70">
                          Delete
                        </button>
                        <button
                          onClick={handleUpdateAvatar}
                          disabled={newImagePath == ""}
                          className={`${
                            newImagePath == ""
                              ? "opacity-45 cursor-not-allowed"
                              : "text-emerald-600 hover:opacity-70"
                          }`}
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </div>

                  <input
                    type="file"
                    className="hidden"
                    id="avatar-input"
                    disabled={isLoading}
                    onChange={handleAvatarChange}
                  />
                  <label
                    htmlFor="avatar-input"
                    className={`w-full border-2 border-dashed rounded-md p-5 flex justify-center items-center hover:bg-emerald-200/50 hover:border-emerald-500 transition duration-150 h-[161px] ${
                      isLoading
                        ? "cursor-not-allowed opacity-45"
                        : "cursor-pointer"
                    }`}
                  >
                    {!isLoading ? (
                      <div className="text-sm flex flex-col gap-4 items-center">
                        <FontAwesomeIcon icon={faUpload} size="lg" />
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-center xl:mb-2 2xl:mb-0">
                            <span className="text-emerald-600">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </span>
                          <span className="text-xs">SVG, PNG, JPG, or GIF</span>
                          <span className="text-xs text-slate-500">
                            (max. 800x400px)
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-center items-center">
                        <span className="loading loading-dots loading-sm"></span>
                      </div>
                    )}
                  </label>
                </div>
              </div>
              <div className="rounded-md border shadow-sm bg-primary-content p-5">
                <div className="flex justify-between mb-3">
                  <Image
                    src="/logo_type_google_icon.svg"
                    alt="Google Logo"
                    width={80}
                    height={20}
                    priority
                  />
                  <button className="btn btn-danger btn-sm rounded-md ">
                    Connecting
                  </button>
                </div>

                <span className="text-sm">
                  Use Google to sign in to you accout.{" "}
                  <Link className="text-emerald-600" href="#">
                    Click here to learn more
                  </Link>
                </span>
              </div>
            </div>
          </div>
          {/* outline sidebar */}
          <div className="sticky top-32 right-0 flex-1 xl:text-xs 2xl:text-sm rounded-md border shadow-md bg-primary-content h-fit">
            {/* sub header */}
            <div className="p-3 2xl:p-5 font-semibold w-full border-b">
              Outline
            </div>

            <div className="p-3 2xl:p-5">
              {/* General Settings */}
              <div className="mb-4">
                <div className="flex gap-4 items-center text-slate-900 mb-4">
                  <FontAwesomeIcon icon={faHouse} />
                  <h4 className="text-start">My Profile</h4>
                </div>
                {/* list sub menu */}
                <div className="ml-[30px] 2xl:ml-[34px] flex flex-col opacity-70 gap-4">
                  <a href="#">Personal Information</a>
                  <a href="#">Address</a>
                </div>
              </div>
              {/* Personal Settings */}
              <div className="hidden">
                <div className="flex gap-4 items-center text-slate-900 mb-4">
                  <FontAwesomeIcon icon={faHouse} />
                  <h4>Personal Settings</h4>
                </div>
                {/* list sub menu */}
                <div className="ml-[30px] 2xl:ml-[34px] flex flex-col opacity-70 gap-4">
                  <a href="#">Notification</a>
                  <a href="#">Languages</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
