import {Button, Message} from "rsuite";
import {useTableActions} from "@/fsd/entities/table";
import {SessionStatus as SessionStatusEnum, useSessionActions} from "@/fsd/entities/session";


export const SessionStatus = () => {
  const {currentSession,setSession} = useSessionActions()
  const {setIsOpenClearModal} = useTableActions()
  const handleRemove = (file: any) => {
    setIsOpenClearModal(true)
    return false;
  };
  if(!currentSession){
    return null
  }

  const getStatus = (status: SessionStatusEnum) => {
    switch (status){
      case SessionStatusEnum.FILE_UPLOADED:
        return 'Файл загружен'
      case SessionStatusEnum.CHECKED_COLS:
        return 'Выбраны колонки СКЮ и Бренды'
      case SessionStatusEnum.COST_CALCULATED:
        return 'Расчитана цена кодировки'
      case SessionStatusEnum.AUTOCODING:
        return 'Идет кодировка'
      case SessionStatusEnum.AUTOCODING_COMPLETED:
        return 'Кодировка завершена'
    }
  }
  return (
    <Message className={'mt-2'} type={currentSession.sessionStatus !== SessionStatusEnum.AUTOCODING_COMPLETED ? 'info': 'success'}>
      <div className={'flex items-center gap-2 justify-between'}>
        <p><strong>Статус сессии:</strong> {getStatus(currentSession.sessionStatus)}</p>
        <Button appearance="primary" onClick={handleRemove}>Очистить сессию</Button>
      </div>
    </Message>
  )
}