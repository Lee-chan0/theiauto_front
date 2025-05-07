import { useQuery } from "@tanstack/react-query"
import { fetchNewCarArticles } from "../../../../API/generalAPI/generalArticle.api"



export const useFetchNewCarArticles = () => {
  return useQuery({
    queryKey: ['home-newcar'],
    queryFn: fetchNewCarArticles
  })
};