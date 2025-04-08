import { useQuery } from "@tanstack/react-query"
import { fetchAdminInfo } from "../../../../API/user.api"

export const useFetchAdminInfo = () => {
  return useQuery({
    queryKey: ['admin'],
    queryFn: fetchAdminInfo,
    staleTime: 60 * 1000 * 5
  });
}