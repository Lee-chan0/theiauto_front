import styled, { css, keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useFetchCategories } from "../../Hooks/ApiHooks/Category/useFetchCategories";
import { useQuery } from "@tanstack/react-query";
import { fetchCategoryBannerArticle } from "../../../API/generalAPI/generalArticle.api";
import { useScrollStickyState } from "../../Hooks/Context/ScrollAndStickyCheckContext";

const textStyle = css`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
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
`;

const MainContainer = styled.section`
  width: 100%;
  height: 100vh;
  transform: translateY(-80px);

  @media (max-width : 767px) {
    height: 70vh;
    transform: translateY(0px);
  }
`;

const ContentBox = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background-image: url(${({ $src }) => $src});
  background-size: ${({ $isHover }) => $isHover ? '110%' : '100%'};
  background-position: center;
  background-repeat: no-repeat;
  transition: background-size 1s;

  &::after {
    content: '';
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.8) 20%, transparent 100%);
    position: absolute;
    top : 0; left : 0;
  }

  @media (max-width : 1279px) {
    background-size: cover;
  }
`;

const TextBox = styled.div`
  position: absolute;
  bottom : 0;
  margin : 40px;
  display: flex;
  flex-direction: column;
  gap : 24px;
  z-index: 1;
  line-height: 1.2;
  cursor: pointer;

  @media (max-width : 767px) {
    gap : 16px;
    margin : 24px;
  }

  &:hover {
    & > h1 {
      text-decoration: underline;
    }
  }

  & > span {
    font-size: 1.2rem;
    color : ${({ theme }) => theme.primary.red700};
    font-weight: bold;

    @media (max-width : 1279px) {
      font-size: 1.06rem;
    }

    @media (max-width : 1279px) {
      font-size: .95rem;
    }
  }

  & > h1 {
    font-size: 1.65rem;
    color: ${({ theme }) => theme.neutral.gray100};
    ${textStyle};

    @media (max-width : 1279px) {
      font-size: 1.45rem;
    }

    @media (max-width : 767px) {
      font-size: 1.18rem;
    }
  }

  & > h2 {
    font-size: 1rem;
    color: ${({ theme }) => theme.neutral.gray300};
    ${textStyle};

    @media (max-width : 1279px) {
      font-size: .9rem;
    }

    @media (max-width : 767px) {
      font-size: .8rem;
    }
  }
`;

const TagBox = styled.div`
  position: absolute;
  bottom : 120%;
  left : 0;
  display: flex;
  gap : 16px;

  & > span {
    padding : 4px 8px;
    background-color: ${({ theme }) => theme.neutral.gray900};
    color : ${({ theme }) => theme.neutral.gray100};
    font-size: .9rem;
    border-radius: 4px;
    box-shadow: 0 0 5px 0px rgba(255, 255, 255, 0.5);
    font-weight: bold;
  }

  @media (max-width : 767px) {
    display: none;
  }
`;

function CategoryBanner({ categoryId }) {
  const navigate = useNavigate();
  const { data: categoryArray, isError, isLoading: categoryLoading } = useFetchCategories();
  const categories = useMemo(() => categoryArray?.categories || [], [categoryArray]);
  const { data: bannerArticle, isLoading: bannerLoading } = useQuery({
    queryKey: ['bannerArticle', categoryId],
    queryFn: () => fetchCategoryBannerArticle(categoryId)
  });
  const bannerData = bannerArticle?.categoryBannerArticle || {};
  const [isHover, setIsHover] = useState(false);
  const { bannerHeightRef, setOverScroll } = useScrollStickyState();

  useEffect(() => {
    if (categoryLoading || bannerLoading) return;
    if (!bannerHeightRef.current) return;

    const target = bannerHeightRef.current;
    setOverScroll(target.getBoundingClientRect().height);
  }, [categoryLoading, bannerLoading, bannerHeightRef, setOverScroll]);

  useEffect(() => {
    if (isError) {
      navigate('/error');
    }
  }, [navigate, isError]);

  if (isError) return null;

  if (categoryLoading || bannerLoading) {
    return (
      <MainContainer>
        <ContentBox>
          <BannerSkeleton />
        </ContentBox>
      </MainContainer>
    )
  }

  return (
    <MainContainer ref={bannerHeightRef}>
      <ContentBox
        $src={bannerData?.articleBanner}
        $isHover={isHover}
      >
        <TextBox
          onClick={() => navigate(`/news/${bannerData?.articleId}`)}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <span>{bannerData?.category?.categoryName}</span>
          <h1>{bannerData?.articleTitle}</h1>
          <h2>{bannerData?.articleSubTitle}</h2>
          <TagBox>
            {
              bannerData?.ArticleTag?.length !== 0 &&
              bannerData?.ArticleTag?.map((tag) => (
                <span key={tag.tag.tagId}>#&nbsp;{tag.tag.tagName}</span>
              ))
            }
          </TagBox>
        </TextBox>
      </ContentBox>
    </MainContainer>
  )
}

export default CategoryBanner;