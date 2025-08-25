import styled, { css, keyframes } from "styled-components";

const ServiceWrapper = styled.section`
  width: 100%;

  @media (max-width : 767px) {
    margin-top : 24px;
  }
`;

const ServiceInnerBox = styled.div`
  margin : 0 auto;
  padding : 24px;
  max-width: 1280px;

  @media (max-width : 767px) {
    padding : 0 16px;
    max-width: 100%;
  }
`;

const ServiceDescription = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
  padding : 16px;

  & > span {
    font-size: 1.3rem;
    font-weight: 800;
    color : ${({ theme }) => theme.neutral.gray900};
    margin-bottom: 8px;

    @media (max-width : 767px) {
      font-size: 1rem;
    }
  }
`;

const ServiceLists = styled.ul`
  padding : 8px;
  padding-top : 0;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap : 16px;

  @media (max-width : 1279px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width : 767px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
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

const ServiceSkeleton = styled.div`
  width: 100%;
  height: 480px;
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
    height: 400px;
  }
`;

const ServiceItems = styled.li`
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.18);
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  transition: box-shadow 0.5s, transform 0.5s;
  

  cursor: pointer;

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.22);
    transform: translateY(-5px);

    & > article {
      & > div {
        & > h1 {
          text-decoration: underline;
        }
      }
    }
  }
`;

const ServiceArticle = styled.article`
  width: 100%;
  height: 100%;

  & > img {
    width: 100%;
    height: 160px;
    object-fit: cover;
    display: block;
    border-radius: 4px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;

    @media (max-width : 767px) {
      height: 96px;
    }
  }
`;

const ServiceTitleBox = styled.div`
  width: 100%;
  padding : 8px;

  & > h1 {
    font-size: .95rem;
    margin : 4px 0;
    color : ${({ theme }) => theme.neutral.gray900};
    line-height: 1.2;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;

    @media (max-width : 1279px) {
      font-size: .9rem;
    }

    @media (max-width : 767px) {
      font-size: .75rem;
    }
  }

  & > span {
    display: block;
    font-size: .85rem;
    color : ${({ theme }) => theme.neutral.gray600};
    text-align: right;

    @media (max-width : 767px) {
      font-size: .7rem;
    }
  }
`;

export { ServiceInnerBox, ServiceWrapper, ServiceDescription, ServiceItems, ServiceLists, ServiceArticle, ServiceTitleBox, ServiceSkeleton };