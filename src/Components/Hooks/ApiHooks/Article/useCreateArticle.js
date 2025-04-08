import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createArticle } from "../../../../API/article.api";



export function useCreateArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createArticle,
    onSuccess: () => {
      queryClient.invalidateQueries(['articles'])
    },
    onError: (e) => {
      alert(e.message);
    }
  })
}