import {create} from "zustand";
import {devtools} from "zustand/middleware";
import {SessionActions,Session} from "./session.types";



// Определяем начальное состояние для стор
const initialState: Session = {
      fileId: null,
      sessionStatus: null,
      checkedSKU: null,
      checkedBrands: null,
      costCoding: null,
};

// Создаем стор с использованием DevTools middleware
export const useSessionStore = create<SessionActions & Session>()(
  devtools(
    (set) => ({
          ...initialState, // Инициализируем стор начальным состоянием

          setFileId: (id) => set({ fileId: id }),
          setSessionStatus: (status) => set({ sessionStatus: status }),
          setCheckedSKU: (sku) => set({ checkedSKU: sku }),
          setCheckedBrands: (brands) => set({ checkedBrands: brands }),
          setCostCoding: (cost) => set({ costCoding: cost }),

          // Добавляем функцию для сброса всего стора
          clearStore: () => set({ ...initialState }),
    }),
    { name: "session", store: "session" },
  ),
);
