import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateUserInfo } from "../../../../API/user.api";
import Swal from "sweetalert2";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserInfo,
    onSuccess: () => {
      queryClient.invalidateQueries(['admin']);
      Swal.fire({
        toast: true,
        position: 'top',
        width: 'fit-content',
        title: '프로필 이미지 변경이 완료되었습니다.',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
        showClass: {
          popup: 'swal-clipboard-up-in'
        },
        hideClass: {
          popup: 'swal-clipboard-up-out'
        },
        customClass: {
          popup: 'success-popup'
        }
      })
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