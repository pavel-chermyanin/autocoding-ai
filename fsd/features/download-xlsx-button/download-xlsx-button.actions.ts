import {autoCodingClient} from "@/fsd/shared/config/autoCodingClient";


export const downloadXlsx = async () => {
  const response = await autoCodingClient.get('')
  return response.data
}