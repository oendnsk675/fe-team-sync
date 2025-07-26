import { create } from "zustand";
import { devtools } from "zustand/middleware";

const taskStore = create()(
  devtools((set) => ({
    task: null,
    isLoading: null,
    actions: {
      setTask: (task: any) => set({ task }),
      setLoading: (isLoading: any) => set({ isLoading }),
    },
  }))
);

export const useTaskData = () => taskStore((state: any) => state.task);
export const useLoading = () => taskStore((state: any) => state.isLoading);
export const useTaskActions = () => taskStore((state: any) => state.actions);
