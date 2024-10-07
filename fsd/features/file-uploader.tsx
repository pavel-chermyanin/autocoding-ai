import {Button, Message, Uploader} from "rsuite";
import {BASE_URL, CURRENT_FILE_SESSION} from "@/fsd/core/global.constants";
import {TablePaths, useTableActions} from "@/fsd/entities/table";
import {SessionStatus, useSessionActions} from "@/fsd/entities/session";
import {useState} from "react";

type FileUploaderResponse = {
  file_id: string
}

export const FileUploader = () => {
  const {currentSession, setSession} = useSessionActions()
  const handleSuccess = (response: FileUploaderResponse, file: any) => {

    setSession({
      ...currentSession,
      ...response,
      sessionStatus: SessionStatus.FILE_UPLOADED
    })
    sessionStorage.setItem(
      CURRENT_FILE_SESSION,
      JSON.stringify({
        ...currentSession,
        ...response,
        sessionStatus: SessionStatus.FILE_UPLOADED,
      })
    )

  };


  const url = `${BASE_URL}${TablePaths.UPLOAD_EXCEL_FILE}`;

  return (
    <div className={''}>
      <Uploader
        disabled={!!currentSession?.file_id}
        draggable
        listType="picture-text"
        defaultFileList={[]}
        action={url}
        fileListVisible={false}
        onSuccess={handleSuccess}
        // onRemove={handleRemove}  // Обработчик удаления файла

      >
        <Button>Загрузите или перетащите файл...</Button>

      </Uploader>


    </div>

  );
};
