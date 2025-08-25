import styled, { css, keyframes } from "styled-components";

const DriveWrapper = styled.section`
  width: 100%;

  @media (max-width : 1279px) {
    margin-bottom: 24px;
  }

  @media (max-width : 767px) {
    margin-bottom : 16px;
  }
`;

const textStyle = css`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`

const DriveInnerBox = styled.div`
  width: 100%;
  height: 560px;
  margin : 0 auto;
  max-width: 1280px;
  padding : 24px;
  padding-top : 0px;

  display: flex;
  flex-direction: column;

  @media (max-width : 767px) {
    padding : 0 16px;
  }
`;

const DriveDescription = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.neutral.gray0};
  padding : 16px 8px;
  padding-bottom: 8px;
  border-radius: 16px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;

  @media (max-width : 767px) {
    padding : 8px;
  }

  & > span {
    font-size: 1.2rem;
    font-weight: 800;
    margin-left: 8px;

    @media (max-width : 767px) {
      font-size: 1rem;
    }
  }
`;

const DriveLists = styled.ul`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows : repeat(2, 1fr);
  gap : 8px;
  padding : 16px;
  background-color: ${({ theme }) => theme.neutral.gray0};
  border-radius: 16px;
  border-top-left-radius: 0;
  border-top-RIGHT-radius: 0;

  @media (max-width : 767px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 1fr);

    padding : 8px;
  }
`;

const DriveItems = styled.li`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    & > article {
      & > div {
        & > h1 {
          text-decoration: underline;
        }
      }
    }
  }
`;

const DriveArticle = styled.article`
  width: 100%;
  height: 100%;
  background-image: url(${({ $src }) => $src ? $src : ''});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  position: relative;
  transition: background-size .8s;
  
  &::after {
    content: '';
    position: absolute;
    left : 0; bottom : 0;
    background-image: linear-gradient(to top, rgba(26, 26, 26, 0.75) 40%, transparent 100%);
    width: 100%;
    height: 100%;
  }
`;

const DriveTextBox = styled.div`
  position: absolute;
  bottom : 0;
  padding : 8px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap : 8px;
  margin: 4px;

  @media (max-width : 767px) {
    gap : 4px;
    margin : 0;
  }

  & > span {
    font-size: .9rem;
    font-weight: 900;
    color : ${({ theme }) => theme.primary.red700};

    @media (max-width : 767px) {
      font-size: .83rem;
    }
  }

  & > h1 {
    font-size: .95rem;
    line-height: 1.3;
    color : ${({ theme }) => theme.neutral.gray100};
    ${textStyle};

    @media (max-width : 767px) {
      font-size: .83rem;
    }
  }

  & > h2 {
    font-size: .8rem;
    line-height: 1.3;
    color : ${({ theme }) => theme.neutral.gray600};
    ${textStyle};

    @media (max-width : 1279px) {
      -webkit-line-clamp: 1;
    }

    @media (max-width : 767px) {
      display: none;
    }
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

const DriveSkeleton = styled.div`
  width: 100%;
  height: 100%;
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
`;


export { DriveInnerBox, DriveWrapper, DriveLists, DriveItems, DriveArticle, DriveTextBox, DriveDescription, DriveSkeleton };