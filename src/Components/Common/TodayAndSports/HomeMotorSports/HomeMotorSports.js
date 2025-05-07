import styled from "styled-components";
import { useFetchMotorSportsArticle } from "../../../Hooks/ApiHooks/GeneralArticle/useFetchMotorSportArticle";
import { IoIosArrowDroprightCircle } from "react-icons/io";

const MotorSportContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const MotorSportDescrip = styled.span`
  color : ${({ theme }) => theme.primary.red700};
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

const MotorSportLists = styled.ul`
  height: 100%;
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  gap : 16px;
  margin-top: 16px;
`;

const MotorSportItems = styled.li`
  height: 100%;
  cursor: pointer;
  border-radius: 4px;
  overflow: hidden;
  transition: box-shadow 0.3s;
  will-change: box-shadow;
  position: relative;

  & > article {
    height: 100%;
    display: flex;
    gap : 16px;
    justify-content: space-between;
  }

  &:hover {
    box-shadow: 0 0 15px 1px rgba(0, 0, 0 , 0.5);

    article {
      & > div {
      & > .motorsport-title {
        text-decoration: underline;
      }
    }
    }
  }
`;

const MotorSportImgBox = styled.div`
  flex: 0 0 40%;
  background-image: url(${({ $src }) => $src ? $src : ""});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const MotorSportTextBox = styled.div`
  height: 100%;

  & > .motorsport-title {
    color : ${({ theme }) => theme.neutral.gray900};
    font-size : .85rem;
    overflow: hidden;
    font-weight: 500;
    margin-top : 4px;
    margin-right: 4px;
    line-height: 1.3;

    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    text-overflow: ellipsis;
  }

  & > .motorsport-category {
      font-size: .65rem;
      position: absolute;
      right : 4px;
      bottom : 4px;
      font-weight: bold;
      color : ${({ theme }) => theme.primary.red700};
    }
`;

function HomeMotorSports() {
  const { data: motorSportArray } = useFetchMotorSportsArticle();
  const motorSportArticles = motorSportArray?.mortorSportArticles || [];

  return (
    <div style={{ backgroundColor: '#fff', padding: '16px', borderRadius: '4px', height: '100%' }}>
      <MotorSportContainer>
        <MotorSportDescrip>모터스포츠<IoIosArrowDroprightCircle /></MotorSportDescrip>
        <MotorSportLists>
          {
            motorSportArticles.map((article) => (
              <MotorSportItems key={article.articleId}>
                <article>
                  <MotorSportImgBox className="img-content" $src={article.articleBanner} />
                  <MotorSportTextBox className="text-content">
                    <h1 className="motorsport-title">{article.articleTitle}</h1>
                    <span className="motorsport-category">{article.category.categoryName}</span>
                  </MotorSportTextBox>
                </article>
              </MotorSportItems>
            ))
          }
        </MotorSportLists>
      </MotorSportContainer>
    </div>
  )
}

export default HomeMotorSports;