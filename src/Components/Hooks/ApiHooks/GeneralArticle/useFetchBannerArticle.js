import { useQuery } from "@tanstack/react-query"
import { fetchBannerArticle } from "../../../../API/generalAPI/generalArticle.api"



export const useFetchBannerArticle = () => {
  return useQuery({
    queryKey: ['bannerArticle'],
    queryFn: fetchBannerArticle
  })
}