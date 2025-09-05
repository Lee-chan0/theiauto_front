import { useMediaQuery } from "react-responsive";
import HomeMotorSports from "./HomeMotorSports/HomeMotorSports";
import HomeTodayNews from "./HomeTodayNews/HomeTodayNews";
import styled from "styled-components";

const Container = styled.section`
  width: 100%;
  transform: translateY(-40px);
  overflow: hidden;

  @media (max-width : 1279px) {
    transform: translateY(-32px);
  }

  @media (max-width : 767px) {
    transform: translateY(-8px);
  }
`

const InnerBox = styled.div`
  margin : 0 auto;
  padding : 8px 24px;
  max-width: 1280px;

  @media (max-width : 767px) {
    padding : 8px 16px;
  }
`;

const NewsBox = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  gap : 16px;

  & > * {
    overflow: hidden;
  }

  @media (max-width : 767px) {
    height: 160px;
  }
`;

function TodayAndSports({
  todayArticles, todayArticleLoading, todayArticleError,
  motorSportArticles, motorLoading, motorError
}) {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <Container>
      <InnerBox>
        <NewsBox>
          <HomeTodayNews
            todayArticles={todayArticles}
            todayArticleLoading={todayArticleLoading}
            todayArticleError={todayArticleError}
          />
          {
            !isMobile &&
            <HomeMotorSports
              motorSportArticles={motorSportArticles}
              motorLoading={motorLoading}
              motorError={motorError}
            />
          }
        </NewsBox>
      </InnerBox>
    </Container>
  )
}

export default TodayAndSports;