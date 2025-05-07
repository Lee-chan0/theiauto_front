import { ServiceContentBox, ServiceHeaderDescrip, ServiceInnerBox, ServiceNewsItem, ServiceNewsLists, ServiceTextBox, ServiceWrapper } from "./ServiceSection.style";
import { useFetchServiceArticles } from '../../Hooks/ApiHooks/GeneralArticle/useFetchServiceArticles';
import { formatDateOnly } from "../../Hooks/Utils/formatDateOnly";
import { IoIosArrowDroprightCircle } from "react-icons/io";

function ServiceSection() {
  const { data: serviceArticleArray } = useFetchServiceArticles();
  const serviceArticles = serviceArticleArray?.serviceArticles || [];

  return (
    <ServiceWrapper>
      <ServiceInnerBox>
        <ServiceContentBox>
          <ServiceHeaderDescrip>
            서비스 & 브랜드
            <IoIosArrowDroprightCircle />
          </ServiceHeaderDescrip>
          <ServiceNewsLists>
            {
              serviceArticles.map((service) => (
                <ServiceNewsItem key={service.articleId}>
                  <article>
                    <img src={service.articleBanner} alt="news-banner" />
                    <ServiceTextBox className="news-text-box">
                      <h2>{service.articleTitle}</h2>
                      <span>{formatDateOnly(service.createdAt)}</span>
                    </ServiceTextBox>
                  </article>
                </ServiceNewsItem>
              ))
            }
          </ServiceNewsLists>
        </ServiceContentBox>
      </ServiceInnerBox>
    </ServiceWrapper>
  )
}

export default ServiceSection;