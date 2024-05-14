import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="w-full flex flex-col items-center mt-4 px-28">
      <span className="opacity-75 mb-2">Tell us about your team</span>
      <h1 className="block text-3xl font-semibold mb-12">Set up your teams</h1>

      <div className="w-full mb-4">
        <label htmlFor="name" className="text-sm mb-2 block opacity-75">
          Organization name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Type here"
          className="input input-bordered input-md w-full rounded-md"
        />
      </div>
      <div className="w-full mb-4">
        <label htmlFor="name" className="text-sm mb-2 block opacity-75">
          Contact Email
        </label>
        <input
          id="name"
          type="email"
          placeholder="Type here"
          className="input input-bordered input-md w-full rounded-md"
        />
      </div>
      <div className="flex gap-3 items-start mb-6">
        <input type="checkbox" className="w-8 h-8 rounded-md" />
        <span className="text-sm">
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
        </span>
      </div>
      <button className="btn btn-primary w-full rounded-md">Create</button>
    </div>
  );
}
