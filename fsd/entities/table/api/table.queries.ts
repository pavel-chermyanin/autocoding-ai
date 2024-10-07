import {useQuery} from "@tanstack/react-query";
import { getNavigationForFileId} from "./table.actions";



export const useGetNavigationForFileIdQueries = (fileId?: string) => {
  return useQuery({
    queryKey: ['table', fileId],
    queryFn: () => getNavigationForFileId(fileId),
    select: data => data,
    enabled: !!fileId
  })
}

