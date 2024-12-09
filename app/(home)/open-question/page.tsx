import {ProccessList} from "@/fsd/widgets/proccess-list";
import {FileUploaderOpenQuestion} from "@/fsd/features/open-question/file-uploader-open-question";
import {PreviewForm} from "@/fsd/widgets/open-question/preview-form";
import {GetPriceButton} from "@/fsd/features/open-question/get-price-button";


export default async function ProcessesPage() {


  return (
    <div className={'w-full'}>
      <FileUploaderOpenQuestion/>
      <PreviewForm/>
    </div>
  );
}
