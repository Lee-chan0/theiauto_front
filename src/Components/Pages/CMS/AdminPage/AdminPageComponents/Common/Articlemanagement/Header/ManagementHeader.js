import styled from "styled-components";

const HeaderContainer = styled.div`
  width: 100%;
  border : 4px solid ${({ theme }) => theme.primary.red500};
  padding : 20px 24px;
`;

const Description = styled.span`
  color : ${({ theme }) => theme.neutral.gray900};
  font-weight: bold;
  font-size : 1.3rem;
`;

function ManagementHeader({ isCreate }) {
  return (
    <HeaderContainer>
      <Description>{isCreate ? '기사 작성' : '기사 관리'}</Description>
    </HeaderContainer>
  )
}

export default ManagementHeader;