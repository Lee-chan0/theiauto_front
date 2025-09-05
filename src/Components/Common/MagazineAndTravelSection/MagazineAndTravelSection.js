import styled, { keyframes } from "styled-components";
import { useFetchTravelArticle } from '../../Hooks/ApiHooks/GeneralArticle/useFetchTravelArticles';
import { useQuery } from "@tanstack/react-query";
import { fetchMagazineArticle } from "../../../API/generalAPI/generalArticle.api";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import GoToCategoryBtn from "../../Features/GoToCategoryBtn/GoToCategoryBtn";
import { formatDateOnly } from "../../Hooks/Utils/formatDateOnly";

const MagazineWrapper = styled.section`
  width: 100%;
  margin-top: 56px;

  @media (max-width : 1279px) {
    margin-top: 24px;
  }

  @media (max-width : 767px) {
    margin-top: 116px;
  }
`;

const MagazineInnerBox = styled.div`
  margin : 0 auto;
  max-width: 1280px;
  padding : 24px;

  @media (max-width : 767px) {
    padding : 0 16px;
  }
`;

const Description = styled.span`
  padding : 16px;
  display: block;
  font-weight: 800;
  font-size: 1.2rem;
  background-color: ${({ theme }) => theme.neutral.gray0};
  border-radius: 16px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;

  @media (max-width : 767px) {
    font-size: 1rem;
}
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  padding: 8px;
  padding-top : 0;

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;

const ContentCard = styled.div`
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s, box-shadow 0.3s;
  background-color: ${({ theme }) => theme.neutral.gray0};
  display: flex;
  flex-direction: column;
  height: 100%;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);

    & > div {
      & > h3 {
        text-decoration: underline;
      }
    }
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
  display: block;

  @media (max-width : 767px) {
    height: 160px;
  }
`;

const CardContent = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  position: relative;

  & > span {
    position: absolute;
    bottom : 16px; left : 16px;
    font-size: .8rem;
    color : ${({ theme }) => theme.neutral.gray600};
    
    @media (max-width : 767px) {
      bottom : 16px; left : 8px;
      font-size: .7rem;
    }
  }

  @media (max-width : 767px) {
    padding : 8px;
  }
`;

const CardTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: bold;
  color : ${({ theme }) => theme.neutral.gray900};
  margin-bottom: 12px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width : 1279px) {
    font-size: 1.2rem;
  }

  @media (max-width: 767px) {
    font-size: 1rem;
  }
`;

const CardDescription = styled.p`
  font-size: 1rem;
  color: #555;
  line-height: 1.3;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-grow: 1;

  @media (max-width : 1279px) {
    font-size: .95rem;
  }

  @media (max-width: 767px) {
    font-size: .8rem;
  }
`;

const ButtonWrapper = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: flex-end;
  padding-top: 12px;
`;

const shimmer = keyframes`
  0% {
    background-position: -150% 0;
  }
  100% {
    background-position: 150% 0;
  }
`;

const MagazineSkeleton = styled.div`
  width: 100%;
  height: 480px;
  border-radius: 16px;
  position: relative;
  background: linear-gradient(
    90deg,
    #555555 0%,
    #666666 50%,
    #555555 100%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 2s linear infinite alternate;
`;

function MagazineAndTravelSection() {
  const { data: magazineData, isLoading: isMagazineLoading, isError: isMagazineError } = useQuery({
    queryKey: ['magazine-news'],
    queryFn: fetchMagazineArticle
  });
  const magazineArticle = useMemo(() => magazineData?.magazineArticle || {}, [magazineData]);

  const { data: travelData, isLoading: isTravelLoading, isError: isTravelError } = useFetchTravelArticle();
  const travelArticles = useMemo(() => travelData?.travelArticles || {}, [travelData]);

  const navigate = useNavigate();

  const handleBtnClick = (e, categoryId) => {
    e.stopPropagation();
    navigate(`/category/${categoryId}`);
  }

  useEffect(() => {
    if (isMagazineError || isTravelError) {
      navigate('/error');
    }
  }, [isMagazineError, isTravelError, navigate]);

  if (isMagazineError || isTravelError) return null;

  if (!magazineArticle?.articleId && !travelArticles?.articleId) return null;

  if (isMagazineLoading || isTravelLoading) {
    return (
      <MagazineWrapper>
        <MagazineInnerBox>
          <MagazineSkeleton />
        </MagazineInnerBox>
      </MagazineWrapper>
    )
  }

  return (
    <MagazineWrapper>
      <MagazineInnerBox>
        <Description>theiauto 월간지 & 여행기</Description>
        <div style={{ width: '100%', height: '100%', backgroundColor: '#ffffff', borderRadius: '16px', padding: '12px', borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
          <ContentGrid>
            {/* 월간지 섹션 */}
            {magazineArticle?.articleId && (
              <div data-aos='fade-right'>
                <ContentCard onClick={() => navigate(`/news/${magazineArticle.articleId}`)}>
                  <CardImage src={magazineArticle.articleBanner} alt={magazineArticle.articleTitle} />
                  <CardContent>
                    <CardTitle>{magazineArticle.articleTitle}</CardTitle>
                    <CardDescription>{magazineArticle.articleSubTitle}</CardDescription>
                    <span>{magazineArticle.createdAt && formatDateOnly(magazineArticle.createdAt)}</span>
                    <ButtonWrapper>
                      <GoToCategoryBtn onClick={(e) => handleBtnClick(e, magazineArticle.category.categoryId)} />
                    </ButtonWrapper>
                  </CardContent>
                </ContentCard>
              </div>
            )}

            {/* 여행기 섹션 */}
            {travelArticles?.articleId && (
              <div data-aos='fade-left'>
                <ContentCard onClick={() => navigate(`/news/${travelArticles.articleId}`)}>
                  <CardImage src={travelArticles.articleBanner} alt={travelArticles.articleTitle} />
                  <CardContent>
                    <CardTitle>{travelArticles.articleTitle}</CardTitle>
                    <CardDescription>{travelArticles.articleSubTitle}</CardDescription>
                    <span>{travelArticles.createdAt && formatDateOnly(travelArticles.createdAt)}</span>
                    <ButtonWrapper>
                      <GoToCategoryBtn onClick={(e) => handleBtnClick(e, travelArticles.category.categoryId)} />
                    </ButtonWrapper>
                  </CardContent>
                </ContentCard>
              </div>
            )}
          </ContentGrid>
        </div>
      </MagazineInnerBox>
    </MagazineWrapper>
  );
}

export default MagazineAndTravelSection;