import styled, { css } from "styled-components";

const NewCarWrapper = styled.section`
  width: 100%;

  @media (max-width : 767px) {
  }
`;

const NewCarInnerBox = styled.div`
  padding : 24px;
  margin: 0 auto;
  max-width: 1280px;
  height: 480px;
  display: flex;
  flex-direction: column;

  @media (max-width : 1279px) {
    padding : 0 24px;
  }

  @media (max-width : 767px) {
    padding : 0 16px;
    height: 240px;
  }
`;

const NewCarDescrip = styled.div`
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

const NewCarContentBox = styled.div`
  padding : 16px;
  width: 100%;
  display: flex;
  gap : 8px;
  background-color: ${({ theme }) => theme.neutral.gray0};
  border-radius: 16px;
  border-top-right-radius: 0;
  border-top-left-radius: 0;

  @media (max-width : 767px) {
    padding : 8px;
  }
`;

const NewCarImageBox = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 8px;
  position: relative;
  cursor: pointer;
  min-height: 400px;
  max-height: 400px;

  @media (max-width : 767px) {
    display: none;
  }

  &:hover {
    & > div {
      & > div {
        & > h1 {
          text-decoration: underline;
        }
      }

      & > img {
        transform: scale(1.05);
      }
    }
  }

  &::after {
    content: '';
    position: absolute;
    left : 0; top : 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.75) 20%, transparent 100%);
    z-index: 0;
  }
`;

const textStyle = css`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const NewCarItemContainer = styled.div`
  width: 100%;
  height: 100%;

  & > img {
    transition: transform 0.7s;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

const NewCarImageTextBox = styled.div`
  width: 100%;
  position: absolute;
  bottom : 8px; left: 0;
  padding : 16px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap : 8px;

  & > span {
    font-size: 1rem;
    font-weight: 900;
    color : ${({ theme }) => theme.primary.red700};
  }

  & > h1 {
    font-size: 1.3rem;
    color : ${({ theme }) => theme.neutral.gray100};
    ${textStyle};

    @media (max-width : 1279px) {
      font-size: 1.15rem;
    }
  }

  & > h2 {
    font-size: .95rem;
    color : ${({ theme }) => theme.neutral.gray600};
    ${textStyle};
    line-height: 1.3;

    @media (max-width : 1279px) {
      font-size: .85rem;
      -webkit-line-clamp: 1;
    }
  }
`;

const NewCarLists = styled.ul`
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(6, 1fr);
  gap : 4px;

  max-height: 400px;

  @media (max-width : 767px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 1fr);
    gap : 8px;
  }
`;

const NewCarItems = styled.article`
  width: 100%;
  height: 100%;
  background-color: ${({ theme, $isActive }) => $isActive ? theme.primary.red500 : theme.neutral.gray900};
  display: flex;
  align-items: center;
  padding : 8px;
  color : ${({ theme }) => theme.neutral.gray100};
  transition: background-color 0.5s;
  border-radius: 4px;
  cursor: pointer;

  @media (max-width : 767px) {
    background-color: ${({ theme }) => theme.neutral.gray100};
  }

  &:hover {
    background-color: ${({ theme }) => theme.primary.red500};

    @media (max-width : 767px) {
      background-color: ${({ theme }) => theme.neutral.gray100};
    }
  }

  @media (max-width : 767px) {
    gap : 8px;
  }
`;

const NewCarTextBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  & > h1 {
    line-height: 1.3;
    font-size: 1rem;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (max-width : 767px) {
      font-size: .8rem;
      -webkit-line-clamp: 2;
      color : ${({ theme }) => theme.neutral.gray900};

      &:hover {
        text-decoration: underline;
      }
    }
  }

  & > span {
    font-size: .7rem;
    text-align: right;
    color : ${({ theme }) => theme.neutral.gray300};
    
    @media (max-width : 767px) {
      color : ${({ theme }) => theme.neutral.gray600};
    }
  }
`;

const MobileImageBox = styled.img`
  width: 40%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
  min-width: 92px;
`;

export {
  NewCarInnerBox, NewCarWrapper, NewCarDescrip, NewCarContentBox, NewCarImageBox,
  NewCarItemContainer, NewCarImageTextBox, NewCarLists, NewCarItems, NewCarTextBox
  , MobileImageBox
};