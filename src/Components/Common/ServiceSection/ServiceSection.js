import { ServiceArticle, ServiceDescription, ServiceInnerBox, ServiceItems, ServiceLists, ServiceSkeleton, ServiceTitleBox, ServiceWrapper } from "./ServiceSection.style";
import { formatDateOnly } from "../../Hooks/Utils/formatDateOnly";
import { useCategoryRedirect } from "../../Hooks/CommonHooks/useCategoryRedirect";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import GoToCategoryBtn from "../../Features/GoToCategoryBtn/GoToCategoryBtn";
import { useMediaQuery } from "react-responsive";

function ServiceSection({ serviceArticles, isLoading, isError }) {
  const { goToCategory } = useCategoryRedirect(serviceArticles);
  const navigate = useNavigate();
  const isTablet = useMediaQuery({ maxWidth: 1279 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const sliceNumber = isMobile ? 4 : isTablet ? 6 : 9;

  useEffect(() => {
    if (isError) {
      navigate('/error');
    }
  }, [navigate, isError]);

  if (isError) return null;

  if (isLoading) {
    return (
      <ServiceWrapper>
        <ServiceInnerBox>
          <ServiceSkeleton />
        </ServiceInnerBox>
      </ServiceWrapper>
    )
  }

  return (
    <ServiceWrapper>
      <ServiceInnerBox>
        <div style={{ width: '100%', height: '100%', backgroundColor: '#fff', borderRadius: '16px', padding: '8px' }}>
          <ServiceDescription>
            <span>부품 & 서비스</span>
            <GoToCategoryBtn onClick={goToCategory} />
          </ServiceDescription>
          <ServiceLists>
            {
              serviceArticles?.slice(0, sliceNumber).map((service, i) => (
                <div
                  data-aos='fade-left'
                  data-aos-delay={`${i * 100}`}
                  key={service.articleId}
                >
                  <ServiceItems
                    onClick={() => navigate(`/news/${service.articleId}`)}
                  >
                    <ServiceArticle>
                      <img src={service.articleBanner} alt={`service-news-${i}`} />
                      <ServiceTitleBox>
                        <h1>{service.articleTitle}</h1>
                        <span>{service.createdAt && formatDateOnly(service.createdAt)}</span>
                      </ServiceTitleBox>
                    </ServiceArticle>
                  </ServiceItems>
                </div>
              ))
            }
          </ServiceLists>
        </div>
      </ServiceInnerBox>
    </ServiceWrapper >
  )
}

export default ServiceSection;