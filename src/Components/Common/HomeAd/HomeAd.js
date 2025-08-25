import { useMutation, useQuery } from "@tanstack/react-query";
import styled, { css, keyframes } from "styled-components";
import { fetchHomeAd, patchClickCount } from '../../../API/generalAPI/generalAdvertisement.api';
import { useEffect, useMemo, useState } from "react";
import RollingAd from './RollingAd';
import { useNavigate } from "react-router-dom";
import { FaCar } from "react-icons/fa"; // 자동차 아이콘 추가
import { useMediaQuery } from "react-responsive";

// --- 애니메이션 정의 ---
const flashEffect = keyframes`
  0% { background-color: #f0f0f0; }
  50% { background-color: #e0e0e0; }
  100% { background-color: #f0f0f0; }
`;

const moveRoadLine = keyframes`
  from { background-position: 0 0; }
  to { background-position: 0 200%; } /* 세로로 움직이도록 조정 */
`;

// --- 기존 스타일 유지 ---
const AdWrapper = styled.div`
  width: 100%;
  transform: translateY(-56px);
  overflow: hidden;
  position: relative;
`;

const AdInnerBox = styled.div`
  max-width: 1280px;
  margin : 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap : 16px;
  padding : 16px 0;
  font-size: 1.1rem;
`;

const AdDescription = styled.div`
  text-align: center;
  letter-spacing: 2px;
  font-weight: 500;
  color : ${({ theme }) => theme.neutral.gray600};
`;

const AdsContainerWrapper = styled.div`
  width: 100%;
  padding: 0 16px;
`;

const AdsRow = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(218px, 1fr));
  gap: 20px;
  justify-content: center;
  max-width: 1280px;
  margin: 0 auto;
`;

// --- AdsItems와 CategoryPageItems에 공통적으로 적용될 스타일 (재사용성을 위해) ---
const BaseAdItemStyles = css`
  width: 100%;
  height: 220px;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  background-color: #f8f8f8;
  border: 1px solid #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 0.9rem;
  color: #666;
  will-change: transform;
  transition: transform 0.7s;
  
  &:hover {
    transform: translateY(-4px);
  }
  
  .ad-inquiry {
    cursor: pointer;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column; /* 아이콘과 텍스트를 세로로 정렬 */
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

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

  @media (max-width: 767px) {
    height: 200px; 
  }
`;

const AdsItems = styled.li`
  ${BaseAdItemStyles}
`;

const CategoryPageAds = styled.ul`
  position: sticky;
  top : ${({ $isSearch }) => $isSearch ? '68px' : '160px'};
  width: 100%;
  display: grid;
  grid-template-columns: 218px;
  gap : 16px;
  padding: 8px; 
  box-sizing: border-box;

  @media (max-width: 250px) {
    grid-template-columns: 1fr;
  }
`;

const CategoryPageItems = styled.li`
  ${BaseAdItemStyles}
  &:hover {
    transform: translateY(-8px); /* CategoryPageItems는 더 많이 떠오르도록 */
  }
`;

// --- 광고 문의 플레이스홀더를 위한 새 스타일 컴포넌트 ---
const StyledAdInquiry = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(45deg, #f5f5f5, #e0e0e0); /* 은은한 그라데이션 */
  color: ${({ theme }) => theme.neutral.gray700};
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  position: relative;
  overflow: hidden; /* 차선이 밖으로 나가지 않도록 */
  border: 1px dashed ${({ theme }) => theme.neutral.gray400}; /* 점선 테두리 */
  
  /* 배경 깜빡임 효과 */
  animation: ${flashEffect} 3s infinite alternate;

  &:hover {
    color: ${({ theme }) => theme.primary.red500};
    border-color: ${({ theme }) => theme.primary.red500};
    .ad-inquiry-icon {
        transform: scale(1.1) translateY(-5px); /* 호버 시 아이콘도 반응 */
        color: ${({ theme }) => theme.primary.red500};
    }
    .ad-inquiry-text {
        letter-spacing: 0.5px; /* 호버 시 텍스트 간격 조정 */
    }
  }

  /* 도로 차선 효과 */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      repeating-linear-gradient(
        to bottom,
        transparent,
        transparent 10%,
        rgba(255, 255, 255, 0.4) 10%,
        rgba(255, 255, 255, 0.4) 12%,
        transparent 12%,
        transparent 20%
      );
    background-size: 100% 50px; /* 차선 하나의 크기 */
    animation: ${moveRoadLine} 5s linear infinite; /* 무한 반복 애니메이션 */
    opacity: 0.3; /* 차선 투명도 조절 */
    z-index: 1;
  }

  /* 내용 컨테이너 */
  .ad-inquiry-content {
    position: relative;
    z-index: 2; /* 차선 위에 오도록 */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px; /* 아이콘과 텍스트 사이 간격 */
    transition: all 0.3s ease;
  }

  .ad-inquiry-icon {
      font-size: 2.5rem; /* 아이콘 크기 */
      color: ${({ theme }) => theme.neutral.gray500};
      transition: transform 0.3s ease, color 0.3s ease;
  }

  .ad-inquiry-text {
      font-size: 1rem;
      font-weight: 700;
      color: ${({ theme }) => theme.neutral.gray800};
      transition: letter-spacing 0.3s ease;
  }

  .ad-inquiry-size {
      font-size: 0.8rem;
      color: ${({ theme }) => theme.neutral.gray600};
  }
`;


const bannerLocations = [
  '메인 배너 하단-1 (218 X 220)',
  '메인 배너 하단-2 (218 X 220)',
  '메인 배너 하단-3 (218 X 220)',
  '메인 배너 하단-4 (218 X 220)',
  '메인 배너 하단-5 (218 X 220)'
];

function HomeAd({ mode, isSearch }) {
  const { data: adArray, isLoading, isError } = useQuery({
    queryKey: ['advertisement'],
    queryFn: fetchHomeAd
  });
  const clickUpdateMutation = useMutation({ mutationFn: patchClickCount });
  const navigate = useNavigate();
  const isTablet = useMediaQuery({ maxWidth: 1279 });

  const adLists = useMemo(() => adArray?.ads || [], [adArray]);

  const groundAds = useMemo(() => {
    const map = {};
    bannerLocations.forEach(loc => {
      map[loc] = [];
    });
    adLists.forEach(ad => {
      const loc = ad.adLocation;
      if (map[loc]) {
        map[loc].push(ad);
      }
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

  const renderAdItem = (location, idx, isCategoryPage) => {
    const ads = groundAds[location] || [];

    const ItemComponent = isCategoryPage ? CategoryPageItems : AdsItems;

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
      <ItemComponent key={idx} >
        <RollingAd ads={ads} onClick={handleAdClick} />
      </ItemComponent>
    );
  };

  return (
    !mode || mode !== 'categoryPage'
      ?
      <AdWrapper>
        <AdInnerBox>
          <AdDescription>Advertisements</AdDescription>
          <AdsContainerWrapper>
            <AdsRow>
              {bannerLocations.map((location, idx) =>
                renderAdItem(location, idx, false)
              )}
            </AdsRow>
          </AdsContainerWrapper>
        </AdInnerBox>
      </AdWrapper>
      :
      <CategoryPageAds $isSearch={isSearch}>
        {bannerLocations.map((location, idx) => (
          renderAdItem(location, idx, true)
        ))}
      </CategoryPageAds>
  )
}

export default HomeAd;