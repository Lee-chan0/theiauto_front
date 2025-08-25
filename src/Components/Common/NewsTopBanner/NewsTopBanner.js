import styled from "styled-components";
import { formatDateOnly } from "../../Hooks/Utils/formatDateOnly";
import AuthorInfoTag from "../AuthorInfoTag/AuthorInfoTag";

const BannerContainer = styled.section`
  width: 100%;
  height: 320px;

  @media (max-width : 767px) {
    width: 100%;
    height: 180px;
  }
`;

const BannerBackImg = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${({ $src }) => $src ? $src : ""});
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;

  &::after {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
  }

  @media (max-width : 767px) {
    background-attachment: local;
  }
`;

const TextBox = styled.div`
  z-index: 1;
  position: absolute;

  display: flex;
  flex-direction: column;
  gap : 24px;
  margin : 0 32px;

  @media (max-width : 767px) {
    gap : 12px;
    margin : 0 16px;
  }

  & > .news-category {
    color : ${({ theme }) => theme.primary.red500};
    font-weight: bold;

    @media (max-width : 1279px) {
      font-size: .9rem;
    }

    @media (max-width : 767px) {
      font-size: .75rem;
    }
  }

  & > .news-title {
    color : ${({ theme }) => theme.neutral.gray100};
    
    @media (max-width : 1279px) {
      font-size: 1.7rem;
    }

    @media (max-width : 767px) {
      font-size: 1rem;
    }
  }

  & > .news-sub-title {
    color : ${({ theme }) => theme.neutral.gray100};
    font-size: 1rem;
    font-weight: 300;

    @media (max-width : 767px) {
      font-size: .8rem;
    }
  }

  & > .news-date {
    color : ${({ theme }) => theme.neutral.gray600};
    font-size: .9rem;
    font-weight: bold;

    @media (max-width : 767px) {
      font-size: .7rem;
    }
  }
`;


function NewsTopBanner({ newsData, stickyCheckRef, isMobile }) {

  return (
    <BannerContainer>
      <BannerBackImg $src={newsData?.articleBanner}>
        <div ref={stickyCheckRef} style={{ width: '100%', height: '1px' }} />
        <TextBox>
          <span className="news-category">{newsData?.category?.categoryName}</span>
          <h1 className="news-title">{newsData?.articleTitle}</h1>
          <h2 className="news-sub-title">"{newsData?.articleSubTitle}"</h2>
          <span className="news-date">{newsData?.createdAt && formatDateOnly(newsData.createdAt)}</span>
          <AuthorInfoTag newsData={newsData} isMobile={isMobile} />
        </TextBox>
      </BannerBackImg>
    </BannerContainer>
  )
}

export default NewsTopBanner;