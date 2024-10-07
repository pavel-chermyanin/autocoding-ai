import {autoCodingClient} from "@/fsd/shared/config/autoCodingClient";
import {ModelPaths} from "./model.paths";
import {GetFileSpendings} from "./model.types";

export const getFileInProgressById = async (fileId:string) => {
  const response = await autoCodingClient.get(`${ModelPaths.GET_FILE_PROGRESS}${fileId}`)
  return response.data
}
export const getFilesInProgress = async () => {
  const response = await autoCodingClient.get(ModelPaths.GET_FILES_IN_PROGRESS)
  return response.data
}

export const getFileSpendings = async ({sheets,...request}:GetFileSpendings) => {
  const response =
    await autoCodingClient.post(`${ModelPaths.GET_FILE_SPENDINGS}${sheets}`,request)
  return response.data
}

export const sendToGpt = async (request:Omit<GetFileSpendings,'sheets'>) => {
  const response =
    await autoCodingClient.post(`${ModelPaths.SEND_TO_GPT}`,request)
  return response.data
}