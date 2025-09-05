import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import logoImg from '../../../../../../../../Assets/theiautoLogoWhite.png';
import { useNavigate } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { useSideNavState } from "../../../../../../../Hooks/Context/SideNavStateContext";

const HeaderContainer = styled.div`
  width: 100%;
  border : 4px solid ${({ theme }) => theme.primary.red500};
  padding : 20px 24px;

  @media (max-width : 767px) {
    background-color: ${({ theme }) => theme.neutral.gray900};
    border : none;
    padding : 4px 16px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    & > svg {
      cursor: pointer;
    }
  }  
`;

const MobileLogoBox = styled.img`
  width: 88px;
  height: 48px;
  object-fit: contain;
  cursor: pointer;
  display: block;
`;

const Description = styled.span`
  color : ${({ theme }) => theme.neutral.gray900};
  font-weight: bold;
  font-size : 1.3rem;
`;

function ManagementHeader({ isAd, isSubscriber }) {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const { setMobileMenuActive } = useSideNavState();
  const navigate = useNavigate();

  if (isMobile) {
    return (
      <HeaderContainer>
        <MobileLogoBox src={logoImg} alt="logo-image" onClick={() => navigate('/theiautoCMS/adminpage')} />
        <IoMenu size={24} color="#fff" onClick={() => setMobileMenuActive((prev) => !prev)} />
      </HeaderContainer>
    )
  }

  return (
    <HeaderContainer>
      <Description>{isAd ? '광고 배너 관리' : isSubscriber ? '구독자 관리' : '기사 관리'}</Description>
    </HeaderContainer>
  )
}

export default ManagementHeader;