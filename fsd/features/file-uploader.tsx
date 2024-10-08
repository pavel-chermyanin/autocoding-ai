import {Button, Message, Uploader} from "rsuite";
import {BASE_URL} from "@/fsd/core/global.constants";
import {TablePaths, useTableActions} from "@/fsd/entities/table";
import {SessionStatus, SessionStorage, useSessionActions} from "@/fsd/entities/session";
import {useState} from "react";

type FileUploaderResponse = {
  file_id: string
}

export const FileUploader = () => {
  const {setFileId,setSessionStatus,fileId} = useSessionActions()
  const handleSuccess = (response: FileUploaderResponse, file: any) => {

    setFileId(response.file_id)
    setSessionStatus(SessionStatus.FILE_UPLOADED)

    sessionStorage.setItem(SessionStorage.FILE_ID, response.file_id);
    sessionStorage.setItem(SessionStorage.SESSION_STATUS, SessionStatus.FILE_UPLOADED);


  };


  const url = `${BASE_URL}${TablePaths.UPLOAD_EXCEL_FILE}`;

  return (
    <div className={''}>
      <Uploader
        disabled={!!fileId}
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
