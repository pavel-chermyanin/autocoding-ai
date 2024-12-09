'use client'

import {Button, Message, Uploader} from "rsuite";
import {BASE_URL, OPEN_QUESTION_BASE_URL} from "@/fsd/core/global.constants";
import {TablePaths, useTableActions} from "@/fsd/entities/table";
import {SessionStatus, SessionStorage, useSessionActions} from "@/fsd/entities/session";
import {useState} from "react";
import {getPreviewData, OpenQuestionPaths} from "@/fsd/entities/open-question";
import {useOpenQuestionSessionStore} from "@/fsd/entities/open-question/open-question.store";
import {OpenQuestionSessionStatus, OpenQuestionSessionStorage} from "@/fsd/entities/open-question/open-question.types";

type FileUploaderResponse = {
  session_id: string
}

export const FileUploaderOpenQuestion = () => {
  const {setOpenQuestionFileId, setOpenQuestionSessionStatus, setPreview} = useOpenQuestionSessionStore()
  const handleSuccess = async (response: FileUploaderResponse, file: any) => {

    setOpenQuestionFileId(response.session_id)
    setOpenQuestionSessionStatus(OpenQuestionSessionStatus.FILE_UPLOADED)

    sessionStorage.setItem(OpenQuestionSessionStorage.FILE_ID, response.session_id);
    sessionStorage.setItem(OpenQuestionSessionStorage.SESSION_STATUS, OpenQuestionSessionStatus.FILE_UPLOADED);

    const res = await fetch(`${OPEN_QUESTION_BASE_URL}${OpenQuestionPaths.PREVIEW_DATA}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({session_id: response.session_id})
    })
    const preview = await res.json()
    setPreview(preview)
  };


  const url = `${OPEN_QUESTION_BASE_URL}${OpenQuestionPaths.FILE_UPLOAD}`;

  return (
    <div className={''}>
      <Uploader

        // disabled={!!fileId}
        draggable
        headers={{
          'accept': 'application/json',
        }}
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
