"use client";

import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "@/app/components/modal";
import React, { useState } from "react";

export default function Page() {
  const [stateModal, setStateModal] = useState(false);

  return (
    <div className="w-full px-8">
      {/* headerr */}
      <div className="flex items-center gap-4 mb-16 text-slate-600">
        <FontAwesomeIcon icon={faUsers} size="lg" />
        <h1 className="text-xl font-semibold">Teams</h1>
      </div>

      {/* data Control */}
      <div className="w-full flex justify-end gap-4 mb-4">
        <button
          onClick={() => setStateModal(true)}
          className="btn btn-primary  rounded-md px-12"
        >
          Invite
        </button>
        <button className="btn btn-error  rounded-md px-4">Delete</button>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src="https://img.daisyui.com/tailwind-css-component-profile-2@56w.png"
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">Hart Hagerty</div>
                    <div className="text-sm opacity-50">United States</div>
                  </div>
                </div>
              </td>
              <td>
                Zemlak, Daniel and Leannon
                <br />
                <span className="badge badge-ghost badge-sm">
                  Desktop Support Technician
                </span>
              </td>
              <td>Purple</td>
              <th className="flex flex-col items-center">
                <button className="btn btn-ghost btn-sm block mb-1 border border-slate-400">
                  details
                </button>
                <button className="btn btn-warning btn-sm border border-slate-400">
                  Delete
                </button>
              </th>
            </tr>
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
      <Modal open={stateModal} close={(state) => setStateModal(state)}>
        <form method="dialog" className="modal-backdrop">
          {/* if there is a button in form, it will close the modal */}
          <button
            onClick={() => setStateModal(false)}
            className="btn btn-sm text-primary btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg text-center mb-8">
          Invite a member to your team
        </h3>
        <form className="w-full">
          <label htmlFor="username" className="text-sm opacity-75 mb-1 block">
            Search by username
          </label>
          <div className="relative">
            <input
              id="username"
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full pr-20 focus:outline-none focus:border-emerald-600"
            />
            <button className="h-full absolute right-0 top-0 btn btn-primary">
              Invite
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
