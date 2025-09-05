import styled, { keyframes } from "styled-components";

const MainContainer = styled.section`
  width: 100%;
  position: sticky;
  top : 80px;
  z-index: 2;
  transform: translateY(-80px);
  
  @media (max-width : 767px) {
    transform: translateY(0px);
    top : 40px;
}
`;

const Background = styled.div`
  width: 100%;
  background : ${({ theme }) => theme.neutral.gray900};
  box-shadow: 0 2px 7px 2px rgba(0, 0, 0, 0.5);
`;

const MainInnerBox = styled.div`
  max-width: 1280px;
  margin : 0 auto;
  padding : 0 40px;
  ${({ theme, $isLoading }) => !$isLoading && `border-bottom: 4px solid ${theme.primary.red700}`};

  @media (max-width : 1279px) {
    max-width: 100%;
    padding : 0 24px;
  }

  @media (max-width : 767px) {
    max-width: 100%;
    padding : 0 16px;
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

const TitleSkeleton = styled.div`
  width: 100%;
  height: 64px;
  border-radius: 4px;
  background: linear-gradient(
    90deg,
    #666666 0%,
    #777777 50%,
    #666666 100%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 2s linear infinite alternate;

  @media (max-width : 767px) {
    height: 40px;
  }

`;

const ContentBox = styled.span`
  width: 100%;
  display: flex;
  align-items: center;
  height: 64px;
  font-size: 1.4rem;
  font-weight: bold;
  color : ${({ theme }) => theme.neutral.gray100};

  @media (max-width : 1279px) {
    font-size: 1.3rem;
  }

  @media (max-width : 767px) {
    font-size: .9rem;
    height: 40px;
  }
`;

function PageTitleSection({ categoryInfo, mode, keyword, isLoading }) {

  if (isLoading) {
    return (
      <MainContainer>
        <MainInnerBox $isLoading={isLoading}>
          <TitleSkeleton />
        </MainInnerBox>
      </MainContainer>
    )
  }

  return (
    <MainContainer $keyword={keyword}>
      <Background>
        <MainInnerBox $isLoading={isLoading}>
          <ContentBox>
            {
              (categoryInfo && mode !== 'search') ?
                <>
                  {categoryInfo.categoryName}
                </>
                :
                <>
                  {`"${keyword}"에 대한 검색결과`}
                </>
            }
          </ContentBox>
        </MainInnerBox>
      </Background>
    </MainContainer>
  )
}

export default PageTitleSection;