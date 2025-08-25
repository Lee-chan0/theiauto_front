import { useInfiniteQuery } from '@tanstack/react-query';
import {
  ImageBox, ItemSkeleton, LayoutContainer, ListContainer, ListItems,
  ListSkeleton,
  MainContainer, MainInnerBox, SkeletonLayout, SkeletonSide, TagBox, TagItems, TextBox
} from './CategoryByArticles.style';
import { fetchCategoryByArticles, fetchSearchArticles } from '../../../API/generalAPI/generalArticle.api';
import React, { useEffect, useState } from 'react';
import { htmlToPlainText } from '../../Hooks/Utils/htmlToPlainText';
import { formatDateOnly } from '../../Hooks/Utils/formatDateOnly';
import styled, { keyframes, css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import HomeAd from '../HomeAd/HomeAd';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const FetchArticleBtn = styled.button`
  width: 80%;
  border : none;
  padding : 16px 0;
  background-color: ${({ theme }) => theme.neutral.gray100};
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1) inset;
  font-size: .9rem;
  color : ${({ theme }) => theme.neutral.gray300};
  cursor: pointer;
  transition: background-color 0.6s, color 0.4s;
  margin-top : 16px;
  border-radius: 4px;

  & > svg {
    ${({ $isFetching }) =>
    $isFetching &&
    css`
        animation: ${spin} 1s linear infinite;
      `}
  }

  &:hover {
    background-color: ${({ theme }) => theme.neutral.gray300};
    color : ${({ theme }) => theme.neutral.gray100};
  }

  @media (max-width : 1279px) {
    font-size: .83rem;
  }

  @media (max-width : 1024px) {
    width: 100%;
  }

  @media (max-width : 767px) {
    width: 100%;
    padding : 12px 0;
  }
`;

const RandomItems = styled.li`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 280px;
  gap: 16px;

  @media (max-width : 767px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(5, 80px);
  }
`;

const RandomArticleBox = styled.article`
  width: 100%;
  height: 100%;
  background-image: url(${({ $src }) => $src});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 8px 1px rgba(0, 0, 0, 0.6);

  &:hover {
    & > img {
      transform: scale(1.05);
    }


    & > div {
      & > h1 {
        text-decoration: underline;
      }
    }
  }

  &::after {
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.7) 20%, transparent 100%);
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0; right: 0; bottom : 0; top : 0;
    content: "";
  }
`;

const RandomArticleImg = styled.img`
  display: block;
  position: absolute;
  object-fit: cover;
  width: 100%;
  height: 100%;
  transition: transform 0.5s;
`;

const RandomTextBox = styled.div`
  position: absolute;
  bottom : 0;
  margin : 12px 8px;
  z-index: 1;

  display: flex;
  flex-direction: column;
  gap : 8px;

  & > h1 {
    font-size: 1.05rem;
    line-height: 1.3;
    color : ${({ theme }) => theme.neutral.gray100};

    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (max-width : 1279px) {
      font-size: 1rem;
    }

    @media (max-width : 767px) {
      font-size: .85rem;
    }
  }

  & > span {
    font-size: 1rem;
    color : ${({ theme }) => theme.primary.red700};
    font-weight: bold;

    @media (max-width : 1279px) {
      font-size: .95rem;
    }

    @media (max-width : 767px) {
      font-size: .85rem;
    }
  }
`;


function CategoryByArticles({ categoryId, categoryInfo, mode, keyword, isMobile, isCategoryLoading }) {
  const [hasArticles, setHasArticles] = useState(false);
  const { data: categoryArticles, hasNextPage: hasNextCategory,
    fetchNextPage: fetchNextCategory, isFetchingNextPage: isFetchingNextCategory,
    isLoading: isCategoryArticleLoading, isError: isCategoryArticleError } = useInfiniteQuery({
      queryKey: ['articles', categoryId],
      queryFn: ({ pageParam = 1 }) => fetchCategoryByArticles(categoryId, pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastParam, allPages) => {
        return lastParam.hasMore ? allPages.length + 1 : undefined;
      },
      enabled: mode !== 'search' && !!categoryId
    });

  const { data: searchArticles, hasNextPage: hasNextSearch,
    fetchNextPage: fetchNextSearch, isFetchingNextPage: isFetchingNextSearch,
    isLoading: isSearchArticleLoading, isError: isSearchArticleError } = useInfiniteQuery({
      queryKey: ['articles', keyword],
      queryFn: ({ pageParam = 1 }) => fetchSearchArticles(keyword, pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastParam, allPages) => {
        return lastParam.hasMore ? allPages.length + 1 : undefined;
      }
    });
  const navigate = useNavigate();
  const sideControler = useMediaQuery({ maxWidth: 1024 });

  const articlesToRender = mode === 'search' ? searchArticles : categoryArticles;
  const hasNext = mode === 'search' ? hasNextSearch : hasNextCategory;
  const fetchNext = mode === 'search' ? fetchNextSearch : fetchNextCategory;
  const isFetchingNextPages = mode === 'search' ? isFetchingNextSearch : isFetchingNextCategory;
  const isLoading = mode === 'search' ? isSearchArticleLoading : isCategoryArticleLoading;

  useEffect(() => {
    if (!articlesToRender) return;
    articlesToRender.pages[0].findArticles ? setHasArticles(true) : setHasArticles(false);
  }, [articlesToRender]);

  useEffect(() => {
    if (isCategoryArticleError || isSearchArticleError) {
      navigate('/error');
    }
  }, [isCategoryArticleError, isSearchArticleError, navigate]);

  if (isCategoryArticleError || isSearchArticleError) return null;

  if (isLoading) {
    const emptyArray = Array.from({ length: 15 });

    return (
      <MainContainer>
        <MainInnerBox>
          <SkeletonLayout $mode={mode === 'search'}>
            <ListSkeleton>
              {
                emptyArray.map((_, i) => (
                  <ItemSkeleton key={i} />
                ))
              }
            </ListSkeleton>
            <SkeletonSide />
          </SkeletonLayout>
        </MainInnerBox>
      </MainContainer>
    )
  }


  return (
    <MainContainer $isSearch={mode === 'search'}>
      <MainInnerBox>
        {
          !hasArticles &&
          <div className='no-result-box'>
            <span className='no-result-description'><strong>"{keyword}"</strong>에 대한 검색결과가 존재하지 않습니다.</span>
            <span className='other-articles-description'>이런 기사는 어떠세요?</span>
          </div>
        }
        <LayoutContainer $hasArticles={hasArticles}>
          <ListContainer $hasArticles={hasArticles}>
            {
              articlesToRender?.pages.map((group, i) => (
                <React.Fragment key={i}>
                  {
                    group?.findArticles ?
                      group.findArticles.map((article, i) => (
                        <ListItems key={i} onClick={() => navigate(`/news/${article.articleId}`)}>
                          <article>
                            <ImageBox src={article.articleBanner} alt={`news-preview-image-${i}`} />
                            <TextBox>
                              <h2 className='news-title'>{article.articleTitle}</h2>
                              <p className='news-content'>{htmlToPlainText(article.articleContent)}</p>
                              <TagBox>
                                {
                                  article.ArticleTag.slice(0, 5).map((t, i) => (
                                    <TagItems key={i}>
                                      <strong className='news-hashtag'>#</strong>
                                      <span className='news-tag'>{t.tag.tagName}</span>
                                    </TagItems>
                                  ))
                                }
                                <span className='news-date'>{formatDateOnly(article.createdAt)}</span>
                              </TagBox>
                            </TextBox>
                          </article>
                        </ListItems>
                      ))
                      :
                      <RandomItems>
                        {
                          articlesToRender?.pages.map((group, i) => (
                            <React.Fragment key={i}>
                              {
                                group?.randomArticles.map((article, i) => (
                                  <RandomArticleBox key={i} onClick={() => navigate(`/news/${article.articleId}`)}>
                                    <RandomArticleImg src={article.articleBanner} />
                                    <RandomTextBox>
                                      <span>{article.category.categoryName}</span>
                                      <h1 className='card-title'>{article.articleTitle}</h1>
                                    </RandomTextBox>
                                  </RandomArticleBox>
                                ))
                              }
                            </React.Fragment>
                          ))
                        }
                      </RandomItems>
                  }
                </React.Fragment>
              ))
            }
          </ListContainer>
          {
            (hasArticles && !isMobile && !sideControler) &&
            <aside>
              <HomeAd mode={'categoryPage'} isSearch={mode === 'search'} />
            </aside>
          }
        </LayoutContainer>
        {
          hasNext
          &&
          <FetchArticleBtn
            $isFetching={isFetchingNextPages}
            onClick={() => fetchNext()}>
            {isFetchingNextPages ? <AiOutlineLoading3Quarters size={24} color='lightgray' /> : '더 보기'}
          </FetchArticleBtn>}
      </MainInnerBox>
    </MainContainer>
  )
}

export default CategoryByArticles;