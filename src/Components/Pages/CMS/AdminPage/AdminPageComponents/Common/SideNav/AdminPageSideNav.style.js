import styled from "styled-components";

const SideNavContainer = styled.div`
  position : fixed;
  top : 0;
  left : 0;
  bottom : 0;
  width: 240px;
  background-color: ${({ theme }) => theme.neutral.gray900};
  padding : 24px 24px 0 24px;

  display : flex;
  flex-direction: column;
  align-items: center;
`;

const SideNavBannerImg = styled.img`
  width: 100%;
  height: 44px;
  transform: scale(0.65);
`;


export { SideNavContainer, SideNavBannerImg };