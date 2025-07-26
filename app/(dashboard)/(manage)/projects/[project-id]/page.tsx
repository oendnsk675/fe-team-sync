"use client";

import Drawer from "@/app/components/projects/drawer";
import Board from "@/app/components/projects/kanban/board";
import { useDrawer, usePereferenceActions } from "@/app/stores/preferenceStore";
import {
  faCaretDown,
  faClipboardList,
  faCog,
  faLock,
  faTableColumns,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function DetailProject() {
  const [activeTab, setActiveTab] = useState("backlog");

  const drawer = useDrawer();
  const { setDrawer } = usePereferenceActions();

  useEffect(() => {
    let drawerIsCollapse = localStorage.getItem("drawerIsCollapse");
    if (drawerIsCollapse == "true") {
      setDrawer(true);
    } else {
      setDrawer(false);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("drawerIsCollapse", "false");
    setDrawer(false);
  };

  return (
    <div className="overflow-hidden flex-1 flex flex-col">
      {/* haeder */}
      <div className="flex justify-between mb-4">
        {/* title project */}
        <div className="flex gap-2 items-center">
          <FontAwesomeIcon icon={faLock} />
          <h2 className="text-xl capitalize font-semibold">Title</h2>
        </div>
        <div className=""></div>
      </div>

      {/* nav tab */}
      <div className="bg-primary-content flex-1 max-h-full overflow-hidden flex flex-col">
        <div role="tablist" className="tabs tabs-lifted bg-base-200 flex">
          <div
            role="tab"
            className={`tab h-fit w-fit !py-2 ${
              activeTab === "backlog" ? "tab-active" : "bg-base-200"
            }`}
            onClick={() => setActiveTab("backlog")}
          >
            <div className="flex items-center gap-3">
              <div className="gap-2 flex items-center">
                <FontAwesomeIcon icon={faTableColumns} size="lg" />
                <span className="">Backlog</span>
              </div>
              {activeTab == "backlog" && (
                <button className="rounded border w-6 h-6 flex items-center justify-center bg-slate-300/20">
                  <FontAwesomeIcon icon={faCaretDown} />
                </button>
              )}
            </div>
          </div>
          {/* Tab To-Do */}
          <div
            role="tab"
            className={`tab h-fit w-fit !py-2 ${
              activeTab === "todo" ? "tab-active" : "bg-base-200"
            }`}
            onClick={() => setActiveTab("todo")}
          >
            <div className="flex items-center gap-3">
              <div className="gap-2 flex items-center">
                <FontAwesomeIcon icon={faClipboardList} size="lg" />
                <span className="">To-Do</span>
              </div>
              {activeTab == "todo" && (
                <button className="rounded border w-6 h-6 flex items-center justify-center bg-slate-300/20">
                  <FontAwesomeIcon icon={faCaretDown} />
                </button>
              )}
            </div>
          </div>

          {/* Tab Settings */}
          <div
            role="tab"
            className={`tab h-fit w-fit !py-2 ${
              activeTab === "settings" ? "tab-active" : "bg-base-200"
            }`}
            onClick={() => setActiveTab("settings")}
          >
            <div className="flex items-center gap-3">
              <div className="gap-2 flex items-center">
                <FontAwesomeIcon icon={faCog} size="lg" />
                <span className="">Settings</span>
              </div>
              {activeTab == "settings" && (
                <button className="rounded border w-6 h-6 flex items-center justify-center bg-slate-300/20">
                  <FontAwesomeIcon icon={faCaretDown} />
                </button>
              )}
            </div>
          </div>
        </div>
        {/* Conten Tab */}
        <div className="p-6 max-h-[95%] overflow-hidden flex-1 flex flex-col relative">
          {activeTab === "backlog" && <Board />}
          {activeTab === "todo" && <div>To-Do Content</div>}
          {activeTab === "settings" && <div>Settings Content</div>}
        </div>
      </div>

      {/* <div className="w-full h-[2rem] bg-red-500">s</div> */}
      <Drawer isOpen={drawer} onClose={handleClose} />
    </div>
  );
}
