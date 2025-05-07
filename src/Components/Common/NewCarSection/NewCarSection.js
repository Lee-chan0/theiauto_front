import { useFetchNewCarArticles } from "../../Hooks/ApiHooks/GeneralArticle/useFetchNewCarArticles";
import { NewCarCardItem, NewCarCardLists, NewCarContentBox, NewCarDescrip, NewCarImgBox, NewCarInnerBox, NewCarLayoutContainer, NewCarTextBox, NewCarWrapper } from "./NewCarSection.style";
import { BsHash } from "react-icons/bs";
import { IoIosArrowDroprightCircle } from "react-icons/io";

function NewCarSection() {
  const { data: newCarArray } = useFetchNewCarArticles();
  const newCarArticles = newCarArray?.newCarArticles || [];

  return (
    <NewCarWrapper>
      <NewCarInnerBox>
        <NewCarLayoutContainer>
          <NewCarContentBox>
            <NewCarDescrip>신차 소개<IoIosArrowDroprightCircle size={24} /></NewCarDescrip>
            <NewCarCardLists>
              {
                newCarArticles.map((newcar) => (
                  <NewCarCardItem key={newcar.articleId}>
                    <article>
                      <NewCarImgBox src={newcar.articleBanner} alt="news-imgage" />
                      <NewCarTextBox className="newcar-text-box">
                        <span className="newcar-category-name"><BsHash size={24} />New Car</span>
                        <h2 className="newcar-news-title">{newcar.articleTitle}</h2>
                      </NewCarTextBox>
                    </article>
                  </NewCarCardItem>
                ))
              }
            </NewCarCardLists>
          </NewCarContentBox>
        </NewCarLayoutContainer>
      </NewCarInnerBox>
    </NewCarWrapper >
  )
}

export default NewCarSection;