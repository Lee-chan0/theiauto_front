import styled, { css } from "styled-components";

const MainContainer = styled.section`
  width: 100%;
  margin : 40px 0;
`;

const MainInnerBox = styled.div`
  max-width: 1280px;
  margin : 0 auto;
  padding : 0 40px;
`;

const LayoutContainer = styled.div`
  display: flex;
  gap : 24px;

  & > aside {
    flex : 1;
  }
`;

const ListContainer = styled.ul`
  width: 75%;
  min-width: 650px;

  display: flex;
  flex-direction : column;
  gap : 16px;
`;

const ListItems = styled.li`
  width: 100%;
  height: 152px;
  cursor: pointer;

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
  }
`;

const ImageBox = styled.img`
  width: 240px;
  height: 100%;
  flex-shrink: 0;
  object-fit: cover;
  border-radius: 4px;
  filter: brightness(75%);
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
  
  & > .news-title {
    ${textStyle};
    line-height: 1.2;
    font-size: 1.2rem;
    color : ${({ theme }) => theme.neutral.gray900};
  }

  & > .news-content {
    ${textStyle};
    font-size: 0.9rem;
    line-height: 1.3;
    margin : 0;
    -webkit-line-clamp: 3;
    color : ${({ theme }) => theme.neutral.gray600};
  }
`;

const TagBox = styled.div`
  display: flex;
  gap : 8px;
  align-items: center;
  
  & > .news-date {
    position: absolute;
    right: 0;
    font-size: 0.8rem;
    color : ${({ theme }) => theme.neutral.gray300};
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
  }

  & > .news-tag {
  }
`;

export { MainContainer, MainInnerBox, ListContainer, ListItems, ImageBox, TextBox, TagBox, TagItems, LayoutContainer };