import {useEffect, useState} from 'react';
import {getFileInProgressById} from "@/fsd/entities/model/model.actions";
import {SessionStatus, SessionStorage, useSessionActions} from "@/fsd/entities/session";

export const useProcessProgress = () => {
  const [progressData, setProgressData] = useState<any[]>([]);
  const {fileId,setSessionStatus,sessionStatus} = useSessionActions()

  useEffect(() => {

    if (!fileId) return
    const fetchData = async () => {
      try {
        const response = await getFileInProgressById(fileId); // Запрос на получение данных
        const data = await response.json();
        setProgressData(data);
        if (data === 100) {

          setSessionStatus(SessionStatus.AUTOCODING_COMPLETED)
          sessionStorage.setItem(SessionStorage.SESSION_STATUS, SessionStatus.AUTOCODING_COMPLETED)
          clearInterval(intervalId)
        }
      } catch (error) {
        console.error('Ошибка при получении данных о прогрессе процессов:', error);
      }
    };

    fetchData(); // Вызываем сразу при монтировании

    const intervalId = setInterval(fetchData, 10000); // Интервальные запросы каждые 10 секунд
    if (sessionStatus !== SessionStatus.AUTOCODING) {
      return clearInterval(intervalId);
    }
    return () => {
      clearInterval(intervalId); // Очищаем интервал при размонтировании
    };
  }, [sessionStatus]); // Пустой массив зависимостей, чтобы запросы начинались при монтировании

  return progressData; // Возвращаем данные
};
