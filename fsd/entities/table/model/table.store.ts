import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {TableState} from "@/fsd/entities/table/model/table.types";

// Создаем стор с использованием DevTools middleware
export const useTableStore = create<TableState>()(
  devtools(
    (set) => ({
      currentSKU: null, // состояние по умолчанию
      setSKU: (sku) => set({ currentSKU: sku }),

      currentBrand: null, // состояние по умолчанию
      setBrand: (brand) => set({ currentBrand: brand }),

      isOpenClearModal: false, // состояние по умолчанию
      setIsOpenClearModal: (bool) => set({ isOpenClearModal: bool }),

      heightPreview: 200, // состояние по умолчанию
      setHeightPreview: (num) => set({ heightPreview: num }),
    }),
    { name: "table", store: "table" },
  ),
);
