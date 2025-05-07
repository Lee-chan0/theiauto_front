import React, { useState } from "react";
import { useFetchBannerArticle } from "../../Hooks/ApiHooks/GeneralArticle/useFetchBannerArticle";
import { BannerCategory, BannerContainer, BannerImgBox, BannerInnerBox, BannerSubTitle, BannerTextBox, BannerTitle, BannerWrapper, LayoutContainer } from "./HomeBannerStyle";
import ChangeBannerDot from "./ChangeBannerDot/ChangeBannerDot";



function HomeBanner() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isArticleHover, setIsArticleHover] = useState(false);
  const { data: bannerArticleArray } = useFetchBannerArticle();
  const bannerArticles = bannerArticleArray?.bannerArticles || [];

  return (
    <BannerWrapper>
      <BannerInnerBox>
        <LayoutContainer>
          <BannerContainer
            onMouseEnter={() => setIsArticleHover(true)}
            onMouseLeave={() => setIsArticleHover(false)}
          >
            <ChangeBannerDot articleLength={bannerArticles.length} setActiveIndex={setActiveIndex} activeIndex={activeIndex} isArticleHover={isArticleHover} />
            {
              bannerArticles.map((banner, i) => (
                <React.Fragment key={banner.articleId}>
                  <BannerImgBox $src={banner.articleBanner} className="banner-image" style={activeIndex === i ? { opacity: '1' } : { opacity: '0' }} />
                  <BannerTextBox style={activeIndex === i ? { opacity: '1' } : { opacity: '0' }}>
                    <BannerCategory>{banner.category.categoryName}</BannerCategory>
                    <BannerTitle>{banner.articleTitle}</BannerTitle>
                    <BannerSubTitle>{banner.articleSubTitle}</BannerSubTitle>
                  </BannerTextBox>
                </React.Fragment>
              ))
            }
          </BannerContainer>
          <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
            <div style={{ width: '173px', height: '180px', border: '3px solid white' }}></div>
            <div style={{ width: '226px', height: '92px', border: '3px solid white' }}></div>
            <div style={{ width: '226px', height: '223px', border: '3px solid white' }}></div>
          </div>
        </LayoutContainer>
      </BannerInnerBox>
    </BannerWrapper>
  )
}

export default HomeBanner;