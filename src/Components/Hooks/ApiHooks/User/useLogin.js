import { useMutation } from "@tanstack/react-query"
import { login } from "../../../../API/user.api";
import { useNavigate } from "react-router-dom";



export const useLogin = () => {
  const navigate = useNavigate();
  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate('/theiautoCMS/adminpage', { replace: true });
    }
  })

  return loginMutation;
}