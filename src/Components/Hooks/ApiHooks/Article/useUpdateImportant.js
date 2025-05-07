import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateImportant } from "../../../../API/article.api";

export const useUpdateImportant = (currentPage, categoryId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ isImportant, articleId }) => updateImportant(isImportant, articleId),
    onSuccess: () => {
      queryClient.invalidateQueries(['articles', currentPage, categoryId]);
    },
    onError: () => {
      alert('알 수 없는 오류가 발생했습니다.');
    }
  })
};