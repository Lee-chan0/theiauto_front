import { useMediaQuery } from "react-responsive";
import DriveArticleCards from "../Common/DriveArticleCards/DriveArticleCards";
import HomeAd from "../Common/HomeAd/HomeAd";
import HomeBanner from "../Common/HomeBanner/HomeBanner";
import LifeAndITSection from "../Common/LifeAndITSection/LifeAndITSection";
import MagazineAndTravelSection from "../Common/MagazineAndTravelSection/MagazineAndTravelSection";
import NewCarSection from "../Common/NewCarSection/NewCarSection";
import ServiceSection from "../Common/ServiceSection/ServiceSection";
import TodayAndSports from "../Common/TodayAndSports/TodayAndSports";
import HandleScrollTopBtn from "../Features/HandleScrollTopBtn/HandleScrollTopBtn";
import MagazineFixContent from "../Features/MagazineFixContent/MagazineFixContent";
import PopupAdvertisement from "../Common/PopupAdvertisement/PopupAdvertisement";
import { Helmet } from "react-helmet-async";
import { useFetchTodayArticle } from "../Hooks/ApiHooks/GeneralArticle/useFetchTodayArticle";
import { useFetchMotorSportsArticle } from "../Hooks/ApiHooks/GeneralArticle/useFetchMotorSportArticle";
import { useFetchDriveArticles } from "../Hooks/ApiHooks/GeneralArticle/useFetchDriveArticles";
import { useFetchNewCarArticles } from '../Hooks/ApiHooks/GeneralArticle/useFetchNewCarArticles';
import { useFetchServiceArticles } from "../Hooks/ApiHooks/GeneralArticle/useFetchServiceArticles";
import { useFetchBrandITArticles } from "../Hooks/ApiHooks/GeneralArticle/useFetchBrandITArticles";

function Homepage() {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const { data: todayArticleArray, isLoading: todayArticleLoading, isError: todayArticleError } = useFetchTodayArticle();
  const todayArticles = todayArticleArray?.todayArticles || [];

  const { data: motorSportArray, isLoading: motorLoading, isError: motorError } = useFetchMotorSportsArticle();
  const motorSportArticles = motorSportArray?.resultArticles || [];

  const { data: driveArticleArray, isLoading: driveLoading, isError: driveError } = useFetchDriveArticles();
  const driveArticles = driveArticleArray?.driveArticles || [];

  const { data: newCarArray, isLoading: newCarLoading, isError: newCarError } = useFetchNewCarArticles();
  const newCarArticles = newCarArray?.newCarArticles || [];

  const { data: serviceArticleArray, isLoading: serviceLoading, isError: serviceError } = useFetchServiceArticles();
  const serviceArticles = serviceArticleArray?.serviceArticles || [];

  const { data: lifeAndITArticleArray, isLoading, isError } = useFetchBrandITArticles();
  const ITArticles = lifeAndITArticleArray?.ITArticles || [];
  const lifeArticles = lifeAndITArticleArray?.brandArticles || [];

  return (
    <>
      <Helmet>
        <title>더아이오토 · 대한민국 대표 자동차 신문</title>
        <meta name='description' content="자동차 산업 소식, 리뷰, 칼럼, 구독까지 한눈에 보는 더 아이오토 홈페이지입니다." />
        <meta property="og:title" content="더아이오토 | 대한민국 대표 자동차 신문" />
        <meta property="og:description" content="전문적인 자동차 기사와 리뷰, 월간지 구독 정보를 확인하세요." />
        <meta property="og:type" content="website" />
      </Helmet>

      {!isMobile && <PopupAdvertisement />}
      {!isMobile && <MagazineFixContent />}

      <HomeBanner isMobile={isMobile} />

      {!isMobile && <HomeAd />}

      <TodayAndSports
        todayArticles={todayArticles}
        todayArticleLoading={todayArticleLoading}
        todayArticleError={todayArticleError}
        motorSportArticles={motorSportArticles}
        motorLoading={motorLoading}
        motorError={motorError}
      />

      <DriveArticleCards
        driveArticles={driveArticles}
        driveLoading={driveLoading}
        driveError={driveError}
      />

      <NewCarSection
        newCarArticles={newCarArticles}
        isLoading={newCarLoading}
        isError={newCarError}
      />

      <MagazineAndTravelSection />

      <ServiceSection
        serviceArticles={serviceArticles}
        isLoading={serviceLoading}
        isError={serviceError}
      />

      <LifeAndITSection
        ITArticles={ITArticles}
        lifeArticles={lifeArticles}
        isLoading={isLoading}
        isError={isError}
      />

      <HandleScrollTopBtn />
    </>
  )
}

export default Homepage;