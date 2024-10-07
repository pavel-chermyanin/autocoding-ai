import { shallow } from "zustand/shallow";
import {useSessionStore} from "@/fsd/entities/session/model/session.store";

export const useSessionActions = () => {
  const {currentSession, setSession} = useSessionStore(
    (state) => ({
      currentSession: state.currentSession,
      setSession: state.setSession,

    }),
    shallow // Использование shallow для поверхностного сравнения
  );

  return {currentSession, setSession};
};