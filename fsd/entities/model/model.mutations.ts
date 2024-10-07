import {useMutation} from "@tanstack/react-query";
import {getFileSpendings, sendToGpt} from "./model.actions";

export const useGetFileSpendingsMutation = () => {
  return useMutation({
    mutationFn: getFileSpendings,
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {

    },

  });
};
export const useSendToGptMutation = () => {
  return useMutation({
    mutationFn: sendToGpt,
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {

    },
  });
};