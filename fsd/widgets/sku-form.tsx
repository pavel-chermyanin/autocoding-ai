import {TablePreview, useGetNavigationForFileIdQueries} from "@/fsd/entities/table";
import {SKUFormItem} from "@/fsd/features/sku-form-item";
import React, {useEffect} from "react";
import {SessionStatus, SessionStorage, useSessionActions} from "@/fsd/entities/session";
import {Button} from "rsuite";
import {useGetFileSpendingsMutation} from "@/fsd/entities/model/model.mutations";


export const SkuForm = () => {
  const {fileId,checkedSKU,checkedBrands,setCostCoding,setSessionStatus,sessionStatus,costCoding} = useSessionActions()
  const {data} = useGetNavigationForFileIdQueries(fileId!)
  const {mutate, data: responseSum} = useGetFileSpendingsMutation()

  const handleSpendings = () => {
    mutate({
      id: fileId!,
      sheets: checkedSKU ? 'sku' : 'brands',
      column_id_sku: +checkedSKU!,
      column_id_brands: +checkedBrands!,
    }, {
      onSuccess: (data) => {
        setCostCoding(data)
        setSessionStatus(SessionStatus.COST_CALCULATED)
        sessionStorage.setItem(SessionStorage.COST_AUTOCODING, data)
        sessionStorage.setItem(SessionStorage.SESSION_STATUS, SessionStatus.COST_CALCULATED)
      }
    })
  }

  useEffect(() => {
    // if(costCoding)return
    if(checkedSKU && checkedBrands && !costCoding) {
      setSessionStatus(SessionStatus.CHECKED_COLS)
      sessionStorage.setItem(SessionStorage.SESSION_STATUS, SessionStatus.CHECKED_COLS)
    }
    if((!checkedSKU || !checkedBrands) && fileId) {
      setSessionStatus(SessionStatus.FILE_UPLOADED)
      setCostCoding(null)
      sessionStorage.setItem(SessionStorage.SESSION_STATUS, SessionStatus.FILE_UPLOADED)
      sessionStorage.removeItem(SessionStorage.COST_AUTOCODING)
    }


  }, [checkedSKU,checkedBrands]);


  return (
    <div>
      <div className={'grid grid-cols-2 gap-4 mb-6'}>
        <div className={'flex flex-col gap-8'}>
          <TablePreview currentColumn={checkedSKU!} sheet={'sku'}/>
          <SKUFormItem
            name={'sku'}
            label={'Выберите СКЮ столбец'}
            data={data?.sku ? Object.entries(data.sku) : []}
          />
        </div>
        <div className={'flex flex-col gap-8'}>
          <TablePreview currentColumn={checkedBrands!} sheet={'brands'}/>
          <SKUFormItem
            name={'brands'}
            label={'Выберите бренд'}
            data={data?.brands ? Object.entries(data.brands) : []}
          />
        </div>
      </div>
      <Button
        disabled={
          !checkedSKU ||
          !checkedBrands ||
          sessionStatus === SessionStatus.AUTOCODING ||
          sessionStatus === SessionStatus.AUTOCODING_COMPLETED}
        appearance={'primary'}
        onClick={handleSpendings}
      >Рассчитать стоимость</Button>
    </div>
  )
}