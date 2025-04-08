import { useQuery } from "@tanstack/react-query"
import { fetchCategories } from "../../../../API/categories.api"



export const useFetchCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 60 * 24
  });
}