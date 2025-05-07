import styled from "styled-components";
import { useFetchCategories } from "../../Hooks/ApiHooks/Category/useFetchCategories";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import MenuDropDown from "./MenuDropDown/MenuDropDown";
import stickyLogo from '../../../Assets/theiautoLogoWhite.png';

const MenuBarWrapper = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.neutral.gray900};
  position: sticky;
  top : 0;
  z-index: 9999;
`;

const MenuBarInner = styled.nav`
  max-width: 1280px;
  margin : 0 auto;
  padding : 0 40px;
`;

const MenuBarList = styled.ul`
  display: grid;
  grid-template-columns: ${({ $isSticky }) => $isSticky ? 'repeat(10, 1fr)' : 'repeat(9, 1fr)'};
  gap : ${({ $isSticky }) => $isSticky ? '4px' : '0'};
  place-items: center;

  & > .logo-white {
    width: 100px;
    height: 25px;
    cursor: pointer;
  }
`;

const MenuBarItem = styled.li`
  width: 100%;
  color : ${({ theme }) => theme.neutral.gray100};
  cursor: pointer;
  height: 48px;
  display : flex;
  align-items: center;
  justify-content: center;

  position : relative;

  &::after {
    content: "";
    position : absolute;
    bottom : 0;
    width: 100%;
    height: 4px;
    background-color: ${({ theme }) => theme.primary.red700};
    opacity: 0;
    transition: opacity 0.5s ease;
  }

  &:hover {
    &::after {
      opacity: 1;
    }
  }
`;

function NavigationMenuBar() {
  const stickyCheckRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);
  const [parentCategories, setParentCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const { data: categoryArray } = useFetchCategories();
  const categories = useMemo(() => categoryArray?.categories || [], [categoryArray]);

  useEffect(() => {
    if (categories.length === 0) return;

    const filterParent = categories.filter((category) => !category.parentCategoryId);
    setParentCategories(filterParent);

  }, [categories]);

  useEffect(() => {
    const target = stickyCheckRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => setIsSticky(!entry.isIntersecting),
      { threshold: [1] }
    );

    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, []);

  return (
    <>
      <div ref={stickyCheckRef} style={{ height: '1px', backgroundColor: '#1a1a1a' }} />
      <MenuBarWrapper>
        <MenuBarInner>
          <MenuBarList $isSticky={isSticky}>
            {isSticky && <img src={stickyLogo} alt="logo-white" className="logo-white" />}
            {
              parentCategories.map((category, index) => (
                <React.Fragment key={category.categoryId}>
                  <MenuBarItem
                    onMouseEnter={() => {
                      setActiveCategory(category.categoryId)
                      setActiveIndex(index)
                    }}
                    onMouseLeave={() => {
                      setActiveCategory(null)
                      setActiveIndex(null)
                    }}
                  >
                    {category.categoryName}
                    {activeIndex === index && <MenuDropDown categoryId={activeCategory} categories={categories} />}
                  </MenuBarItem>
                </React.Fragment>
              ))
            }
            <MenuBarItem>
              <BiSearchAlt2 size={24} color="#f2f2f2" style={{ cursor: 'pointer' }} />
            </MenuBarItem>
          </MenuBarList>
        </MenuBarInner>
      </MenuBarWrapper>
    </>
  )
}

export default NavigationMenuBar;