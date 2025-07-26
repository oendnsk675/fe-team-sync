import React from "react";
import { motion } from "framer-motion";
import DropIndicator from "./dropIndicator";
import { usePereferenceActions } from "@/app/stores/preferenceStore";
import { useTaskActions } from "@/app/stores/taskStore";
import { useQuery } from "react-query";
import { axiosWithAuth } from "@/app/utils/axiosInstance";

export default function Card({ task, handleDragStart }) {
  const { setDrawer } = usePereferenceActions();
  const { setTask } = useTaskActions();

  const fetchData = async (taskId: any) => {
    return await axiosWithAuth
      .get(`/task/${taskId}`)
      .then(({ data }) => data.data)
      .catch();
  };

  const { data: detailTask, refetch } = useQuery(
    ["detailTask", task.taskId],
    () => fetchData(task.taskId),
    {
      enabled: false,
      onSuccess(data) {
        setTask(task);
      },
    }
  );

  const handleClick = () => {
    refetch();
    localStorage.setItem("taskIdSelected", task.taskId);
    localStorage.setItem("drawerIsCollapse", "true");
    setDrawer(true);
  };

  return (
    <>
      <DropIndicator beforeId={task.taskId} column={task.column} />
      <motion.div
        layout
        layoutId={task.taskId}
        draggable="true"
        onDragStart={(e) =>
          handleDragStart(e, {
            titla: task.title,
            taskId: task.taskId,
            column: task.column,
          })
        }
        className="cursor-grab rounded border flex-1 border-neutral-700 bg-neutral-300 p-3 active:cursor-grabbing"
      >
        <div className="flex justify-between">
          {/* left side */}
          <div className="flex flex-col gap-2">
            {/* task name */}
            <div
              className="hover:underline cursor-pointer"
              onClick={handleClick}
            >
              {task.title}
            </div>
            {/* priority */}
            <div className="badge badge-primary badge-outline text-white">
              P0
            </div>
          </div>
          {/* right side */}
          <div className="w-7 h-7 rounded-full bg-white overflow-hidden">
            {/* <Image /> */}
          </div>
        </div>
      </motion.div>
    </>
  );
}
