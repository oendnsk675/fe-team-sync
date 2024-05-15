import {
  faMagnifyingGlass,
  faMessage,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function Page() {
  return (
    <div className="w-full h-screen px-8 flex flex-col">
      {/* headerr */}
      <div className="flex justify-between mb-8">
        <div className="flex items-start gap-4 text-slate-600">
          <div className="avatar">
            <div className="w-14 rounded">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
          <div className="">
            <h1 className="text-xl font-semibold mb-1">Chat Room</h1>
            <div className="flex gap-1 items-center text-sm opacity-75">
              <span>Osyi,</span>
              <span>Ahmadal,</span>
              <span>Cozy</span>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="p-3 px-5 rounded bg-emerald-700 bg-opacity-10 flex justify-center items-center gap-3">
            <FontAwesomeIcon
              className="text-emerald-700"
              size="lg"
              icon={faVideo}
            />
            <span>Call Group</span>
          </button>
          <button className="p-3 px-5 rounded h-full bg-emerald-700 bg-opacity-10 flex justify-center items-center gap-3">
            <FontAwesomeIcon
              className="text-slate-700"
              icon={faMagnifyingGlass}
            />
            <span>Search</span>
          </button>
        </div>
      </div>

      {/* container chat */}
      <div className="rounded-lg overflow-hidden w-full h-[85%] bg-emerald-900 bg-opacity-10 pb-14 relative">
        <div className="h-full overflow-auto">
          <div className="h-full w-full p-4">
            {/* list chat */}
            {[1, 2, 3, 4, 5, 6, 1, 1, 1, 1, 1, 1].map((data, index) => (
              <div
                key={index}
                className={
                  index % 2 === 0 ? "chat chat-end" : "chat chat-start"
                }
              >
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    />
                  </div>
                </div>
                <div className="chat-header text-xs mr-2 mb-1">
                  Obi-Wan Kenobi
                  <time className="text-xs opacity-50">12:45</time>
                </div>
                <div className="chat-bubble text-sm bg-[#286E6A]">
                  You were the Chosen One!
                </div>
                <div className="chat-footer opacity-50 text-xs hidden">
                  Delivered
                </div>
              </div>
            ))}
          </div>
          <div className="absolute bottom-0 left-0 w-full p-1 bg-[#E6EDEB]">
            <div className="rounded-md w-full">
              <div className="relative w-full h-full">
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered focus:outline-none focus:border-emerald-700 w-full rounded-md"
                />
                <div className="absolute top-0 right-2 h-full flex items-center">
                  <button className="p-1.5 bg-[#286E6A] rounded-md">
                    <svg
                      className="fill-white"
                      width="24"
                      height="24"
                      viewBox="0 0 256 256"
                      id="Flat"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M231.626,128a16.015,16.015,0,0,1-8.18262,13.96094L54.53027,236.55273a15.87654,15.87654,0,0,1-18.14648-1.74023,15.87132,15.87132,0,0,1-4.74024-17.60156L60.64746,136H136a8,8,0,0,0,0-16H60.64746L31.64355,38.78906A16.00042,16.00042,0,0,1,54.5293,19.44727l168.915,94.59179A16.01613,16.01613,0,0,1,231.626,128Z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
