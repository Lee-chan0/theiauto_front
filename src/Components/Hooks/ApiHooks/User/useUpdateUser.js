import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateUserInfo } from "../../../../API/user.api";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ adminId, formData }) => updateUserInfo(adminId, formData),
    onSuccess: () => {
      queryClient.invalidateQueries(['admin'])
    },
    onError: (e) => {
      alert(e.message)
    }
  })
};