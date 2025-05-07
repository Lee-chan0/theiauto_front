import { useFetchDriveArticles } from "../../Hooks/ApiHooks/GeneralArticle/useFetchDriveArticles";
import { CardContainer, DriveInnerBox, DriveTextBox, DriveWrapper } from "./DriveArticleCards.style";
import logo from '../../../Assets/theiautoLogo.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { HiPlus } from "react-icons/hi";

function DriveArticleCards() {
  const { data: driveArticleArray } = useFetchDriveArticles();
  const driveArticles = driveArticleArray?.driveArticles || [];

  return (
    <DriveWrapper>
      <DriveInnerBox>
        <CardContainer $src={logo}>
          <span className="drive-section-title">
            <div className="section-logo" />
            시승기
            <HiPlus style={{ position: 'absolute', right: '0' }} size={24} />
          </span>
          {
            driveArticles.length > 0 && (
              <Swiper
                loop={true}
                spaceBetween={16}
                slidesPerView={3}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                modules={[Autoplay]}
                className="slide-container"
              >
                {
                  driveArticles.map((drive) => (
                    <SwiperSlide key={drive.articleId}
                    >
                      <article>
                        <img src={drive.articleBanner} alt="drive-image" className="slide-item-image" />
                        <DriveTextBox className="drive-text-box">
                          <span className="drive-category">시승기</span>
                          <h2 className="drive-title">{drive.articleTitle}</h2>
                        </DriveTextBox>
                      </article>
                    </SwiperSlide>
                  ))
                }
              </Swiper>
            )
          }
        </CardContainer>
      </DriveInnerBox>
    </DriveWrapper>
  )
}

export default DriveArticleCards;