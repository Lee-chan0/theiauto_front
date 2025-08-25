import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { IoCloseOutline } from "react-icons/io5";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { useMediaQuery } from "react-responsive";
import { SwiperSlide, Swiper } from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from "swiper/modules";

const ImagesContainer = styled.div`
  display: ${({ $hasImages }) => $hasImages ? 'block' : 'none'};

  & > .images-description {
    font-size: .8rem;
    font-weight: bold;
    color : ${({ theme }) => theme.neutral.gray600};

    @media (max-width : 767px) {
      font-size: .75rem;
    }
  }
`;

const ImagesBox = styled.ul`
  margin-top: 8px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 160px;
  gap : 8px;

  @media (max-width : 767px) {
    position: relative;
    display: block;
    width: 100%;
    height: 200px;

    margin-top: 20px;
  }
`;

const ImageItem = styled.li`
  width: 100%;
  height: 100%;
  
  @media (max-width : 767px) {
    position: absolute;
    top : 0; left : 0; right : 0; bottom : 0;

    &:nth-child(1) {
      transform: rotate(-3deg);
      box-shadow: -2px 2px 4px 1px rgba(0, 0, 0, 0.5);
      border-radius: 4px;
      overflow: hidden;
    }

    &:nth-child(2) {
      box-shadow: -2px 2px 4px 1px rgba(0, 0, 0, 0.5);
      border-radius: 4px;
      overflow: hidden;
    }

    &:nth-child(3) {
      transform: rotate(3deg);
      box-shadow: -2px 2px 4px 1px rgba(0, 0, 0, 0.5);
      border-radius: 4px;
      overflow: hidden;
    }

    &:nth-last-child(1) {
      transform: rotate(0);
      box-shadow: -2px 2px 4px 1px rgba(0, 0, 0, 0.5);
      border-radius: 4px;
      overflow: hidden;
    }
  }
  

  & > .reference-img {
    cursor: pointer;
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    border-radius: 4px;
    transition: filter 0.5s;

    &:hover {
      filter: brightness(65%);
    }
  }
`;

// 이미지를 클릭했을때만 실행
const ModalContainer = styled.div`
  position: fixed;
  top : 0; left : 0; right : 0; bottom : 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.8);

  display: flex;
  justify-content: center;
  align-items: center;
`;

const svgStyle = css`
    position: absolute;
    cursor: pointer;
    top : 50%;
    transform: translateY(-50%);
    opacity: 1;
    transition: opacity 0.4s, box-shadow 0.4s;

    &:hover {
      opacity: 0.7;
      box-shadow: 0 0 5px 1px rgba(255, 255, 255, 0.5);
    }
`;

const ModalBox = styled.div`
  width: 80vw;
  height: 80vh;
  border-radius: 4px;
  margin-bottom: 104px;

  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width : 767px) {
    width: 95vw;
    height: 80vh;
    margin : 0;
  }

  & > .image-lists {
    width: 100%;
    height: 100%;
    overflow: hidden;

    & > svg {
      position: absolute;
      z-index: 2;
      right : 8px;
      top : 8px;
    }

    & > .swiper {
        width: 100%;
        height: 100%;

      & > .swiper-pagination {
        position: fixed;
        bottom : 8px;

        & > .swiper-pagination-bullet {
          background-color: ${({ theme }) => theme.primary.red700};
        }
      }


      & > .swiper-wrapper {
          width: 100%;
          height: 100%;
        & > .swiper-slide {
          width: 100%;
          height: 100%;
          & > img {
            object-fit: contain;
            width: 100%;
            height: 100%;
            display: block;
          }
        }
      }
    }
  }
`;

const ModalItem = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;

    & > .close-btn {
      position: absolute;
      right: 24px;
      top : 24px;
      cursor: pointer;
      opacity: 1;

      &:hover {
        opacity: 0.6;
      }
    }

    & > .left-arrow {
      ${svgStyle};
      left : 24px;
    }

    & > .right-arrow {
      ${svgStyle};
      right : 24px;
    }


  & > img {
    object-fit: contain;
    width: 100%;
    height: 100%;
    margin : auto;
    display: block;
  }
`;

const SelectList = styled.ul`
  width: 100%;
  height: 104px;
  overflow-y: hidden;
  overflow-x: auto;
  background: ${({ theme }) => theme.neutral.gray900};
  padding: 8px;

  display: flex;
  gap : 8px;
  flex-wrap: nowrap;

  position: absolute;
  bottom : 0; left: 0; right : 0;
`;

const SelectItem = styled.li`
  flex : 0 0 120px;
  height: 100%;
  cursor: pointer;
  transition: filter 0.3s;
  filter: ${({ $activeIndex, $index }) => $activeIndex === $index ? 'none' : 'brightness(40%)'};

  & > img {
    display: block;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

function NewsImagesSection({ newsData }) {
  const [imageUrls, setImageUrls] = useState([]);
  const [isClick, setIsClick] = useState(false);
  const [modalActiveIndex, setModalActiveIndex] = useState(null);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const handleClickImg = (index) => {
    setIsClick(true);
    setModalActiveIndex(index);
  }

  const handleClose = () => {
    setIsClick(false);
    setModalActiveIndex(null);
  }

  const handleChangeIdx = (direction, length) => {
    if (!direction) return;

    direction === 'right'
      ?
      setModalActiveIndex((prev) => {
        if (prev + 1 >= length) {
          return 0;
        } else {
          return prev + 1;
        }
      })
      :
      setModalActiveIndex((prev) => {
        if (prev - 1 < 0) {
          return length - 1;
        } else {
          return prev - 1;
        }
      })
  }

  useEffect(() => {
    if (!newsData) return;
    const imageArray = newsData?.ArticleImage.map((imgUrl) => imgUrl.articleImageUrl);

    setImageUrls(imageArray);
  }, [newsData]);

  useEffect(() => {
    if (isClick) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = '';
    }
  }, [isClick]);

  return (
    !isMobile ?
      (
        <ImagesContainer $hasImages={imageUrls.length}>
          <span className="images-description">참고 이미지</span>
          <ImagesBox>
            {
              imageUrls.map((imgUrl, i) => (
                <ImageItem key={i}>
                  <img src={imgUrl} alt={`reference-preview-image-${i}`} className="reference-img" onClick={() => handleClickImg(i)} />
                </ImageItem>
              ))
            }
          </ImagesBox>
          {
            (isClick && imageUrls.length !== 0) &&
            <ModalContainer>
              <ModalBox>
                {
                  modalActiveIndex !== null &&
                  <ModalItem>
                    <IoCloseOutline onClick={handleClose} size={36} className="close-btn" color={'white'} />
                    <FaAngleLeft className="left-arrow" size={40} color={'gray'} onClick={() => handleChangeIdx('left', imageUrls.length)} />
                    <FaAngleRight className="right-arrow" size={40} color={'gray'} onClick={() => handleChangeIdx('right', imageUrls.length)} />
                    <img src={imageUrls[modalActiveIndex]} alt={`image-${modalActiveIndex}`} />
                  </ModalItem>
                }
                <SelectList>
                  {
                    imageUrls.map((imgUrl, i) => (
                      <SelectItem key={i} $activeIndex={modalActiveIndex} $index={i}>
                        <img src={imgUrl} alt={`select-image-${i}`} onClick={() => setModalActiveIndex(i)} />
                      </SelectItem>
                    ))
                  }
                </SelectList>
              </ModalBox>
            </ModalContainer>
          }
        </ImagesContainer >
      )
      :
      (
        <ImagesContainer $hasImages={imageUrls.length}>
          <span className="images-description">참고 이미지</span>
          <ImagesBox>
            {
              imageUrls.map((imgUrl, i) => (
                <ImageItem key={i}>
                  <img src={imgUrl} alt={`reference-preview-image-${i}`} className="reference-img" onClick={() => handleClickImg(i)} />
                </ImageItem>
              ))
            }
          </ImagesBox>
          {
            (isClick && imageUrls.length !== 0) &&
            <ModalContainer onClick={() => setIsClick(false)}>
              <ModalBox onClick={(e) => e.stopPropagation()}>
                <ul className="image-lists">
                  <IoCloseOutline color="#fff" size={40} onClick={handleClose} />
                  {
                    imageUrls.length !== 0 && (
                      <Swiper
                        key={imageUrls.length}
                        modules={[Pagination, Autoplay]}
                        pagination={{ clickable: true }}
                        loop={imageUrls.length > 1}
                        slidesPerView={1}
                      >
                        {
                          imageUrls.map((imgUrl, i) => (
                            <SwiperSlide key={i}>
                              <img src={imgUrl} alt={`image-${i}`} />
                            </SwiperSlide>
                          ))
                        }
                      </Swiper>
                    )
                  }
                </ul>
              </ModalBox>
            </ModalContainer>
          }
        </ImagesContainer >
      )
  )
}

export default NewsImagesSection;