import styled, { css } from "styled-components";
import { useFetchTravelArticle } from '../../Hooks/ApiHooks/GeneralArticle/useFetchTravelArticles';
import { useQuery } from "@tanstack/react-query";
import { fetchMagazineArticle } from "../../../API/generalAPI/generalArticle.api";
import { formatDateOnly } from "../../Hooks/Utils/formatDateOnly";
import { motion } from "framer-motion";
import { MdBookmarkAdd } from "react-icons/md";
import logo from '../../../Assets/theiautoLogo.png';
import { IoIosArrowDroprightCircle } from "react-icons/io";


const MagazineWrapper = styled.section`
  width: 100%;
  margin-bottom: 24px;
`;

const MagazineInnerBox = styled.div`
  max-width: 1280px;
  margin : 0 auto;
  padding : 0 40px;
`;

const LayoutBox = styled.div`
  display: flex;
  gap : 24px;
`;

const ContentBox = styled.div`
  flex: 0 0 60%;
  height: 240px;
  background-color: ${({ theme }) => theme.neutral.gray900};
  border-radius: 4px;

  & > article {
    position: relative;
    width: 100%;
    height: 100%;
    padding : 24px;
    overflow: hidden;

    display: flex;
    gap: 24px;
  }

  &:hover {
    & > article {
      & > .magazine-banner {
            transform: rotate(4deg);
            cursor: pointer;
          }
      & > div {
          & > .magazine-title {
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }
  }
`;

const MagazineImg = styled.img`
  width: 160px;
  height: 100%;
  object-fit: contain;
  will-change: transform;
  transition: transform 0.4s;
`;

const TextStyle = css`
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const MagazineTextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap : 16px;
  position: relative;

  & > h1 {
    font-size: 1.6rem;
    color: ${({ theme }) => theme.neutral.gray100};
    ${TextStyle};
  }

  & > h2 {
    font-size: 1.2rem;
    color: ${({ theme }) => theme.neutral.gray600};
    font-weight: 400;
    ${TextStyle};
  }

  & > span {
    color: ${({ theme }) => theme.neutral.gray300};
    position: absolute;
    bottom : 0;
  }
`;

const SubscribeBtn = styled(motion.button)`
  position: absolute;
  bottom : 24px;
  right: 24px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;

  width: 160px;
  height: 40px;
  border-radius: 8px;
  border : 2px solid black;
  will-change: transform;

  background-color: ${({ theme }) => theme.primary.red700};
  color : ${({ theme }) => theme.neutral.gray100};
  font-weight: bold;

  cursor: pointer;
`;

const TravelContentBox = styled.aside`
  width: 100%;
  height: 240px;
  border-radius : 4px;
  padding : 16px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.neutral.gray0};

  position: relative;

  & > svg {
    color : ${({ theme }) => theme.primary.red700};
    position: absolute;
    right : 16px;
    top : 16px;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }
`;

const TravelLogo = styled.div`
  width: 80px;
  height: 32px;
  background-image: url(${logo});
  background-size: contain;
  background-position: left;
  background-repeat: no-repeat;
  position: relative;
  display: flex;
  align-items: center;
`;

const TravelDescription = styled.span`
  width: 100%;
  position: absolute;
  left: 100%;
  font-size: 1.2rem;
  color : ${({ theme }) => theme.primary.red700};
  font-weight: bold;

  display: flex;
  align-items: center;
`;

const TravelArticleBox = styled.article`
  width: 100%;
  height: 172px;
  margin-top: 8px;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;

  display: flex;

  &:hover {
    & > div {
      & > .travel-news-title {
        text-decoration: underline;
      }
    }
  }
`;

const TravelImg = styled.img`
  width: 60%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
  filter: brightness(90%);
`;

const TravelTextBox = styled.div`
  margin : 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;

  & > h1 {
    font-size: 1.2rem;
    color : ${({ theme }) => theme.neutral.gray900};
    line-height: 1.2;
    ${TextStyle};
    -webkit-line-clamp: 3;
  }

  & > h2 {
    font-size: .85rem;
    color: ${({ theme }) => theme.primary.red700};
    ${TextStyle};
  }

  & > span {
    font-size: .75rem;
    color : ${({ theme }) => theme.neutral.gray300};
    position: absolute;
    right : 0; bottom : 0;
  }
`;


function MagazineAndTravelSection() {
  const { data: magazineData } = useQuery({
    queryKey: ['magazine-news'],
    queryFn: fetchMagazineArticle
  });
  const magazineArticle = magazineData?.magazineArticle || {};
  const { data: travelData } = useFetchTravelArticle();
  const travelArticles = travelData?.travelArticles || {};

  return (
    <MagazineWrapper>
      <MagazineInnerBox>
        <LayoutBox>
          <TravelContentBox>
            <TravelLogo>
              <TravelDescription>
                여행기
              </TravelDescription>
            </TravelLogo>
            <IoIosArrowDroprightCircle size={24} />
            <TravelArticleBox>
              <TravelImg src={travelArticles?.articleBanner} alt="travel-news-banner" />
              <TravelTextBox>
                <h1 className="travel-news-title">{travelArticles?.articleTitle}</h1>
                <h2>{travelArticles?.articleSubTitle}</h2>
                <span>{travelArticles?.createdAt && formatDateOnly(travelArticles?.createdAt)}</span>
              </TravelTextBox>
            </TravelArticleBox>
          </TravelContentBox>
          <ContentBox>
            <article>
              <MagazineImg className="magazine-banner" src={magazineArticle?.articleBanner} alt="magazine-banner" />
              <MagazineTextBox>
                <h1 className="magazine-title">{magazineArticle?.articleTitle}</h1>
                <h2 className="magazine-subTitle">{magazineArticle?.articleSubTitle}</h2>
                <span className="magazine-date">{magazineArticle?.createdAt && formatDateOnly(magazineArticle?.createdAt)}</span>
              </MagazineTextBox>
              <SubscribeBtn
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 500, damping: 10 }}
              >
                <MdBookmarkAdd size={20} />
                구독하기
              </SubscribeBtn>
            </article>
          </ContentBox>
        </LayoutBox>
      </MagazineInnerBox>
    </MagazineWrapper>
  )
}

export default MagazineAndTravelSection;