import { ArticleListContainer, ArticleListItem, ArticleListBox, BorderBottom } from './ArticleLists.style';
import { BiSolidStar } from "react-icons/bi";
import { BiStar } from "react-icons/bi";
import { BsFillPatchCheckFill } from "react-icons/bs";
import PageNumber from './PageNumber';
import { useNavigate } from 'react-router-dom';
import { useUpdateImportant } from '../../../../../../../Hooks/ApiHooks/Article/useUpdateImportant';

function ArticleLists({ data: categoryByArticles, setSearchString, searchString }) {
  const importantMutation = useUpdateImportant();
  const navigate = useNavigate();

  const fetchedArticles = categoryByArticles?.filteredArticles || [];
  const { totalPage } = categoryByArticles || 0;

  function formatDateOnly(dateInput) {
    const date = new Date(dateInput);
    return date.toISOString().substring(0, 10);
  }

  const clickStar = (e, isImportant, articleId) => {
    e.preventDefault();
    importantMutation.mutate({ isImportant: !isImportant, articleId });
  }

  const articleForm = ['중요', '카테고리', '제목', '글쓴이', '날짜', '확인'];

  return (
    <ArticleListBox>
      <ArticleListContainer>
        {
          articleForm.map((item, i) => (
            <ArticleListItem key={i}><strong>{item}</strong></ArticleListItem>
          ))
        }
      </ArticleListContainer>
      <BorderBottom />
      {
        fetchedArticles.map(({ articleId, articleTitle,
          isImportant, createdAt, category, admin }) => {
          const { categoryName } = category;
          const { name, rank } = admin;

          return (
            <ArticleListContainer className='article-list' key={articleId}>
              <ArticleListItem className='is-important' onClick={(e) => clickStar(e, isImportant, articleId)}>
                {isImportant ? <BiSolidStar color='yellowgreen' size={14} /> : <BiStar color='yellowgreen' size={14} />}
              </ArticleListItem>
              <ArticleListItem className='category-name'>{categoryName}</ArticleListItem>
              <ArticleListItem
                className='article-title'
                onClick={() => navigate(`/theiautoCMS/adminpage/update-article/${articleId}`)}>
                {articleTitle}
              </ArticleListItem>
              <ArticleListItem className='author'>{name} {rank}</ArticleListItem>
              <ArticleListItem className='date'>{formatDateOnly(createdAt)}</ArticleListItem>
              <ArticleListItem className='confirm'><BsFillPatchCheckFill size={16} /></ArticleListItem>
            </ArticleListContainer>
          )
        })
      }
      {
        fetchedArticles.length !== 0 &&
        <PageNumber totalPage={totalPage} setSearchString={setSearchString} searchString={searchString} />
      }
    </ArticleListBox>
  )
}

export default ArticleLists;