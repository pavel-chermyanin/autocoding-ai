import {shallow} from "zustand/shallow";
import {useSessionStore} from "@/fsd/entities/session/model/session.store";
import {useTableStore} from "./table.store";

export const useTableActions = () => {
  const {
    currentSKU,
    setSKU,
    currentBrand,
    setBrand,
    isOpenClearModal,
    setIsOpenClearModal,
    heightPreview,
    setHeightPreview
  } = useTableStore(
    (state) => ({
      currentSKU: state.currentSKU,
      setSKU: state.setSKU,

      currentBrand: state.currentBrand,
      setBrand: state.setBrand,

      isOpenClearModal: state.isOpenClearModal,
      setIsOpenClearModal: state.setIsOpenClearModal,

      heightPreview: state.heightPreview,
      setHeightPreview: state.setHeightPreview,

    }),
    shallow // Использование shallow для поверхностного сравнения
  );

  return {
    currentSKU,
    setSKU,
    currentBrand,
    setBrand,
    isOpenClearModal,
    setIsOpenClearModal,
    heightPreview,
    setHeightPreview
  };
};