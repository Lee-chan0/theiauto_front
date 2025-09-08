import styled from "styled-components";

const CreateCategoryContainer = styled.div`
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

  & > .category-title {
    position: absolute;
    top : -20px;
    left: 24px;
    color : ${({ theme }) => theme.neutral.gray0};
    background-color: #2d4dcc;
    border-radius: 4px;
    padding : 4px 8px;
    font-size: .85rem;
    font-weight: bold;

    @media (max-width : 767px) {
      font-size: .75rem;
    }
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



export {
  CreateCategoryContainer, CreateCategoryParent, CreateCategoryChild,
  CreateChildContainer, CreateCategoryLayOut
};