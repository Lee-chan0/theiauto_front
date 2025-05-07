import styled from "styled-components";

const NavContainer = styled.header`
  width: 100%;
  background-color: ${({ theme }) => theme.neutral.gray900};
`;

const NavInnerBox = styled.div`
  max-width: 1280px;
  height: 80px;
  padding : 0 40px;
  margin : 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > .main-logo {
    width: 148px;
    height: 36px;
    margin: 16px 0;
    cursor: pointer;
  }
`;

export { NavContainer, NavInnerBox };