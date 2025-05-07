import { useEffect, useMemo, useRef, useState } from "react";
import { useFetchBannerArticle } from "../../Hooks/ApiHooks/GeneralArticle/useFetchBannerArticle";
import styled from "styled-components";

const AutoWrapper = styled.section`
  width: 100%;
  background-color: ${({ theme }) => theme.neutral.gray900};
`;

const AutoInnerBox = styled.article`
  max-width: 1280px;
  margin : 0 auto;
  padding : 0 40px;
  height: 64px;
  overflow: hidden;
`;

const AutoTitleContainer = styled.ul`
  padding : 12px 0;
  display: flex;
  transition: transform 0.5s ease;
  will-change: transform;
  flex-direction: column;
`;

const AutoTitleItems = styled.li`
  display: flex;
  align-items: center;
  height: 40px;
  gap: 24px;

  & > .category-title {
    font-weight: bold;
    font-size: .85rem;
    color : ${({ theme }) => theme.primary.red700};
  }

  & > .article-title {
    font-weight: normal;
    font-size: .85rem;
    cursor: pointer;
    color  :${({ theme }) => theme.neutral.gray300};

    &:hover {
      text-decoration: underline;
    }
  }
`;

function AutoTitles() {
  const indexRef = useRef(null);
  const slideRef = useRef(null);
  const [autoArticleArray, setAutoArticleArray] = useState([]);
  const { data: autoTitleArticle } = useFetchBannerArticle();
  const autoTitles = useMemo(() => autoTitleArticle?.bannerArticles || [], [autoTitleArticle]);

  useEffect(() => {
    if (autoTitles.length === 0) return;

    setAutoArticleArray([...autoTitles, autoTitles[0]]);
  }, [autoTitles]);


  useEffect(() => {
    if (!slideRef.current) return;

    const container = slideRef.current;
    let transformAmount = 0;
    let timeoutId = null;

    if (indexRef.current) {
      clearInterval(indexRef.current);
    }

    indexRef.current = setInterval(() => {
      transformAmount += 40;

      container.style.transition = `transform 0.5s`;
      container.style.transform = `translateY(-${transformAmount}px)`;

      if (transformAmount === autoTitles.length * 40) {
        timeoutId = setTimeout(() => {
          container.style.transition = 'none';
          container.style.transform = 'translateY(0px)';
          transformAmount = 0;
        }, 500);
      }
    }, 3000);


    return () => {
      clearInterval(indexRef.current);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [autoTitles]);

  return (
    <>
      <AutoWrapper>
        <AutoInnerBox>
          <AutoTitleContainer ref={slideRef}>
            {
              autoArticleArray.length !== 0 &&
              autoArticleArray.map((article, index) => (
                <AutoTitleItems key={index}>
                  <span className="category-title">{article.category.categoryName}</span>
                  <h5 className="article-title">{article.articleTitle}</h5>
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