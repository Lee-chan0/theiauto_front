import ArticleLists from "./Articlelists/ArticleLists";
import { ManagementContainer } from "./ArticleManagement.style";
import ManagementHeader from "./Header/ManagementHeader";
import SearchWithArticleCount from "./SearchwithArticleCount/SearchWithArticleCount";
import { useFetchCategoryByArticle } from '../../../../../../Hooks/ApiHooks/Article/useFetchCategoryByArticle';
import { useSideNavState } from "../../../../../../Hooks/Context/SideNavStateContext";
import { useFetchImportantArticle } from "../../../../../../Hooks/ApiHooks/Article/useFetchImportantArticle";
import { useFetchSearchArticle } from "../../../../../../Hooks/ApiHooks/Article/useFetchSearchArticle";
import { useSearchParams } from "react-router-dom";
import { useIsBannerArticle } from "../../../../../../Hooks/ApiHooks/Article/useIsBannerArticle";

function ArticleManagement({ setIsSearchBarActive, isSearchBarActive }) {
  const [searchString, setSearchString] = useSearchParams();
  const query = searchString.get("query") || "";
  const category_id = searchString.get("category") || "none";
  const page = searchString.get("page") || 1;
  const isBanner = searchString.get('isBanner') || "";
  const { needImportant } = useSideNavState();
  let articleData;
  const { data: categoryByArticles, isLoading } = useFetchCategoryByArticle(page, category_id);
  const { data: importantArticle } = useFetchImportantArticle(page, needImportant);
  const { data: searchArticles } = useFetchSearchArticle(page, category_id, query);
  const { data: bannerArticle } = useIsBannerArticle(isBanner === 'true');

  if (needImportant) {
    articleData = importantArticle;
  } else if (isBanner === 'true') {
    articleData = bannerArticle;
  } else if (!query) {
    articleData = categoryByArticles;
  } else {
    articleData = searchArticles;
  }

  const total =
    needImportant
      ? importantArticle?.total
      : isBanner === 'true'
        ? bannerArticle?.filteredArticles?.length ?? 0
        : !query
          ? categoryByArticles?.total
          : searchArticles?.total;

  const categoryName = categoryByArticles?.hasCategory ?
    categoryByArticles?.filteredArticles?.[0]?.category?.categoryName ?? "" : "전체";

  return (
    <ManagementContainer>
      <ManagementHeader />
      <SearchWithArticleCount
        total={total}
        categoryName={categoryName}
        query={query}
        needImportant={needImportant}
        setIsSearchBarActive={setIsSearchBarActive}
        isSearchBarActive={isSearchBarActive}
        isBanner={isBanner}
      />
      <ArticleLists
        data={articleData}
        searchString={searchString}
        setSearchString={setSearchString}
        isLoading={isLoading}
      />
    </ManagementContainer>
  )
}

export default ArticleManagement;