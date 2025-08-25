import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchArticle, fetchRelatedTags } from "../../API/generalAPI/generalArticle.api";
import NewsTopBanner from "../Common/NewsTopBanner/NewsTopBanner";
import NewsContentSection from "../Common/NewsContentSection/NewsContentSection";
import { useEffect, useMemo, useRef, useState } from "react";
import RelatedArticles from "../Common/RelatedArticles/RelatedArticles";
import HandleScrollTopBtn from "../Features/HandleScrollTopBtn/HandleScrollTopBtn";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import NewsLoadingPage from "./NewsLoadingPage";
import { Helmet } from "react-helmet-async";

const RelateMainContainer = styled.section`
  display: ${({ $count }) => $count === 0 ? 'none' : 'block'};
  width: 100%;
  padding : 40px 0;

  @media (max-width : 1279px) {
    padding : 24px 0;
  }

  @media (max-width : 767px) {
    padding : 16px 0;
  }
`;

function NewsPage() {
  const stickyCheckRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);
  const { articleId_param } = useParams();
  const { data: articleInfo, isLoading } = useQuery({ queryKey: ['article', articleId_param], queryFn: () => fetchArticle(articleId_param) });
  const { data: relatedTagArticles, isLoading: relatedLoading } = useQuery({
    queryKey: ['tags', articleId_param],
    queryFn: () => fetchRelatedTags(articleId_param)
  })
  const relatedArticles = useMemo(() => relatedTagArticles?.findRelateArticles || [], [relatedTagArticles]);
  const newsData = articleInfo?.news || "";
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    if (isLoading || relatedLoading || !stickyCheckRef.current) return;

    const target = stickyCheckRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => setIsSticky(!entry.isIntersecting),
      { threshold: [1] }
    );

    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    }
  }, [isLoading, relatedLoading]);

  if (isLoading || relatedLoading) {
    return <NewsLoadingPage />
  }

  return (
    <>
      <Helmet>
        <title>{newsData?.articleTitle || '뉴스'} | 더아이오토</title>
        <meta name="description" content={`${newsData?.articleSubTitle}` || '자동차 전문 기사'} />
        <meta property="og:title" content={`${newsData?.articleTitle}` || '자동차 뉴스'} />
        <meta property="og:description" content={`${newsData?.articleSubTitle}` || '더아이오토 기사'} />
        <meta property="og:image" content={`${newsData?.articleBanner}` || ''} />
      </Helmet>
      <article style={{ width: '100%' }}>
        <NewsTopBanner newsData={newsData} stickyCheckRef={stickyCheckRef} isMobile={isMobile} />
        <NewsContentSection newsData={newsData} isSticky={isSticky} isMobile={isMobile} />
      </article>
      <RelateMainContainer $count={relatedArticles?.length ?? 0}>
        <RelatedArticles relatedArticles={relatedArticles} lenght={relatedArticles?.length !== 0 && relatedArticles.length} />
      </RelateMainContainer>
      <HandleScrollTopBtn />
    </>
  )
}

export default NewsPage;