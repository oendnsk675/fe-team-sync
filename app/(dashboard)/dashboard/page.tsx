'use client';

import MiniChat from '@/app/components/dashboard/mini-chat';
import { useUser } from '@/app/stores/userStore';
import { axiosWithAuth } from '@/app/utils/axiosInstance';
import {
  faCalendar,
  faEllipsisVertical,
  faGauge,
  faGaugeSimple,
  faPeopleGroup,
  faRocket,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ArcElement, Chart } from 'chart.js';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useQuery } from 'react-query';

const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5],
      backgroundColor: [
        'rgb(40,110,106)',
        'rgb(123,205,200)',
        'rgb(67,184,177)',
        'rgb(54,147,142)',
      ],
    },
  ],
};

const textCenter = {
  id: 'textCenter',
  beforeDraw: function (chart: any) {
    const { ctx, data } = chart;

    ctx.save();
    ctx.font = 'bolder 24px sans-serif';
    // ctx.fillStyle = "red";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const centerX = (chart.chartArea.left + chart.chartArea.right) / 2 - 4;
    const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
    ctx.fillText('Test', centerX, centerY);
  },
};

export default function Page() {
  const user = useUser();

  const chartRef = useRef(null);
  const [clientSide, setClientSide] = useState(false);
  const [teamId, setTeamId] = useState(
    localStorage.getItem('instanceSelected')
  );
  const router = useRouter();

  // TODO: Pindah ke layer authorization
  useEffect(() => {
    if (!teamId) {
      router.push('teams');
    }
  }, [router]);

  const fetchTotalTeam = () => {
    return axiosWithAuth
      .get('team/count')
      .then(({ data }) => data.data.total)
      .catch((error) => {});
  };

  const fetchTotalMember = (teamId: string | null) => {
    return axiosWithAuth
      .get(`team/${teamId}/member/count`)
      .then(({ data }) => data.data.total)
      .catch((error) => {});
  };

  const fetchDataTask = () => {
    return axiosWithAuth
      .get('task/count')
      .then(({ data }) => data.data)
      .catch((error) => {});
  };

  const {
    data: totalTeam,
    isLoading: isLoadingTeam,
    isError: isErrorTeam,
  } = useQuery('totalTeam', fetchTotalTeam, { refetchOnWindowFocus: false });
  const {
    data: totalMember,
    isLoading: isLoadingMembers,
    isError: isErrorMembers,
  } = useQuery(['totalMember', teamId], ({ queryKey }) =>
    fetchTotalMember(queryKey[1])
  );
  const {
    data: dataTask,
    isLoading: isLoadingDataTask,
    isError: isErrorDataTask,
  } = useQuery('dataTask', fetchDataTask, { refetchOnWindowFocus: false });

  const matrix_1 = [
    {
      name: 'team',
      icon: faPeopleGroup,
      label: 'Total Team',
      value: `${totalTeam} Team`,
    },
    {
      name: 'member',
      icon: faUserGroup,
      label: 'Total Member',
      value: `${totalMember} Member`,
    },
    {
      name: 'avg',
      icon: faGaugeSimple,
      label: 'Avg. Access Time',
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
                    'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'
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
        <MiniChat />
      </div>
    </div>
  );
}
