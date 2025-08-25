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
  top : 50%;
  right : -80px;
  transform: translate(-50%, -50%);
  width: 320px;
  overflow: hidden;
  border : 1px solid ${({ theme }) => theme.neutral.gray100};
  z-index: 10000;
  background-color: ${({ theme }) => theme.neutral.gray900};
  display: flex;
  flex-direction: column;

  & > .content-box {
    margin : 8px;
    margin-bottom : 0;
    display: flex;
    flex-direction: column;
    gap: 8px;

    & > img {
      display: block;
      width: 100%;
      height: 360px;
    }

    & > .btn-handler {
      display: flex;
      flex-direction: column;
      gap : 4px;
    }

    & > h1 {
      font-size: 1rem;
      color : ${({ theme }) => theme.neutral.gray100};
      text-align: center;
    }
  }
`;

const MagazineCloseBox = styled.div`
  width: 100%;
  border-bottom : 1px solid ${({ theme }) => theme.neutral.gray100};

  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row-reverse;

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
      color : ${({ theme }) => theme.neutral.gray100};
      margin-bottom: 2px;
    }

    & > input {
      width: 15px;
      height: 15px;
    }
  }
`;

const SubscribeBtn = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;

  width: 100%;
  height: 32px;
  border-radius: 8px;
  will-change: transform;

  background-color: ${({ theme }) => theme.primary.red700};
  color : ${({ theme }) => theme.neutral.gray100};
  font-weight: bold;
  font-size: .95rem;

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
  const isTablet = useMediaQuery({ maxWidth: 1279 });
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

  if (!isVisible || isTablet || isMobile || isLoading || isError) return null;

  return (
    <MagazineFixContentContainer>
      <MagazineCloseBox>
        <IoClose size={28} title="닫기" onClick={handleClose} />
      </MagazineCloseBox>
      <div className="content-box">
        <h1>{magazineData?.advertisementTitle}</h1>
        <img src={magazineData?.advertisementImageUrl} alt="magazine-ad" />
        <div className="btn-handler">
          <SubscribeBtn
            onClick={() => navigate(`/magazine/subscribe`)}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 500, damping: 10 }}
          >
            <MdBookmarkAdd size={18} />
            구독안내
          </SubscribeBtn>
          <SubscribeBtn whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 500, damping: 10 }}
            onClick={() => navigate(`/category/24`)}
          >
            <MdOutlineLibraryBooks size={18} />
            살펴보기
          </SubscribeBtn>
        </div>
      </div>
      <DescriptionBox>
        <label>
          <input type="checkbox" onChange={handleDissmissToday} />
          <span>오늘 하루 그만보기</span>
        </label>
      </DescriptionBox>
    </MagazineFixContentContainer>

  )
}

export default MagazineFixContent;