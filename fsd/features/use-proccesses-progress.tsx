import { useState, useEffect } from 'react';
import {getFilesInProgress} from "@/fsd/entities/model";

export const useProcessesProgress = () => {
  const [progressData, setProgressData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getFilesInProgress(); // Запрос на получение данных
        const data = await response.json();
        setProgressData(data);
      } catch (error) {
        console.error('Ошибка при получении данных о прогрессе процессов:', error);
      }
    };

    fetchData(); // Вызываем сразу при монтировании

    const intervalId = setInterval(fetchData, 10000); // Интервальные запросы каждые 10 секунд

    return () => {
      clearInterval(intervalId); // Очищаем интервал при размонтировании
    };
  }, []); // Пустой массив зависимостей, чтобы запросы начинались при монтировании

  return progressData; // Возвращаем данные
};
