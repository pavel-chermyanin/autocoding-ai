import {Button} from "rsuite";
import {useSendToGptMutation} from "@/fsd/entities/model/model.mutations";
import {SessionStatus, useSessionActions} from "@/fsd/entities/session";
import {CURRENT_FILE_SESSION} from "@/fsd/core/global.constants";

export const EncodeButton = () => {
  const {mutate, isPending, isSuccess, isError} = useSendToGptMutation()
  const {currentSession,setSession} = useSessionActions()

  if(isSuccess) {
    const request = {
      file_id: currentSession?.file_id!,
      ...currentSession,
      sessionStatus: SessionStatus.AUTOCODING,
    }
    setSession(request)
    sessionStorage.setItem(CURRENT_FILE_SESSION, JSON.stringify(request))
  }
  return (
    <Button
      disabled={currentSession?.sessionStatus === SessionStatus.AUTOCODING}
      onClick={() => mutate({
        id: currentSession?.file_id!,
        column_id_sku: +currentSession?.checkedSKU!,
        column_id_brands: +currentSession?.checkedBrands!,
      })}
      appearance={'primary'} color={isError ? 'red' : 'blue'}>
      {isError ? 'Завершено с ошибкой' : (isPending || isSuccess) ? 'Отправлено в процесс' : 'Закодировать'}
    </Button>
  )
}