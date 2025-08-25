import styled from "styled-components";
import adImg from '../../../../Assets/adHelperImage.png';
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

const ContentContainer = styled.div`
  width: 100%;
`;

const ContentBox = styled.div`
  background-image: url(${adImg});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 640px;
`;

function AdHelperPage() {
  const navigate = useNavigate();

  return (
    <MainContainer>
      <Description>
        온·오프라인 광고 문의
        <span onClick={() => navigate('/instructions')}>
          <IoIosInformationCircleOutline size={15} />
          안내&nbsp;&nbsp;{'>'}&nbsp;
          <span>온·오프라인 광고 문의</span>
        </span>
      </Description>
      <ContentContainer>
        <div>
          <div style={{ fontSize: '1.2rem', marginBottom: '8px', color: '#1a1a1a' }}><strong>더아이오토와 함께 브랜드 가치를 높여보세요!</strong></div>
          <div style={{ fontSize: '.9rem', color: '#666666' }}>다채로운 광고 채널과 맞춤형 캠페인으로 귀사의 홍보 효과를 극대화해드립니다.</div>
        </div>
        <ContentBox />
        <div style={{ width: '100%' }}>
          <div style={{ textAlign: 'right', fontSize: '0.8rem' }}>
            <u style={{ backgroundColor: 'yellow', textDecoration: 'none', padding: '1px 4px' }}>문의 : <strong>theiauto@naver.com</strong></u>
          </div>
        </div>
      </ContentContainer>
    </MainContainer>
  )
}

export default AdHelperPage;