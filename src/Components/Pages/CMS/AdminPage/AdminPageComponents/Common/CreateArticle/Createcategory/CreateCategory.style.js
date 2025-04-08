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