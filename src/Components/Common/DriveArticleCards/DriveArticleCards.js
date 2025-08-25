import { DriveArticle, DriveDescription, DriveInnerBox, DriveItems, DriveLists, DriveSkeleton, DriveTextBox, DriveWrapper } from "./DriveArticleCards.style";
import { useCategoryRedirect } from "../../Hooks/CommonHooks/useCategoryRedirect";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import GoToCategoryBtn from "../../Features/GoToCategoryBtn/GoToCategoryBtn";
import { useMediaQuery } from "react-responsive";

function DriveArticleCards({
  driveArticles,
  driveLoading,
  driveError
}) {
  const { goToCategory } = useCategoryRedirect(driveArticles);
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const sliceNum = isMobile ? 4 : 6;

  useEffect(() => {
    if (driveError) {
      navigate('/error');
    }
  }, [driveError, navigate]);

  if (driveError) return null;

  if (driveLoading) {
    return (
      <DriveWrapper>
        <DriveInnerBox>
          <DriveSkeleton />
        </DriveInnerBox>
      </DriveWrapper>
    )
  }

  return (
    <DriveWrapper>
      <DriveInnerBox>
        <DriveDescription>
          <span>{!isMobile ? 'Test Drive Review [시승기]' : '시승기'}</span>
          <GoToCategoryBtn onClick={goToCategory}>View More</GoToCategoryBtn>
        </DriveDescription>
        <DriveLists>
          {
            driveArticles?.slice(0, sliceNum).map((drive, i) => (
              <DriveItems key={drive.articleId}
                data-aos='fade'
                data-aos-delay={`${i * 100}`}
                onClick={() => navigate(`/news/${drive.articleId}`)}
              >
                <DriveArticle $src={drive.articleBanner}>
                  <DriveTextBox>
                    <span>시승기</span>
                    <h1>{drive.articleTitle}</h1>
                    <h2>{drive.articleSubTitle}</h2>
                  </DriveTextBox>
                </DriveArticle>
              </DriveItems>
            ))
          }
        </DriveLists>
      </DriveInnerBox>
    </DriveWrapper >
  )
}

export default DriveArticleCards;