// CreateDaum.jsx
import styled from "styled-components";
import daumLogo from "../../../../../../../../Assets/daum_logo.png";

const DaumContainer = styled.div`
  width: 100%; 
  padding: 0 24px; 
  margin-bottom: 24px;
`;
const DaumCheckForm = styled.div`
  width: 100%; 
  height: 40px; 
  display: flex; 
  align-items: center; 
  gap: 8px; 
  overflow: hidden;
`;
const LogoBox = styled.label`
  display: flex;
  align-items: center;
  gap: 4px;
  & > input {
     width: 14px; height: 14px;
     }
  & > img {
     width: 56px; height: 40px; object-fit: contain; display: block;
   }
`;
const DaumDescription = styled.span`
  font-size: .83rem;
  line-height: 40px; 
  color: #2d4dcc; 
  font-weight: 700;
`;

function CreateDaum({ sendToDaum, setSendToDaum, daumPush, articleId }) {

  return (
    <DaumContainer>
      <DaumCheckForm>
        <LogoBox>
          <img src={daumLogo} alt="daum-logo" />
          <DaumDescription>에 기사 전송</DaumDescription>
          {/* ✅ 기본 체크: checked={true}, 사용자가 풀면 전송 안 함 */}
          <input
            type="checkbox"
            checked={sendToDaum}
            onChange={(e) => setSendToDaum(e.target.checked)}
          />
        </LogoBox>

        {/* (선택) 상태 뱃지 표시 */}
        {daumPush?.status && (
          <span style={{ fontSize: '.8rem', color: '#666' }}>
            상태: {daumPush.status}
          </span>
        )}
        {daumPush?.error && (
          <span style={{ fontSize: '.8rem', color: '#d33' }}>
            오류: {daumPush.error}
          </span>
        )}

        {daumPush.status === 'SUCCESS' && articleId && (
          <a
            href={`${process.env.REACT_APP_SERVER_BASE_URL || ''}/integrations/daum/preview/${articleId}`}
            target="_blank" rel="noreferrer"
            style={{ fontSize: '.8rem', marginLeft: 8 }}
          >
            미리보기
          </a>
        )}
      </DaumCheckForm>
    </DaumContainer>
  );
}

export default CreateDaum;
