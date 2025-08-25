import styled from "styled-components";
import { formatDateOnly } from "../../Hooks/Utils/formatDateOnly";
import { useNavigate } from "react-router-dom";

const SectionDescrip = styled.span`
  margin-top : 40px;
  font-weight: 800;
  font-size: 1.45rem;
  color : ${({ theme }) => theme.primary.red700};

  @media (max-width : 1279px) {
    font-size: 1.25rem;
  }

  @media (max-width : 767px) {
    font-size: 1rem;
  }
`;

const RelateInnerBox = styled.div`
  max-width: 1440px;
  margin : 0 auto;
  padding : 0 40px;

  @media (max-width : 1279px) {
    max-width: 100%;
    padding : 0 24px;
  }

  @media (max-width : 767px) {
    max-width: 100%;
    padding : 0 16px;
  }
`;

const RelateLists = styled.ul`
  margin-top: 16px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap : 16px;

  @media (max-width : 767px) {
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: ${({ $length }) => $length && `repeat(${$length}, 80px)`};

    gap: 8px;
  }
`;

const RelateItems = styled.li`
  width: 100%;
  height: 320px;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;

  @media (max-width : 767px) {
    height: 100%;
  }

  &:hover {
    & > article {
      & > img {
        transform: scale(1.05);
      }

      & > div {
        
        & > h1 {
          text-decoration: underline;
        }
      }

    }
  }
  
  & > article {
    position: relative;
    width: 100%;
    height: 100%;

    & > .article-date {
      color : ${({ theme }) => theme.neutral.gray300};
      position: absolute;
      right : 8px;
      bottom : 8px;
      font-size: .8rem;

     
      @media (max-width : 1279px) {
        font-size: .73rem;
      }

      @media (max-width : 767px) {
        display: none;
      }
    }

    &::after {
      position: absolute;
      top : 0; bottom : 0; right : 0; left : 0;
      width: 100%;
      height: 100%;
      content: "";
      background: linear-gradient(to top, rgba(0, 0, 0, 0.65) 40%, transparent 100%);
    }
  }
`;

const RelateBannerImg = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  display: block;
  transition: transform 0.8s;
`;

const RelateTextBox = styled.div`
  z-index: 1;
  position: absolute;
  bottom : 0;
  margin : 4px 12px;
  margin-bottom : 24px;

  @media (max-width : 767px) {
    margin : 4px 8px;
    left : 0; right : 0; bottom :0; top : 0;

    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  & > span {
    font-size: .95rem;
    font-weight: bold;
    color : ${({ theme }) => theme.primary.red700};

    @media (max-width : 1279px) {
      font-size: .88rem;
    }

    @media (max-width : 1279px) {
      font-size: .75rem;
    }
  }

  & > h1 {
    margin-top : 8px;
    color : ${({ theme }) => theme.neutral.gray100};
    line-height: 1.3;
    font-size: 1.1rem;

    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (max-width : 1279px) {
      font-size: .95rem;
    }

    @media (max-width : 1279px) {
      font-size: .85rem;
    }
  }
`;

function RelatedArticles({ relatedArticles, lenght }) {
  const navigate = useNavigate();

  return (
    <RelateInnerBox>
      <SectionDescrip>연관된 기사</SectionDescrip>
      <RelateLists $length={lenght && lenght}>
        {
          relatedArticles.map((article) => (
            <RelateItems key={article.articleId} onClick={() => {
              navigate(`/news/${article.articleId}`);
            }}>
              <article>
                <RelateBannerImg src={article.articleBanner} />
                <RelateTextBox>
                  <span>{article.category.categoryName}</span>
                  <h1>{article.articleTitle}</h1>
                </RelateTextBox>
                <span className="article-date">{relatedArticles.length !== 0 && formatDateOnly(article.createdAt)}</span>
              </article>
            </RelateItems>
          ))
        }
      </RelateLists>
    </RelateInnerBox>
  )
}

export default RelatedArticles;