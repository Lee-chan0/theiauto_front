import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useFetchBannerArticle } from "../../Hooks/ApiHooks/GeneralArticle/useFetchBannerArticle";
import styled, { keyframes } from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";

const AutoWrapper = styled.section`
  width: 100%;
  position: absolute;
  top : 80px;
  z-index: 1;
  background-color: ${({ $isCategoryPage, theme }) => !$isCategoryPage && theme.neutral.gray900};
  transition: background-color 0.5s;

  &:hover {
    background-color: ${({ $isCategoryPage }) => $isCategoryPage && 'rgba(242, 242, 242, 0.85)'};
  }

  @media (max-width : 767px) {
    position: static;
    background-color: ${({ theme }) => theme.neutral.gray900};

    &:hover {
      background-color: ${({ theme }) => theme.neutral.gray900};
    }
  }
`;

const AutoInnerBox = styled.article`
  max-width: 1280px;
  margin : 0 auto;
  padding : 0 40px;
  height: 64px;
  overflow: hidden;

  @media (max-width : 1279px) {
    max-width: 100%;
    padding : 0 24px;
  }

  @media (max-width : 767px) {
    max-width: 100%;
    padding : 0 16px;
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -150% 0;
  }
  100% {
    background-position: 150% 0;
  }
`;

const AutoTitleSkeleton = styled.div`
  width: 100%;
  height: 40px;
  margin-top: 12px;
  border-radius: 8px;
  background: linear-gradient(
    90deg,
    #666666 0%,
    #777777 50%,
    #666666 100%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 2s linear infinite alternate;
`;

const AutoTitleContainer = styled.ul`
  width: 100%;
  padding : 12px 0;
  display: flex;
  transition: transform 0.5s ease;
  will-change: transform;
  flex-direction: column;
`;

const AutoTitleItems = styled.li`
  width: 100%;
  display: flex;
  align-items: center;
  height: 40px;
  gap: 24px;

  @media (max-width : 767px) {
    gap : 12px;
  }

  & > * {
    height: 100%;
    display: flex;
    align-items: center;
    white-space: nowrap;
    text-shadow: ${({ $isHover }) => $isHover ? 'none' : '0 0 2px rgba(0, 0, 0, 1)'};
  }

  & > .category-title {
    font-weight: bold;
    font-size: .85rem;
    color : ${({ theme }) => theme.primary.red700};

    @media (max-width : 767px) {
      font-size: .75rem;
    } 
  }

  & > .article-title {
    font-weight: normal;
    font-size: .85rem;
    cursor: pointer;
    color  :${({ theme, $isHover, $isCategoryPage }) => ($isHover && $isCategoryPage) ? theme.neutral.gray900 : theme.neutral.gray300};

    @media (max-width : 767px) {
      font-size: .75rem;
      width: 100%;
      display: -webkit-box;
      height: 40px;
      line-height: 40px;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: normal;
      color : ${({ theme }) => theme.neutral.gray300};
    } 
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

function AutoTitles({ isMobile }) {
  const indexRef = useRef(null);
  const slideRef = useRef(null);
  const [autoArticleArray, setAutoArticleArray] = useState([]);
  const { data: autoTitleArticle, isLoading, isError } = useFetchBannerArticle();
  const autoTitles = useMemo(() => autoTitleArticle?.bannerArticles || [], [autoTitleArticle]);
  const navigate = useNavigate();
  const transformAmount = useRef(0);
  const timeoutId = useRef(null);
  const location = useLocation();
  const isCategoryPage = location.pathname.includes('/category/');
  const [isHover, setIsHover] = useState(false);

  const startAutoSlide = useCallback(() => {
    if (autoTitles.length === 0) return;

    const container = slideRef.current;
    if (!container) return;

    indexRef.current = setInterval(() => {
      transformAmount.current += 40;
      container.style.transition = `transform 0.5s`;
      container.style.transform = `translateY(-${transformAmount.current}px)`;

      if (transformAmount.current >= autoTitles.length * 40) {
        timeoutId.current = setTimeout(() => {
          container.style.transition = 'none';
          container.style.transform = `translateY(0px)`;
          transformAmount.current = 0;
        }, 500);
      }
    }, 3000);
  }, [autoTitles]);

  const clearAutoSlide = () => {
    clearInterval(indexRef.current);
    clearTimeout(timeoutId.current);
  }

  useEffect(() => {
    if (autoTitles.length === 0) return;

    setAutoArticleArray([...autoTitles, autoTitles[0]]);
  }, [autoTitles]);

  useEffect(() => {
    clearAutoSlide();
    startAutoSlide();

    return () => clearAutoSlide();
  }, [autoTitles, startAutoSlide]);

  useEffect(() => {
    if (isError) {
      navigate('/error');
    }
  }, [navigate, isError]);

  if (isError) return null;

  if (isLoading) {
    return (
      <AutoWrapper>
        <AutoInnerBox>
          <AutoTitleSkeleton />
        </AutoInnerBox>
      </AutoWrapper>
    )
  }

  return (
    <>
      <AutoWrapper $isCategoryPage={isCategoryPage} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
        <AutoInnerBox>
          <AutoTitleContainer ref={slideRef}>
            {
              autoArticleArray.length !== 0 &&
              autoArticleArray.map((article, index) => (
                <AutoTitleItems
                  $isCategoryPage={isCategoryPage}
                  key={index}
                  onClick={() => navigate(`/news/${article.articleId}`)}
                  $isHover={isHover}
                >
                  <span className="category-title">{article.category.categoryName}</span>
                  <h5
                    onMouseEnter={clearAutoSlide}
                    onMouseLeave={startAutoSlide}
                    className="article-title">{article.articleTitle}</h5>
                </AutoTitleItems>
              ))
            }
          </AutoTitleContainer>
        </AutoInnerBox>
      </AutoWrapper>
    </>
  )
}

export default AutoTitles;