"use client";

import React, { useEffect, useRef, useState } from "react";
import Card from "./card";
import DropIndicator from "./dropIndicator";
import AddCard from "./addCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { axiosWithAuth } from "@/app/utils/axiosInstance";
import { useRouter } from "next/router";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import queryClient from "@/app/utils/queryClient";

export default function Column({
  title,
  column,
  headingColor,
  cards,
  setCards,
}) {
  const { "project-id": project_id } = useParams();

  const [active, setActive] = useState(false);
  const filteredCards = cards.filter((c) => c.column === column);

  const [typing, setTyping] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const inputRef = useRef(null);

  const handleDragStart = (e, card) => {
    e.dataTransfer.setData("cardId", card.taskId);
  };

  const handleDragEnd = (e) => {
    const cardId = e.dataTransfer.getData("cardId");

    setActive(false);
    clearHighlights();

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = element.dataset.before || "-1";

    if (before !== cardId) {
      let copy = [...cards];

      let cardToTransfer = copy.find((c) => c.taskId == cardId);

      if (!cardToTransfer) return;
      cardToTransfer = { ...cardToTransfer, column };

      copy = copy.filter((c) => c.taskId != cardId);

      mutateUpdateTask(cardToTransfer);

      const moveToBack = before == "-1";

      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => el.taskId == before);
        if (insertAtIndex == undefined) return;

        copy.splice(insertAtIndex, 0, cardToTransfer);
      }

      setCards(copy);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    highlightIndicator(e);

    setActive(true);
  };

  const handleDragLeave = () => {
    clearHighlights();
    setActive(false);
  };

  const highlightIndicator = (e) => {
    const indicators = getIndicators();

    clearHighlights(indicators);

    const el = getNearestIndicator(e, indicators);

    el.element.style.opacity = "1";
  };

  const clearHighlights = (els) => {
    const indicators = els || getIndicators();

    indicators.forEach((i) => {
      i.style.opacity = "0";
    });
  };

  const getNearestIndicator = (e, indicators) => {
    const DISTANCE_OFFSET = 50;

    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();

        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );

    return el;
  };

  const getIndicators = () => {
    return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
  };

  const saveNewTask = async (payload: any) => {
    await axiosWithAuth
      .post("/task", payload)
      .then(({ data }) => {
        return toast.success(data.message);
      })
      .catch((err) => {
        toast.error("failed to add task");
      });
  };

  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: saveNewTask,
    onSuccess: () => {
      queryClient.invalidateQueries("taskKey");
      // reset form input
      setNewTitle("");
    },
  });

  const updateTask = async ({ taskId, column }) => {
    await axiosWithAuth
      .patch(`/task/${taskId}`, { column })
      .then(({ data }) => {
        return toast.success(data.message);
      })
      .catch((err) => {
        toast.error("failed to update task");
      });
  };

  const { mutate: mutateUpdateTask, isLoading: isLoadingUpdateTask } =
    useMutation({
      mutationKey: "mutateUpdateTask",
      mutationFn: updateTask,
    });

  const handleEnter = () => {
    // do save
    const payload = {
      projectId: project_id,
      column,
      title: newTitle.trim(),
      assignees: [],
    };
    mutate(payload);
  };

  useEffect(() => {
    if (typing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [typing]);

  return (
    <div className="bg-slate-500/10 rounded max-h-full flex flex-col overflow-hidden relative pb-[38px]">
      {/* header column */}
      <div className="w-full relative p-2">
        <div className="flex items-center justify-between">
          <h3 className={`font-medium ${headingColor}`}>{title}</h3>
          <span className="rounded text-sm text-neutral-400">
            {filteredCards.length}
          </span>
        </div>
      </div>
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`overflow-y-auto overflow-x-hidden w-full transition-colors p-2 w-scroll-6 bg-scroll flex flex-col`}
      >
        {filteredCards.map((c) => {
          return (
            <Card key={c.taskId} task={c} handleDragStart={handleDragStart} />
          );
        })}
        <DropIndicator beforeId={null} column={column} />
      </div>
      <div className="h-12 bg-base-200 absolute bottom-0 left-0 w-full">
        {!typing && (
          <button
            onClick={() => setTyping(true)}
            className="group p-3 px-5 flex items-center gap-2 w-full h-full"
          >
            <FontAwesomeIcon icon={faPlus} className="group-hover:opacity-75" />
            <span className="group-hover:opacity-75">Add Item</span>
          </button>
        )}

        {typing && (
          <div className="p-1 w-full h-full">
            <input
              onBlur={() => setTyping(false)}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={(e) =>
                e.key == "Enter"
                  ? handleEnter()
                  : e.key == "Escape"
                  ? setTyping(false)
                  : ""
              }
              value={newTitle}
              ref={inputRef}
              type="text"
              className="w-full h-full rounded px-2 py-2 focus:outline-slate-300"
            />
          </div>
        )}
      </div>
    </div>
  );
}
