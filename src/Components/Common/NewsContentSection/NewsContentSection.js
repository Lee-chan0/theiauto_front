import styled, { css } from "styled-components";
import DOMPurify from 'dompurify';
import NewsImagesSection from "../NewsImagesSection/NewsImagesSection";
import AuthorInfoTag from "../AuthorInfoTag/AuthorInfoTag";
import NewsContentTagSection from '../NewsContentTagSection/NewsContentTagSection';
import { useEffect, useRef, useState } from "react";
import { FaCaretUp } from "react-icons/fa6";
import { RiKakaoTalkFill } from "react-icons/ri";
import { FaFacebook } from "react-icons/fa";
import { RiFileCopy2Fill } from "react-icons/ri";
import { AiFillInstagram } from "react-icons/ai";
import Swal from "sweetalert2";
import NewsContentAside from "../NewsContentAside/NewsContentAside";
import { useMediaQuery } from "react-responsive";

const LayoutContainer = styled.section`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 40px 0;
  position: relative;

  &::after {
    content: "";
    display: table;
    clear: both;
  }

  @media (max-width: 1279px) {
    max-width: 100%;
    padding: 16px 0;
  }

  @media (max-width: 767px) {
    padding: 8px;
  }
`;

const NewsContainer = styled.article`
  width: 70%;
  float: left;
  margin-right: 24px;

  @media (max-width: 1279px) {
    width: 60%;
  }

  @media (max-width: 767px) {
    width: 100%;
    margin-right: 0;
  }
`;

const NewsContentBox = styled.div`
  width: 100%;

  & > p {
    font-size: ${({ $isBasic }) => !$isBasic ? '1.07rem' : '1.5rem'};
    line-height: 1.5;

    @media (max-width: 767px) {
      font-size: ${({ $isBasic }) => !$isBasic ? '.95rem' : '1.3rem'};
    }
  }

  & > p {
    & > img {
      display: block;
      width: 100%;
      max-height: 640px;
      object-fit: contain;
      margin: 12px 0;
    }
  }
`;

const ForStickyBox = styled.div`
  width: 100%;
  position: relative;
`;

const NewsPaddingBox = styled.div`
  position: relative;
  border-radius: 12px;
  padding: 40px 160px;
  transition: box-shadow .8s;
  box-shadow: ${({ $isSticky }) => $isSticky ? `0 0 10px 1px rgba(0, 0, 0, 0.3)` : `0 0 0 rgba(0, 0, 0, 0)`};

  & > img {
    display: block;
    width: 100%;
    max-height: 640px;
    object-fit: contain;
    margin: 12px 0;
  }

  @media (max-width: 1279px) {
    padding: 40px 80px;
  }

  @media (max-width: 767px) {
    padding: 16px;
  }
`;

const RemoteControler = styled.aside.attrs(props => ({
  style: {
    width: props.$isMobile ? (props.$width || 0) + 'px' : 'auto',
  },
}))`
  float: left;
  border-radius: 8px;
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  transition: opacity 0.3s, left 0.3s;
  opacity: ${({ $progress }) => ($progress !== 1) ? '1' : '0'};
  position: sticky;
  margin-right: 24px;
  margin-left: 8px;
  ${({ $isMobile }) => !$isMobile ? 'top : 80px' : 'bottom : 60px'};

  @media (max-width: 767px) {
    float: none;
    margin: 0;
    flex-direction: row;
    position: fixed;
    background-color: ${({ theme }) => theme.neutral.gray900};
    padding: 8px;
    z-index: 9998;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(28px, 1fr));
    box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.3);
  }

  & > button {
    width: 36px;
    height: 36px;
    border-radius: 8px;
    cursor: pointer;
    border: none;
    transition: background-color 0.3s, color 0.3s;

    &:hover {
      background-color: ${({ theme }) => theme.primary.red300};
      color: ${({ theme }) => theme.neutral.gray100};
    }

    @media (max-width: 767px) {
      width: 28px;
      height: 28px;
      background-color: ${({ theme }) => theme.neutral.gray600};
    }
  }

  & > .flex-box {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  & > #basic-btn {
    background-color: ${({ $isBasic, theme }) => !$isBasic && theme.primary.red300};
    color: ${({ $isBasic, theme }) => !$isBasic ? theme.neutral.gray100 : 'black'};
    font-size: .95rem;
    font-weight: 300;

    @media (max-width: 767px) {
      font-size: .75rem;
    }
  }

  & > #large-btn {
    background-color: ${({ $isBasic, theme }) => $isBasic && theme.primary.red300};
    color: ${({ $isBasic, theme }) => $isBasic ? theme.neutral.gray100 : 'black'};
    font-size: 1.4rem;
    font-weight: bold;

    @media (max-width: 767px) {
      font-size: 1.15rem;
    }
  }
`;

const textStyle = css`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const StikcyTitleBox = styled.div.attrs(props => ({
  style: {
    width: props.$width || 0,
  },
}))`
  position: fixed;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  top: ${({ $isSticky, $progress }) => ($isSticky && ($progress !== 0 && $progress !== 1)) ? '0' : '-160px'};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: top 0.5s;
  z-index: 2;
  background-color: ${({ theme }) => theme.neutral.gray100};
  padding: 16px 24px;
  box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.5);
  overflow: hidden;

  & > h1 {
    font-size: 1.2rem;
    color: ${({ theme }) => theme.neutral.gray900};
    ${textStyle};

    @media (max-width: 1279px) {
      font-size: 1rem;
    }
  }

  & > h2 {
    font-size: .9rem;
    color: ${({ theme }) => theme.neutral.gray600};
    ${textStyle};

    @media (max-width: 1279px) {
      display: none;
    }
  }
`;

const StickyProgressBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 4px;
  background-color: ${({ theme }) => theme.primary.red700};
  z-index: 2;
  transition: width 0.4s ease-out;
`;

const AsideContainer = styled.aside`
  width: 22%;
  float: left;
  position: sticky;
  top: 0;

  @media (max-width: 1279px) {
    width: 27%;
  }
`;

const MobileContainer = styled.div`
  position: relative;
`;

function NewsContentSection({ newsData, isSticky }) {
  const [isBasic, setIsBasic] = useState(false);
  const [stickyTitleWidth, setStickyTitleWidth] = useState(0);
  const [progress, setProgress] = useState(0);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const progressRef = useRef(null);
  const forStickyRef = useRef(null);

  const clickTextSizeBtn = (e) => {
    e.preventDefault();
    const id = e.target.id;

    id === 'basic-btn' ? setIsBasic(false) : setIsBasic(true);
  }

  const handleTopClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

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

  useEffect(() => {
    let ticking = false;

    const calculateProgress = () => {
      const el = progressRef.current;
      if (!el) return;

      const { top, height } = el.getBoundingClientRect();
      const totalScroll = height - window.innerHeight;
      const scrolled = Math.min(Math.max(-top, 0), totalScroll);
      setProgress(totalScroll > 0 ? scrolled / totalScroll : 1);

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(calculateProgress);
      }
    };

    calculateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!forStickyRef.current) return;

    const target = forStickyRef.current;

    const resizeObserver = new ResizeObserver(() => {
      setStickyTitleWidth(target.getBoundingClientRect().width);
    });

    resizeObserver.observe(target);

    return () => {
      resizeObserver.disconnect();
    };
  }, [isMobile]);

  return (
    <LayoutContainer>
      {
        !isMobile ?
          <>
            <RemoteControler $isSticky={isSticky} $progress={progress} $isBasic={isBasic} $isMobile={isMobile}>
              <button id="basic-btn" title="기본 글자" onClick={clickTextSizeBtn}>가</button>
              <button id="large-btn" title="큰 글자" onClick={clickTextSizeBtn}>가</button>
              <button className="flex-box" title="카카오톡 공유하기">
                <RiKakaoTalkFill size={24} />
              </button>
              <button className="flex-box" title="페이스북 공유하기">
                <FaFacebook size={20} />
              </button>
              <button className="flex-box" title="인스타그램 공유하기">
                <AiFillInstagram size={26} />
              </button>
              <button className="flex-box" title="기사 내용 복사" onClick={handleCopyContent}>
                <RiFileCopy2Fill size={24} />
              </button>
              <button className="flex-box" onClick={handleTopClick} title="최상단 바로가기">
                <FaCaretUp size={24} />
              </button>
            </RemoteControler>
            <NewsContainer ref={progressRef}>
              <ForStickyBox ref={forStickyRef}>
                <StikcyTitleBox $width={stickyTitleWidth} $isSticky={isSticky} $progress={progress}>
                  <StickyProgressBar style={{ width: `${progress * 100}%` }} />
                  <h1>{newsData?.articleTitle}</h1>
                  <h2>{newsData?.articleSubTitle}</h2>
                </StikcyTitleBox>
                <NewsPaddingBox $isSticky={isSticky}>
                  <img src={newsData?.articleBanner} alt={`news-main-image-${newsData?.articleId}`} />
                  <NewsContentBox
                    $isBasic={isBasic}
                    $isSticky={isSticky}
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(newsData?.articleContent) }}
                  />
                  <NewsContentTagSection newsData={newsData} />
                  <AuthorInfoTag newsData={newsData} isInsideContent={true} />
                  <NewsImagesSection newsData={newsData} />
                </NewsPaddingBox>
              </ForStickyBox>
            </NewsContainer>
            <AsideContainer>
              <NewsContentAside isSticky={isSticky} />
            </AsideContainer>
          </>
          :
          <MobileContainer>
            <RemoteControler $isSticky={isSticky} $progress={progress} $isBasic={isBasic} $isMobile={isMobile} $width={stickyTitleWidth}>
              <button id="basic-btn" title="기본 글자" onClick={clickTextSizeBtn}>가</button>
              <button id="large-btn" title="큰 글자" onClick={clickTextSizeBtn}>가</button>
              <button className="flex-box" title="카카오톡 공유하기">
                <RiKakaoTalkFill size={24} color="black" />
              </button>
              <button className="flex-box" title="페이스북 공유하기">
                <FaFacebook size={20} color="black" />
              </button>
              <button className="flex-box" title="인스타그램 공유하기">
                <AiFillInstagram size={26} color="black" />
              </button>
              <button className="flex-box" title="기사 내용 복사" onClick={handleCopyContent}>
                <RiFileCopy2Fill size={24} color="black" />
              </button>
              <button className="flex-box" onClick={handleTopClick} title="최상단 바로가기">
                <FaCaretUp size={24} color="black" />
              </button>
            </RemoteControler>
            <NewsContainer ref={progressRef}>
              <ForStickyBox ref={forStickyRef}>
                <StikcyTitleBox $width={stickyTitleWidth} $isSticky={isSticky} $progress={progress}>
                  <StickyProgressBar style={{ width: `${progress * 100}%` }} />
                  <h1>{newsData?.articleTitle}</h1>
                  <h2>{newsData?.articleSubTitle}</h2>
                </StikcyTitleBox>
                <NewsPaddingBox $isSticky={isSticky}>
                  <img src={newsData?.articleBanner} alt={`news-main-image-${newsData?.articleId}`} />
                  <NewsContentBox
                    $isBasic={isBasic}
                    $isSticky={isSticky}
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(newsData?.articleContent) }}
                  />
                  <NewsContentTagSection newsData={newsData} />
                  <AuthorInfoTag newsData={newsData} isInsideContent={true} />
                  <NewsImagesSection newsData={newsData} />
                </NewsPaddingBox>
              </ForStickyBox>
            </NewsContainer>
          </MobileContainer>
      }

    </LayoutContainer>
  )
}

export default NewsContentSection;