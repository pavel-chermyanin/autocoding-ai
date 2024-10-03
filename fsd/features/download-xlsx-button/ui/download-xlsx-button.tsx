import {Button} from "rsuite";


export const DownloadXlsxButton = ({progressId}:{progressId:number}) => {

  const handleClick = () => {
    console.log(progressId)
  }

  return (
    <Button onClick={handleClick}>Скачать файл xlsx</Button>
  )
}