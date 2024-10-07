import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';

// Создаем фабрику для запросов
export const useQueryFactory = <TData, TError>(
  queryKey: unknown[],  // Массив, соответствующий ключу для query
  queryFn: () => Promise<TData>, // Функция для выполнения запроса
  options?: Omit<UseQueryOptions<TData, TError>, 'staleTime' | 'enabled'> // Убираем эти параметры из опций
): UseQueryResult<TData, TError> => {
  return useQuery({
    queryKey,
    queryFn,
    staleTime: 0,  // Данные устаревают сразу после запроса
    enabled: true,  // Включаем запрос по умолчанию
    ...options      // Передаем остальные кастомные опции
  });
};
