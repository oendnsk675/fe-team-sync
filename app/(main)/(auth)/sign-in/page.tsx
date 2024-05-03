import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="w-full flex justify-center lg:mt-[4rem] 2xl:mt-[6rem]">
      <div className="rounded bg-white shadow 2xl:w-[30%] lg:w-[40%] p-4">
        <div className="w-full flex flex-col items-center gap-6 p-3 mb-3">
          <Image
            src="/logo-1.png"
            alt="Next.js Logo"
            width={40}
            height={40}
            priority
          />
          <div className="w-[75%]">
            <h3 className="text-xl font-semibold text-center">
              Welcome to Team Sync App
            </h3>
            <span className="opacity-75 block text-center text-xs mt-1">
              Time to align your team&apos;s synergy? Let&apos;s quickly get you
              logged in!
            </span>
          </div>
        </div>

        <form action="" className="flex flex-col gap-4 mb-4">
          <div className="input input-bordered rounded-md flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input type="text" className="grow" placeholder="Username" />
          </div>
          <div className="input input-bordered rounded-md flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input type="text" className="grow" placeholder="Password" />
          </div>
          <button className="btn btn-primary rounded-md btn-md hover:opacity-75">
            Sign In
          </button>
        </form>
        <div className="w-full">
          <div className="divider">OR</div>
          <button className="btn btn-primary btn-outline rounded-md w-full btn-md">
            <Image
              src={"/google_icon.png"}
              alt="google icon"
              width={20}
              height={20}
            />
            <span>Sign In With Google</span>
          </button>

          <span className="text-sm w-full flex justify-center mt-4">
            New to Team Sync App?{" "}
            <Link
              href={"/sign-up"}
              className="mx-1 text-[#1DB88E] hover:opacity-75 transition-all duration-150"
            >
              Sign Up
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
