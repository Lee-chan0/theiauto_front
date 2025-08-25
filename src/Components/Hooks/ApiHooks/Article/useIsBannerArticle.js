import { useQuery } from "@tanstack/react-query"
import { fetchBannerArticles } from "../../../../API/article.api"


export const useIsBannerArticle = (isBanner) => {
  return useQuery({
    queryKey: ['bannerArticle'],
    queryFn: fetchBannerArticles,
    enabled: !!isBanner
  })
}