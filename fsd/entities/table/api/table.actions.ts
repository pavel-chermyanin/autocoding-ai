import {autoCodingClient} from "@/fsd/shared/config/autoCodingClient";
import {TablePaths} from "../table.paths";
import {GetColumnProps, GetNavigationForFileIdResponse} from "../model/table.types";


export const getNavigationForFileId = async (fileId?:string) => {
  const response = await autoCodingClient.get(`${TablePaths.GET_NAVIGATION_FOR_FILE_ID}${fileId}`)
  return response.data as GetNavigationForFileIdResponse
}

export const getColumn = async ({sheet,fileId,columnId}:GetColumnProps) => {
  const response =
    await autoCodingClient.post(`${TablePaths.GET_COLUMN}${sheet}`,{
      id: fileId,
      column_id: columnId,
    })
  return response.data as Record<string, string | number>[]
}