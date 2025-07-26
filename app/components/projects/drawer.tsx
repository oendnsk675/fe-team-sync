import { useDrawer } from "@/app/stores/preferenceStore";
import { useTaskData } from "@/app/stores/taskStore";
import { axiosWithAuth } from "@/app/utils/axiosInstance";
import queryClient from "@/app/utils/queryClient";
import {
  faChevronRight,
  faGear,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePresence } from "framer-motion";
import moment from "moment";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import DropdownSearch from "../dropdownSearch";

let Editor = dynamic(() => import("../editor"), {
  ssr: false,
});

const headerDropdown = () => <></>;

const ButtonDropdown = ({ title }: { title: string }) => (
  <button
    role="button"
    tabIndex={0}
    className="w-full rounded hover:bg-slate-500/10 p-2 py-1 flex justify-between items-center"
  >
    <h3 className="font-semibold">{title}</h3>
    <FontAwesomeIcon icon={faGear} />
  </button>
);

const FooterDropdown = ({ text }: { text: string }) => (
  <button
    role="button"
    tabIndex={0}
    className="w-full rounded hover:bg-slate-500/10 p-2 flex justify-center items-center py-2 border-t"
  >
    <h3 className="font-semibold">{text}</h3>
  </button>
);

function Drawer({ isOpen, onClose }) {
  const task = useTaskData();
  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState(task?.title);

  useEffect(() => {
    if (task?.title) {
      setTitle(task.title); // Update title hanya ketika task tersedia
    }
  }, [task]);

  const handleSubmitTitle = async (taskId: number, title: string) => {
    return await axiosWithAuth
      .patch(`/task/${taskId}`, { title: title })
      .then(({ data }) => data.data)
      .catch();
  };

  const { isLoading: isLoadingTitle, mutate: mutateUpdateTitle } = useMutation({
    mutationKey: "updateTitle",
    mutationFn: ({ taskId, title }: any) => handleSubmitTitle(taskId, title),
    onSuccess(data, variables, context) {
      setIsEdit(false);
      queryClient.invalidateQueries(["taskKey"]);
      toast.success("Succesfully update title");
    },
  });

  const handleUpdateTitle = () => {
    mutateUpdateTitle({ taskId: task?.taskId, title });
  };

  return (
    <div className="drawer drawer-end">
      <input
        id="my-drawer"
        type="checkbox"
        checked={isOpen}
        className="drawer-toggle"
      />
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
          onClick={() => onClose()}
        ></label>
        <div className="menu bg-base-200 text-base-content h-screen overflow-hidden w-[80%] z-50 p-0 block">
          {/* head */}
          <div className="p-8 px-10 border-b-2 h-fit">
            {/* button close  */}
            <div className="flex justify-end mb-10">
              <button onClick={() => onClose()}>
                <FontAwesomeIcon icon={faXmark} size="xl" />
              </button>
            </div>

            {/* title */}
            <div className="flex items-center justify-between mb-3">
              <div className="w-1/2">
                {!isEdit && <h1 className="text-3xl">{title}</h1>}
                {isEdit && (
                  <input
                    type="text"
                    className="2xl:input-md bg-inherit border-b-2 w-full text-3xl"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                )}
              </div>
              <div className="flex gap-2 items-center">
                {isEdit && (
                  <>
                    <button
                      onClick={handleUpdateTitle}
                      className="btn bg-opacity-0 hover:bg-opacity-100 shadow-none"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setIsEdit(false)}
                      className="btn bg-black/10 shadow-none"
                    >
                      Cancel
                    </button>
                  </>
                )}
                {!isEdit && (
                  <button
                    onClick={() => setIsEdit(true)}
                    className="btn bg-opacity-0 hover:bg-opacity-100 shadow-none"
                  >
                    Edit title
                  </button>
                )}
              </div>
            </div>

            {/* status, creator, created date */}
            <div className="flex items-center gap-4">
              <div className="badge badge-neutral">Draft</div>

              <div className="">
                <span className="font-bold mr-1">Author</span>
                <span>
                  Updated on {moment(task?.updatedAt).startOf("hour").fromNow()}
                </span>
              </div>
            </div>
          </div>
          <div className="flex h-full">
            <div className="w-[65%] border-r-2 h-full max-h-full overflow-y-auto p-16 py-8">
              {/* body text */}
              <Editor />
            </div>
            <div className="flex-1 h-full">
              {/* assign */}
              <DropdownSearch
                ButtonDropdown={ButtonDropdown}
                title="Assignees"
                subTitle="Assign up to 10 user"
                emptyTitle="No Assign"
              />
              {/* Labels */}
              <DropdownSearch
                ButtonDropdown={ButtonDropdown}
                title="Labels"
                subTitle="Apply labels to this task"
                emptyTitle="No Label"
                FooterDropdown={FooterDropdown}
                textFooter="Edit Label"
              />
              {/* Dates */}
              <div className="border-b-2 mb-4 pb-2 p-2 pr-4 text-sm">
                <button className="w-full rounded hover:bg-slate-500/10 p-2 py-1 flex justify-between items-center">
                  <h3 className="font-semibold">Dates</h3>
                  <FontAwesomeIcon icon={faGear} />
                </button>
                <div className="max-h-24 overflow-y-auto mb-3 p-2 font-medium">
                  <span className="opacity-45 block mb-2">Start: </span>
                  <span className="opacity-45">End: </span>
                </div>
              </div>

              {/* actions */}
              <div className="p-2 pr-4">
                <button className="btn btn-sm w-full gap-3 btn-primary">
                  <span>Move</span>
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Drawer;
