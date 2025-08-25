import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import AutoTitles from "../Common/AutoTitles/AutoTitles";
import CategoryByArticles from "../Common/CategoryByArticles/CategoryByArticles";
import CategoryBanner from "../Common/CategoryBanner/CategoryBanner";
import PageTitleSection from "../Common/PageTitleSection/PageTitleSection";
import { fetchCategoryName } from "../../API/generalAPI/generalCategory.api";
import { useQuery } from "@tanstack/react-query";
import HandleScrollTopBtn from "../Features/HandleScrollTopBtn/HandleScrollTopBtn";
import { useMediaQuery } from "react-responsive";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

function CategoryByArticlePage({ mode }) {
  const { categoryId_param } = useParams();
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');
  const { data: categoryName, isLoading, isError } = useQuery({
    queryKey: ['category', categoryId_param],
    queryFn: () => fetchCategoryName(categoryId_param),
    enabled: mode !== 'search' && !!categoryId_param
  });
  const category = categoryName?.categoryInfo || "";
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      navigate('/error');
    }
  }, [navigate, isError]);

  if (isError) return null;

  return (
    <>
      {!keyword
        ?
        <Helmet>
          <title>{category?.categoryName || '최신 자동차 뉴스'} : 더아이오토 기사 목록</title>
          <meta name="description" content={`${category?.categoryName || '최신 자동차 뉴스'} 관련 최신 기사와 정보를 확인하세요.`} />
          <meta property="og:title" content={`${category?.categoryName || '최신 자동차 뉴스'} | 더아이오토`} />
          <meta property="og:description" content={`${category?.categoryName || '자동차'} 관련 소식과 기사들을 모았습니다.`} />
          <meta property="og:image" content="" />
        </Helmet>
        :
        <Helmet>
          <title>"{keyword}" 검색 결과 | 더아이오토</title>
          <meta name="description" content="검색 결과를 기반으로 자동차 관련 기사들을 확인하세요." />
          <meta property="og:title" content={`${keyword}에 대한 검색 결과`} />
          <meta property="og:description" content={`입력하신 키워드 : ${keyword}에 맞는 더 아이오토 기사 검색 결과입니다.`} />
          <meta property="og:image" content="" />
        </Helmet>
      }
      <AutoTitles />
      {mode !== 'search' && <CategoryBanner categoryId={categoryId_param} isMobile={isMobile} />}
      <PageTitleSection categoryId={categoryId_param} categoryInfo={category} mode={mode} keyword={keyword} isLoading={isLoading} />
      <CategoryByArticles categoryId={categoryId_param} categoryInfo={category} mode={mode} keyword={keyword} isMobile={isMobile} isCategoryLoading={isLoading} />
      <HandleScrollTopBtn />
    </>
  )
}

export default CategoryByArticlePage;