import styled, { css, keyframes } from "styled-components";

const MainContainer = styled.section`
  width: 100%;
  margin : 40px 0;
  ${({ $isSearch }) => !$isSearch && 'transform: translateY(-80px)'};


  @media (max-width : 1279px) {
    margin : 24px 0;
  }

  @media (max-width : 767px) {
    margin : 16px 0;
    transform: translateY(0);
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


const MainInnerBox = styled.div`
  max-width: 1280px;
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

  & > .no-result-box {
    display: flex;
    flex-direction: column;
    margin-bottom : 16px;

    & > .no-result-description {
      font-size: 1.2rem;
      color : ${({ theme }) => theme.neutral.gray900};
      margin-bottom : 24px;

      @media (max-width : 1279px) {
        font-size: 1.3rem;
        margin-bottom : 16px;
      }

      @media (max-width : 767px) {
        font-size: .9rem;
        margin-bottom : 8px;
        padding : 16px 0;
      }
    }

    & > .other-articles-description {
      color : ${({ theme }) => theme.primary.red700};
      font-size: 1.45rem;
      font-weight: bold;

      @media (max-width : 1279px) {
        font-size: 1.3rem;
      }

      @media (max-width : 767px) {
        font-size: 1rem;
      }
    }
  }
`;

const LayoutContainer = styled.div`
  display: ${({ $hasArticles }) => $hasArticles ? 'flex' : 'block'};
  gap : 24px;

  & > aside {
    flex : 1;
  }
`;

const SkeletonLayout = styled.div`
  width: 100%;
  display: flex;
  gap : 24px;
  padding-top : ${({ $mode }) => $mode ? '80px' : '0'};
`;

const SkeletonSide = styled.aside`
  flex : 1;
  height: 360px;
  border-radius: 4px;
  background: linear-gradient(
    90deg,
    #666666 0%,
    #777777 50%,
    #666666 100%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 2s linear infinite alternate;

  @media (max-width : 1024px) {
    display: none;
  }
`;

const ListSkeleton = styled.ul`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap : 16px;

  @media (max-width : 1024px) {
    min-width: 0;
    width: 100%;
  }

  @media (max-width : 767px) {
    min-width: 0;
    width: 100%;
  }
`;

const ItemSkeleton = styled.li`
  width: 100%;
  height: 160px;
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
    height: 96px;
  }
`;

const ListContainer = styled.ul`
  width: ${({ $hasArticles }) => $hasArticles ? '80%' : '100%'};
  min-width: 650px;

  display: flex;
  flex-direction : column;
  gap : 16px;

  @media (max-width : 1024px) {
    min-width: 0;
    width: 100%;
  }

  @media (max-width : 767px) {
    min-width: 0;
    width: 100%;
  }
`;

const ListItems = styled.li`
  width: 100%;
  height: 160px;
  cursor: pointer;

  @media (max-width : 767px) {
    height: 96px;
  }

  &:hover {
    & > article {
      & > div {
        & > .news-title {
          text-decoration: underline;
        }
      }
    }
  }

  & > article {
    width: 100%;
    height: 100%;
    display: flex;
    overflow: hidden;
  }
`;

const ImageBox = styled.img`
  width: 240px;
  height: 100%;
  flex-shrink: 0;
  object-fit: cover;
  border-radius: 4px;
  filter: brightness(75%);

  @media (max-width : 767px) {
    display: block;
    flex : 1;
    max-width: 44.44%;
  }
`;

const textStyle = css`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TextBox = styled.div`
  margin : 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  flex : 1;
  gap : 8px;

  @media (max-width : 767px) {
    margin : 4px;
    margin-left : 8px;
    min-width: 0;
  }
  
  & > .news-title {
    ${textStyle};
    line-height: 1.2;
    font-size: 1.2rem;
    color : ${({ theme }) => theme.neutral.gray900};
       
    @media (max-width : 1279px) {
        font-size: 1.08rem;
    }

    @media (max-width : 767px) {
      font-size: .86rem;
    }
  }

  & > .news-content {
    ${textStyle};
    font-size: 0.9rem;
    line-height: 1.3;
    margin : 0;
    -webkit-line-clamp: 3;
    color : ${({ theme }) => theme.neutral.gray600};

    @media (max-width : 1279px) {
      font-size: .8rem;
    }

    @media (max-width : 767px) {
      font-size: .7rem;
    }
  }
`;

const TagBox = styled.div`
  display: flex;
  gap : 8px;
  align-items: center;
  
  @media (max-width : 767px) {
    display: none;
  }

  & > .news-date {
    position: absolute;
    right: 0;
    font-size: 0.8rem;
    color : ${({ theme }) => theme.neutral.gray600};

     
    @media (max-width : 1279px) {
      font-size: 0.75rem;
    }
  }
`;

const TagItems = styled.div`
  background-color: ${({ theme }) => theme.neutral.gray600};
  padding : 4px;
  display: flex;
  align-items: center;
  border-radius: 4px;

  & > * {
    font-size : 0.8rem;
    font-weight: bold;
    color : ${({ theme }) => theme.neutral.gray100};

     
    @media (max-width : 1279px) {
      font-size: 0.75rem;
    }
  }

  & > .news-tag {
  }
`;

export {
  MainContainer, MainInnerBox, ListContainer, ListItems, SkeletonLayout, SkeletonSide,
  ImageBox, TextBox, TagBox, TagItems, LayoutContainer, ListSkeleton, ItemSkeleton
};