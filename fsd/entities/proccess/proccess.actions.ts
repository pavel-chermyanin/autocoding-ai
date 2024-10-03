import {autoCodingClient} from "@/fsd/shared/config/autoCodingClient";


export const getProccesses = async () => {
  const response = await autoCodingClient.get('')
  return response.data
}