import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateArticle } from "../../../../API/article.api";



export const useUpdateArticle = () => {

  return useMutation({
    mutationFn: ({ formData, articleId }) => updateArticle(formData, articleId),
    onError: (e) => {
      alert(e.message);
    }
  })
};