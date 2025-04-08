import { useQuery } from "@tanstack/react-query"
import { fetchImportantArticle } from "../../../../API/article.api"

export const useFetchImportantArticle = (page, needImportant) => {
  return useQuery({
    queryKey: ['importantArticle', page],
    queryFn: () => fetchImportantArticle(page),
    enabled: !!needImportant
  });
}