import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { fetchMagazineAd } from "../../../API/generalAPI/generalAdvertisement.api";
import { IoClose } from "react-icons/io5";
import logo from '../../../Assets/theiautoLogoWhite.png';
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MdBookmarkAdd } from "react-icons/md";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const MagazineFixContentContainer = styled.div`
  position: fixed;
  bottom : 0;
  left : 50%;
  transform: translateX(-50%);
  width: 767px;
  height: 120px;
  overflow: hidden;
  z-index: 10000;
  background: 
    linear-gradient(rgba(26,26,26,0.7), rgba(26,26,26,0.7)),
    url(${({ $src }) => $src || ""});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  box-shadow: 0 4px 10px 5px rgba(0, 0, 0, 0.5);
  border-top-right-radius: 2px;
  border-top-left-radius: 2px;

  & > .content-box {
    margin : 0 8px;
    display: flex;
    flex-direction: column;
    gap: 16px;

    & > .btn-handler {
      display: flex;
      gap : 4px;
    }

    & > h1 {
      font-size: 1.5rem;
      font-weight: 300;
      text-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
      color : ${({ theme }) => theme.neutral.gray100};
      text-align: center;
    }
  }
`;

const MagazineCloseBox = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row-reverse;
  position: relative;

  & > .logo-container {
    width: 80px;
    height: 24px;
    background-image: url(${logo});
    background-size : contain;
    background-position: center;
    background-repeat: no-repeat;
    margin-left : 8px;
  }

  & > svg {
    position: absolute;
    left : 4px;
    cursor: pointer;
    color : ${({ theme }) => theme.neutral.gray100};

    &:hover {
      opacity: .8;
    }
  }
`;

const DescriptionBox = styled.div`

  & > label {
      display: flex;
      align-items: center;
      flex-direction: row-reverse;
      gap: 4px;
      margin : 4px 8px;

    & > span {
      font-size: .85rem;
      font-weight: 300;
      color : ${({ theme }) => theme.neutral.gray100};
      margin-bottom: 2px;
      cursor: pointer;
      text-decoration: underline;

      &:hover {
        opacity: .8;
      }
    }
  }
`;

const SubscribeBtn = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border : 1px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);

  width: 100%;
  height: 32px;
  border-radius: 4px;
  will-change: transform;

  background-color: transparent;
  color : ${({ theme }) => theme.neutral.gray100};
  font-size: .85rem;
  cursor: pointer;
`;

function MagazineFixContent() {
  const { data: magazineAd, isLoading, isError } = useQuery({
    queryKey: ['magazine-ad'],
    queryFn: fetchMagazineAd
  });
  const magazineData = magazineAd?.ad || "";
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const dismissedDate = localStorage.getItem('magazineAdDismissedDate');
    if (dismissedDate === today) {
      setIsVisible(false);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  }

  const handleDissmissToday = () => {
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem('magazineAdDismissedDate', today);
    setIsVisible(false);
  }

  if (!isVisible || isMobile || isLoading || isError) return null;

  return (
    <MagazineFixContentContainer $src={magazineData?.advertisementImageUrl}>
      <MagazineCloseBox>
        <IoClose size={28} title="닫기" onClick={handleClose} />
        <DescriptionBox>
          <label>
            <span onClick={handleDissmissToday}>오늘 하루 그만보기</span>
          </label>
        </DescriptionBox>
      </MagazineCloseBox>
      <div className="content-box">
        <h1>{magazineData?.advertisementTitle}</h1>
        <div className="btn-handler">
          <SubscribeBtn
            onClick={() => navigate(`/magazine/subscribe`)}
          >
            <MdBookmarkAdd size={16} />
            구독안내
          </SubscribeBtn>
          <SubscribeBtn
            onClick={() => navigate(`/category/24`)}
          >
            <MdOutlineLibraryBooks size={16} />
            살펴보기
          </SubscribeBtn>
        </div>
      </div>
    </MagazineFixContentContainer>

  )
}

export default MagazineFixContent;