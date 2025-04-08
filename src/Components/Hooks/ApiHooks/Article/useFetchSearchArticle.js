import { useQuery } from "@tanstack/react-query"
import { fetchSearchArticle } from "../../../../API/article.api"


export const useFetchSearchArticle = (currentPage, categoryId, query) => {
  return useQuery({
    queryKey: ['search-articles', currentPage, categoryId, query],
    queryFn: () => fetchSearchArticle(currentPage, categoryId, query),
    enabled: !!query
  })
}