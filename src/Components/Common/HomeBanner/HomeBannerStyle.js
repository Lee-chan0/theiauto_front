import styled from "styled-components";

const BannerWrapper = styled.div`
  width: 100%;
  height: 480px;
  background-image: linear-gradient(to bottom, #1a1a1a 50%, transparent 100%);
  margin-bottom : 40px;
`;

const BannerInnerBox = styled.div`
  max-width: 1280px;
  height: 100%;
  margin : 0 auto;
  padding : 40px;
  padding-bottom : 0;
`;


const BannerContainer = styled.div`
  flex : 1;
  height: 100%;
  position: relative;
  cursor: pointer;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 4px 10px 1px rgba(0, 0, 0, 0.3);


  &:hover {
    & > .banner-image {
      transform: scale(1.05);
    }
  }
`;

const LayoutContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  gap: 24px;
`;

const BannerImgBox = styled.div`
  position: absolute;
  top : 0;
  left : 0;
  right : 0;
  bottom : 0;
  width: 100%;
  height: 100%;
  background-image: url(${({ $src }) => $src ? $src : ""});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: 4px;

  transition: opacity 0.7s, transform 1s;

  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.8) 10%, transparent 100%);
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }


`;

const BannerTextBox = styled.div`
  position: absolute;
  bottom : 40px;
  left : 40px;
  width: 60%;

  display : flex;
  flex-direction: column;
  gap : 16px;

  transition: opacity 0.7s;
`;

const BannerCategory = styled.span`
  color : ${({ theme }) => theme.primary.red700};
  font-weight: bold;
  font-size: 1.25rem;
`;

const BannerTitle = styled.h2`
  font-size: 1.6rem;
  cursor: pointer;
  margin : 0;
  color : ${({ theme }) => theme.neutral.gray100};
  line-height: 1.4;
  overflow: hidden;

  display : -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  z-index: 1;

  &:hover {
    text-decoration: underline;
  }
`;

const BannerSubTitle = styled(BannerTitle)`
  font-size: 1.1rem;
  color : ${({ theme }) => theme.neutral.gray600};
  -webkit-line-clamp: 1;
  
  &:hover {
    text-decoration: none;
  }
`;


export { BannerWrapper, BannerInnerBox, BannerContainer, BannerTextBox, BannerTitle, BannerCategory, BannerImgBox, LayoutContainer, BannerSubTitle };