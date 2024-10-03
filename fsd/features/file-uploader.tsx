import { Button, Uploader, Notification } from "rsuite";

export const FileUploader = () => {
  const handleSuccess = (response: any, file: any) => {
    // Здесь можно отловить и обработать ответ от сервера

    console.log("Ответ от сервера:", response);
  };

  return (
    <Uploader
      draggable
      listType="picture-text"
      defaultFileList={[]}
      action="//jsonplaceholder.typicode.com/posts/"
      onSuccess={handleSuccess}
    >
      <Button>Загрузите или перетащите файл...</Button>
    </Uploader>
  );
};
