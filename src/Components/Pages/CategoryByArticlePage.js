import { useParams } from "react-router-dom";
import NavigationMenuBar from "../Common/NavigationMenu/NavigationMenuBar";
import AutoTitles from "../Common/AutoTitles/AutoTitles";
import CategoryByArticles from "../Common/CategoryByArticles/CategoryByArticles";
import CategoryBanner from "../Common/CategoryBanner/CategoryBanner";
import PageTitleSection from "../Common/PageTitleSection/PageTitleSection";
import { fetchCategoryName } from "../../API/generalAPI/generalCategory.api";
import { useQuery } from "@tanstack/react-query";

function CategoryByArticlePage() {
  const { categoryId_param } = useParams();
  const { data: categoryName } = useQuery({
    queryKey: ['category', categoryId_param],
    queryFn: () => fetchCategoryName(categoryId_param)
  });
  const category = categoryName?.categoryInfo || "";


  return (
    <>
      <NavigationMenuBar />
      <AutoTitles />
      <CategoryBanner categoryId={categoryId_param} />
      <PageTitleSection categoryId={categoryId_param} categoryInfo={category} />
      <CategoryByArticles categoryId={categoryId_param} categoryInfo={category} />
    </>
  )
}

export default CategoryByArticlePage;