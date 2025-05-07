import { useQuery } from "@tanstack/react-query"
import { fetchDriveArticles } from "../../../../API/generalAPI/generalArticle.api"



export const useFetchDriveArticles = () => {
  return useQuery({
    queryKey: ['driveArticle'],
    queryFn: fetchDriveArticles
  });
}