import styled, { css, keyframes } from "styled-components";
import { useFetchBrandITArticles } from "../../Hooks/ApiHooks/GeneralArticle/useFetchBrandITArticles";
import { formatDateOnly } from "../../Hooks/Utils/formatDateOnly";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { useCategoryRedirect } from "../../Hooks/CommonHooks/useCategoryRedirect";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import GoToCategoryBtn from "../../Features/GoToCategoryBtn/GoToCategoryBtn";
import { useMediaQuery } from "react-responsive";

const LifeItContainer = styled.section`
  width: 100%;

  @media (max-width : 767px) {
    margin-bottom : 16px;
    margin-top: 24px;
  }
`;

const LifeItInnerBox = styled.div`
  margin : 0 auto;
  padding : 24px;
  max-width: 1280px;
  display: flex;
  gap : 40px;

  @media (max-width : 767px) {
    max-width: 100%;
    padding : 0 16px;
    flex-direction: column;
    gap : 24px;
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

const ITLifeSkeleton = styled.div`
  width: 100%;
  height: 560px;
  border-radius: 16px;
  position: relative;
  background: linear-gradient(
    90deg,
    #555555 0%,
    #666666 50%,
    #555555 100%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 2s linear infinite alternate;

  @media (max-width : 767px) {
    height: 360px;
  }
`;

const ContentBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding : 16px;
  padding : 0px;
  background-color: ${({ theme }) => theme.neutral.gray0};
  border-radius: 16px;
`;

const Descriptions = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding : 16px;

  & > span {
    font-size: 1.3rem;
    font-weight: 800;
    display: block;
    color : ${({ theme }) => theme.neutral.gray900};
    margin-bottom: 8px;

    @media (max-width : 767px) {
      font-size: 1rem;
    }
  }
`;

const ListsStyle = styled.ul`
  width: 100%;
  height: 480px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(4, 1fr);
  gap : 16px;
  padding : 16px;
  padding-top : 0;

  @media (max-width : 767px) {
    height: 360px;
  }
`;

const ItemStyle = styled.li`
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.22);
  transition: box-shadow 0.5s, transform 0.5s;
  border-radius: 12px;

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.26);
    transform: translateY(-2px);

    & > article {
      & > div {
        & > h1 {
          text-decoration: underline;
        }
      }
    }
  }
`;

const Article = styled.article`
  width: 100%;
  height: 100%;
  display: flex;

  & > img {
    width: 160px;
    height: 100%;
    object-fit: cover;
    display: block;

    @media (max-width : 767px) {
      width: 40%;
      min-width: 96px;
    }
  }
`;

const TextBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding : 16px;

  @media (max-width : 767px) {
    padding : 8px;
  } 

  & > h1 {
    font-size: 1.05rem;
    color : ${({ theme }) => theme.neutral.gray900};
    line-height: 1.3;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;

    @media (max-width : 1279px) {
      font-size: .95rem;
    }

    @media (max-width : 767px) {
      font-size: .8rem;
    }
  }

  & > span {
    display: block;
    text-align: right;
    font-size: .95rem;
    color : ${({ theme }) => theme.neutral.gray600};

    @media (max-width : 1279px) {
      font-size: .85rem;
    }

    @media (max-width : 767px) {
      font-size: .75rem;
    }
  }
`;


function LifeAndITSection({ ITArticles, lifeArticles, isLoading, isError }) {
  const { goToCategory } = useCategoryRedirect(ITArticles);
  const { goToCategory: goToLifeArticles } = useCategoryRedirect(lifeArticles);
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    if (isError) {
      navigate('/error');
    }
  }, [navigate, isError]);

  if (isError) return null;

  if (isLoading) {
    if (isMobile) {
      return (
        <LifeItContainer>
          <LifeItInnerBox>
            <div style={{ width: '100%', height: '100%', display: 'flex', gap: '24px', flexDirection: 'column' }}>
              <div style={{ width: '100%', height: '100%' }}>
                <ITLifeSkeleton />
              </div>
              <div style={{ width: '100%', height: '100%' }}>
                <ITLifeSkeleton />
              </div>
            </div>
          </LifeItInnerBox>
        </LifeItContainer>
      )
    } else {
      return (
        <LifeItContainer>
          <LifeItInnerBox>
            <div style={{ width: '100%', height: '100%', display: 'flex', gap: '40px' }}>
              <div style={{ width: '100%', height: '100%' }}>
                <ITLifeSkeleton />
              </div>
              <div style={{ width: '100%', height: '100%' }}>
                <ITLifeSkeleton />
              </div>
            </div>
          </LifeItInnerBox>
        </LifeItContainer>
      )
    }
  }

  return (
    <LifeItContainer>
      <LifeItInnerBox>
        <ContentBox>
          <Descriptions>
            <span>IT</span>
            <GoToCategoryBtn onClick={goToCategory} />
          </Descriptions>
          <ListsStyle>
            {
              ITArticles?.map((it) => (
                <ItemStyle key={it.articleId} onClick={() => navigate(`/news/${it.articleId}`)}>
                  <Article>
                    <img src={it.articleBanner} alt={`it-news-${it.articleId}-image`} />
                    <TextBox>
                      <h1>{it.articleTitle}</h1>
                      <span>{it.createdAt && formatDateOnly(it.createdAt)}</span>
                    </TextBox>
                  </Article>
                </ItemStyle>
              ))
            }
          </ListsStyle>
        </ContentBox>
        <ContentBox>
          <Descriptions>
            <span>라이프 & 브랜드</span>
            <GoToCategoryBtn onClick={goToLifeArticles} />
          </Descriptions>
          <ListsStyle>
            {
              lifeArticles?.map((life) => (
                <ItemStyle key={life.articleId} onClick={() => navigate(`/news/${life.articleId}`)}>
                  <Article>
                    <img src={life.articleBanner} alt={`life-news-${life.articleId}-image`} />
                    <TextBox>
                      <h1>{life.articleTitle}</h1>
                      <span>{life.createdAt && formatDateOnly(life.createdAt)}</span>
                    </TextBox>
                  </Article>
                </ItemStyle>
              ))
            }
          </ListsStyle>
        </ContentBox>
      </LifeItInnerBox>
    </LifeItContainer>
  )
}

export default LifeAndITSection;