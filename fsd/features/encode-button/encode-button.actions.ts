import {autoCodingClient} from "@/fsd/shared/config/autoCodingClient";


export const startEncoding = async () => {
  const response = await autoCodingClient.get('')
  return response.data
}