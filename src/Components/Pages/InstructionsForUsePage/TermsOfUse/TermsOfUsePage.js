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
`;

function TermsOfUsePage() {
  const navigate = useNavigate();

  return (
    <MainContainer>
      <Description>
        이용약관
        <span onClick={() => navigate('/instructions')}>
          <IoIosInformationCircleOutline size={15} />
          안내&nbsp;&nbsp;{'>'}&nbsp;
          <span>이용약관</span>
        </span>
      </Description>
      <Controler>
        <ContentBox>
          <h3>1.목적</h3>
          <p>
            이 약관은 더아이오토(이하 ‘회사’)가 운영하는 웹사이트에서 제공하는 서비스의 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
          </p>
        </ContentBox>
        <ContentBox>
          <h3>2.정의</h3>
          <p>
            - “서비스”란 회사가 웹사이트를 통해 제공하는 기사, 이미지, 영상 등 모든 콘텐츠를 의미합니다.
          </p>
          <p>
            - “이용자”란 이 약관에 따라 웹사이트에 접속하여 서비스를 이용하는 자를 말합니다.
          </p>
        </ContentBox>
        <ContentBox>
          <h3>3.약관의 효력 및 변경</h3>
          <p>
            - 본 약관은 웹사이트에 게시함으로써 효력이 발생하며, 필요시 관련 법령을 위반하지 않는 범위에서 변경될 수 있습니다.
          </p>
        </ContentBox>
        <ContentBox>
          <h3>4.서비스의 제공 및 변경</h3>
          <p>
            - 회사는 기사, 이미지 등 콘텐츠를 자유롭게 수정·삭제하거나 중단할 수 있습니다.
          </p>
          <p>
            - 서비스는 연중무휴, 24시간 제공을 원칙으로 하나, 시스템 점검 등 사유로 일시 중단될 수 있습니다.
          </p>
        </ContentBox>
        <ContentBox>
          <h3>5.저작권 및 콘텐츠 이용</h3>
          <p>
            - 이용자는 회사의 사전 동의 없이 콘텐츠를 복제, 배포, 전송, 전시, 판매할 수 없습니다.
          </p>
          <p>
            - 웹사이트에 게시된 모든 콘텐츠의 저작권은 회사 또는 제휴사가 보유합니다.
          </p>
        </ContentBox>
        <ContentBox>
          <h3>6.금지 행위</h3>
          <p>이용자는 다음 행위를 해서는 안 됩니다</p>
          <ol style={{ listStyle: 'circle', display: 'flex', flexDirection: 'column', gap: '8px', margin: '4px' }}>
            <li>
              회사 또는 제3자의 권리 침해
            </li>
            <li>
              서비스 운영 방해 (스크래핑, 크롤링 등 포함)
            </li>
            <li>
              불법적이거나 부당한 행위
            </li>
          </ol>
        </ContentBox>
        <ContentBox>
          <h3>7.면책조항</h3>
          <p>- 회사는 콘텐츠의 정확성이나 신뢰성에 대해 보장하지 않으며, 이용자가 해당 콘텐츠를 신뢰하여 발생한 손해에 책임을 지지 않습니다.</p>
          <p>- 외부 링크나 광고에 대한 책임은 해당 운영자에게 있습니다.</p>
        </ContentBox>
      </Controler>
    </MainContainer >
  )
}

export default TermsOfUsePage;