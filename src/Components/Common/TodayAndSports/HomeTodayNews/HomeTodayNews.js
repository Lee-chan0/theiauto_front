import { useFetchTodayArticle } from "../../../Hooks/ApiHooks/GeneralArticle/useFetchTodayArticle";
import { formatDateOnly } from "../../../Hooks/Utils/formatDateOnly";
import { HeaderDescrip, NewsCardContainer, NewsCardItems, NewsTextBox } from "./HomeTodayNews.style";



function HomeTodayNews() {
  const { data: todayArticleArray } = useFetchTodayArticle();
  const todayArticles = todayArticleArray?.todayArticles || [];


  return (
    <div style={{ backgroundColor: '#fff', padding: '16px', borderRadius: '4px' }}>
      <HeaderDescrip>Today, 자동차 뉴스</HeaderDescrip>
      <NewsCardContainer>
        {
          todayArticles.map((todayArticle) => (
            <NewsCardItems key={todayArticle.articleId} $src={todayArticle.articleBanner}>
              <article>
                <NewsTextBox>
                  <span className="article-category">{todayArticle.category.categoryName}</span>
                  <h3 className="article-title">{todayArticle.articleTitle}</h3>
                </NewsTextBox>
                <span className="article-date">{formatDateOnly(todayArticle.createdAt)}</span>
              </article>
            </NewsCardItems>
          ))
        }
      </NewsCardContainer>
    </div>
  )
}

export default HomeTodayNews;