import DriveArticleCards from "../Common/DriveArticleCards/DriveArticleCards";
import HomeBanner from "../Common/HomeBanner/HomeBanner";
import LifeAndITSection from "../Common/LifeAndITSection/LifeAndITSection";
import MagazineAndTravelSection from "../Common/MagazineAndTravelSection/MagazineAndTravelSection";
import NavigationMenuBar from "../Common/NavigationMenu/NavigationMenuBar";
import NewCarSection from "../Common/NewCarSection/NewCarSection";
import ServiceSection from "../Common/ServiceSection/ServiceSection";
import TodayAndSports from "../Common/TodayAndSports/TodayAndSports";



function Homepage() {
  return (
    <>
      <NavigationMenuBar />
      <HomeBanner />
      <TodayAndSports />
      <DriveArticleCards />
      <NewCarSection />
      <MagazineAndTravelSection />
      <ServiceSection />
      <LifeAndITSection />
    </>
  )
}

export default Homepage;