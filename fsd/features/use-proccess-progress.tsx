import {useEffect, useState} from 'react';
import {getFileInProgressById} from "@/fsd/entities/model/model.actions";
import {SessionStatus, useSessionActions} from "@/fsd/entities/session";
import {CURRENT_FILE_SESSION} from "@/fsd/core/global.constants";

export const useProcessProgress = () => {
  const [progressData, setProgressData] = useState<any[]>([]);
  const {currentSession, setSession} = useSessionActions()

  useEffect(() => {

    if (!currentSession?.file_id) return
    const fetchData = async () => {
      try {
        const response = await getFileInProgressById(currentSession?.file_id!); // Запрос на получение данных
        const data = await response.json();
        setProgressData(data);
        if (data === 100) {
          const request = {
            file_id: currentSession?.file_id!,
            ...currentSession,
            sessionStatus: SessionStatus.AUTOCODING_COMPLETED,
          }
          setSession(request)
          sessionStorage.setItem(CURRENT_FILE_SESSION, JSON.stringify(request))
          clearInterval(intervalId)
        }
      } catch (error) {
        console.error('Ошибка при получении данных о прогрессе процессов:', error);
      }
    };

    fetchData(); // Вызываем сразу при монтировании

    const intervalId = setInterval(fetchData, 10000); // Интервальные запросы каждые 10 секунд
    if (currentSession?.sessionStatus !== SessionStatus.AUTOCODING) {
      return clearInterval(intervalId);
    }
    return () => {
      clearInterval(intervalId); // Очищаем интервал при размонтировании
    };
  }, [currentSession?.file_id, currentSession?.sessionStatus]); // Пустой массив зависимостей, чтобы запросы начинались при монтировании

  return progressData; // Возвращаем данные
};
