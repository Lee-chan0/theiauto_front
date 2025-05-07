import styled from "styled-components";
import { useFetchBrandITArticles } from "../../Hooks/ApiHooks/GeneralArticle/useFetchBrandITArticles";
import { formatDateOnly } from "../../Hooks/Utils/formatDateOnly";
import { IoIosArrowDroprightCircle } from "react-icons/io";

const LifeItContainer = styled.section`
  width: 100%;
  margin-bottom : 40px;
`;

const LifeItInnerBox = styled.div`
  max-width: 1280px;
  margin : 0 auto;
  padding : 0 40px;
`;

const LifeItContentBox = styled.div`
  padding : 16px;
  background-color: ${({ theme }) => theme.neutral.gray0};
  border-radius: 4px;
  position : relative;

  display : flex;
  justify-content: space-between;

  &::before {
    content: "";
    height: 80%;
    border : 1px solid rgba(0, 0, 0, 0.1);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

const LifeItDescription = styled.span`
  color : ${({ theme }) => theme.neutral.gray900};
  font-weight: bold;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: space-between;

  & > svg {
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }
`;

const LifeItLists = styled.ul`
  margin-top : 16px;
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 180px);
`;

const LifeItItem = styled.li`
  width: 100%;
  height: 180px;
  cursor: pointer;

  &:hover {
    & > article {
      h2 {
        text-decoration: underline;
      }
    }
  }

  & > article {
    width: 100%;
    height: 100%;
    display : flex;
    flex-direction: column;

    & > img {
      width: 100%;
      height: 120px;
      object-fit: cover;
    }
  }
`;

const TextBox = styled.div`
  margin: 4px;
  height: 60px;

  position: relative;

  & > h2 {
    font-size: .9rem;
    line-height: 1.1;
    color: ${({ theme }) => theme.neutral.gray900};

    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow : ellipsis;
  }

  & > span {
    position: absolute;
    bottom : 0;
    right: 0;
    font-size: .85rem;
    color : ${({ theme }) => theme.neutral.gray300};
  }
`;

function LifeAndITSection() {
  const { data: lifeAndITArticleArray } = useFetchBrandITArticles();
  const ITArticles = lifeAndITArticleArray?.ITArticles || [];
  const lifeArticles = lifeAndITArticleArray?.brandArticles || [];

  return (
    <LifeItContainer>
      <LifeItInnerBox>
        <LifeItContentBox>
          <div style={{ width: '48%' }}>
            <LifeItDescription>
              IT
              <IoIosArrowDroprightCircle />
            </LifeItDescription>
            <LifeItLists>
              {
                ITArticles.map((it) => (
                  <LifeItItem key={it.articleId}>
                    <article>
                      <img src={it.articleBanner} alt="it-banner-image" />
                      <TextBox>
                        <h2>{it.articleTitle}</h2>
                        <span>{formatDateOnly(it.createdAt)}</span>
                      </TextBox>
                    </article>
                  </LifeItItem>
                ))
              }
            </LifeItLists>
          </div>
          <div style={{ width: '48%' }}>
            <LifeItDescription>
              라이프 & 브랜드
              <IoIosArrowDroprightCircle />
            </LifeItDescription>
            <LifeItLists>
              {
                lifeArticles.map((life) => (
                  <LifeItItem key={life.articleId}>
                    <article>
                      <img src={life.articleBanner} alt="life-banner-image" />
                      <TextBox>
                        <h2>{life.articleTitle}</h2>
                        <span>{formatDateOnly(life.createdAt)}</span>
                      </TextBox>
                    </article>
                  </LifeItItem>
                ))
              }
            </LifeItLists>
          </div>
        </LifeItContentBox>
      </LifeItInnerBox>
    </LifeItContainer>
  )
}

export default LifeAndITSection;