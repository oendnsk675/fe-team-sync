'use client';

import { useTaskActions } from '@/app/stores/taskStore';
import { axiosWithAuth } from '@/app/utils/axiosInstance';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useQuery } from 'react-query';
import Column from './column';

const DEFAULT_CARDS = [
  // BACKLOG
  { title: 'Look into render bug in dashboard', id: '1', column: 'backlog' },
  { title: 'SOX compliance checklist', id: '2', column: 'backlog' },
  { title: '[SPIKE] Migrate to Azure', id: '3', column: 'backlog' },
  { title: 'Document Notifications service', id: '4', column: 'backlog' },
  // TODO
  {
    title: 'Research DB options for new microservice',
    id: '5',
    column: 'todo',
  },
  { title: 'Postmortem for outage', id: '6', column: 'todo' },
  { title: 'Sync with product on Q3 roadmap', id: '7', column: 'todo' },

  // DOING
  {
    title: 'Refactor context providers to use Zustand',
    id: '8',
    column: 'doing',
  },
  { title: 'Add logging to daily CRON', id: '9', column: 'doing' },
  // DONE
  {
    title: 'Set up DD dashboards for Lambda listener',
    id: '10',
    column: 'done',
  },
];

export default function Board() {
  const [cards, setCards] = useState([]);
  const { setTask } = useTaskActions();
  const { 'project-id': project_id } = useParams();

  const fetchData = async () => {
    return await axiosWithAuth
      .get(`/project/${project_id}/tasks`)
      .then(({ data }) => data.data)
      .catch();
  };

  const { data, isLoading } = useQuery('taskKey', fetchData, {
    onSuccess: (data: any) => {
      let taskId = localStorage.getItem('taskIdSelected');
      let task = data.filter(
        (data_: any) => String(data_.taskId) == String(taskId)
      );
      // alert();
      if (task) {
        setTask(task[0]);
      }
      setCards(data);
    },
  });

  let columns = [
    {
      id: Math.random().toString(),
      title: 'Backlog',
      column: 'backlog',
      headingColor: 'text-neutral-500',
    },
    {
      id: Math.random().toString(),
      title: 'Todo',
      column: 'todo',
      headingColor: 'text-yellow-500',
    },
    {
      id: Math.random().toString(),
      title: 'In progress',
      column: 'doing',
      headingColor: 'text-blue-500',
    },
    {
      id: Math.random().toString(),
      title: 'Complete',
      column: 'done',
      headingColor: 'text-emerald-500',
    },
  ];

  return (
    <div
      className={`grid grid-cols-${columns.length} flex-1 max-h-full w-full gap-2`}
    >
      {columns.map((clm, index) => (
        <Column
          key={index}
          title={clm.title}
          column={clm.column}
          headingColor={clm.headingColor}
          cards={cards}
          setCards={setCards}
        />
      ))}
    </div>
  );
}
