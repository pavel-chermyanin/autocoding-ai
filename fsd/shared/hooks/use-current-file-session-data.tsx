import { useState, useEffect } from 'react';

export const useCurrentFileSessionData = () => {
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    // Получаем данные из sessionStorage
    const sessionData = sessionStorage.getItem('currentFileSession');

    if (sessionData) {
      try {
        // Парсим данные из строки в объект
        const parsedData = JSON.parse(sessionData);
        // Проверяем наличие поля id и устанавливаем его в состояние
        if (parsedData?.id) {
          setSessionId(parsedData.id);
        }
      } catch (error) {
        console.error('Ошибка парсинга currentFileSession:', error);
      }
    }
  }, []); // Хук вызывается при маунте компонента

  return sessionId;
};

