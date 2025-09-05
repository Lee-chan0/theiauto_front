import styled, { css, keyframes } from "styled-components";

const textStyle = css`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const WebBannerWrapper = styled.section`
  width: 100%;
  height: 100vh;
  transform: translateY(-80px);
  position: relative;
`;

const WebBannerInnerBox = styled.div`
  width: 100%;
  height: 100%;
  margin : 0 auto;
  position: relative;
`;

const WebBannerContentList = styled.ul`
  position: relative;
  width: 100%;
  height: 100%;
  display: block;
  overflow: hidden;
`;

const WebTextBox = styled.div`
  width: 70%;
  height: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  z-index: 2;

  @media (max-width : 1279px) {
    width: 55%;
  }
`;

const WebTexts = styled.div`
  color : ${({ theme }) => theme.neutral.gray100};
  display: flex;
  flex-direction: column;
  gap : 32px;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.6);
  cursor: pointer;



  &:hover {
    & > h1 {
      text-decoration: underline;
    }
  }

  & > * {
    margin : 0 40px;

    @media (max-width : 1279px) {
      margin : 0 24px;
    }
  }

  & > span {
    margin-top : 40px;
    font-size: 1.4rem;
    font-weight: 900;
    color : ${({ theme }) => theme.primary.red700};

    @media (max-width : 1279px) {
      font-size: 1.18rem;
    }
  }

  & > h1 {
    font-size: 1.83rem;
    ${textStyle};
    line-height: 1.3;
    color : ${({ theme }) => theme.neutral.gray0};

    @media (max-width : 1279px) {
      font-size: 1.53rem;
    }
  }

  & > h2 {
    margin-bottom: 40px;
    font-size: 1rem;
    color : ${({ theme }) => theme.neutral.gray300};
    ${textStyle};

    @media (max-width : 1279px) {
      font-size: .9rem;
    }
  }

`;

const WebRemainList = styled.ul`
  width: 10%;
  height: calc(100% - 120px);
  position: absolute;
  top : 80px;  right: 16px;

  display: flex;
  flex-direction: column;
  gap : 8px;

  @media (max-width : 1279px) {
    width: 7%;
  }
`;

const WebRemainItems = styled.li`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  background-image: url(${({ $src }) => $src ? $src : ""});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.75);
  transition: filter 0.5s, transform 0.5s;
  filter : ${({ $activeRemainIndex, $index }) => $activeRemainIndex === $index ? 'brightness(100%)' : 'brightness(30%)'};
  transform: ${({ $activeRemainIndex, $index }) => $activeRemainIndex === $index ? 'scale(1.08)' : 'scale(0.9)'};
  z-index: 2;
  will-change: transform;

  &:hover {
    transform: scale(1);
  }
`;

const WebBannerContentItems = styled.li`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${({ $src }) => $src || ""});
  background-size: ${({ $isHoverBanner }) => $isHoverBanner ? '105%' : '100%'};
  background-position: center;
  background-repeat: no-repeat;
  transition: opacity 0.7s ease, background-size 1.5s;
  opacity: ${({ $isActive }) => $isActive ? '1' : '0'};
  z-index: ${({ $isActive }) => $isActive ? 1 : 0};

  @media (max-width : 1279px) {
    background-size: cover;
  }

  &::after {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    bottom : 0; left : 0;
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.75) 10%, transparent 100%);
  }
`;

const WebRemainTitleBox = styled.div`
  width: 240px;
  height: 100%;
  position: absolute;
  right : 100%;
  background-color: rgba(0, 0, 0, 0.8);
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding : 16px;
  gap : 4px;

  @media (max-width : 1279px) {
    width: 220px;
  }

  & > span {
    font-size: .85rem;
    font-weight: bold;
    color  :${({ theme }) => theme.primary.red700};

    @media (max-width : 1279px) {
      font-size: .8rem;
    }
  }

  & > h1 {
    font-size: .9rem;
    color : #fff;
    line-height: 1.3;
    ${textStyle};
    -webkit-line-clamp: 3;

    @media (max-width : 1279px) {
      font-size: .85rem;
    }
  }
`;

const BannerWrapper = styled.section`
  width: 100%;
  background-image: linear-gradient(to bottom, #1a1a1a 50%, transparent 100%);
  margin-bottom : 24px;

  @media (max-width : 767px) {
    height: 240px;
    margin-bottom : 0;
  }
`;

const BannerInnerBox = styled.div`
  max-width: 1280px;
  height: 100%;
  margin : 0 auto;
  padding : 40px;
  padding-bottom : 0;

  @media (max-width: 1279px) {
    max-width: 100%;
    padding : 24px;
    padding-bottom : 0;
  }

  @media (max-width : 767px) {
    padding : 16px;
    padding-top: 0;
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -150% 0;
  }
  100% {
    background-position: 150% 0;
  }
`;

const BannerSkeleton = styled.div`
  width: 100%;
  height: calc(100vh + 80px);
  transform: translateY(-80px);
  position: relative;
  background: linear-gradient(
    90deg,
    #555555 0%,
    #666666 50%,
    #555555 100%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 2s linear infinite alternate;

  @media (max-width : 767px) {
    height: calc(240px - 32px);
    transform: translateY(0);
  }
`;

const MobileBannerContainer = styled.div`
  border-radius: 4px;
  border-top-right-radius: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;

  & > .swiper {
    width: 100%;
    height: 100%;

    & > .swiper-pagination {
      position: absolute;
      bottom : 4px;

      & > .swiper-pagination-bullet {
        width: 7px;
        height: 7px;
        background-color: ${({ theme }) => theme.primary.red700};
      }
    }
  }
`;

const MobileBannerItems = styled.article`
  width: 100%;
  height: 100%;
  background-image: url(${({ $src }) => $src});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom : 0; left : 0; right :0; top : 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 30%, transparent 100%);
    width: 100%;
    height: 100%;
  }

  & > .card-textbox {
    position: absolute;
    bottom : 0;
    z-index: 1;
    margin : 8px 16px;

    & > .card-category {
      color : ${({ theme }) => theme.primary.red700};
      font-size: .85rem;
      font-weight: bold;
    }

    & > .card-title {
      font-size: 1rem;
      line-height: 1.2;
      color : ${({ theme }) => theme.neutral.gray100};
      margin : 8px 0;

      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

const ArrowContainer = styled.div`
  position: absolute;
  right: 0;
  top : 0;
  width: 80px;
  z-index: 2;
  display: flex;
  border : 1px solid rgba(255, 255, 255, 0.4);
`;

const ArrowBox = styled.div`
  width: 50%;
  height: 40px;
  background-color: ${({ theme }) => theme.neutral.gray900};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:nth-child(1) {
    border-right: 1px solid rgba(255, 255, 255, 0.4);
  }
`;


export {
  BannerWrapper, BannerInnerBox, WebBannerWrapper, WebBannerInnerBox, WebTexts,
  WebBannerContentItems, WebBannerContentList, WebTextBox, WebRemainItems, WebRemainList, WebRemainTitleBox,
  ArrowBox, ArrowContainer, MobileBannerContainer, MobileBannerItems, BannerSkeleton
};