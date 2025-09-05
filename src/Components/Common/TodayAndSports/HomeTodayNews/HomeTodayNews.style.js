import styled, { css, keyframes } from "styled-components";

const ArrowBox = styled.div`
  position: absolute;
  top : 50%;
  transform: translateY(-50%);
  right : 32px;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color : rgba(217, 217, 217, 0.3);
  border-radius: 50%;
  cursor: pointer;

  & > svg {
    position: relative;
    right : ${({ $direction }) => $direction === 'left' ? '1px' : '-1px'};
  }

  @media (max-width : 767px) {
    width: 28px;
    height: 28px;
    right : 16px;
  }
`;

const TodayDescription = styled.div`
  position: absolute;
  top : 0;
  left : 0;
  padding : 8px;
  border-bottom-right-radius: 8px;
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.3);
  z-index: 2;
  width: 50%;
  text-align: center;
  background-color: ${({ theme }) => theme.primary.red500};
  color : #fff;
  font-weight: bold;
`;

const TodayContainer = styled.div`
  width: 100%;
  height: 100%;
  padding : 0 16px;
  position: relative;
  flex : 2;

  @media (max-width : 767px) {
    padding : 0;
  }
`;

const TodayLists = styled.ul`
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
  border-radius: 4px;
  position: relative;

  & > .swiper {
    width: 100%;
    height: 100%;
  }
`;

const TodayItems = styled.li`
  width: 100%;
  height: 100%;
  position: relative;
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

  &::before {
    content: '';
    position: absolute;
    bottom : 0; left : 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.7) 40%, transparent 100%);
  }
`;

const TodayArticle = styled.article`
  width: 100%;
  height: 100%;
  background-image: url(${({ $src }) => $src ? $src : ''});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const textStyle = css`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TodayTextBox = styled.div`
  position: absolute;
  bottom : 4px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap : 12px;
  margin : 16px;

  @media (max-width : 1279px) {
    margin : 8px 12px;
    gap : 8px;
  }

  @media (max-width : 767px) {
    margin : 4px 8px;
    gap : 4px;
  }

  & > span {
    font-size: .9rem;
    color : ${({ theme }) => theme.primary.red700};
    font-weight: 600;

    @media (max-width : 767px) {
      font-size: .7rem;
    }
  }

  & > h1 {
    color : ${({ theme }) => theme.neutral.gray100};
    font-size: 1.2rem;
    line-height: 1.3;
    ${textStyle};

    @media (max-width : 1279px) {
      -webkit-line-clamp: 2;
      font-size: 1.05rem;
    }

    @media (max-width : 767px) {
      -webkit-line-clamp: 1;
      font-size: .95rem;
    }
  }

  & > h2 {
    color : ${({ theme }) => theme.neutral.gray600};
    font-size: .8rem;
    ${textStyle};
    -webkit-line-clamp: 2;

    @media (max-width : 767px) {
      -webkit-line-clamp: 1;
      font-size: .75rem;
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

const TodaySkeleton = styled.div`
  width: 100%;
  height: calc(100vh + 80px);
  transform: translateY(-80px);
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

export { ArrowBox, TodayContainer, TodayLists, TodayItems, TodayArticle, TodayTextBox, TodayDescription, TodaySkeleton };