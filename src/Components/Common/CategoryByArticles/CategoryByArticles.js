import { useInfiniteQuery } from '@tanstack/react-query';
import { ImageBox, LayoutContainer, ListContainer, ListItems, MainContainer, MainInnerBox, SideContainer, TagBox, TagItems, TextBox } from './CategoryByArticles.style';
import { fetchCategoryByArticles } from '../../../API/generalAPI/generalArticle.api';
import React from 'react';
import { htmlToPlainText } from '../../Hooks/Utils/htmlToPlainText';
import { formatDateOnly } from '../../Hooks/Utils/formatDateOnly';
import CategoryBannerSide from '../CategoryBannerSide/CategoryBannerSide';


function CategoryByArticles({ categoryId, categoryInfo }) {
  const { data: categoryArticles, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['articles', categoryId],
    queryFn: ({ pageParam = 1 }) => fetchCategoryByArticles(categoryId, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastParam, allPages) => {
      return lastParam.hasMore ? allPages.length + 1 : undefined;
    }
  });

  return (
    <MainContainer>
      <MainInnerBox>
        <LayoutContainer>
          <ListContainer>
            {
              categoryArticles?.pages.map((group, i) => (
                <React.Fragment key={i}>
                  {
                    group.categoryArticles.map((article, i) => (
                      <ListItems key={i}>
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
                  }
                </React.Fragment>
              ))
            }
          </ListContainer>
          <aside>
            <CategoryBannerSide categoryInfo={categoryInfo} />
          </aside>
        </LayoutContainer>
        <button onClick={() => fetchNextPage()}>더보기</button>
      </MainInnerBox>
    </MainContainer>
  )
}

export default CategoryByArticles;