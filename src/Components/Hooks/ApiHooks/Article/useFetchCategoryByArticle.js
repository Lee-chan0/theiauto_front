import { useQuery } from "@tanstack/react-query"
import { fetchCategoryByArticle } from "../../../../API/article.api";

export const useFetchCategoryByArticle = (currentPage, categoryId) => {

  return useQuery({
    queryKey: ['articles', currentPage, categoryId],
    queryFn: () => fetchCategoryByArticle(categoryId, currentPage),
    staleTime: 1000 * 60 * 5
  });
};