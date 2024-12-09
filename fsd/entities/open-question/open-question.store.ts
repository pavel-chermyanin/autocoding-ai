import {create} from "zustand";
import {devtools} from "zustand/middleware";
import {OpenQuestionSession, OpenQuestionSessionActions} from "./open-question.types";



// Определяем начальное состояние для стор
const initialState: OpenQuestionSession = {
  openQuestionFileId: null,
  openQuestionSessionStatus: null,
  preview:null
};

// Создаем стор с использованием DevTools middleware
export const useOpenQuestionSessionStore = create<OpenQuestionSessionActions & OpenQuestionSession>()(
  devtools(
    (set) => ({
      ...initialState, // Инициализируем стор начальным состоянием

      setOpenQuestionFileId: (id) => set({ openQuestionFileId: id }),
      setOpenQuestionSessionStatus: (status) => set({ openQuestionSessionStatus: status }),
      setPreview: (preview) => set({ preview }),
      // setCheckedBrands: (brands) => set({ checkedBrands: brands }),
      // setCostCoding: (cost) => set({ costCoding: cost }),
      //
      // // Добавляем функцию для сброса всего стора
      clearStore: () => set({ ...initialState }),
    }),
    { name: "openQuestionSession", store: "openQuestionSession" },
  ),
);
