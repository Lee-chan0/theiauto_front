import { useQuery } from "@tanstack/react-query";
import { fetchMagazineArticles } from "../../../API/generalAPI/generalArticle.api";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const SubScribeContainer = styled.section`
  width: 100%;
  background-color: ${({ theme }) => theme.neutral.gray100};
`;

const SubScribeInnerBox = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: ${({ $IsInstruction }) => $IsInstruction ? '0' : '60px 40px'};
  display: flex;
  flex-direction: column;
  gap: 80px;

  @media (max-width: 1279px) {
    max-width: 100%;
    padding: 40px 24px;
    gap: 60px;
  }

  @media (max-width: 767px) {
    max-width: 100%;
    padding: 24px 16px;
    gap: 40px;
  }
`;

/* ✅ Hero 섹션 */
const HeroSection = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;

  & > h1 {
    font-size: 2.4rem;
    font-weight: bold;
    color: ${({ theme }) => theme.neutral.gray900};

    @media (max-width : 767px) {
      font-size: 1.7rem;
    }
  }

  & > p {
    max-width: 640px;
    font-size: 1.1rem;
    color: ${({ theme }) => theme.neutral.gray600};
    line-height: 1.6;

    @media (max-width : 767px) {
      font-size: .9rem;
    }
  }

  & > button {
    margin-top: 24px;
    padding: 14px 32px;
    font-size: 1.1rem;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    background-color: ${({ theme }) => theme.primary.red500};
    color: ${({ theme }) => theme.neutral.gray100};
    transition: background-color 0.3s;

    &:hover {
      background-color: ${({ theme }) => theme.primary.red700};
    }
  }
`;

/* ✅ 혜택 섹션 */
const BenefitSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 24px;

  @media (max-width : 767px) {
    gap : 16px;
  }
`;

const BenefitCard = styled.div`
  background-color: white;
  padding: 24px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  & > h3 {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 8px;
    color: ${({ theme }) => theme.neutral.gray900};
  }

  & > p {
    font-size: 0.95rem;
    color: ${({ theme }) => theme.neutral.gray600};
    line-height: 1.5;
  }
`;

/* ✅ 프리뷰 (잡지 이미지 or 기사) */
const PreviewSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  & > h2 {
    font-size: 1.6rem;
    font-weight: bold;
    color: ${({ theme }) => theme.neutral.gray900};

    @media (max-width : 767px) {
      font-size: 1.3rem;
    }
  }
`;

const PreviewContentBox = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap : 16px;
`;

const PreviewContentItems = styled.li`
  width: 100%;
  height: 100%;
  position: relative;
  
  & > img {
    width: 100%;
    height: 100%;
    transition: transform 0.3s, filter 0.3s;
    will-change: transform;
    cursor: pointer;
    display: block;
    object-fit: contain;
    border-radius: 4px;
    filter: ${({ $isRecent }) => $isRecent ? 'brightness(100%)' : 'brightness(50%)'};
    transform: ${({ $isRecent }) => $isRecent ? 'scale(1)' : 'scale(0.95)'};

    &:hover {
      transform: scale(1);
      filter: brightness(100%);
    }
  }
`;

const PreviewRecentDescrip = styled.span`
  position: absolute;
  left : -2px;
  top : -2px;
  background-color: ${({ theme }) => theme.primary.red300};
  padding : 4px 8px;
  color : ${({ theme }) => theme.neutral.gray100};
  font-weight: bold;
  border-radius: 4px;
  z-index: 1;
`;

/* ✅ CTA 섹션 */
const CTASection = styled.div`
  text-align: center;
  padding: 40px;
  background-color: ${({ theme }) => theme.primary.red100};
  border-radius: 12px;

  & > h3 {
    font-size: 1.8rem;
    font-weight: bold;
    color: ${({ theme }) => theme.neutral.gray900};
    margin-bottom: 16px;

    @media (max-width : 767px) {
      font-size: 1.3rem;
    }
  }

  & > p {
    font-size: 1rem;
    color: ${({ theme }) => theme.neutral.gray700};
    margin-bottom: 24px;

    font-size: .9rem;
  }
`;

const CTADescrip = styled.span`
  background-color: yellow;
  padding : 1px 6px;
  border-radius: 2px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
  font-size: .9rem;

  & > u {
    text-decoration: none;
    font-weight: bold;
    color : ${({ theme }) => theme.neutral.gray600};
  }

  @media (max-width : 767px) {
    font-size: .75rem;
  }
`;

function SubScribeSection({ IsInstruction }) {
  const { data: magazineData, isError } = useQuery({
    queryKey: ["magazine-news"],
    queryFn: fetchMagazineArticles,
  });
  const magazineArticles = magazineData?.magazineArticles || [];
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    if (isError) {
      navigate("/error");
    }
  }, [navigate, isError]);

  if (isError) return null;

  return (
    <SubScribeContainer>
      <SubScribeInnerBox $IsInstruction={IsInstruction}>
        {/* ✅ Hero */}
        <HeroSection>
          <h1>당신의 드라이브를 바꾸는 단 한 권의 매거진</h1>
          <p>
            국내외 신차, 모터스포츠, 그리고 자동차 라이프스타일까지.
            자동차를 사랑하는 이들을 위한 프리미엄 자동차 매거진
          </p>
        </HeroSection>

        {/* ✅ Benefit */}
        <BenefitSection>
          <BenefitCard>
            <h3>최신 트렌드</h3>
            <p>국내외 신차와 업계 소식을 누구보다 빠르게 받아보세요.</p>
          </BenefitCard>
          <BenefitCard>
            <h3>심층 분석</h3>
            <p>전문가의 시승기와 기술 분석을 한눈에 확인하세요.</p>
          </BenefitCard>
          <BenefitCard>
            <h3>모터스포츠 소식</h3>
            <p>국내외 주요 레이스 현장 소식을 생생히 전달합니다.</p>
          </BenefitCard>
          <BenefitCard>
            <h3>라이프스타일</h3>
            <p>자동차와 어울리는 여행과 브랜드 스토리를 만나보세요.</p>
          </BenefitCard>
        </BenefitSection>

        {/* ✅ Preview */}
        {magazineArticles.length !== 0 && (
          <PreviewSection>
            <h2>월간지 둘러보기</h2>
            <PreviewContentBox>
              {
                !isMobile ?
                  magazineArticles.map((m, i) => (
                    <PreviewContentItems
                      key={m.articleId}
                      onClick={() => navigate(`/news/${m.articleId}`)}
                      onMouseEnter={() => {
                        setIsHover(true);
                      }}
                      onMouseLeave={() => {
                        setIsHover(false);
                      }}
                      $isHover={isHover}
                    >
                      {i === 0 &&
                        <PreviewRecentDescrip $isHover={isHover}>최신</PreviewRecentDescrip>
                      }
                      <img src={m.articleBanner} alt={`magazine-${m.articleId}`} />
                    </PreviewContentItems>
                  ))
                  :
                  magazineArticles.slice(0, 3).map((m, i) => (
                    <PreviewContentItems
                      key={m.articleId}
                      onClick={() => navigate(`/news/${m.articleId}`)}
                      onMouseEnter={() => {
                        setIsHover(true);
                      }}
                      onMouseLeave={() => {
                        setIsHover(false);
                      }}
                      $isHover={isHover}
                    >
                      {i === 0 &&
                        <PreviewRecentDescrip $isHover={isHover}>최신</PreviewRecentDescrip>
                      }
                      <img src={m.articleBanner} alt={`magazine-${m.articleId}`} />
                    </PreviewContentItems>
                  ))
              }
            </PreviewContentBox>
          </PreviewSection>
        )}

        {/* ✅ CTA */}
        <CTASection>
          <h3>지금 구독하고, 자동차의 모든 순간을 함께하세요!</h3>
          <p>정기 구독 시 특별한 혜택과 최신 트렌드를 가장 먼저 만나보세요.</p>
          <CTADescrip>구독 문의는 <u>theiauto@naver.com</u></CTADescrip>
        </CTASection>
      </SubScribeInnerBox>
    </SubScribeContainer>
  );
}

export default SubScribeSection;
