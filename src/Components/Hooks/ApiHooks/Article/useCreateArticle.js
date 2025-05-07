import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createArticle } from "../../../../API/article.api";
import Swal from "sweetalert2";



export function useCreateArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createArticle,
    onSuccess: () => {
      queryClient.invalidateQueries(['articles'])
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
}