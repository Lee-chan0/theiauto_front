import { useNavigate } from "react-router-dom";
import styled from "styled-components";
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

const Controler = styled.div`
  display: flex;
  flex-direction: column;
  gap : 48px;
  width: 100%;

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

  & > a {
    font-size: .9rem;
}
`;


function PrivacyPolicyPage() {
  const navigate = useNavigate();

  return (
    <MainContainer>
      <Description>
        개인정보취급방침
        <span onClick={() => navigate('/instructions')}>
          <IoIosInformationCircleOutline size={15} />
          안내&nbsp;&nbsp;{'>'}&nbsp;
          <span>개인정보취급방침</span>
        </span>
      </Description>
      <Controler>
        <ContentBox>
          <p>더아이오토(이하 "회사")는 『개인정보 보호법』 등 관련 법령을 준수하며, 아래와 같이 개인정보처리방침을 안내합니다.</p>
        </ContentBox>
        <ContentBox>
          <h3>1.개인정보 수집 항목</h3>
          <p>
            회사는 이용자의 개인정보를 직접 수집하지 않으며, 회원가입, 로그인 등의 기능도 제공하지 않습니다.
          </p>
          <p>
            다만, 웹사이트 운영 및 광고 게재와 관련하여 아래와 같은 비식별 정보가 자동으로 수집될 수 있습니다.
          </p>
          <ol style={{ listStyle: 'circle', margin: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }} >
            <li>접속 로그 (IP 주소, 브라우저 정보, 방문 시간 등)</li>
            <li>쿠키 및 유사 기술 정보</li>
            <li>광고 ID, 기기정보 (모바일 기기 접속 시)</li>
          </ol>
        </ContentBox>
        <ContentBox>
          <h3>2.쿠키(Cookie) 및 행태정보의 수집·이용</h3>
          <p>
            회사는 Google 등 제3자 광고 제공업체의 서비스를 통해 광고를 게재할 수 있으며, 이 과정에서 이용자의 브라우저에 쿠키(cookie) 가 저장되거나 읽힐 수 있습니다.
          </p>
          <ol style={{ listStyle: 'circle', margin: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }} >
            <li>Google은 사용자에게 맞춤 광고를 제공하기 위해 쿠키를 사용합니다.</li>
            <li>Google을 포함한 제3자 공급업체는 쿠키를 사용하여 본 웹사이트 및 다른 웹사이트에서 사용자의 과거 방문 기록을 기반으로 광고를 제공합니다.</li>
            <li>사용자는 Google 광고 설정 페이지에서 맞춤 광고를 비활성화할 수 있습니다.</li>
          </ol>
        </ContentBox>
        <ContentBox>
          <h3>3.개인정보의 제3자 제공</h3>
          <p>
            회사는 직접적인 개인정보를 수집하지 않으며, 따라서 제3자에게 개인정보를 제공하거나 위탁하지 않습니다.
          </p>
          <p style={{ marginBottom: '4px' }}>
            단, Google AdSense와 같은 제3자 플랫폼은 자체적인 수집·이용방침을 따릅니다. 관련 내용은 아래 링크에서 확인 가능합니다.
          </p>
          <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Google 개인정보 보호정책1</a>
          <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noreferrer">Google 개인정보 보호정책2</a>
        </ContentBox>
        <ContentBox>
          <h3>4.정보주체의 권리</h3>
          <p>
            이용자는 언제든지 쿠키 저장을 거부하거나 삭제할 수 있습니다.<br></br><br></br>
            <em style={{ color: 'gray' }}>{'방법: 브라우저 설정 > 개인정보 보호 또는 쿠키 설정 메뉴 참고'}</em>
          </p>
        </ContentBox>
        <ContentBox>
          <h3>5.개인정보 보호를 위한 보안조치</h3>
          <p>
            회사는 개인정보를 수집하지 않지만, 웹사이트의 안전한 운영을 위해 다음과 같은 보안 조치를 취합니다.
          </p>
          <ol style={{ listStyle: 'circle', margin: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }} >
            <li>웹사이트 접근 제한 및 보안 모니터링</li>
            <li>악성 코드 차단 및 자동 점검</li>
          </ol>
        </ContentBox>
        <ContentBox>
          <h3>문의처</h3>
          <p>
            본 방침에 대한 문의사항은 아래 이메일을 통해 접수받습니다.<br></br><br></br>
            이메일 : <em style={{ fontWeight: 'bold', color: 'gray', backgroundColor: 'yellow' }}>theiauto@naver.com</em>
          </p>
        </ContentBox>
      </Controler>
    </MainContainer>
  )
}

export default PrivacyPolicyPage;