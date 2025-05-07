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
`;

const BorderBottom = styled.div`
  border-bottom : 4px solid ${({ theme }) => theme.primary.red500};
`;


const ArticleListContainer = styled.div`
  width: 100%;
  display : grid;
  grid-template-columns: 5% 15% 1fr 15% 15% 5%;
  place-items: center;
  padding : 0 16px 8px;

  &.article-list {
    gap : 8px 0;
    padding : 6px 16px;

    &:hover {
      background-color: ${({ theme }) => theme.primary.red100};
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
    color : ${({ theme }) => theme.primary.red700};
  }

  &.article-title {
    ${textStyle}
    font-weight: bold;
    font-size : 0.85rem;
    cursor: pointer;
  }

  &.author {
    ${textStyle}
    font-size: .8rem;
  }

  &.date {
    ${textStyle}
    color : ${({ theme }) => theme.neutral.gray600};
    font-size : 0.8rem;
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