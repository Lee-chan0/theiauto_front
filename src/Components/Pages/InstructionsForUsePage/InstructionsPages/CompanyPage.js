import styled from "styled-components";
import companyImg from '../../../../Assets/company-intro.png';
import { useNavigate } from "react-router-dom";
import { IoIosInformationCircleOutline } from "react-icons/io";

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Description = styled.span`
  width: 100%;
  color: ${({ theme }) => theme.neutral.gray900};
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
  font-size: 1.65rem;
  padding : 0 16px;

  & > span {
    font-size: .8rem;
    color : ${({ theme }) => theme.neutral.gray300};
    cursor: pointer;
    font-weight: 400;
    display: flex;
    align-items: center;
    gap : 2px;

    & > span {
      color : ${({ theme }) => theme.neutral.gray600};
    }
  }
`;

const CompanyBackImg = styled.div`
  background-image: url(${companyImg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 280px;
`;

const IntroductionContainer = styled.div`
  padding : 40px 240px;
  padding-bottom : 0;
  line-height: 1.5;

  & > p {
    font-size: 1rem;
  }
`;

function CompanyPage() {
  const navigate = useNavigate();

  return (
    <MainContainer>
      <Description>
        Company Introduction
        <span onClick={() => navigate('/instructions')}>
          <IoIosInformationCircleOutline size={15} />
          안내&nbsp;&nbsp;{'>'}&nbsp;
          <span>회사소개</span>
        </span>
      </Description>
      <div style={{ padding: '0 16px', width: '100%' }}>
        <CompanyBackImg />
      </div>
      <IntroductionContainer>
        <p>
          더아이오토는 그 동안 자동차 관련사보 및 책자편집, 카탈로그 작업과 함께 광고 시안 작업을 진행해 오고 있습니다. 이와 함께 다양한 기획 및 마케팅 지원 등을 통해 사업을 확장하고 있으며, 전문 프리랜서는 물론 사진 작가와 연계해 영역을 점점 넓히고 있습니다.
        </p>
        <br></br>
        <p>
          지난 2011년에 시작을 한 다양한 자동차 뉴스 사이트 더아이오토(theiauto.com)은 물론 월간 theiauto(더아이오토)를 발행하면서 전문적인 자동차 지식을 전달해 왔습니다. 이를 통해 구글과 다음, 네이버에 다양한 기사를 전달해 오고 있으며, 자동차 관련 기사를 발빠르게 전달하고 있습니다.
        </p>
        <br></br>
        <p>
          앞으로도 자동차와 관련된 정보를 많은 사람들에게 전달하면서 최고의 자동차 전문가 프리랜서 그룹으로 자리잡을 수 있도록 노력할 것입니다.
        </p>
      </IntroductionContainer>
    </MainContainer>
  )
}

export default CompanyPage;