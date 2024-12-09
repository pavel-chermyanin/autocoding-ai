import {autoCodingClient} from "@/fsd/shared/config/autoCodingClient";
import {OpenQuestionPaths} from "@/fsd/entities/open-question/open-question.paths";

export type PreviewRequest = {
  session_id:string
}

export const getPreviewData = async ({session_id}:PreviewRequest) => {
  const response =
    await autoCodingClient.post(`${OpenQuestionPaths.PREVIEW_DATA}`,{session_id})
  return response.data
}
export const getPrice= async ({session_id,list_name}:PreviewRequest & {list_name: string}) => {
  const response =
    await autoCodingClient.post(`${OpenQuestionPaths.GET_PRICE}`,{session_id,list_name})
  return response.data
}