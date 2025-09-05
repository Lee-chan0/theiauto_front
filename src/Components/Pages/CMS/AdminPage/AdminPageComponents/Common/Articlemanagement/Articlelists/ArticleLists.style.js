import styled, { css, keyframes } from "styled-components";

const rotate = keyframes`
  from {
    transform : rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const ArticleListBox = styled.div`
  width: 100%;
  padding : 0 32px;
  margin-top : 40px;

  @media (max-width : 767px) {
    padding : 0 8px;
    margin-top: 24px;
  }
`;

const BorderBottom = styled.div`
  border-bottom : 3px solid ${({ theme }) => theme.neutral.gray600};
`;


const ArticleListContainer = styled.div`
  width: 100%;
  display : grid;
  grid-template-columns: 5% 5% 15% 1fr 15% 15% 5%;
  place-items: center;
  padding : 0 16px 8px;

  @media (max-width : 767px) {
    grid-template-columns: 1fr 25%;
  }

  &.article-list {
    gap : 8px 0;
    padding : 6px 16px;
    border-bottom: 1px solid rgba(26, 26, 26, 0.15);

    @media (max-width : 767px) {
      padding : 6px 8px;
    }

    &:hover {
      background-color: ${({ theme }) => theme.neutral.gray300};
    }
  }
`;

const textStyle = css`
  display : -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;

  overflow: hidden;
  text-overflow: ellipsis;
`;

const ArticleListItem = styled.span`
  color : ${({ theme }) => theme.neutral.gray900};
  font-size : 0.9rem;
  display: flex;
  align-items: center;

  @media (max-width : 767px) {
    font-size: .8rem;
  }

  &.article-number {
    font-size: .8rem;
    font-weight: 500;
  }

  &.is-important {
    svg {
      &:hover {
        cursor: pointer;
      }
    }
  }

  &.category-name {
    ${textStyle}
    font-size : 0.8rem;
    font-weight: bold;
    color : ${({ theme }) => theme.neutral.gray600};
  }

  &.article-title {
    ${textStyle}
    font-weight: bold;
    font-size : 0.85rem;
    cursor: pointer;

    @media (max-width : 767px) {
      font-size: .7rem;
    }
  }

  &.author {
    ${textStyle}
    font-size: .8rem;
  }

  &.date {
    ${textStyle}
    color : ${({ theme }) => theme.neutral.gray600};
    font-size : 0.8rem;

    @media (max-width : 767px) {
      font-size: .7rem;
    }
  }

  &.confirm {
    svg {
      cursor: pointer;
    }
  }
`;

const LoadingContainer = styled.div`
  width: 100%;
  padding : 0 32px;
  margin-top : 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  animation: ${rotate} 1s linear infinite;
`;





export { ArticleListContainer, ArticleListItem, ArticleListBox, BorderBottom, LoadingContainer };