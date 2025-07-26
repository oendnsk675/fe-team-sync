import { create } from "zustand";
import { devtools } from "zustand/middleware";

const preferenceStore = create()(
  devtools((set) => ({
    drawer: false,
    actions: {
      setDrawer: (drawer: any) => set({ drawer }),
    },
  }))
);

export const useDrawer = () => preferenceStore((state: any) => state.drawer);
export const usePereferenceActions = () =>
  preferenceStore((state: any) => state.actions);
