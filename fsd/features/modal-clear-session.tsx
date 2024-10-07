import {Button, Modal, Placeholder} from "rsuite"
import {useTableActions} from "../entities/table"
import {CURRENT_FILE_SESSION} from "@/fsd/core/global.constants";
import {CustomText} from "@/fsd/shared/ui/CustomText";
import {useSessionActions} from "@/fsd/entities/session";
import {useQueryClient} from "@tanstack/react-query";
import {useFormContext} from "react-hook-form";


export const ModalClearSession = () => {
  const {isOpenClearModal, setIsOpenClearModal} = useTableActions()
  const {setSession,currentSession} = useSessionActions()
  const {reset} =useFormContext()
  const queryClient = useQueryClient(); // Получаем экземпляр queryClient

  return (
    <Modal open={isOpenClearModal} onClose={() => setIsOpenClearModal(false)}>
      <Modal.Header>
        <Modal.Title>Очистка сессии</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CustomText>Вы уверены что хотите очистить сессию ?</CustomText>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            setSession(null)
            reset({
              sku: '',
              brands: ''
            })
            sessionStorage.removeItem(CURRENT_FILE_SESSION)
            queryClient.invalidateQueries(); // Очищаем кэш всех запросов
            setIsOpenClearModal(false)
          }}
          appearance="primary">
          Ok
        </Button>
        <Button
          onClick={() => {
            setIsOpenClearModal(false)
          }}
          appearance="subtle">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  )
}