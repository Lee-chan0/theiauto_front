import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { ArrowBox, TodayArticle, TodayContainer, TodayDescription, TodayItems, TodayLists, TodaySkeleton, TodayTextBox } from "./HomeTodayNews.style";
import { SwiperSlide, Swiper } from "swiper/react";
import 'swiper/css';
import { Autoplay } from "swiper/modules";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";

function HomeTodayNews({ todayArticles, todayArticleLoading, todayArticleError }) {
  const swipeRef = useRef(null);
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    if (todayArticleError) {
      navigate('/error');
    }
  }, [todayArticleError, navigate]);

  if (todayArticleError) return null;

  if (todayArticleLoading) {
    return (
      <TodayContainer>
        <TodaySkeleton />
      </TodayContainer>
    )
  }

  return (
    <TodayContainer>
      <ArrowBox $direction={'right'} onClick={() => swipeRef.current?.slideNext()}>
        <FaChevronRight size={!isMobile ? 22 : 16} color="#f2f2f2" />
      </ArrowBox>
      <ArrowBox style={!isMobile ? { left: '32px' } : { left: '16px' }} $direction={'left'} onClick={() => swipeRef.current?.slidePrev()}>
        <FaChevronLeft size={!isMobile ? 22 : 16} color="#f2f2f2" />
      </ArrowBox>
      <TodayLists>
        <TodayDescription>Today, 뉴스</TodayDescription>
        {
          todayArticles?.length !== 0 &&
          <Swiper
            onSwiper={(swiper) => (swipeRef.current = swiper)}
            modules={[Autoplay]}
            loop={true}
            slidesPerView={1}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
          >
            {
              todayArticles?.map((today, i) => (
                <SwiperSlide
                  key={today.articleId}
                  onClick={() => navigate(`/news/${today.articleId}`)}
                >
                  <TodayItems>
                    <TodayArticle $src={today.articleBanner}>
                      <TodayTextBox>
                        <span>{today.category.categoryName}</span>
                        <h1>{today.articleTitle}</h1>
                        <h2>{today.articleSubTitle}</h2>
                      </TodayTextBox>
                    </TodayArticle>
                  </TodayItems>
                </SwiperSlide>
              ))
            }
          </Swiper>
        }
      </TodayLists>
    </TodayContainer>
  )
}

export default HomeTodayNews;