import { useQuery } from "@tanstack/react-query"
import { fetchServiceArticles } from "../../../../API/generalAPI/generalArticle.api"



export const useFetchServiceArticles = () => {
  return useQuery({
    queryKey: ['service-articles'],
    queryFn: fetchServiceArticles
  })
};