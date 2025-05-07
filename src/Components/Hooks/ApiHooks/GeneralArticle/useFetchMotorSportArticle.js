import { useQuery } from "@tanstack/react-query"
import { fetchMotorSportsArticle } from "../../../../API/generalAPI/generalArticle.api"



export const useFetchMotorSportsArticle = () => {
  return useQuery({
    queryKey: ['motorsportArticle'],
    queryFn: fetchMotorSportsArticle
  });
};