import { create } from "zustand";
import { devtools } from "zustand/middleware";

type UserActions = {
  setUser: (user: any | null) => void;
  setInstance: (instanceSelected: any | null) => void;
};

const useUserStore = create()(
  devtools((set) => ({
    user: null,
    instanceSelected: null,
    actions: {
      setUser: (user: any) => set({ user }),
      setInstance: (instanceSelected: any) => set({ instanceSelected }),
    },
  }))
);

export const useUser = () => useUserStore((state: any) => state.user);
export const useInstanceSelected = () =>
  useUserStore((state: any) => state.instanceSelected);
export const useUserActions = () => useUserStore((state: any) => state.actions);
