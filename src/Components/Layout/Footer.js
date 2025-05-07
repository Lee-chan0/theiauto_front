import styled from "styled-components";
import logo from '../../Assets/theiautoLogoWhite.png';

const footerItems = ['회사소개', '온/오프라인 광고 문의', '이용약관', '사업제휴'];

const FooterWrapper = styled.footer`
  width: 100%;
  background-color: ${({ theme }) => theme.neutral.gray900};
  position: relative;

`;

const FooterInnerBox = styled.div`
  max-width: 1280px;
  margin : 0 auto;
  padding : 40px;
  padding-top: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FooterContentBox = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap : 12px;
`;

const FooterContents = styled.li`
  color: ${({ theme }) => theme.neutral.gray600};
  font-size: 0.85rem;
`;

const FooterLogo = styled.img`
  width: 240px;
  object-fit: contain;
  opacity: 0.5;
  cursor: pointer;
`;

const FooterNavigation = styled.ul`
  position: absolute;
  width: 100%;
  top : 0; left : 0;
  display: flex;
  justify-content: center;
  gap: 40px;
  background-color: ${({ theme }) => theme.primary.red700};
`;

const FooterNavItems = styled.li`
  color : ${({ theme }) => theme.neutral.gray300};
  font-weight: 700;
  font-size: .85rem;
  cursor: pointer;
  padding : 12px 8px;

  &:hover {
    opacity: 0.8;
  }
`;

function Footer() {
  return (
    <FooterWrapper>
      <FooterInnerBox>
        <FooterNavigation>
          {
            footerItems.map((item, i) => (
              <FooterNavItems key={i}>{item}</FooterNavItems>
            ))
          }
        </FooterNavigation>
        <FooterContentBox>
          <FooterContents>COPYRIGHT ⓒ 2011 ~ 더아이오토 theiauto.com All Rights Reserved</FooterContents>
          <FooterContents>본 사이트의 모든 기사 및 컨텐츠는 제휴 협약 없는 무단 전재, 복사, 배포를 금합니다.</FooterContents>
          <FooterContents>사업자등록번호 : 406-11-01300 / 등록번호 서울 아54024 / 등록일자 : 2021년 11월 18일</FooterContents>
          <FooterContents>주소 : 서울 강서구 곰달래로31길 65, 402호</FooterContents>
          <FooterContents>발행 및 편집인 : 한창희 / 개인정보관리책임자 : 김혜원</FooterContents>
          <FooterContents>제휴 및 문의 : theiauto@naver.com</FooterContents>
          <FooterContents>대표 전화 : 010-7447-0607</FooterContents>
        </FooterContentBox>
        <FooterLogo src={logo} alt="theiauto-logo-image" />
      </FooterInnerBox>
    </FooterWrapper>
  )
}

export default Footer;