import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import generalAxiosInstance from "../../../API/generalAPI/generalAxiosInstance";
import { useMemo, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

const PopupContainer = styled.div`
  position: fixed;
  left : ${({ $index }) => (+$index + 1) * 3}%;
  top : ${({ $index }) => (+$index + 1) * 10}%;
  z-index: 10001;
`;

const PopupBox = styled.div`
  cursor: pointer;
  position: relative;

  & > a {
    width: 100%;
    height: 100%;
    & > img {
      object-fit: cover;
      width: 300px;
      height: 360px;
    }
  }

  & > svg {
    position: absolute;
    right : 8px;
    top : 8px;

    &:hover {
      opacity: 0.5;
    }
  }
`;

const TodayNoView = styled.div`
  position: absolute;
  top : 99%;
  width: 100%;
  height: 24px;
  background-color: ${({ theme }) => theme.neutral.gray100};
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;

  & > label {
    margin : 0 8px;
    height: 100%;
    display: flex;
    align-items: center;
    gap : 4px;

    & > span {
      font-size: .8rem;
      margin-bottom : 2px;
    }

    & > input {
      width: 15px;
      height: 15px;
      margin-bottom : 2px;
    }
  }
`;



function PopupAdvertisement() {
  const { data: popupDatas, isLoading, isError } = useQuery({
    queryKey: ['popup'],
    queryFn: async () => {
      const response = await generalAxiosInstance.get(`/advertisement/popup`);
      return response.data;
    }
  });
  const [closedIndexes, setClosedIndexes] = useState([]);
  const today = new Date().toISOString().split('T')[0];
  const [dismissedTrigger, setDismissedTrigger] = useState(0);


  const popupAds = useMemo(() => {
    if (!popupDatas?.ad) return [];

    void dismissedTrigger;

    return popupDatas.ad
      .filter((_, i) => {
        const dismissedDate = localStorage.getItem(`popupAdDismissedDate-${i}`);
        return dismissedDate !== today;
      })
      .filter((_, i) => !closedIndexes.includes(i));
  }, [popupDatas, today, dismissedTrigger, closedIndexes]);

  const handleClose = (index) => {
    setClosedIndexes((prev) => [...prev, index]);
  };

  const handleDissmissToday = (index) => {
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem(`popupAdDismissedDate-${index}`, today);
    setDismissedTrigger(prev => prev + 1);
  };

  if (popupAds.length === 0) return null;
  if (isLoading) return null;
  if (isError) return null;

  return (
    <>
      {
        popupAds?.map((ad, i) => (
          <PopupContainer key={ad?.advertisementId} $index={i}>
            <PopupBox>
              <IoCloseOutline size={32} color="#fff" onClick={() => handleClose(i)} />
              <a href={`${ad?.redirectUrl}`} target="_blank" rel="noreferrer">
                <img src={ad?.advertisementImageUrl} alt={`ad-${i}`} />
              </a>
            </PopupBox>
            <TodayNoView>
              <label>
                <span>오늘 하루 그만보기</span>
                <input type="checkbox" onChange={() => handleDissmissToday(i)} />
              </label>
            </TodayNoView>
          </PopupContainer >
        ))
      }
    </>
  )
}

export default PopupAdvertisement;