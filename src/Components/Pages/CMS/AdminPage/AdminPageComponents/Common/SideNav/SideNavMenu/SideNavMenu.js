import { useCallback, useEffect, useMemo, useState } from "react";
import { useFetchCategories } from "../../../../../../../Hooks/ApiHooks/Category/useFetchCategories";
import {
  SideNavMenuContainer, SideNavMenuTitle, SubCategoryItems, childVariants, containerVariants,
  SideNavMenuTitleBox, SideNavMenuLists, SideNavMenuItems, SubCategoryItemsBox
} from "./SideNavMenu.style";
import { BiArrowFromLeft } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useSideNavState } from "../../../../../../../Hooks/Context/SideNavStateContext";

function SideNavMenu({ setIsSearchBarActive }) {
  const { data: categories } = useFetchCategories();
  const [parentCategories, setParentCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [isHover, setIsHover] = useState(false);
  const categoriesArray = useMemo(() => categories?.categories || [], [categories]);
  const { setNeedImportant } = useSideNavState();
  const navigate = useNavigate();

  const handleMouseClick = useCallback((categoryId, index) => {
    setActiveIndex(index);
    setIsHover(true);

    const filterSubCategories = categoriesArray.filter((subCategory) => subCategory.parentCategoryId === categoryId);
    setSubCategories(filterSubCategories);

  }, [categoriesArray]);

  const handleClickCategory = (categoryId) => {
    setNeedImportant(false);
    setIsSearchBarActive(false);
    navigate(`/theiautoCMS/adminpage?category=${categoryId}&page=1`);
  }

  const handleClickImportantArticle = () => {
    setNeedImportant(true);
    setIsSearchBarActive(false);
    navigate('/theiautoCMS/adminpage?query=&category=none&page=1&isImportant=true');
  }

  useEffect(() => {
    const filterParentCategory = categoriesArray.filter((category) => !category.parentCategoryId);
    setParentCategories(filterParentCategory);
  }, [categoriesArray]);

  return (
    <SideNavMenuContainer>
      <SideNavMenuTitleBox>
        <SideNavMenuTitle>카테고리</SideNavMenuTitle>
        <SideNavMenuLists>
          {
            parentCategories.map(({ categoryId, categoryName }, index) => (
              <SideNavMenuItems
                key={categoryId}
                onClick={() => handleMouseClick(categoryId, index)}
              >
                {categoryName}
                <BiArrowFromLeft
                  size={18}
                  className={activeIndex === index && subCategories.length !== 0 && isHover ? "active" : ""}
                />
                {activeIndex === index && subCategories.length !== 0 &&
                  <SubCategoryItemsBox
                    variants={containerVariants}
                    initial="hidden"
                    animate={isHover ? "visible" : "hidden"}
                    onMouseLeave={() => setIsHover(false)}
                    style={!isHover && { pointerEvents: 'none' }}
                  >
                    {
                      subCategories.map(({ categoryId, categoryName }) => (
                        <SubCategoryItems
                          key={categoryId}
                          variants={childVariants}
                          onClick={() => handleClickCategory(categoryId)}
                        >{categoryName}</SubCategoryItems>
                      ))
                    }
                  </SubCategoryItemsBox>
                }
              </SideNavMenuItems>
            ))
          }
        </SideNavMenuLists>
        <SideNavMenuTitle style={{ marginTop: '16px' }}>옵션</SideNavMenuTitle>
        <span onClick={handleClickImportantArticle}>중요한 기사</span>
        <span>배너 기사</span>
      </SideNavMenuTitleBox>
    </SideNavMenuContainer>
  )
}

export default SideNavMenu;