import {Button, Message, Uploader} from "rsuite";
import {BASE_URL, CURRENT_FILE_SESSION} from "@/fsd/core/global.constants";
import {TablePaths, useTableActions} from "@/fsd/entities/table";
import {useSessionActions} from "@/fsd/entities/session";
import {useState} from "react";

type FileUploaderResponse = {
  file_id: string
}

export const FileUploader = () => {
  const {setIsOpenClearModal} = useTableActions()
  const {currentSession,setSession} = useSessionActions()
  const handleSuccess = (response: FileUploaderResponse, file: any) => {

    setSession(response)
    sessionStorage.setItem(CURRENT_FILE_SESSION, JSON.stringify(response))

  };

  const handleRemove = (file: any) => {
    setIsOpenClearModal(true)
    return false;
  };

  const url = `${BASE_URL}${TablePaths.UPLOAD_EXCEL_FILE}`;

  return (
    <div className={''}>
      <Uploader
        disabled={!!currentSession?.file_id }
        draggable
        listType="picture-text"
        defaultFileList={[]}
        action={url}
        fileListVisible={false}
        onSuccess={handleSuccess}
        onRemove={handleRemove}  // Обработчик удаления файла

      >
        <Button>Загрузите или перетащите файл...</Button>

      </Uploader>

      {currentSession?.file_id &&
        <Message className={'mt-2'}>
          <div className={'flex items-center gap-2 justify-between'}>
            <p>
              загружена активная сессия
            </p>
            <Button appearance="primary" onClick={handleRemove}>Очистить сессию</Button>
          </div>
        </Message>

      }
    </div>

  );
};
