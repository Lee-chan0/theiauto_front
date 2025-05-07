import styled from "styled-components";

const Container = styled.div`
  position: sticky;
  top : 64px;
`;

const ContentBox = styled.div`
  border : 3px solid ${({ theme }) => theme.neutral.gray300};
  border-radius: 4px;
  padding : 8px;
`;

const DescripBox = styled.div`

  & > span {
    & > .category-name {
      color : ${({ theme }) => theme.primary.red700};
    }
  }
`;

function CategoryBannerSide({ categoryInfo }) {


  return (
    <Container>
      <ContentBox>
        <DescripBox>
          <span>
            <strong className="category-name">{categoryInfo?.categoryName}</strong> 많이 본 기사
          </span>
        </DescripBox>
      </ContentBox>
    </Container>
  )
}

export default CategoryBannerSide;