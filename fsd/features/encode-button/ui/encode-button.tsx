import {Button} from "rsuite";
import {useSendToGptMutation} from "@/fsd/entities/model/model.mutations";
import {SessionStatus, SessionStorage, useSessionActions} from "@/fsd/entities/session";

export const EncodeButton = () => {
  const {mutate, isPending, isSuccess, isError} = useSendToGptMutation()
  const {fileId,checkedBrands,checkedSKU,sessionStatus,setSessionStatus} = useSessionActions()

  if(isSuccess) {
    setSessionStatus(SessionStatus.AUTOCODING)
    sessionStorage.setItem(SessionStorage.SESSION_STATUS,SessionStatus.AUTOCODING)
  }
  return (
    <Button
      disabled={sessionStatus === SessionStatus.AUTOCODING}
      onClick={() => mutate({
        id: fileId!,
        column_id_sku: +checkedSKU!,
        column_id_brands: +checkedBrands!,
      })}
      appearance={'primary'} color={isError ? 'red' : 'blue'}>
      {isError ? 'Завершено с ошибкой' : (isPending || isSuccess) ? 'Отправлено в процесс' : 'Закодировать'}
    </Button>
  )
}