import { faHouse, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div className="w-full px-8 h-screen overflow-y-auto">
      <div className="">
        <div className="flex justify-between">
          <div className="mb-5">
            <h1 className="text-xl font-semibold mb-1">General Details</h1>
            <span className="block text-sm">
              Update your photo and personal details here
            </span>
          </div>
          <div className="flex gap-3">
            <button className="btn btn-warning rounded-md px-8">Cancel</button>
            <button className="btn btn-success rounded-md px-8">Save</button>
          </div>
        </div>
        <div className="flex gap-4">
          {/* content setting */}
          <div className="w-[75%] flex gap-4">
            <div className=" w-[70%]">
              {/* personal information */}
              <div className="rounded-md border shadow-sm bg-primary-content mb-4">
                {/* sub header */}
                <div className="p-5 font-semibold w-full border-b">
                  Personal Information
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
              {/* Billing */}
              <div className="rounded-md border shadow-sm bg-primary-content">
                {/* sub header */}
                <div className="p-5 font-semibold w-full border-b">Billing</div>

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
            <div className="flex-1">
              <div className="rounded-md border shadow-sm bg-primary-content w-full mb-4">
                {/* sub header */}
                <div className="p-5 font-semibold w-full border-b">
                  Your Photo
                </div>

                <div className="p-5">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="avatar">
                      <div className="w-14 rounded">
                        <img
                          src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                          alt="Tailwind-CSS-Avatar-component"
                        />
                      </div>
                    </div>
                    <div className="">
                      <h3 className="font-semibold mb-2">Edit your photo</h3>
                      <div className="flex text-xs gap-3">
                        <span className="text-slate-700">Delete</span>
                        <span className="text-emerald-600">Update</span>
                      </div>
                    </div>
                  </div>

                  <div className="w-full border-2 border-dashed rounded-md p-5 flex justify-center items-center">
                    <div className="text-sm flex flex-col gap-4 items-center">
                      <FontAwesomeIcon icon={faUpload} size="lg" />
                      <div className="flex flex-col items-center gap-1">
                        <span>
                          <span className="text-emerald-600">
                            Click to upload
                          </span>{" "}
                          or drag and drop
                        </span>
                        <span className="">SVG, PNG, JPG, or GIF</span>
                        <span className="text-xs">(max. 800x400px)</span>
                      </div>
                    </div>
                  </div>
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
          <div className="flex-1 rounded-md border shadow-sm bg-primary-content h-fit">
            {/* sub header */}
            <div className="p-5 font-semibold w-full border-b">Outline</div>

            <div className="p-5">
              {/* General Settings */}
              <div className="mb-4">
                <div className="flex gap-4 items-center text-slate-900 mb-4">
                  <FontAwesomeIcon icon={faHouse} />
                  <h4>General Settings</h4>
                </div>
                {/* list sub menu */}
                <div className="ml-[34px] flex flex-col opacity-70 gap-4">
                  <a href="#">General Details</a>
                  <a href="#">Billing</a>
                </div>
              </div>
              {/* Personal Settings */}
              <div className="">
                <div className="flex gap-4 items-center text-slate-900 mb-4">
                  <FontAwesomeIcon icon={faHouse} />
                  <h4>Personal Settings</h4>
                </div>
                {/* list sub menu */}
                <div className="ml-[34px] flex flex-col opacity-70 gap-4">
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
