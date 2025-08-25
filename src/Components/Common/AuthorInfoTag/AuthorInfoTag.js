import styled from "styled-components";
import logo from '../../../Assets/theiautoLogo.png';
import RemoteControler from "../RemoteControler/RemoteControler";
import { useMediaQuery } from "react-responsive";

const TagContainer = styled.div`
  display: flex;
  align-items: center;
  ${({ $isInsideContent }) => $isInsideContent && 'justify-content : space-between'};
  margin-bottom: ${({ $isInsideContent }) => $isInsideContent ? '32px' : '0'};

  @media (max-width :767px) {
    ${({ $isInsideContent, $isMobile }) => ($isInsideContent && $isMobile) && 'flex-direction: column'};
    ${({ $isInsideContent, $isMobile }) => ($isInsideContent && $isMobile) && 'gap : 32px'};
    ${({ $isInsideContent, $isMobile }) => ($isInsideContent && $isMobile) && 'margin : 0'};
  }

  & > .info-layout {
    display: flex;
    align-items: center;
    gap : 8px;

    & > .news-author {
      
      & > .author-email {
          font-size: .95rem;
          font-weight: bold;
          color : ${({ theme }) => theme.neutral.gray600};

        @media (max-width : 767px) {
          font-size: .75rem;
          font-weight: bold;
          color : ${({ theme }) => theme.neutral.gray600};
        }
      }

      color : ${({ theme, $isInsideContent }) => $isInsideContent ? theme.neutral.gray900 : theme.neutral.gray100};
      font-size: .95rem;

      @media (max-width : 1279px) {
        font-size: .9rem;
      }

      @media (max-width : 767px) {
        font-size: .75rem;
      }
    }
  }


`;

const AuthorProfileImg = styled.div`
  border :  ${({ theme, $src }) => $src ? 'none' : `2px solid ${theme.primary.red700}`};
  border-radius: 99px;
  width: 24px;
  height: 24px;
  background-color: ${({ theme }) => theme.neutral.gray900};
  background-image: url(${({ $src }) => $src ? $src : logo});
  background-size: ${({ $src }) => $src ? `cover` : `contain`};
  background-repeat: no-repeat;
  background-position: center;

  @media (max-width : 767px) {
    width : 16px;
    height : 16px;
  }
`;

function AuthorInfoTag({ newsData, isInsideContent }) {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <TagContainer $isInsideContent={isInsideContent} $isMobile={isMobile}>
      <div className="info-layout">
        <AuthorProfileImg $src={newsData?.admin?.profileImg} />
        <span className="news-author">
          <strong>{newsData?.admin?.name}</strong>
          &nbsp;
          {newsData?.admin?.rank}&nbsp;&nbsp;
          {isInsideContent && <span className="author-email">{newsData?.admin?.email}</span>}
        </span>
      </div>
      <RemoteControler isInsideContent={isInsideContent} newsData={newsData} isMobile={isMobile} />
    </TagContainer>
  )
}

export default AuthorInfoTag;