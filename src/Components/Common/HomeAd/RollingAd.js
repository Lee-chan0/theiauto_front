import useCarousel from "../../Hooks/CommonHooks/useCarousel";


function RollingAd({ ads, onClick }) {
  const currentAd = useCarousel(ads, 3000);

  return (
    <a href={currentAd.redirectUrl} target="_blank" rel="noreferrer" onClick={() => onClick(currentAd.advertisementId)}>
      <img src={currentAd.advertisementImageUrl} alt={`ad-${currentAd.advertisementId}`} />
    </a>
  );
}

export default RollingAd;