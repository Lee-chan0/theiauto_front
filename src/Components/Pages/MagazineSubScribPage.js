import { useMediaQuery } from "react-responsive";
import SubScribeSection from "../Common/SubScribeSection/SubScribeSection";
import { Helmet } from "react-helmet-async";



function MagazineSubScribPage({ IsInstruction }) {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <>
      <Helmet>
        <title>더 아이오토 월간지 구독</title>
        <meta name="description" content="전문 자동차 월간지 구독하고 매월 최신 자동차 정보를 받아보세요." />
        <meta property="og:title" content="더아이오토 월간지 구독" />
        <meta property="og:description" content="구독자 전용 콘텐츠 제공. 최신 기사와 트렌드를 매월 받아보세요." />
        <meta property="og:image" content="" />
      </Helmet>
      <SubScribeSection IsInstruction={IsInstruction} />
    </>
  )
}

export default MagazineSubScribPage;