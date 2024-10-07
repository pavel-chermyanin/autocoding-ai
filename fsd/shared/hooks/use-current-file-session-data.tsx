import {useEffect} from 'react';
import {CURRENT_FILE_SESSION} from "@/fsd/core/global.constants";
import {Session, useSessionActions} from "@/fsd/entities/session";

export const useCurrentFileSessionData = () => {
  const {setSession} = useSessionActions()

  useEffect(() => {
    // Получаем данные из sessionStorage
    const sessionData = sessionStorage.getItem(CURRENT_FILE_SESSION);

    if (sessionData) {
      const parsedData: Session = JSON.parse(sessionData);
      setSession(parsedData);

    }
  }, []); // Хук вызывается при маунте компонента

};

