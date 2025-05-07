import { useQuery } from "@tanstack/react-query"
import { fetchBrandITArticles } from "../../../../API/generalAPI/generalArticle.api"




export const useFetchBrandITArticles = () => {
  return useQuery({
    queryKey: ['brand-articles'],
    queryFn: fetchBrandITArticles
  })
}