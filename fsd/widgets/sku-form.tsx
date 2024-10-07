import {TablePreview, useGetNavigationForFileIdQueries, useTableActions} from "@/fsd/entities/table";
import {SKUFormItem} from "@/fsd/features/sku-form-item";
import React, {useEffect} from "react";
import {SessionStatus, useSessionActions} from "@/fsd/entities/session";
import {Button} from "rsuite";
import {useGetFileSpendingsMutation} from "@/fsd/entities/model/model.mutations";
import {useQueryClient} from "@tanstack/react-query";
import {ModelQueryKeys} from "@/fsd/entities/model";
import {CURRENT_FILE_SESSION} from "@/fsd/core/global.constants";


export const SkuForm = () => {
  const {currentSession, setSession} = useSessionActions()
  const {data} = useGetNavigationForFileIdQueries(currentSession?.file_id)
  const {mutate, data: responseSum} = useGetFileSpendingsMutation()

  const handleSpendings = () => {
    mutate({
      id: currentSession?.file_id!,
      sheets: currentSession?.checkedSKU ? 'sku' : 'brands',
      column_id_sku: +currentSession?.checkedSKU!,
      column_id_brands: +currentSession?.checkedBrands!,
    }, {
      onSuccess: (data) => {
        const request = {
          ...currentSession,
          file_id: currentSession?.file_id!,
          sessionStatus: SessionStatus.COST_CALCULATED,
          costCoding: data as number
        }
        setSession(request)
        sessionStorage.setItem(CURRENT_FILE_SESSION, JSON.stringify(request))
      }
    })
  }

  useEffect(() => {
    // if(currentSession?.costCoding) return
    if (currentSession?.checkedSKU && currentSession.checkedBrands && !currentSession.costCoding) {
      const request = {
        file_id: currentSession?.file_id!,
        sessionStatus: SessionStatus.CHECKED_COLS,
        checkedSKU: +currentSession?.checkedSKU!,
        checkedBrands: +currentSession.checkedBrands!,
      }
      setSession(request)
      sessionStorage.setItem(CURRENT_FILE_SESSION, JSON.stringify(request))
    }
    if ((!currentSession?.checkedSKU || !currentSession.checkedBrands) && !!currentSession?.file_id) {
      const {costCoding, ...restSession} = currentSession
      const request = {
        ...restSession,
        file_id: currentSession?.file_id!,
        sessionStatus: SessionStatus.FILE_UPLOADED
      }
      setSession(request)
      sessionStorage.setItem(CURRENT_FILE_SESSION, JSON.stringify(request))
    }

  }, [currentSession?.checkedSKU, currentSession?.checkedBrands]);
  return (
    <div>
      <div className={'grid grid-cols-2 gap-4 mb-6'}>
        <div className={'flex flex-col gap-8'}>
          <TablePreview currentColumn={currentSession?.checkedSKU!} sheet={'sku'}/>
          <SKUFormItem
            field={'checkedSKU'}
            name={'sku'}
            label={'Выберите СКЮ столбец'}
            data={data?.sku ? Object.entries(data.sku) : []}
          />
        </div>
        <div className={'flex flex-col gap-8'}>
          <TablePreview currentColumn={currentSession?.checkedBrands!} sheet={'brands'}/>
          <SKUFormItem
            field={'checkedBrands'}
            name={'brands'}
            label={'Выберите бренд'}
            data={data?.brands ? Object.entries(data.brands) : []}
          />
        </div>
      </div>
      <Button
        disabled={
          !currentSession?.checkedSKU ||
          !currentSession.checkedBrands ||
          currentSession.sessionStatus === SessionStatus.AUTOCODING ||
          currentSession?.sessionStatus === SessionStatus.AUTOCODING_COMPLETED}
        appearance={'primary'}
        onClick={handleSpendings}
      >Рассчитать стоимость</Button>
    </div>
  )
}