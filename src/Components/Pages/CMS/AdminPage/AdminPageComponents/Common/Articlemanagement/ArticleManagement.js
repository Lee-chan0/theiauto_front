import ArticleLists from "./Articlelists/ArticleLists";
import { ManagementContainer } from "./ArticleManagement.style";
import ManagementHeader from "./Header/ManagementHeader";
import SearchWithArticleCount from "./SearchwithArticleCount/SearchWithArticleCount";
import { useFetchCategoryByArticle } from '../../../../../../Hooks/ApiHooks/Article/useFetchCategoryByArticle';
import { useSideNavState } from "../../../../../../Hooks/Context/SideNavStateContext";
import { useFetchImportantArticle } from "../../../../../../Hooks/ApiHooks/Article/useFetchImportantArticle";
import { useFetchSearchArticle } from "../../../../../../Hooks/ApiHooks/Article/useFetchSearchArticle";
import { useSearchParams } from "react-router-dom";

function ArticleManagement({ setIsSearchBarActive, isSearchBarActive }) {
  const [searchString, setSearchString] = useSearchParams();
  const query = searchString.get("query") || "";
  const category_id = searchString.get("category") || "none";
  const page = searchString.get("page") || 1;
  const { needImportant } = useSideNavState();
  const { data: categoryByArticles, isLoading } = useFetchCategoryByArticle(page, category_id);
  const { data: importantArticle } = useFetchImportantArticle(page, needImportant);
  const { data: searchArticles } = useFetchSearchArticle(page, category_id, query);

  const categoryName = categoryByArticles?.hasCategory ?
    categoryByArticles?.filteredArticles?.[0]?.category?.categoryName ?? "" : "전체"

  return (
    <ManagementContainer>
      <ManagementHeader />
      <SearchWithArticleCount
        total={needImportant ? importantArticle?.total : !query ? categoryByArticles?.total : searchArticles?.total}
        categoryName={categoryName}
        query={query}
        needImportant={needImportant}
        setIsSearchBarActive={setIsSearchBarActive}
        isSearchBarActive={isSearchBarActive}
      />
      <ArticleLists
        data={needImportant ? importantArticle : !query ? categoryByArticles : searchArticles}
        searchString={searchString}
        setSearchString={setSearchString}
        isLoading={isLoading}
      />
    </ManagementContainer>
  )
}

export default ArticleManagement;