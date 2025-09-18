import styled from "styled-components";

const CreateCategoryContainer = styled.div`
  width: 100%;
  margin-top: 32px;
  padding : 16px 24px;
  display : grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 160px);
  gap : 4px;
  position : relative;

  @media (max-width : 767px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(4, 1fr);
    padding: 8px;
  }

  & > .banner-box {
    width: 120px;
    margin-top: 16px;
    display : flex;
    align-items: center;
    justify-content: left;
    gap : 8px;
    position: relative;

    @media (max-width : 767px) {
      width: 100px;
    }

    & > .banner-check-descrip {
      border-radius: 4px;
      background-color: #2d4dcc;
      color : ${({ theme }) => theme.neutral.gray0};
      font-weight: bold;
      padding : 4px 8px;
      font-size : .85rem;

      @media (max-width : 767px) {
        font-size: .75rem;
      }
    }

    & > .banner-checkbox {
      width: 20px;
      height: 20px;

      @media (max-width : 767px) {
        width: 16px;
        height: 16px;
      }
    }

    & > small {
      position: absolute;
      left : 100%;
      width: 100%;
      font-size: .65rem;
      color : ${({ theme }) => theme.neutral.gray600};
    }
  }
`;

const CreateCategoryLayOut = styled.div`
  width: 100%;
`;

const CreateCategoryParent = styled.div`
  border : 3px solid ${({ theme }) => theme.neutral.gray300};
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding : 16px;
  padding-top : 0;
  transition: transform 0.2s ease;
  will-change: transform;

  h6 {
    margin : 8px 0;
    color : ${({ theme }) => theme.neutral.gray0};
    background-color: ${({ $isActive }) => !$isActive ? '#acc4ff' : '#4d80ff'};
    border-radius: 1px;
    padding : 4px 0;
    font-size: .85rem;
    font-weight: bold;
    width: 100%;
    text-align: center;
    padding : 4px 4px;
    transition: background-color 0.5s ease;

    @media (max-width : 767px) {
      font-size: .7rem;
    }
  }

  &:hover {
    transform: scale(1.01);

    & > h6 {
      background-color: #4d80ff;
    }
  }
`;

const CreateChildContainer = styled.div`
  display : flex;
  flex-direction: column;
  gap : 8px;
`;

const CreateCategoryChild = styled.label`
  font-size : .75rem;
  display : flex;
  align-items: center;
  font-weight: bold;
  gap : 4px;
  color : ${({ theme, $activeCategoryName, $categoryName }) =>
    $activeCategoryName === $categoryName ? theme.neutral.gray900 : theme.neutral.gray600
  };

  @media (max-width : 767px) {
    font-size: .7rem;
  }

  &:hover {
    color : ${({ theme }) => theme.neutral.gray900};
  }
`;

const UserDescriptionBox = styled.div`
  position: absolute;
  top : -20px;
  left : 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding : 0 24px;
  

  & > span {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #2d4dcc;
    padding : 0 8px;
    font-size: .85rem;
    font-weight: bold;
    color : ${({ theme }) => theme.neutral.gray0};
    border-radius: 4px;

    @media (max-width : 767px) {
      font-size: .75rem;
    }
  }

  @media (max-width : 767px) {
    padding : 0 8px;
  }
`;

const LoginUserBox = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.neutral.gray0};
  border-radius: 3px;
  padding : 4px 8px;
  font-weight: 500;
  z-index: 1;
  cursor: pointer;
  color : ${({ theme }) => theme.neutral.gray900};
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.3);
  transition: box-shadow 0.5s;

  &:hover:not(:has(ul:hover)) {
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.7);
  }


  &:hover {
  }

  & > .login-user-info {
    font-size: .75rem;

  @media (max-width : 767px) {
      font-size: .65rem;
    }
  }
`;

const SelectUserBox = styled.ul`
  position: absolute;
  right : 105%;
  bottom : 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  z-index: 1;
  gap : 3px;
  transition: opacity 0.3s, visibility 0.3s, transform 0.3s;

  opacity: ${({ $userBoxActive }) => $userBoxActive ? '1' : '0'};
  visibility: ${({ $userBoxActive }) => $userBoxActive ? 'visible' : 'hidden'};
  transform: ${({ $userBoxActive }) => $userBoxActive ? 'translateX(0px)' : 'translateX(16px)'};

  @media (max-width : 767px) {
    transform: ${({ $userBoxActive }) => $userBoxActive ? 'translateY(0px)' : 'translateY(16px)'};
    border-radius: 0;
    align-items: flex-end;
    top : 120%;
    left : 100%;
  }
`;

const UserSelector = styled.li`
  white-space: nowrap;
  width: fit-content;
  font-size: .75rem;
  padding : 6px 8px;
  background-color: ${({ theme }) => theme.neutral.gray0};
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  font-weight: 400;
  color : ${({ theme }) => theme.neutral.gray900};
  display: flex;
  align-items: center;
  border-radius: 3px;
  box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.5)inset;


  &:hover {
    color : ${({ theme }) => theme.neutral.gray600};
  }

  @media (max-width : 767px) {
    font-size: .65rem;
    padding : 6px 10px;
  }
`;


export {
  CreateCategoryContainer, CreateCategoryParent, CreateCategoryChild,
  CreateChildContainer, CreateCategoryLayOut,
  UserSelector, LoginUserBox, SelectUserBox, UserDescriptionBox
};