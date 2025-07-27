import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type Message = {
  id?: string;
  message: string;
  user_id?: any;
  user?: any;
  status?: boolean;
  createdAt?: string;
};

type State = {
  user: any | null;
  instanceSelected: any | null;
  messages: Message[];
};

type Actions = {
  setUser: (user: any | null) => void;
  setInstance: (instanceSelected: any | null) => void;
  addMessage: (message: Message) => void;
  setMessages: (messages: Message[]) => void;
  clearMessages: () => void;
};

const useUserStore = create<State & { actions: Actions }>()(
  devtools((set, get) => ({
    user: null,
    instanceSelected: null,
    messages: [],

    actions: {
      setUser: (user: any) => set({ user }),
      setInstance: (instanceSelected: any) => set({ instanceSelected }),
      addMessage: (message: Message) =>
        set((state) => ({ messages: [...state.messages, message] })),
      setMessages: (messages: Message[]) => set({ messages }),
      clearMessages: () => set({ messages: [] }),
    },
  }))
);

export const useUser = () => useUserStore((state) => state.user);
export const useInstanceSelected = () =>
  useUserStore((state) => state.instanceSelected);

// 💬 Message state accessors
export const useMessages = () => useUserStore((state) => state.messages);

// 📦 All actions
export const useUserActions = () => useUserStore((state) => state.actions);
