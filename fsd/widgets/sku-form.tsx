import {TablePreview, useGetNavigationForFileIdQueries, useTableActions} from "@/fsd/entities/table";
import {SKUFormItem} from "@/fsd/features/sku-form-item";
import React, {useEffect} from "react";
import {useSessionActions} from "@/fsd/entities/session";
import {Button} from "rsuite";
import {useGetFileSpendingsMutation} from "@/fsd/entities/model/model.mutations";
import {useQueryClient} from "@tanstack/react-query";
import {ModelQueryKeys} from "@/fsd/entities/model";


export const SkuForm = () => {
  const queryClient = useQueryClient();
  const {currentSession} = useSessionActions()
  const {data} = useGetNavigationForFileIdQueries(currentSession?.file_id)
  const {mutate,data:responseSum} = useGetFileSpendingsMutation()
  const {currentSKU,currentBrand,setSKU,setBrand} = useTableActions()

  const handleSpendings = () => {
    mutate({
      id:currentSession?.file_id!,
      sheets:currentSKU ? 'sku' : 'brands',
      column_id_sku:+currentSKU!,
      column_id_brands:+currentBrand!,
    },{
      onSuccess: (data) => {
        // Обновляем кэш после успешного выполнения мутации
        queryClient.setQueryData([ModelQueryKeys.GET_FILE_SPENDINGS], data);
      }
    })
  }
  return (
    <div >
      <div className={'grid grid-cols-2 gap-4 mb-6'}>
        <div className={'flex flex-col gap-8'}>
          <TablePreview currentColumn={currentSKU} sheet={'sku'}/>
          <SKUFormItem
            cb={setSKU}
            name={'sku'}
            label={'Выберите СКЮ столбец'}
            data={data?.sku ? Object.entries(data.sku) : []}
          />
        </div>
        <div className={'flex flex-col gap-8'}>
          <TablePreview currentColumn={currentBrand} sheet={'brands'}/>
          <SKUFormItem
            cb={setBrand}
            name={'brands'}
            label={'Выберите бренд'}
            data={data?.brands ? Object.entries(data.brands) : []}
          />
        </div>
      </div>
      <Button
        disabled={!currentSKU || !currentBrand}
        appearance={'primary'}
        onClick={handleSpendings}
      >Рассчитать стоимость</Button>
    </div>
  )
}