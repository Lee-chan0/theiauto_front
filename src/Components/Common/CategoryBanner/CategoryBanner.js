import styled, { css } from "styled-components";
import { fetchCategoryBannerArticle } from "../../../API/generalAPI/generalArticle.api";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const Container = styled.section`
  width: 100%;
  background-image : linear-gradient(to bottom, #1a1a1a 50%, transparent 100%);
`;

const InnerBox = styled.div`
  max-width: 1280px;
  margin : 0 auto;
  padding : 0 40px;
`;

const LayoutContainer = styled.div`
  display: flex;
  gap : 16px;
`;

const ContentBox = styled.article`
  flex : 1;
min-width: 650px;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;

  &::after {
    content: "";
    position: absolute;
    bottom : 0; left : 0; top : 0; right : 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.5) 20%, transparent 100%);
  }

  &:hover {
    & > .news-image {
      transform : scale(1.05);
    }

    & > .title-box {
      & > .news-title {
        text-decoration: underline;
      }
    }
  }
`;

const MainImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 420px;
  transition : transform 1s;
`;

const textStyle = css`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MainTitleBox = styled.div`
  position: absolute;
  bottom : 0;
  z-index: 1;
  margin: 24px;

  display: flex;
  flex-direction: column;
  gap : 16px;

  & > .news-title {
    color : ${({ theme }) => theme.neutral.gray100};
    ${textStyle};
  }

  & > .news-sub-title {
    color : ${({ theme }) => theme.neutral.gray300};
    font-size: 1rem;
    font-weight: 400;
    ${textStyle};
  }
`;

const TagContainer = styled.div`
  color : ${({ theme }) => theme.primary.red700};
  display: flex;
  gap: 20px;
`;

const TagTextBox = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.neutral.gray900};
  padding : 2px 8px;
  border-radius: 4px;

  & > .news-tag {
    font-size: 0.9rem;
    font-weight: bold;
    margin-left: 2px;
  }
`;


function CategoryBanner({ categoryId }) {
  const { data: categoryBannerArticle } = useQuery({
    queryKey: ['article', categoryId],
    queryFn: () => fetchCategoryBannerArticle(categoryId)
  });
  const bannerArticle = categoryBannerArticle?.categoryBannerArticle || "";

  return (
    <Container>
      <InnerBox>
        <LayoutContainer>
          <ContentBox>
            <MainImage className="news-image" src={bannerArticle?.articleBanner} alt="banner-main-image" />
            <MainTitleBox className="title-box">
              <TagContainer>
                {
                  Array.isArray(bannerArticle?.ArticleTag) &&
                  bannerArticle?.ArticleTag.slice(0, 3).map((t, i) => (
                    <TagTextBox key={i}>
                      <strong style={{ fontSize: '1.1rem' }}>#</strong>
                      <span className="news-tag">{t.tag.tagName}</span>
                    </TagTextBox>
                  ))
                }
              </TagContainer>
              <h2 className="news-title">{bannerArticle?.articleTitle}</h2>
              <h3 className="news-sub-title">{bannerArticle?.articleSubTitle}</h3>
            </MainTitleBox>
          </ContentBox>
          <div style={{ display: 'flex', gap: '8px', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ width: '173px', height: '180px', border: '3px solid white' }}></div>
            <div style={{ width: '226px', height: '223px', border: '3px solid white' }}></div>
          </div>
        </LayoutContainer>
      </InnerBox>
    </Container>
  )
}

export default CategoryBanner;