import {shallow} from "zustand/shallow";
import {useOpenQuestionSessionStore} from "./open-question.store";

export const useSessionActions = () => {
  const {
    openQuestionFileId,
    setOpenQuestionFileId,
    openQuestionSessionStatus,
    setOpenQuestionSessionStatus,
    preview,
    setPreview,
    clearStore
  } = useOpenQuestionSessionStore(
    (state) => ({
      openQuestionFileId: state.openQuestionFileId,
      setOpenQuestionFileId: state.setOpenQuestionFileId,

      openQuestionSessionStatus: state.openQuestionSessionStatus,
      setOpenQuestionSessionStatus: state.setOpenQuestionSessionStatus,

      preview: state.preview,
      setPreview: state.setPreview,

      clearStore:state.clearStore


    }),
    shallow // Использование shallow для поверхностного сравнения
  );

  return {
    openQuestionFileId,
    setOpenQuestionFileId,
    openQuestionSessionStatus,
    setOpenQuestionSessionStatus,
    preview,
    setPreview,
    clearStore
  };
};