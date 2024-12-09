'use client';

import { Button, Uploader } from "rsuite";
import { OPEN_QUESTION_BASE_URL } from "@/fsd/core/global.constants";
import { useOpenQuestionSessionStore } from "@/fsd/entities/open-question/open-question.store";
import { OpenQuestionPaths } from "@/fsd/entities/open-question";
import { OpenQuestionSessionStatus, OpenQuestionSessionStorage } from "@/fsd/entities/open-question/open-question.types";
import { openQuestionClient } from "@/fsd/shared/config/openQuestionClient";

type FileUploaderResponse = {
  session_id: string;
};

export const FileUploaderOpenQuestion = () => {
  const { setOpenQuestionFileId, setOpenQuestionSessionStatus, setPreview } = useOpenQuestionSessionStore();

  const handleSuccess = async (response: FileUploaderResponse, file: any) => {
    try {
      // Устанавливаем ID сессии и статус
      setOpenQuestionFileId(response.session_id);
      setOpenQuestionSessionStatus(OpenQuestionSessionStatus.FILE_UPLOADED);

      sessionStorage.setItem(OpenQuestionSessionStorage.FILE_ID, response.session_id);
      sessionStorage.setItem(OpenQuestionSessionStorage.SESSION_STATUS, OpenQuestionSessionStatus.FILE_UPLOADED);

      // Запрос данных для предпросмотра
      const res = await openQuestionClient.post(
        `${OPEN_QUESTION_BASE_URL}${OpenQuestionPaths.PREVIEW_DATA}`,
        { session_id: response.session_id }
      );

      setPreview(res.data); // Устанавливаем данные предпросмотра
    } catch (error) {
      console.error("Ошибка при загрузке предпросмотра:", error);
    }
  };

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await openQuestionClient.post<FileUploaderResponse>(
        `${OPEN_QUESTION_BASE_URL}${OpenQuestionPaths.FILE_UPLOAD}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      handleSuccess(res.data, file);
    } catch (error) {
      console.error("Ошибка при загрузке файла:", error);
    }
  };

  return (
    <div>
      <Uploader
        draggable
        action="" // Указываем пустое значение для action
        listType="picture-text"
        fileListVisible={false}
        onChange={(fileList) => {
          if (fileList && fileList.length > 0) {
            const file = fileList[fileList.length - 1].blobFile;
            if (file) {
              handleUpload(file);
            }
          }
        }}
      >
        <Button>Загрузите или перетащите файл...</Button>
      </Uploader>
    </div>
  );
};
