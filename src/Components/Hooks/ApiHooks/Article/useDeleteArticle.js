import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteArticle } from "../../../../API/article.api";
import Swal from "sweetalert2";



export const useDeleteArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ articleId, prevImageUrls }) => deleteArticle(articleId, prevImageUrls),
    onSuccess: () => {
      queryClient.invalidateQueries(['articles']);
    },
    onError: (e) => {
      Swal.fire({
        toast: true,
        position: 'top',
        icon: 'error',
        timer: 2000,
        title: `${e.response?.data?.message}`,
        showConfirmButton: false,
        customClass: {
          popup: 'description-popup'
        }
      })
    }
  });
}