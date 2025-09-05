import { ArticleListContainer, ArticleListItem, ArticleListBox, BorderBottom, LoadingContainer } from './ArticleLists.style';
import { BiSolidStar } from "react-icons/bi";
import { BiStar } from "react-icons/bi";
import { BsFillPatchCheckFill } from "react-icons/bs";
import PageNumber from './PageNumber';
import { useNavigate } from 'react-router-dom';
import { useUpdateImportant } from '../../../../../../../Hooks/ApiHooks/Article/useUpdateImportant';
import { formatDateOnly } from '../../../../../../../Hooks/Utils/formatDateOnly';
import { CgSpinner } from "react-icons/cg";
import { useMediaQuery } from 'react-responsive';
import { useSideNavState } from '../../../../../../../Hooks/Context/SideNavStateContext';

function ArticleLists({ data: categoryByArticles, setSearchString, searchString, isLoading }) {
  const importantMutation = useUpdateImportant();
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const { setMobileMenuActive } = useSideNavState();

  const fetchedArticles = categoryByArticles?.filteredArticles || [];
  const { totalPage } = categoryByArticles || 0;

  const clickStar = (e, isImportant, articleId) => {
    e.preventDefault();
    importantMutation.mutate({ isImportant: !isImportant, articleId });
  }

  const articleForm = isMobile
    ? ['제목', '날짜']
    : ['번호', '중요', '카테고리', '제목', '글쓴이', '날짜', '확인'];

  if (isLoading) {
    return (
      <LoadingContainer>
        <CgSpinner size={32} />
      </LoadingContainer>
    )
  }

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
              {!isMobile && <ArticleListItem className='article-number'>{articleId}</ArticleListItem>}
              {
                !isMobile &&
                <ArticleListItem className='is-important' onClick={(e) => clickStar(e, isImportant, articleId)}>
                  {isImportant ? <BiSolidStar color='#d1232a' size={14} /> : <BiStar color='#d1232a' size={14} />}
                </ArticleListItem>
              }
              {!isMobile && <ArticleListItem className='category-name'>{categoryName}</ArticleListItem>}
              <ArticleListItem
                className='article-title'
                onClick={() => {
                  setMobileMenuActive(false);
                  navigate(`/theiautoCMS/adminpage/update-article/${articleId}`);
                }}>
                {articleTitle}
              </ArticleListItem>
              {!isMobile && <ArticleListItem className='author'>{name} {rank}</ArticleListItem>}
              <ArticleListItem className='date'>{formatDateOnly(createdAt)}</ArticleListItem>
              {!isMobile &&
                <ArticleListItem
                  className='confirm'
                  onClick={() => window.open(`/news/${articleId}`, '_blank')}
                >
                  <BsFillPatchCheckFill size={16} />
                </ArticleListItem>}
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