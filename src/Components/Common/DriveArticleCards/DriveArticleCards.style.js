import styled from "styled-components";

const DriveWrapper = styled.section`
  width: 100%;
  margin-bottom: 40px;
`;

const DriveInnerBox = styled.div`
  max-width: 1280px;
  margin : 0 auto;
  padding : 0 40px;
`;

const CardContainer = styled.div`
  padding : 16px;
  background-color: ${({ theme }) => theme.neutral.gray0};
  border-radius: 4px;

  & > .drive-section-title {
    position: relative;
    font-size: 1.4rem;
    color: ${({ theme }) => theme.primary.red700};
    font-weight: bold;

    display: flex;
    align-items: center;

    & > svg {
      cursor: pointer;

      &:hover {
        opacity: 0.8;
      }
    }

    & > .section-logo {
      width: 80px;
      height: 40px;
      margin-right: 1px;
      background-image: url(${({ $src }) => $src});
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
    }
  }


  & > .slide-container {
    
    .swiper-wrapper {
      margin-top : 8px;
    }

    .swiper-slide {
      position: relative;
      cursor: pointer;
      overflow: hidden;
      border-radius: 4px;

      &:hover {
        .slide-item-image {
          transform: scale(1.02);
        }

        & > article {
          & > .drive-text-box {
            & > h2 {
              text-decoration: underline;
            }
          }
        }
      }

      &::after {
        position: absolute;
        left: 0; bottom : 0; top : 0; right : 0;
        border-radius: 4px;
        content: "";
        width: 100%;
        height: 100%;
        background-image: linear-gradient(to top, rgba(0, 0, 0, 0.6) 10%, transparent 100%);
      }

      .slide-item-image {
        will-change: transform;
        transition: transform 0.7s;
        border-radius: 4px;
        object-fit: cover;
        width: 100%;
        height: 240px;
      }
    }
  }
`;

const DriveTextBox = styled.div`
  margin: 16px;
  position: absolute;
  bottom : 0;
  left : 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap : 8px;

  & > .drive-title {
    color : ${({ theme }) => theme.neutral.gray100};
    font-size: 1.1rem;

    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  & > .drive-category {
    color : ${({ theme }) => theme.primary.red700};
    font-weight: bold;
    font-size: .85rem;
  }
`;


export { DriveInnerBox, DriveWrapper, CardContainer, DriveTextBox };