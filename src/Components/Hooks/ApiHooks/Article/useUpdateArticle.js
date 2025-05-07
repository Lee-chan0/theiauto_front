import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateArticle } from "../../../../API/article.api";
import Swal from "sweetalert2";



export const useUpdateArticle = () => {
  const queryClinet = useQueryClient();

  return useMutation({
    mutationFn: ({ formData, articleId }) => updateArticle(formData, articleId),
    onSuccess: () => {
      queryClinet.invalidateQueries(['articles']);
    },
    onError: (e) => {
      Swal.fire({
        toast: true,
        position: 'top',
        width: 'fit-content',
        icon: 'error',
        timer: 2000,
        title: `${e.response?.data?.message}`,
        showConfirmButton: false,
        customClass: {
          popup: 'description-popup'
        }
      })
    }
  })
};