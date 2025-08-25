import { useNavigate } from "react-router-dom";
import { useCategoryRedirect } from "../../Hooks/CommonHooks/useCategoryRedirect";
import {
  NewCarInnerBox, NewCarWrapper, NewCarDescrip, NewCarContentBox,
  NewCarImageBox, NewCarImageTextBox, NewCarLists, NewCarItems, NewCarTextBox,
  NewCarItemContainer,
  MobileImageBox
} from "./NewCarSection.style";
import { useEffect, useState } from "react";
import GoToCategoryBtn from "../../Features/GoToCategoryBtn/GoToCategoryBtn";
import { formatDateOnly } from "../../Hooks/Utils/formatDateOnly";
import { useMediaQuery } from "react-responsive";

function NewCarSection({ newCarArticles, isError, isLoading }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeItem, setActiveItem] = useState([]);
  const { goToCategory } = useCategoryRedirect(newCarArticles);
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 767 });


  useEffect(() => {
    if (newCarArticles?.length === 0) return;

    const filterArticle = newCarArticles.filter((_, i) => i === activeIndex);
    setActiveItem(filterArticle);
  }, [newCarArticles, activeIndex]);

  useEffect(() => {
    if (isError) {
      navigate('/error');
    }
  }, [isError, navigate]);

  if (isError) return null;

  if (isLoading) return null;

  return (
    <NewCarWrapper>
      <NewCarInnerBox>
        <NewCarDescrip>
          <span>{isMobile ? '신차' : 'New Car [신차]'}</span>
          <GoToCategoryBtn onClick={goToCategory} />
        </NewCarDescrip>
        <NewCarContentBox>
          <NewCarImageBox
            data-aos='fade'
            onClick={() => {
              if (activeItem.length !== 0) {
                navigate(`/news/${activeItem[0].articleId}`);
              }
            }}
          >
            {
              activeItem.length !== 0 &&
              activeItem.map((item, i) => (
                <NewCarItemContainer key={i}>
                  <img src={item.articleBanner} alt='new-car-image' />
                  <NewCarImageTextBox>
                    <span>{item.category.categoryName}</span>
                    <h1>{item.articleTitle}</h1>
                    <h2>{item.articleSubTitle}</h2>
                  </NewCarImageTextBox>
                </NewCarItemContainer>
              ))
            }
          </NewCarImageBox>
          <NewCarLists>
            {
              !isMobile ?
                newCarArticles?.map((newcar, i) => (
                  <li
                    style={{ width: '100%', height: '100%' }}
                    data-aos='fade-left'
                    data-aos-delay={`${i * 100}`}
                    key={newcar?.articleId}
                  >
                    <NewCarItems
                      onClick={() => setActiveIndex(i)}
                      $isActive={i === activeIndex}
                    >
                      <NewCarTextBox>
                        <h1>{newcar?.articleTitle}</h1>
                        <span>{newcar?.createdAt && formatDateOnly(newcar?.createdAt)}</span>
                      </NewCarTextBox>
                    </NewCarItems>
                  </li>
                ))
                :
                newCarArticles?.slice(0, 4).map((newcar, i) => (
                  <li
                    style={{ width: '100%', height: '64px' }}
                    data-aos='fade-left'
                    data-aos-delay={`${i * 100}`}
                    key={newcar?.articleId}
                    onClick={() => navigate(`/news/${newcar?.articleId}`)}
                  >
                    <NewCarItems
                      onClick={() => setActiveIndex(i)}
                      $isActive={i === activeIndex}
                    >
                      <MobileImageBox src={newcar?.articleBanner} alt='newcar-image' />
                      <NewCarTextBox>
                        <h1>{newcar?.articleTitle}</h1>
                        <span>{newcar?.createdAt && formatDateOnly(newcar?.createdAt)}</span>
                      </NewCarTextBox>
                    </NewCarItems>
                  </li>
                ))
            }
          </NewCarLists>
        </NewCarContentBox>
      </NewCarInnerBox>
    </NewCarWrapper >
  )
}

export default NewCarSection;