// src/pages/.../CreateDaum/CreateDaum.jsx
import styled from "styled-components";
import daumLogo from "../../../../../../../../Assets/daum_logo.png";

const DaumContainer = styled.div`
  width: 100%;
  padding: 0 24px;
  margin-bottom: 24px;
`;
const DaumLayourStyle = styled.div`
  width: 100%;
`;
const DaumCheckForm = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  gap: 64px;
  overflow: hidden;
`;
const LogoBox = styled.label`
  display: flex;
  align-items: center;
  gap: 4px;
  & > input { width: 14px; height: 14px; }
  & > img { width: 56px; height: 40px; object-fit: contain; display: block; }
`;
const DaumDescription = styled.span`
  font-size: .83rem;
  line-height: 40px;
  color: #2d4dcc;
  font-weight: 700;
`;
const CommentBox = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;

  & > img { width: 56px; height: 40px; object-fit: contain; display: block; }
`;
const CommentSelector = styled.span`
  font-size: .83rem;
  line-height: 40px;
  color: #2d4dcc;
  font-weight: 700;
`;
const ToggleWrap = styled.button`
  position: relative;
  width: 40px; height: 24px;
  border-radius: 999px;
  border: 1px solid rgba(0,0,0,.3);
  background: ${p => p.$on ? '#3e5bceff' : '#777'};
  box-shadow: ${p => p.$on ? '0 0 8px 1px rgba(0,0,0,.3)' : 'inset 0 0 4px 1px rgba(0,0,0,.5)'};
  cursor: pointer;
`;
const Knob = styled.span`
  position: absolute;
  top : 3px;
  left: ${p => p.$on ? '18px' : '4px'};
  width: 16px; height: 16px; border-radius: 50%;
  background: #eee; box-shadow: 0 0 4px 1px rgba(0,0,0,.4);
  transition: left .25s ease;
`;

function CreateDaum({
  mode,
  articleId,
  sendToDaum, setSendToDaum,
  enableComment, setEnableComment,
  daumPush,
  serverOrigin,
}) {
  return (
    <DaumContainer>
      <DaumLayourStyle>
        <DaumCheckForm>
          <LogoBox>
            <img src={daumLogo} alt="daum-logo" />
            <DaumDescription>에 기사 전송</DaumDescription>
            <input
              type="checkbox"
              checked={sendToDaum}
              onChange={(e) => setSendToDaum(e.target.checked)}
            />
          </LogoBox>

          <CommentBox>
            <img src={daumLogo} alt="daum-logo" />
            <CommentSelector>기사 댓글 허용</CommentSelector>
            <ToggleWrap
              type="button"
              $on={enableComment}
              onClick={() => setEnableComment(v => !v)}
              aria-label="toggle enable comment"
            >
              <Knob $on={enableComment} />
            </ToggleWrap>
          </CommentBox>

          {/* 상태 뱃지 */}
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

          {mode === 'update' && daumPush?.status === 'SUCCESS' && articleId && (
            <a
              href={`${serverOrigin || ''}/integrations/daum/preview/${articleId}`}
              target="_blank" rel="noreferrer"
              style={{ fontSize: '.8rem', marginLeft: 8 }}
            >
              미리보기
            </a>
          )}
        </DaumCheckForm>
      </DaumLayourStyle>
    </DaumContainer>
  );
}

export default CreateDaum;
