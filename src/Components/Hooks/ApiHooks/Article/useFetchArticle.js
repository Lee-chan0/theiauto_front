import { useQuery } from "@tanstack/react-query";
import { fetchArticle } from "../../../../API/article.api";



export function useFetchArticle(articleId) {
  return useQuery({
    queryKey: ['article', articleId],
    queryFn: () => fetchArticle(articleId),
    enabled: !!articleId
  });
};