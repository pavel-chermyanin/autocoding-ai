import {useEffect} from 'react';
import {Session, SessionStatus, SessionStorage, useSessionActions} from "@/fsd/entities/session";

export const useCurrentFileSessionData = () => {
  const {setFileId,setSessionStatus,setCheckedSKU,setCheckedBrands,setCostCoding} = useSessionActions()

  useEffect(() => {
    // Получаем данные из sessionStorage
    const sessionDataFileId = sessionStorage.getItem(SessionStorage.FILE_ID);
    if (sessionDataFileId) {
      setFileId(sessionDataFileId);
    }
    const sessionDataStatus = sessionStorage.getItem(SessionStorage.SESSION_STATUS);
    if (sessionDataStatus) {
      setSessionStatus(sessionDataStatus as SessionStatus);
    }
    const sessionDataSKU = sessionStorage.getItem(SessionStorage.CHECKED_SKU);
    if (sessionDataSKU) {
      setCheckedSKU(+sessionDataSKU);
    }
    const sessionDataBrands = sessionStorage.getItem(SessionStorage.CHECHED_BRANDS);
    if (sessionDataBrands) {
      setCheckedBrands(+sessionDataBrands);
    }
    const sessionDataCost = sessionStorage.getItem(SessionStorage.COST_AUTOCODING);
    if (sessionDataCost) {
      setCostCoding(+sessionDataCost);
    }
  }, []); // Хук вызывается при маунте компонента

};

