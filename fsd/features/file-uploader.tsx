import {Button, Uploader} from "rsuite";


export const FileUploader = () => {
    return (
      <Uploader
        draggable
        listType="picture-text"
        defaultFileList={[]}
        action="//jsonplaceholder.typicode.com/posts/"
      >
        <Button>Загрузите или перетащите файл...</Button>
      </Uploader>
    )
}