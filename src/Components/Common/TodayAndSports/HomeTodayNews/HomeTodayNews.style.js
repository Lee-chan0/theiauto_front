import styled from "styled-components";

const HeaderDescrip = styled.span`
  color : ${({ theme }) => theme.primary.red700};
  font-weight: bold;
  font-size: 1.4rem;
`;

const NewsCardContainer = styled.ul`
  margin-top: 16px;
  display : grid;
  gap : 16px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 280px);
`;

const NewsCardItems = styled.li`
  background-image: url(${({ $src }) => $src ? $src : ""});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
  position: relative;
  border-radius: 4px;

  transition: transform 0.7s;
  will-change: transform;

  &::before {
    content: "";
    position: absolute;
    top : 0; left : 0; right : 0; bottom : 0;
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.8) 10%, transparent 100%);
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  &:hover {
    transform: scale(1.02);

    & > article {
      & > div {
        & > .article-title {
          text-decoration: underline;
        }
      }
    }
  }

  & > article {
    & > .article-date {
      color: ${({ theme }) => theme.neutral.gray600};
      font-size: 0.8rem;
      position: absolute;
      bottom : 5px;
      right : 8px;
    }
  }
`;

const NewsTextBox = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom : 24px;
  margin : 0 16px;
  gap: 8px;

  & > .article-title {
    color: ${({ theme }) => theme.neutral.gray100};
    font-size: 0.95rem;
    line-height: 1.3;
  }

  & > .article-category {
    color: ${({ theme }) => theme.primary.red700};
    font-weight: bold;
    font-size: 0.85rem;
  }
`;

export { HeaderDescrip, NewsCardContainer, NewsCardItems, NewsTextBox };