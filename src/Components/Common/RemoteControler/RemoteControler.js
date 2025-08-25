import styled from "styled-components";
import { RiFileCopy2Fill } from "react-icons/ri";
import { IoShareOutline } from "react-icons/io5";
import Swal from "sweetalert2";
import { useMediaQuery } from "react-responsive";

const MainContainer = styled.div`
  margin-left: 16px;
  display: flex;
  gap : ${({ $isInsideContent }) => $isInsideContent ? '12px' : '8px'};

  @media (max-width : 767px) {
    width: ${({ $isInsideContent, $isMobile }) => ($isInsideContent && $isMobile) && '100%'};
    justify-content: right;
    margin-right: ${({ $isInsideContent, $isMobile }) => ($isInsideContent && $isMobile) && '32px'};
  }

  & > svg {
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }
  }
`;

function RemoteControler({ isInsideContent, newsData }) {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const handleCopyContent = () => {
    const container = document.createElement('div');
    container.innerHTML = newsData?.articleContent || '';

    let finalText = '';

    container.childNodes.forEach(node => {
      if (node.nodeType === 1 && node.nodeName === 'P') {
        const p = node;

        const img = p.querySelector('img');
        if (img) {
          finalText += `[theiauto = 이미지] ${img.src}\n`;
        } else {
          finalText += p.innerText.trim() + '\n';
        }
      }
    });

    navigator.clipboard.writeText(finalText)
      .then(() => {
        Swal.fire({
          toast: true,
          position: 'top',
          timer: 2000,
          title: "기사 내용이 복사되었습니다.",
          showConfirmButton: false,
          showClass: {
            popup: 'swal-clipboard-up-in'
          },
          hideClass: {
            popup: 'swal-clipboard-up-out'
          },
          customClass: {
            container: 'clipboard-container',
            popup: 'success-clipboard'
          }
        })
      })
      .catch(() => alert('알 수 없는 오류로 복사에 실패했습니다.'));
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: newsData?.articleTitle,
        text: '이 기사 함께 보세요!',
        url: window.location.href,
      })
        .then(() => console.log('공유 성공'))
        .catch((err) => console.warn('공유 실패', err));
    } else {
      alert('이 브라우저에서는 공유 기능이 지원되지 않습니다.');
    }
  }

  return (
    <MainContainer $isInsideContent={isInsideContent} $isMobile={isMobile}>
      {
        !isMobile ?
          <>
            <RiFileCopy2Fill
              color={isInsideContent ? '#666666' : '#f2f2f2'}
              size={isInsideContent ? 24 : 20}
              title="기사 복사"
              onClick={handleCopyContent}
            />
            <IoShareOutline
              color={isInsideContent ? '#666666' : '#f2f2f2'}
              size={isInsideContent ? 24 : 20}
              title="공유하기"
              onClick={handleShare}
            />
          </>
          :
          <>
            <RiFileCopy2Fill
              color={isInsideContent ? '#666666' : '#f2f2f2'}
              size={isInsideContent ? 20 : 18}
              title="기사 복사"
              onClick={handleCopyContent}
            />
            <IoShareOutline
              color={isInsideContent ? '#666666' : '#f2f2f2'}
              size={isInsideContent ? 20 : 18}
              title="공유하기"
              onClick={handleShare}
            />
          </>
      }
    </MainContainer>
  )
}

export default RemoteControler;