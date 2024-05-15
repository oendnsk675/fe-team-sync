import {
  faDisplay,
  faHandPointUp,
  faMicrophone,
  faPhone,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function Page() {
  return (
    <div className="w-full h-screen px-8 flex flex-col">
      <div className="mb-2">
        <h1 className="text-xl font-semibold">#team-sync</h1>
      </div>
      {/* container list user */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        {[1, 1, 1, 1, 1, 1, 1, 1].map((data, index) => (
          <div key={index} className="avatar">
            <div className="w-full rounded">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center">
        <div className="hidden">
          <h1 className="text-xl font-semibold mb-1">#team-sync</h1>
        </div>
        <div className="flex gap-3 items-center">
          <button className="hover:opacity-75 transition-all duration-150 bg-emerald-100 w-12 h-12 rounded-full flex justify-center items-center">
            <FontAwesomeIcon
              icon={faMicrophone}
              size="lg"
              className="text-slate-800"
            />
          </button>
          <button className="hover:opacity-75 transition-all duration-150 bg-emerald-100 w-12 h-12 rounded-full flex justify-center items-center">
            <FontAwesomeIcon
              icon={faVideo}
              size="lg"
              className="text-slate-800"
            />
          </button>
          <button className="hover:opacity-75 transition-all duration-150 bg-emerald-100 w-12 h-12 rounded-full flex justify-center items-center">
            <FontAwesomeIcon
              icon={faHandPointUp}
              size="lg"
              className="text-slate-800"
            />
          </button>
          <button className="hover:opacity-75 transition-all duration-150 bg-emerald-100 w-12 h-12 rounded-full flex justify-center items-center">
            <FontAwesomeIcon
              icon={faDisplay}
              size="lg"
              className="text-slate-800"
            />
          </button>
          <button className="hover:opacity-75 transition-all duration-150 bg-red-400 w-12 h-12 rounded-full flex justify-center items-center">
            <FontAwesomeIcon
              icon={faPhone}
              size="lg"
              className="text-slate-50"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
