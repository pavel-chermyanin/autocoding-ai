import {autoCodingClient} from "@/fsd/shared/config/autoCodingClient";
import {ModelPaths} from "./model.paths";
import {GetFileSpendings} from "./model.types";


export const getProccesses = async () => {
  const response = await autoCodingClient.get('')
  return response.data
}

export const getFileSpendings = async ({sheets,...request}:GetFileSpendings) => {
  const response =
    await autoCodingClient.post(`${ModelPaths.GET_FILE_SPENDINGS}${sheets}`,request)
  return response.data
}