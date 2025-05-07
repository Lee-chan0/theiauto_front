import styled from "styled-components";

const CreateCategoryContainer = styled.div`
  margin-top: 32px;
  padding : 16px 24px;
  display : grid;
  grid-template-columns: repeat(8, 1fr);
  gap : 4px;
  position : relative;

  & > .category-title {
    position: absolute;
    top : -20px;
    left: 24px;
    color : ${({ theme }) => theme.neutral.gray0};
    background-color: ${({ theme }) => theme.neutral.gray900};
    border-radius: 4px;
    padding : 4px 8px;
    font-size: .85rem;
    font-weight: bold;
  }

  & > .banner-box {
    width: 120px;
    margin-top: 16px;
    display : flex;
    align-items: center;
    justify-content: left;
    gap : 8px;
    position: relative;

    & > .banner-check-descrip {
      border-radius: 4px;
      background-color: ${({ theme }) => theme.neutral.gray900};
      color : ${({ theme }) => theme.neutral.gray0};
      font-weight: bold;
      padding : 4px 8px;
      font-size : .85rem;
    }

    & > .banner-checkbox {
      width: 20px;
      height: 20px;
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
  border : 3px solid ${({ theme }) => theme.primary.red300};
  border-radius: 4px;
  padding : 16px;
  padding-top : 0;

  h6 {
    margin : 8px 0;
    color : ${({ theme }) => theme.neutral.gray0};
    background-color: ${({ theme }) => theme.primary.red700};
    border-radius: 4px;
    padding : 4px 0;
    font-size: .85rem;
    font-weight: bold;
    width: 100%;
    text-align: center;
    padding : 4px 4px;
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

  &:hover {
    color : ${({ theme }) => theme.neutral.gray900};
  }
`;



export {
  CreateCategoryContainer, CreateCategoryParent, CreateCategoryChild,
  CreateChildContainer, CreateCategoryLayOut
};