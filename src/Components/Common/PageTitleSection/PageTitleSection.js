import styled from "styled-components";

const MainContainer = styled.section`
  width: 100%;
  margin-top : 40px;
`;

const MainInnerBox = styled.div`
  max-width: 1280px;
  margin : 0 auto;
  padding : 0 40px;
`;

const ContentBox = styled.span`
  width: 100%;
  display: flex;
  align-items: center;
  height: 80px;
  border-top : 8px solid ${({ theme }) => theme.primary.red700};
  border-bottom : 8px solid ${({ theme }) => theme.primary.red700};
  font-size: 1.5rem;
  font-weight: bold;
`;

function PageTitleSection({ categoryInfo }) {

  return (
    <MainContainer>
      <MainInnerBox>
        <ContentBox>
          {
            categoryInfo &&
            <>{categoryInfo.categoryName}</>
          }
        </ContentBox>
      </MainInnerBox>
    </MainContainer>
  )
}

export default PageTitleSection;