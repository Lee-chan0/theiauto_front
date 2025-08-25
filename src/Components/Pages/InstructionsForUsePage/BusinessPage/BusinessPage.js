import styled from "styled-components";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";


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

const Controler = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap : 48px;

  padding : 16px;
  padding-bottom: 0;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  gap : 8px;

  & > h3 {
    font-size: 1.25rem;
    color : ${({ theme }) => theme.neutral.gray900};
  }

  & > p {
    font-size: .95rem;
    color : ${({ theme }) => theme.neutral.gray600};
  }

  & > ol {
    font-size: .95rem;
  }

  & > u {
    width: fit-content;
    text-decoration: none;

    & > .highlight {
      background-color: yellow;
      font-size: 1.1rem;
      padding : 0 4px;
    }
  }
`;

function BusinessPage() {
  const navigate = useNavigate();


  return (
    <MainContainer>
      <Description>
        사업제휴
        <span onClick={() => navigate('/instructions')}>
          <IoIosInformationCircleOutline size={15} />
          안내&nbsp;&nbsp;{'>'}&nbsp;
          <span>사업제휴</span>
        </span>
      </Description>
      <Controler>
        <ContentBox>
          <h3>사업 제휴 문의</h3>
          <p>본 웹사이트는 자동차 산업, 모빌리티, 전기차, IT 등과 관련된 다양한 콘텐츠와 서비스를 제공하고 있으며,</p>
          <p>관련 분야의 제휴 및 협업을 통해 더 나은 정보를 사용자에게 제공하고자 합니다.</p><br></br>
          <p>제휴 형태는 다음과 같은 유형을 포함합니다</p>
          <ol style={{ listStyle: 'circle', display: 'flex', flexDirection: 'column', gap: '4px', margin: '4px' }}>
            <li style={{ fontWeight: '500' }}>공동 콘텐츠 제작 및 홍보</li>
            <li style={{ fontWeight: '500' }}>배너 및 기사 광고 게재</li>
            <li style={{ fontWeight: '500' }}>API 또는 데이터 연동</li>
            <li style={{ fontWeight: '500' }}>브랜디드 콘텐츠 및 프로모션 협력</li>
            <li style={{ fontWeight: '500' }}>기타 상호 이익이 되는 협업 형태</li>
          </ol>
        </ContentBox>
        <ContentBox>
          <h3>제휴 절차 및 문의</h3>
          <p>제휴 제안은 아래 이메일로 받고 있으며, 제안서(PDF 형식 등)를 함께 보내주시면 빠른 검토가 가능합니다.</p>
          <u><strong className="highlight">E-mail : theiauto@naver.com</strong></u>
          <ol style={{ listStyle: 'circle', display: 'flex', flexDirection: 'column', gap: '4px', margin: '4px' }}>
            <li>제안서에는 회사/기관 소개, 제휴 목적, 예상 효과, 기간 등을 포함해 주세요.</li>
            <li>접수 후, 영업일 기준 3~5일 이내에 회신드립니다.</li>
            <li>필요 시, 별도 미팅 또는 추가자료 요청이 있을 수 있습니다.</li>
          </ol>
        </ContentBox>
        <ContentBox>
          <h3>기타 안내</h3>
          <p>본 웹사이트는 회원가입 없이 이용 가능하므로, 제휴 관련 정보 제공은 이메일을 통해 개별 수집됩니다.</p>
        </ContentBox>
      </Controler>
    </MainContainer>
  )
}

export default BusinessPage;