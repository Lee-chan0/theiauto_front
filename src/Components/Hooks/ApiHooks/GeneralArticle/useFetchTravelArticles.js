import { useQuery } from "@tanstack/react-query"
import { fetchTravelArticles } from "../../../../API/generalAPI/generalArticle.api"



export const useFetchTravelArticle = () => {
  return useQuery({
    queryKey: ['travel-news'],
    queryFn: fetchTravelArticles
  })
};