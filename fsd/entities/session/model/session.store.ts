import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { SessionState } from "./session.types";

// Создаем стор с использованием DevTools middleware
export const useSessionStore = create<SessionState>()(
  devtools(
    (set) => ({
      currentSession: null, // состояние по умолчанию
      setSession: (session) => set({ currentSession: session }), // исправлено здесь
    }),
    { name: "session", store: "session" },
  ),
);
