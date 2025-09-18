import { useEffect, useMemo, useRef, useState } from "react";
import { useFetchBannerArticle } from "../../Hooks/ApiHooks/GeneralArticle/useFetchBannerArticle";
import {
  BannerInnerBox, BannerWrapper,
  ArrowBox, ArrowContainer, BannerSkeleton, MobileBannerContainer, MobileBannerItems,
  WebBannerWrapper,
  WebBannerInnerBox,
  WebBannerContentList,
  WebBannerContentItems,
  WebTextBox,
  WebRemainList,
  WebTexts,
  WebRemainItems,
  WebRemainTitleBox,
} from "./HomeBannerStyle";
import { useNavigate } from "react-router-dom";
import { SwiperSlide, Swiper } from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from "swiper/modules";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { useScrollStickyState } from "../../Hooks/Context/ScrollAndStickyCheckContext";

function HomeBanner({ isMobile }) {
  const { data: bannerArticleArray, isLoading, isError } = useFetchBannerArticle();
  const bannerArticles = useMemo(() => bannerArticleArray?.bannerArticles || [], [bannerArticleArray]);
  const navigate = useNavigate();
  const swiperRef = useRef(null);
  const [isHoverBanner, setIsHoverBanner] = useState(false);
  const { bannerHeightRef, setOverScroll } = useScrollStickyState();
  const [activeRemainIndex, setActiveRemainIndex] = useState(0);

  useEffect(() => {
    if (isLoading) return;
    if (!bannerHeightRef.current) return;

    const target = bannerHeightRef.current;
    setOverScroll(target.getBoundingClientRect().height);
  }, [isLoading, bannerHeightRef, setOverScroll]);

  useEffect(() => {
    if (bannerArticles.length === 0) return;

    let interval = null;
    if (!isHoverBanner) {
      interval = setInterval(() => {
        setActiveRemainIndex((prevIndex) => (prevIndex + 1) % bannerArticles.length);
      }, 3000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [bannerArticles.length, isHoverBanner]);

  useEffect(() => {
    if (isError) {
      navigate('/error');
    }
  }, [isError, navigate]);

  if (isError) return null;

  if (isLoading) {

    if (isMobile) {
      return (
        <BannerWrapper>
          <BannerInnerBox>
            <BannerSkeleton />
          </BannerInnerBox>
        </BannerWrapper>
      )
    } else {
      return (
        <WebBannerWrapper>
          <WebBannerInnerBox>
            <BannerSkeleton />
          </WebBannerInnerBox>
        </WebBannerWrapper>
      )
    }
  }

  return (
    !isMobile ? (
      <WebBannerWrapper
        ref={bannerHeightRef}
        onMouseEnter={() => setIsHoverBanner(true)}
        onMouseLeave={() => setIsHoverBanner(false)}
      >
        <WebBannerInnerBox>
          <WebBannerContentList>
            {bannerArticles?.map((banner, i) => (
              <WebBannerContentItems
                key={banner.articleId}
                $isHoverBanner={isHoverBanner}
                $src={banner.articleBanner}
                $isActive={i === activeRemainIndex}
              >
                {i === activeRemainIndex && (
                  <WebTextBox>
                    <WebTexts onClick={() => navigate(`/news/${banner.articleId}`)} onMouseEnter={() => setIsHoverBanner(true)} onMouseLeave={() => setIsHoverBanner(false)}>
                      <span>{banner.category?.categoryName}</span>
                      <h1>{banner.articleTitle}</h1>
                      <h2>{banner.articleSubTitle}</h2>
                    </WebTexts>
                  </WebTextBox>
                )}
              </WebBannerContentItems>
            ))}
          </WebBannerContentList>
          <WebRemainList>
            {
              bannerArticles?.map((remain, i) => (
                <WebRemainItems key={remain?.articleId} $src={remain?.articleBanner} onClick={() => setActiveRemainIndex(i)} $index={i} $activeRemainIndex={activeRemainIndex}>
                  <WebRemainTitleBox>
                    <span>{remain.category.categoryName}</span>
                    <h1>{remain.articleTitle}</h1>
                  </WebRemainTitleBox>
                </WebRemainItems>
              ))
            }
          </WebRemainList>
        </WebBannerInnerBox>
      </WebBannerWrapper>
    )
      :
      (
        <BannerWrapper>
          <BannerInnerBox>
            <MobileBannerContainer>
              {
                bannerArticles?.length !== 0 && (
                  <Swiper
                    key={bannerArticles.length}
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    modules={[Pagination, Autoplay]}
                    pagination={{ clickable: true }}
                    loop={true}
                    slidesPerView={1}
                    autoplay={{
                      delay: 3000,
                      disableOnInteraction: false,
                      pauseOnMouseEnter: true
                    }}
                  >
                    {
                      bannerArticles.map((banner, i) => (
                        <SwiperSlide
                          key={i}
                          onClick={() => navigate(`/news/${banner.articleId}`)}
                        >
                          <MobileBannerItems $src={banner.articleBanner}>
                            <div className="card-textbox">
                              <span className="card-category">{banner.category.categoryName}</span>
                              <h1 className="card-title">{banner.articleTitle}</h1>
                            </div>
                          </MobileBannerItems>

                        </SwiperSlide>
                      ))
                    }
                    <ArrowContainer>
                      <ArrowBox onClick={() => swiperRef.current?.slidePrev()}>
                        <FaChevronLeft size={24} color="#fff" />
                      </ArrowBox>
                      <ArrowBox onClick={() => swiperRef.current?.slideNext()}>
                        <FaChevronRight size={24} color="#fff" />
                      </ArrowBox>
                    </ArrowContainer>
                  </Swiper>
                )
              }
            </MobileBannerContainer>
          </BannerInnerBox>
        </BannerWrapper>
      )

  )
}

export default HomeBanner;