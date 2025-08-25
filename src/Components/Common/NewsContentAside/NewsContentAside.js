import { useMutation, useQuery } from "@tanstack/react-query";
import styled, { css, keyframes } from "styled-components"; // keyframes import 유지
import { fetchHomeAd, patchClickCount } from "../../../API/generalAPI/generalAdvertisement.api";
import React, { useEffect, useMemo } from "react";
import RollingAd from '../HomeAd/RollingAd';
import { useNavigate } from "react-router-dom";
import { fetchMagazineArticle, fetchRecentArticles } from "../../../API/generalAPI/generalArticle.api";
import { useFetchDriveArticles } from "../../Hooks/ApiHooks/GeneralArticle/useFetchDriveArticles";
import { FaCar } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";

const textStyle = css`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap : 24px;
  padding : ${({ $isSticky }) => $isSticky ? '8px 24px' : '8px 16px'};
  border-radius: 8px;
  transition: box-shadow .8s, padding 0.5s;
  box-shadow: ${({ $isSticky }) => $isSticky ? `0 0 10px 1px rgba(0, 0, 0, 0.3)` : `0 0 0 rgba(0, 0, 0, 0)`};
`;

const AdLists = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 120px);
  grid-auto-rows: auto;
  gap: 4px;
`;

const AdItems = styled.li`
  border-radius: 2px;
  overflow: hidden;
  position: relative;
  background-color: #f8f8f8;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 0.9rem;
  color: #666;
  will-change: max-height;
  transition: max-height 1s;
  border-radius: 4px;

  & > a {
    display: block;
    width: 100%;
    height: 100%;
    
    & > img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

const StyledAdInquiry = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(45deg, #f5f5f5, #e0e0e0); 
  color: ${({ theme }) => theme.neutral.gray700};
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border: 1px dashed ${({ theme }) => theme.neutral.gray400};
  
  &:hover {
    color: ${({ theme }) => theme.primary.red500};
    border-color: ${({ theme }) => theme.primary.red500};
    .ad-inquiry-icon {
        transform: scale(1.05);
        color: ${({ theme }) => theme.primary.red500};
    }
    .ad-inquiry-text {
        letter-spacing: 0.5px;
    }
  }

  .ad-inquiry-content {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px; 
    transition: all 0.3s;
  }

  .ad-inquiry-icon {
      font-size: 1.8rem;
      color: ${({ theme }) => theme.neutral.gray500};
      transition: transform 0.3s ease, color 0.3s ease;
  }

  .ad-inquiry-text {
      font-size: 0.9rem;
      font-weight: 700;
      color: ${({ theme }) => theme.neutral.gray800};
      transition: letter-spacing 0.3s ease;
  }

  .ad-inquiry-size {
      font-size: 0.75rem;
      color: ${({ theme }) => theme.neutral.gray600};
  }
`;


const RecentNewsContainer = styled.div`
  width: 100%;
  padding : 8px 0;
`;

const RecentNewsDescription = styled.span`
  font-size: 1.25rem;
  font-weight: bold;
  color: ${({ theme }) => theme.neutral.gray900};
  margin-bottom: 12px;
  display: block;
`;

const RecentTitleBox = styled.ul``;

const RecentLayout = styled.li`
  display: flex;
  gap : 8px;
  font-size: .8rem;
  margin : 8px 0;
  cursor: pointer;

  &:hover {
    & > h1 {
      text-decoration: underline;
    }
  }

  & > h1 {
    font-size: .85rem;
    font-weight: 400;
    ${textStyle};

    @media (max-width : 1279px) {
      font-size: .8rem;
    }
  }

  & > span {
    color : ${({ theme }) => theme.primary.red500};
    font-weight: bold;
    white-space: nowrap;

    @media (max-width : 1279px) {
      font-size: .75rem;
    }
  }
`;

const DriveNewsContainer = styled(RecentNewsContainer)`
  border-top : none;
`;

const DriveNewsLists = styled.ul`
  display: flex;
  flex-direction: column;
  gap : 16px;
`;

const DriveNewsItems = styled.li`
  width: 100%;
  height: 64px;
  overflow: hidden;
  cursor: pointer;

  display: flex;

  &:hover {
    & > h1 {
      text-decoration: underline;
    }
  }
`;

const DriveRank = styled.strong`
  width: 10%;
  line-height: 64px;
  font-size: 1.2rem;
  margin-right: 4px;
  color : ${({ theme }) => theme.primary.red300};

  @media (max-width : 1279px) {
    font-size: 1rem;
  }
`;

const DriveTitle = styled.h1`
  width: 60%;
  font-size: .9rem;
  ${textStyle};
  -webkit-line-clamp: 2;
  margin: auto 0;

  @media (max-width : 1279px) {
    font-size: .77rem;
  }
`;

const DriveImage = styled.img`
  width: 30%;
  display: block;
  object-fit: cover;
  margin-left : 8px;
`;

const MagazineContainer = styled.div`
  width: 100%;
  cursor: pointer;

  & > h1 {
    font-size: 1.2rem;
    text-align: center;
    margin-top: 8px;

    @media (max-width : 1279px) {
      font-size: 1rem;
    }
  }

  &:hover {
    
    & > h1 {
      text-decoration: underline;
    }

    & > img {
      opacity: .8;
    }
  }
`;

const MagazineItem = styled.img`
  width: 100%;
  max-height: 500px;
  border-radius: 4px;
  opacity: 1;
  display: block;

  transition: opacity 0.3s;
`;

const AdDescription = styled.span`
  display: block;
  margin-bottom: 12px;
  font-size: 1.1rem;
  font-weight: bold;
  color : ${({ theme }) => theme.neutral.gray900};
`;

const bannerLocations = [
  '메인 배너 하단-1 (218 X 220)',
  '메인 배너 하단-2 (218 X 220)',
  '메인 배너 하단-3 (218 X 220)',
  '메인 배너 하단-4 (218 X 220)',
  '메인 배너 하단-5 (218 X 220)'
];

function NewsContentAside({ isSticky }) {
  const { data: adArray, isLoading, isError } = useQuery({
    queryKey: ['advertisement'],
    queryFn: fetchHomeAd
  });
  const { data: recentArray } = useQuery({
    queryKey: ['recentArticles'],
    queryFn: fetchRecentArticles
  });
  const { data: driveArray } = useFetchDriveArticles();
  const { data: magazineData } = useQuery({
    queryKey: ['magazine-news'],
    queryFn: fetchMagazineArticle
  });
  const clickUpdateMutation = useMutation({ mutationFn: patchClickCount });
  const navigate = useNavigate();

  const magazineArticle = magazineData?.magazineArticle || {};
  const recentArticles = recentArray?.recentArticles || [];
  const driveArticles = driveArray?.driveArticles || [];
  const adLists = useMemo(() => adArray?.ads || [], [adArray]);
  const isTablet = useMediaQuery({ maxWidth: 1279 });

  const groundAds = useMemo(() => {
    const map = {};
    adLists.forEach(ad => {
      const loc = ad.adLocation;
      if (!map[loc]) map[loc] = [];
      map[loc].push(ad);
    });
    return map;
  }, [adLists]);

  const handleAdClick = (adId) => {
    clickUpdateMutation.mutate(adId);
  }

  useEffect(() => {
    if (isError) {
      navigate('/error');
    }
  }, [isError, navigate]);

  if (isError) return null;
  if (isLoading) return null;

  const renderAdItem = (location, idx) => {
    const ads = groundAds[location] || [];

    const ItemComponent = AdItems;

    if (ads.length === 0) {
      return (
        <ItemComponent key={idx} style={isTablet ? { display: 'none' } : {}}>
          <StyledAdInquiry onClick={() => navigate(`/instructions/ad-inquiry`)}>
            <div className="ad-inquiry-content">
              <FaCar className="ad-inquiry-icon" />
              <span className="ad-inquiry-text">광고 문의</span>
              <span className="ad-inquiry-size">(218 X 220)</span>
            </div>
          </StyledAdInquiry>
        </ItemComponent>
      );
    }

    if (ads.length === 1) {
      const ad = ads[0];
      return (
        <ItemComponent key={idx}>
          <a href={ad.redirectUrl} target="_blank" rel="noreferrer" onClick={() => handleAdClick(ad.advertisementId)}>
            <img src={ad.advertisementImageUrl} alt={`ad-${ad.advertisementId}`} />
          </a>
        </ItemComponent>
      );
    }

    return (
      <ItemComponent key={idx}>
        <RollingAd ads={ads} onClick={handleAdClick} />
      </ItemComponent>
    );
  };

  return (
    <MainContainer $isSticky={isSticky}>

      <DriveNewsContainer>
        <RecentNewsDescription>시승기</RecentNewsDescription>
        <DriveNewsLists>
          {
            driveArticles?.map((drive, i) => (
              <DriveNewsItems
                key={drive?.articleId}
                onClick={() => navigate(`/news/${drive?.articleId}`)}
              >
                <DriveRank $index={i}>{i + 1}</DriveRank>
                <DriveTitle title={drive?.articleTitle}>{drive?.articleTitle}</DriveTitle>
                <DriveImage src={drive?.articleBanner} alt={`drive-news-${drive?.articleId}`} />
              </DriveNewsItems>
            ))
          }
        </DriveNewsLists>
      </DriveNewsContainer>

      <RecentNewsContainer>
        <RecentNewsDescription>최신 기사 모아보기</RecentNewsDescription>
        <RecentTitleBox>
          {
            recentArticles?.map((recent, i) => (
              <RecentLayout
                key={recent?.articleId}
                onClick={() => navigate(`/news/${recent?.articleId}`)}
                data-aos='fade-left'
                data-aos-delay={`${i * 100}`}
              >
                <span>{recent?.category?.categoryName}</span>
                <h1 title={recent?.articleTitle}>{recent?.articleTitle}</h1>
              </RecentLayout>
            ))
          }
        </RecentTitleBox>
      </RecentNewsContainer>

      <MagazineContainer onClick={() => navigate(`/news/${magazineArticle?.articleId}`)}>
        <AdDescription data-aos='fade-left' data-aos-delay='100'>
          theiauto 월간지
        </AdDescription>
        <MagazineItem src={magazineArticle?.articleBanner} alt={`magazine-${magazineArticle?.articleId}`} />
        <h1 data-aos='fade-left' data-aos-delay='300'>{magazineArticle?.articleTitle}</h1>
      </MagazineContainer>

      <AdLists>
        {bannerLocations.map((location, idx) => (
          <React.Fragment key={idx}>
            {renderAdItem(location, idx)}
          </React.Fragment>
        ))}
      </AdLists>
    </MainContainer>
  )
}

export default NewsContentAside;