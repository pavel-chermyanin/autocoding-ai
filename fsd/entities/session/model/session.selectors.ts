import {shallow} from "zustand/shallow";
import {useSessionStore} from "@/fsd/entities/session/model/session.store";

export const useSessionActions = () => {
  const {
    fileId,
    setFileId,
    sessionStatus,
    setSessionStatus,
    checkedSKU,
    setCheckedSKU,
    checkedBrands,
    setCheckedBrands,
    costCoding,
    setCostCoding,
    clearStore
  } = useSessionStore(
    (state) => ({
      fileId: state.fileId,
      setFileId: state.setFileId,

      sessionStatus: state.sessionStatus,
      setSessionStatus: state.setSessionStatus,

      checkedSKU: state.checkedSKU,
      setCheckedSKU: state.setCheckedSKU,

      checkedBrands: state.checkedBrands,
      setCheckedBrands: state.setCheckedBrands,

      costCoding: state.costCoding,
      setCostCoding: state.setCostCoding,

      clearStore:state.clearStore


    }),
    shallow // Использование shallow для поверхностного сравнения
  );

  return {
    fileId,
    setFileId,
    sessionStatus,
    setSessionStatus,
    checkedSKU,
    setCheckedSKU,
    checkedBrands,
    setCheckedBrands,
    costCoding,
    setCostCoding,
    clearStore
  };
};