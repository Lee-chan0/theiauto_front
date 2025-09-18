import styled, { css, keyframes } from "styled-components";
import { useCategoryRedirect } from '../../../Hooks/CommonHooks/useCategoryRedirect';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { formatDateOnly } from '../../../Hooks/Utils/formatDateOnly';
import { FiPlus } from "react-icons/fi";


const shimmer = keyframes`
  0% {
    background-position: -150% 0;
  }
  100% {
    background-position: 150% 0;
  }
`;

const MotorSkeleton = styled.div`
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

const textStyle = css`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.neutral.gray0};
  border: 1px solid rgba(0, 0, 0, 0.1);
  flex : 1;
`;

const DescriptionBox = styled.div`
  display: flex;
  border-bottom: 2px solid rgba(26, 26, 26, 0.2);

  & > * {
    flex : 1;
    text-align: center;
    padding : 8px 0;
    cursor: pointer;
  }

  & > span {
    font-size: .9rem;
    position: relative;
    font-weight: bold;
    color : ${({ theme }) => theme.primary.red700};
    border-right: 2px solid rgba(26, 26, 26, 0.2);
    pointer-events: none;
  }

`;

const ViewMoreBox = styled.div`
  font-size: .8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap : 8px;
  font-weight: 600;
  position: relative;
  overflow: hidden;
  transition: color 0.3s ease;
  color : ${({ theme }) => theme.neutral.gray900};
  
  &::after {  
    content: '';
    width: 100%;
    height: 100%;
    background-color: rgba(26, 26, 26, 0.1);
    position: absolute;
    top : 0;
    right : ${({ $isHover }) => !$isHover ? '100%' : '0'};
    transition: right 0.3s ease;
  }
`;

const MotorContentBox = styled.div`
  width: 100%;
`;

const MotorLists = styled.ul`
  width: 100%;
  padding : 8px;
  display: flex;
  flex-direction: column;
  gap : 8px;
`;

const MotorItems = styled.li`
  width: 100%;
  height: 80px;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;

  &:hover {

    & > article {
      & > div {
        & > h1 {
          text-decoration: underline;
        }
      }
    }
  }
`;

const MotorArticle = styled.article`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.5);

  & > img {
    width: 30%;
    height: 100%;
    object-fit: cover;
  }
`;

const MotorTextBox = styled.div`
  width: 65%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  & > h1 {
    font-size: .85rem;
    line-height: 1.35;
    ${textStyle};
  }

  & > span {
    font-size: .8rem;
    font-weight: 500;
    color : ${({ theme }) => theme.neutral.gray600};
    text-align: right;
    margin : 0 4px;
  }
`;

function HomeMotorSports({ motorSportArticles, motorLoading, motorError }) {
  const navigate = useNavigate();
  const { goToCategory } = useCategoryRedirect(motorSportArticles);
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    if (motorError) {
      navigate('/error');
    }
  }, [motorError, navigate]);

  if (motorError) return null;

  if (motorLoading) {
    return (
      <MainContainer>
        <MotorSkeleton>
        </MotorSkeleton>
      </MainContainer>
    )
  }

  return (
    <MainContainer>
      <DescriptionBox>
        <span>{'모터스포츠'}</span>
        <ViewMoreBox
          onClick={() => goToCategory()}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          $isHover={isHover}
        >더 보기
          <FiPlus size={18} />
        </ViewMoreBox>
      </DescriptionBox>
      <MotorContentBox>
        <MotorLists>
          {
            motorSportArticles?.map((motor, i) => (
              <MotorItems
                key={motor?.articleId}
                onClick={() => navigate(`/news/${motor?.articleId}`)}
                data-aos={'fade-right'}
                data-aos-delay={`${i * 100}`}
              >
                <MotorArticle>
                  <img src={motor?.articleBanner} alt={`motor-sport-image-${i}`} />
                  <MotorTextBox>
                    <h1>{motor?.articleTitle}</h1>
                    <span>{motor?.createdAt && formatDateOnly(motor?.createdAt)}</span>
                  </MotorTextBox>
                </MotorArticle>
              </MotorItems>
            ))
          }
        </MotorLists>
      </MotorContentBox>
    </MainContainer>
  )
}

export default HomeMotorSports;