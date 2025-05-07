import { useQuery } from "@tanstack/react-query"
import { fetchTodayNewsArticle } from "../../../../API/generalAPI/generalArticle.api"



export const useFetchTodayArticle = () => {
  return useQuery({
    queryKey: ['todayArticle'],
    queryFn: fetchTodayNewsArticle
  })
}