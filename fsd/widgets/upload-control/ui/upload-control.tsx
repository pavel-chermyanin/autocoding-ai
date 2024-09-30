
import styles from './upload-control.module.scss'
import {FileUploader} from "@/fsd/features/file-uploader";


export const UploadControl = () => {
  return (
    <div className={styles.upload_control}>
      <FileUploader/>
    </div>
  )
}