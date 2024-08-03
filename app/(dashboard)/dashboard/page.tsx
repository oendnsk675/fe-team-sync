"use client";

import {
  faCalendar,
  faEllipsisVertical,
  faGauge,
  faGaugeSimple,
  faPeopleGroup,
  faRocket,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Chart, ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { axiosWithAuth } from "@/app/utils/axiosInstance";
import { useQuery } from "react-query";
import useWebSocket from "@/app/hooks/useWebSocket";
import { formatTime } from "@/app/utils/common/date";
import { useRouter } from "next/navigation";
import moment from "moment";

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
  const [newMessage, setNewMessage] = useState<string>("");
  const [messages, setMessages] = useState<any>([]);
  const [hasMore, setHasMore] = useState(true);
  const [limit, setLimit] = useState(8);
  const [page, setPage] = useState(1);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const [rendered, setRendered] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  const [clientSide, setClientSide] = useState(false);
  const router = useRouter();
  const chartRef = useRef(null);
  const [team_id, setTeam_id] = useState(
    localStorage.getItem("instanceSelected")
  );

  useEffect(() => {
    const storedTeamId = localStorage.getItem("instanceSelected");
    setTeam_id(storedTeamId);

    if (!storedTeamId) {
      router.push("teams");
    }
  }, [router]);

  const fetchTotalTeam = () => {
    return axiosWithAuth
      .get("team/count")
      .then(({ data }) => data.data.total)
      .catch((error) => {});
  };

  const fetchTotalMember = () => {
    return axiosWithAuth
      .get(`team/${team_id}/member/count`)
      .then(({ data }) => data.data.total)
      .catch((error) => {});
  };

  const fetchDataTask = () => {
    return axiosWithAuth
      .get("task/count")
      .then(({ data }) => data.data)
      .catch((error) => {});
  };

  const fetchDataMessage = (page = 1, limit = 5) => {
    return axiosWithAuth
      .get(`chat/${team_id}?page=${page}&limit=${limit}`)
      .then(({ data }) => data.data)
      .catch((error) => {});
  };

  const fetchDataUserActive = () => {
    return axiosWithAuth
      .get(`team/user/active?team_id=${team_id}`)
      .then(({ data }) => data.data)
      .catch((error) => {});
  };

  const {
    data: totalTeam,
    isLoading: isLoadingTeam,
    isError: isErrorTeam,
  } = useQuery("totalTeam", fetchTotalTeam, { refetchOnWindowFocus: false });
  const {
    data: totalMember,
    isLoading: isLoadingMembers,
    isError: isErrorMembers,
  } = useQuery("totalMember", fetchTotalMember, {
    refetchOnWindowFocus: false,
  });
  const {
    data: dataTask,
    isLoading: isLoadingDataTask,
    isError: isErrorDataTask,
  } = useQuery("dataTask", fetchDataTask, { refetchOnWindowFocus: false });
  const {
    data: dataMessage,
    isLoading: isLoadingDataMessage,
    isError: isErrorDataMessage,
    isFetching,
  } = useQuery<string[], Error>(
    ["dataMessage", page, limit],
    () => fetchDataMessage(page, limit),
    {
      onSuccess: (newData) => {
        newData = newData.reverse();
        setMessages((prevMessages: any) => [...newData, ...prevMessages]);
        setHasMore(newData.length > 0);
        setRendered(true);
      },
      refetchOnWindowFocus: false,
    }
  );
  const {
    data: dataUserActive,
    isLoading: isLoadingDataUserActive,
    isError: isErrorDataUserActive,
  } = useQuery("dataUserActive", fetchDataUserActive, {
    refetchOnWindowFocus: false,
  });

  const { sendMessage, status } = useWebSocket({
    url: "http://localhost:3000",
    queryKey: "dataMessage",
  });

  const firstMessageElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isFetching || !rendered) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          // console.log("has change");
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isFetching, hasMore, rendered]
  );

  useLayoutEffect(() => {
    if (initialLoad && messages.length > 0) {
      chatEndRef?.current?.scrollIntoView({ behavior: "auto" });
      setInitialLoad(false); // Set to false after the first scroll
    }
  }, [messages, initialLoad]);

  const matrix_1 = [
    {
      name: "team",
      icon: faPeopleGroup,
      label: "Total Team",
      value: `${totalTeam} Team`,
    },
    {
      name: "member",
      icon: faUserGroup,
      label: "Total Member",
      value: `${totalMember} Member`,
    },
    {
      name: "avg",
      icon: faGaugeSimple,
      label: "Avg. Access Time",
      value: `${0} Minute`,
    },
  ];

  useEffect(() => {
    // queryClient.prefetchQuery("teamData", fetchTotalTeam);
    setClientSide(true);
  }, []);

  if (!clientSide) {
    return null;
  }

  Chart.register(ArcElement);

  return (
    <div className="w-full 2xl:px-8 xl:pl-4 xl:pr-2 flex gap-6 h-full">
      {/* content-1 */}
      <div className="xl:w-[65%] 2xl:w-[70%]">
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

        <div className="grid xl:grid-cols-3 2xl:grid-cols-2 gap-3">
          <div className="col-span-1 grid grid-cols-1 gap-3 ">
            {matrix_1.map((data_) => (
              <div
                key={data_.name}
                className="p-3 border rounded-md flex gap-6 bg-slate-50 shadow-sm"
              >
                <div className="w-12 h-12 rounded-full flex justify-center items-center bg-emerald-400/30">
                  <FontAwesomeIcon icon={data_.icon} />
                </div>
                <div>
                  <span className="text-xs">{data_.label}</span>
                  <h3 className="2xl:text-lg text-base font-semibold">
                    {data_.value}
                  </h3>
                </div>
              </div>
            ))}
          </div>
          <div className="xl:col-span-2 2xl:col-span-1 border rounded-md flex flex-col items-center gap-4 p-4 bg-slate-50 shadow-sm">
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

            <div className="grid grid-cols-2 gap-2 gap-x-6 2xl:text-sm xl:text-xs">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-md bg-[#286E6A]"></div>
                <span className="xl:text-xs 2xl:text-sm">
                  {dataTask?.totalTask} Total Tasks
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-md bg-[#7BCDC8]"></div>
                <span className="xl:text-xs 2xl:text-sm">
                  {dataTask?.totalTaskCompleted} Total Tasks Completed
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-md bg-[#43B8B1]"></div>
                <span className="xl:text-xs 2xl:text-sm">
                  {dataTask?.totalTaskUnCompleted} Total Tasks Uncompleted
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-md bg-[#36938E]"></div>
                <span className="xl:text-xs 2xl:text-sm">
                  {dataTask?.totalTaskUnCompleted} Total Tasks Uncompleted
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* content-2 */}
      <div className="flex-1 flex flex-col h-full">
        {/* recent activity */}
        <div className="border rounded-md 2xl:p-5 xl:p-3 mb-4 h-[40%] bg-slate-50 shadow-sm">
          {/* header */}
          <div className="mb-6 flex justify-between items-center">
            <h3 className="font-semibold 2xl:text-lg text-base">
              Recent Activity
            </h3>
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
        <div className="border rounded-md flex-1 h-[60%] flex flex-col bg-slate-50 shadow-sm">
          {/* header */}
          <div className="2xl:p-5 xl:p-3 flex justify-between items-center h-fit border-b">
            <h3 className="font-semibold text-lg">Live Chat</h3>

            <div className="flex gap-4 items-center">
              <div
                className={`w-2 h-2 rounded-full ${
                  status == "Connected"
                    ? "bg-emerald-500"
                    : status == "Failed to connect"
                    ? "bg-red-500"
                    : "bg-slate-500"
                }`}
              ></div>
              <span className="text-sm opacity-75">
                {dataUserActive?.totalUser} {"/"}
                {dataUserActive?.totalUserActive}{" "}
                {status == "Connected" ? "Online" : "Offline"}
              </span>
              <FontAwesomeIcon
                className="text-slate-500 cursor-pointer hover:opacity-70 transition-all duration-150"
                icon={faEllipsisVertical}
              />
            </div>
          </div>
          <div className="2xl:p-5 xl:p-3 pb-14 w-full bg-emerald-100 bg-opacity-15 border relative flex-1 overflow-hidden">
            <div className="max-h-full overflow-y-scroll w-scroll-3">
              {/* list chat */}
              {messages?.map((data: any, index: any) => (
                <div
                  ref={
                    index === messages.length - 1
                      ? chatEndRef
                      : index == 0
                      ? firstMessageElementRef
                      : null
                  }
                  key={index}
                  className={`${
                    index % 2 === 0 ? "chat chat-end" : "chat chat-start"
                  }`}
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
                    {data?.user?.fullname}
                    <time className="text-xs opacity-50 ml-1">
                      {moment(data?.createdAt).format("h:mm:ss")}
                    </time>
                  </div>
                  <div className="chat-bubble text-sm bg-[#286E6A]">
                    {data?.message}
                  </div>
                  <div className="chat-footer opacity-50 text-xs hidden">
                    Delivered
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bottom-0 left-0 w-full p-1">
            <div className="rounded-md w-full">
              <div className="relative w-full h-full">
                <input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered focus:outline-none focus:border-emerald-700 w-full rounded-md"
                />
                <div className="absolute top-0 right-2 h-full flex items-center">
                  <button
                    onClick={() => {
                      let parsingMessage = newMessage?.trim();

                      if (parsingMessage && team_id && parsingMessage != "") {
                        sendMessage(parsingMessage, +team_id);
                      }
                    }}
                    className="p-1.5 bg-[#286E6A] rounded-md"
                  >
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
