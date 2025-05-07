import HomeMotorSports from "./HomeMotorSports/HomeMotorSports";
import HomeTodayNews from "./HomeTodayNews/HomeTodayNews";
import styled from "styled-components";


const Container = styled.section`
  width: 100%;
  margin-bottom : 40px;
`

const InnerBox = styled.div`
  max-width: 1280px;
  margin : 0 auto;
  padding : 0 40px;
`;

const NewsBox = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;

  & > .section-box1 {
    flex : 0 0 69%;
  }

  & > .section-box2 {
    flex : 0 0 30%;
  }
`;


function TodayAndSports() {
  return (
    <Container aria-label="오늘의 뉴스">
      <InnerBox>
        <NewsBox>
          <div className="section-box1">
            <HomeTodayNews />
          </div>
          <div className="section-box2">
            <HomeMotorSports />
          </div>
        </NewsBox>
      </InnerBox>
    </Container>
  )
}

export default TodayAndSports;