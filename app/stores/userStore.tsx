import { create } from "zustand";
import { devtools } from "zustand/middleware";

const userStore = create()(
  devtools((set) => ({
    user: null,
    setUser: (user: any) => set({ user }),
  }))
);

export default userStore;
