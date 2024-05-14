"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  faBoxesStacked,
  faCalendarDays,
  faChevronDown,
  faChevronUp,
  faFolderOpen,
  faGauge,
  faGear,
  faSitemap,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const routes = [
  {
    label: "Dashboard",
    icon: faGauge,
    href: "/dashboard",
  },
  {
    label: "Teams",
    icon: faSitemap,
    href: "/teams",
  },
  {
    label: "Projects",
    icon: faBoxesStacked,
    href: "/projects",
  },
  {
    label: "Members",
    icon: faUsers,
    href: "/member",
  },
  {
    label: "Schadule",
    icon: faCalendarDays,
    href: "/schadule",
  },
  {
    label: "File Sharing",
    icon: faFolderOpen,
    href: "/files",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="2xl:w-[15%] lg:w-[20%] sticky h-fit top-0 left-0 py-6 min-h-screen border rounded-md m-2 flex flex-col gap-16 justify-between shadow ">
      {/* menu top */}
      <div className="">
        <div className="px-4 mb-6">
          <div className="flex flex-col items-center gap-4 w-full px-4 mb-4">
            <Image
              src={"/logo-3.png"}
              alt="logo team sync"
              width={146}
              height={35}
            />
          </div>
          <hr className="h-[1px] bg-slate-500/50" />
        </div>
        {/* teams */}
        <div className="px-4 mb-6">
          <div className="rounded bg-primary/10 text-slate-900 border border-slate-500/20 p-2 flex justify-between items-center cursor-pointer hover:opacity-70 transition-all duration-150">
            <div className="flex gap-2 items-center">
              <div className="w-[26px] h-[26px] rounded-md border overflow-hidden flex justify-center items-center">
                <Image
                  src={"/logo-1.png"}
                  alt="logo team"
                  width={25}
                  height={100}
                ></Image>
              </div>
              <h2 className="text-sm font-semibold">Team Sync</h2>
            </div>

            <div className="flex flex-col items-center">
              <FontAwesomeIcon icon={faChevronUp} size="2xs" />
              <FontAwesomeIcon icon={faChevronDown} size="2xs" />
            </div>
          </div>
        </div>
        {/* list menu */}
        <div className="flex flex-col gap-2 text-slate-500">
          {routes.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className={`px-6 flex gap-3 items-center py-3 transition-all duration-150 ease-in ${
                pathname == route.href
                  ? " border-l-2 bg-primary/5 border-primary text-primary"
                  : ""
              }`}
            >
              <FontAwesomeIcon icon={route.icon} />
              <span className="">{route.label}</span>
            </Link>
          ))}
        </div>
      </div>
      {/* menu bottom */}
      <div className="">
        <div className="px-4 mb-4 text-sm">
          <div className="border rounded-md p-3">
            <div className="mb-3">
              <h2 className="font-semibold block">Progress</h2>
              <span className="text-xs opacity-75">
                For free use, complete all the tasks provided bu the promotion.
              </span>
            </div>
            <div className="w-full text-xs">
              <div className="flex justify-between opacity-75">
                <span>Progess</span>
                <span>70%</span>
              </div>
              <progress
                className="progress progress-secondary w-full"
                value="70"
                max="100"
              ></progress>
            </div>
          </div>
        </div>
        <div className="px-6 flex flex-col gap-2 text-slate-500 mb-1">
          <Link
            href={"/settigs"}
            className={`flex gap-3 items-center py-3 transition-all duration-150 ease-in ${
              pathname == "/settings"
                ? " border-l-2 bg-primary/5 border-primary text-primary"
                : ""
            }`}
          >
            <FontAwesomeIcon icon={faGear} />
            <span className="">Settings</span>
          </Link>
        </div>
        <hr className="h-[1px] mx-4 bg-slate-500/50 mb-3" />
        <div className="px-4">
          <div className="rounded bg-primary/10 text-slate-900 border border-slate-500/20 p-2 flex justify-between items-center cursor-pointer hover:opacity-70 transition-all duration-150">
            <div className="flex gap-2 items-center">
              <div className="w-[26px] h-[26px] rounded-md border overflow-hidden flex justify-center items-center">
                <Image
                  src={"/logo-1.png"}
                  alt="logo team"
                  width={25}
                  height={100}
                ></Image>
              </div>
              <h2 className="text-sm font-semibold">Team Sync</h2>
            </div>

            <div className="flex flex-col items-center">
              <FontAwesomeIcon icon={faChevronUp} size="2xs" />
              <FontAwesomeIcon icon={faChevronDown} size="2xs" />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
