import styled from "styled-components";

const NewCarWrapper = styled.section`
  width: 100%;
  margin-bottom: 24px;
`;

const NewCarInnerBox = styled.div`
  max-width: 1280px;
  padding : 0 40px;
  margin: 0 auto;
`;

const NewCarLayoutContainer = styled.div`
  height: 100%;
  gap : 16px;
`;

const NewCarContentBox = styled.div`
  background-color: ${({ theme }) => theme.neutral.gray0};
  padding : 16px;
  border-radius: 4px;
`;

const NewCarDescrip = styled.span`
  font-size: 1.4rem;
  font-weight: bold;
  color : ${({ theme }) => theme.primary.red700};

  display: flex;
  align-items: center;
  justify-content: space-between;

  & > svg {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
`;

const NewCarCardLists = styled.ul`
  margin-top: 16px;
  width: 100%;
  display : grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 240px);
  gap : 8px;
`;

const NewCarCardItem = styled.li`
  width: 100%;
  height: 100%;
  cursor: pointer;
  border-radius: 4px;
  overflow: hidden;
  transition : transform 0.7s;
  will-change: transform;
  
  & > article {
    position: relative;
    width: 100%;
    height: 100%;

      &::after {
      position: absolute;
      left : 0;
      bottom : 0;
      width: 100%;
      height: 100%;
      content: "";
      background-image: linear-gradient(to top, rgba(0, 0, 0, 0.8) 10%, transparent 100%);
    }
  }

  &:hover {
    transform: scale(1.01);

    & > article {
      & > .newcar-text-box {
        & > .newcar-news-title {
          text-decoration: underline;
        }
      }
    }
  }
`;

const NewCarImgBox = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const NewCarTextBox = styled.div`
  position: absolute;
  z-index: 1;
  bottom : 16px;
  left : 16px;
  right: 16px;

  display : flex;
  flex-direction: column;
  gap : 8px;

  & > .newcar-category-name {
    color : ${({ theme }) => theme.primary.red700};
    font-weight: bold;

    display : flex;
    align-items: center;
  }

  & > .newcar-news-title {
    font-size: 1.1rem;
    color : ${({ theme }) => theme.neutral.gray100};
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export { NewCarInnerBox, NewCarWrapper, NewCarDescrip, NewCarContentBox, NewCarCardLists, NewCarLayoutContainer, NewCarCardItem, NewCarImgBox, NewCarTextBox };