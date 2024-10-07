import React from "react";
import { Message } from "rsuite";
import { EncodeButton } from "@/fsd/features/encode-button";
import { useQuery } from "@tanstack/react-query";
import {ModelQueryKeys} from "@/fsd/entities/model";
import {useQueryFactory} from "@/fsd/shared/hooks/use-query-factory";

export const EncodeActionPanel = () => {
  // Используем фабрику чтобы вытащить данные из кеша
  const { data, isLoading, error } = useQueryFactory(
    [ModelQueryKeys.GET_FILE_SPENDINGS],  // Ключ для запроса
    () => {
      return Promise.resolve(null); // Можно вернуть какие-то данные по умолчанию или оставить null
    }
  );

  console.log(data)
  if(!data) {
    return null
  }

  return (
    <div>
      <div className={'flex items-center gap-2'} style={{gap:'20px'}}>
        <Message>
          Стоимость<strong>{data}$</strong>.
        </Message>
        <EncodeButton/>
      </div>
    </div>
  );
}
