"use client";

import PieCount from "@/app/components/dashboard/PieCount";
import {
  faCalendar,
  faEllipsisVertical,
  faGauge,
  faGaugeSimple,
  faPeopleGroup,
  faRocket,
  faSitemap,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Chart, ArcElement, ChartOptions } from "chart.js";
import { Doughnut, Pie } from "react-chartjs-2";

const matrix_1 = [
  {
    name: "team",
    icon: faPeopleGroup,
    label: "Total Team",
    value: "5 Team",
  },
  {
    name: "member",
    icon: faUserGroup,
    label: "Total Member",
    value: "5 Member  ",
  },
  {
    name: "avg",
    icon: faGaugeSimple,
    label: "Avg. Access Time",
    value: "5 Minutes",
  },
];

const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5],
      backgroundColor: [
        "rgb(40,110,106)",
        "rgb(123,205,200)",
        "rgb(67,184,177)",
        "rgb(54,147,142)",
      ],
    },
  ],
};

const textCenter = {
  id: "textCenter",
  beforeDraw: function (chart: any) {
    const { ctx, data } = chart;

    ctx.save();
    ctx.font = "bolder 24px sans-serif";
    // ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const centerX = (chart.chartArea.left + chart.chartArea.right) / 2 - 4;
    const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
    ctx.fillText("Test", centerX, centerY);
  },
};

export default function Page() {
  const [clientSide, setClientSide] = useState(false);
  const chartRef = useRef(null);

  useEffect(() => {
    setClientSide(true);
  }, []);

  if (!clientSide) {
    return null;
  }

  Chart.register(ArcElement);

  return (
    <div className="w-full px-8 flex gap-6">
      {/* content-1 */}
      <div className="w-[70%]">
        {/* header content-1 */}
        <div className="flex justify-between">
          <div className="flex items-center gap-4 mb-8 text-slate-600">
            <FontAwesomeIcon icon={faGauge} size="lg" />
            <h1 className="text-xl font-semibold">Dashboard</h1>
          </div>
          <div className="avatar-group -space-x-5 rtl:space-x-reverse h-fit">
            <div className="avatar">
              <div className="w-8 rounded">
                <Image
                  src={
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  }
                  alt="avatar"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
            <div className="avatar placeholder">
              <div className="w-8 bg-neutral text-neutral-content">
                <span>+99</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-1 grid grid-cols-1 gap-3 ">
            {matrix_1.map((data_) => (
              <div
                key={data_.name}
                className="p-3 border rounded-md flex gap-6"
              >
                <div className="w-12 h-12 rounded-full flex justify-center items-center bg-emerald-400/30">
                  <FontAwesomeIcon icon={data_.icon} />
                </div>
                <div>
                  <span className="text-xs">{data_.label}</span>
                  <h3 className="text-lg font-semibold">{data_.value}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className="col-span-1 border rounded-md flex flex-col items-center gap-4 p-4">
            <div className="w-full h-full">
              <Doughnut
                ref={chartRef}
                data={data}
                width={100}
                height={50}
                options={{
                  maintainAspectRatio: false,
                  cutout: 65,
                }}
                plugins={[textCenter]}
              />
            </div>

            <div className="grid grid-cols-2 gap-2 gap-x-6 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-md bg-[#286E6A]"></div>
                <span>40 Total Tasks</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-md bg-[#7BCDC8]"></div>
                <span>40 Total Tasks Completed</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-md bg-[#43B8B1]"></div>
                <span>40 Total Tasks Uncompleted</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-md bg-[#36938E]"></div>
                <span>40 Total Tasks Uncompleted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* content-2 */}
      <div className="flex-1">
        {/* recent activity */}
        <div className="border rounded-md h-[25rem] p-5 mb-4">
          {/* header */}
          <div className="mb-6 flex justify-between items-center">
            <h3 className="font-semibold text-lg">Recent Activity</h3>
            <FontAwesomeIcon
              className="text-slate-500 cursor-pointer hover:opacity-70 transition-all duration-150"
              icon={faEllipsisVertical}
            />
          </div>
          {/* list activity */}
          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-6">
              {/* icon */}
              <div className="p-2 rounded-md bg-emerald-200 bg-opacity-50 flex items-center justify-center">
                <FontAwesomeIcon
                  className="text-emerald-700"
                  size="xl"
                  icon={faRocket}
                />
              </div>
              <div>
                <div className="mb-2">
                  <span className="font-semibold mr-1 underline">Cozy</span>
                  <span className="mr-1">just finish</span>
                  <span className="font-semibold text-emerald-900">
                    Feature login
                  </span>
                </div>
                <div className="flex gap-2 items-center opacity-50 text-sm">
                  <FontAwesomeIcon icon={faCalendar} />
                  <span>May 13, 2021 - 01:00PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* chat */}
        <div className="border rounded-md p-5">
          {/* header */}
          <div className="mb-6 flex justify-between items-center">
            <h3 className="font-semibold text-lg">Live Chat</h3>

            <div className="flex gap-4 items-center">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <span className="text-sm opacity-75">9/15 Online</span>
              <FontAwesomeIcon
                className="text-slate-500 cursor-pointer hover:opacity-70 transition-all duration-150"
                icon={faEllipsisVertical}
              />
            </div>
          </div>
          {/* list activity */}
          <div className="rounded-md p-2 h-[22rem] pb-14 w-full bg-emerald-100 bg-opacity-15 border relative">
            <div className="h-full overflow-auto">
              <div className="h-full w-full">
                {/* list chat */}
                {[1, 2, 3, 4, 5, 6].map((data, index) => (
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
              <div className="absolute bottom-0 left-0 w-full p-1">
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
      </div>
    </div>
  );
}
