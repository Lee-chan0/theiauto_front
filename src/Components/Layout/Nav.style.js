import { motion } from "framer-motion";
import styled, { css } from "styled-components";

const ClickNavigation = styled.div`
  position: absolute;
  top : 100%;
  width: 100%;
  max-height: ${({ $isClickNavigation }) => $isClickNavigation ? '280px' : '0'};
  background-color : ${({ $isHome, $isCategoryPage, $focusOut }) => (($isHome || $isCategoryPage) && !$focusOut) ? ' rgba(242, 242, 242, 0.85)' : `rgba(26, 26, 26, 0.9)`};
  transition: max-height 0.3s, background-color 0.3s;
  overflow : hidden;
`;

const MoveNavLists = styled.ul`
  position: absolute;
  bottom : 8px;
  right: 8px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding : 4px 8px;
  gap : 24px;
  border-radius: 8px;
`;

const MoveNavItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;

  & > a {

    & > svg {
      &:hover {
        opacity: 0.6;
      }
    }
  }
`;

const ClickInnerBox = styled.div`
  max-width: 1280px;
  margin : 0 auto;
  padding : 24px 40px;

  @media (max-width : 1279px) {
    padding : 16px 24px;
  }
`;

const ClickNavigationMenus = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(8, 1fr);

  @media (max-width : 1279px) {
    gap : 8px;
  }
`;

const ClickNavigationItem = styled.li`
  text-align: center;
  font-weight: 400;
  color : ${({ $isHome, $isCategoryPage, $focusOut, theme }) => (($isHome || $isCategoryPage) && !$focusOut) ? theme.neutral.gray900 : theme.neutral.gray0};

  @media (max-width : 1279px) {
    font-size: .9rem;
  }
`;

const ClickChildList = styled.ul`
  margin-top : 24px;
  display: flex;
  flex-direction: column;
  gap : 24px;
`;

const ClickChildItem = styled.li`
  font-size: .9rem;
  font-weight: 300;
  cursor: pointer;
  will-change: transform;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.15);
    font-weight: 500;
  }

  @media (max-width : 1279px) {
    font-size: .8rem;
  }
`;

const NavContainer = styled.header`
  width: 100%;
  position: sticky;
  left : 0; right : 0;
  transition: background-color 0.3s, top 0.3s;
  z-index: 9999;

  ${({ $isHome, $isCategoryPage, $isMobile }) =>
    (($isHome || $isCategoryPage) && !$isMobile) ?
      css`
        top : ${({ $scrollDirectionUp }) => ($scrollDirectionUp) ? '-80px' : '0px'};

        background-color: ${({ $isClickNavigation, $focusOut, theme }) =>
          ($isClickNavigation) ? 'rgba(242, 242, 242, 0.85)' : ($focusOut) && theme.neutral.gray900};

        &:hover {
          background-color: ${({ theme, $focusOut }) => !$focusOut ? 'rgba(242, 242, 242, 0.85)' : theme.neutral.gray900};
  }
      `
      :
      css`
        top : ${({ $scrollDirectionUp }) => ($scrollDirectionUp) ? '-80px' : '0px'};
        background-color: ${({ theme }) => theme.neutral.gray900};
      `
  }


  @media (max-width : 767px) {
    position: sticky;
    left : 0; right : 0;
    top : ${({ $scrollDirectionUp }) => $scrollDirectionUp ? '-48px' : '0px'};
    background-color: ${({ theme }) => theme.neutral.gray900};
    transition : top 0.3s;
  }
`;

const NavInnerBox = styled.div`
  max-width: 1280px;
  height: 80px;
  padding : 0 40px;
  margin : 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap : 40px;

  & > .menu-handler {
    display: flex;
    align-items: center;
    gap : 6px;

    & > input {
      position: absolute;
      right : 0;
      border : 2px solid rgba(0, 0, 0, 0.2);
      outline: none;
      border-radius: 99px;
      background-color: ${({ theme }) => theme.neutral.gray100};
      padding : 0 8px;
      padding-right : 28px;
      width: ${({ $isActive }) => $isActive ? '180px' : '0'};
      height: 28px;
      font-size: .75rem;
      transition: width 0.3s, opacity 0.3s, visibility 0.3s;

      opacity: ${({ $isActive }) => $isActive ? '1' : '0'};
      visibility: ${({ $isActive }) => $isActive ? 'visible' : 'hidden'};
   
     &::placeholder {
        color : ${({ theme }) => theme.neutral.gray300};
        font-size: .75rem;
      } 
    }

    & > .search-bar {
      cursor: pointer;
      margin-right: 4px;
      z-index: 1;
    }
  }

  & > .main-logo {
    width: 148px;
    height: 36px;
    margin: 16px 0;
    cursor: pointer;
  }

  @media (max-width: 1279px) {
    max-width: 100%;
    padding : 0 24px;

    & > .main-logo {
      width: 120px;
      height: 30px;
    }
  }

  @media (max-width : 767px) {
    max-width: 100%;
    padding : 0 16px;
    height: 48px;

    & > .main-logo {
      width: 80px;
      height: 20px;
    }

    & > .ads-container {
      display: none;
    }
  }

  & > .ads-container {
    width: 486px;
    height: 60px;

    @media (max-width: 1279px) {
      width: 420px;
      height: 60px;
    }

    & > a {
      & > img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
      }
    }

    & > .ads-space-descrip {
      width: 100%;
      height: 100%;
      color : ${({ theme }) => theme.neutral.gray300};
      font-size: .9rem;
      cursor: pointer;

      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

const NavigationContainer = styled.div`
  @media (max-width : 767px) {
    display: none;
  }

  display: flex;
  align-items: center;
  gap : 20px;

  & > a {
    & > svg {
      cursor: pointer;
  
      &:hover {
        opacity: 0.8;
      }
    }
  }
`;

const MobileMenu = styled.div`
  position: fixed;
  height: 56px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(26, 26, 26, 1);
  z-index: 11000;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HomeMenu = styled.div`
    flex : 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & > span {
      color : ${({ theme }) => theme.neutral.gray100};
      font-size: 0.5rem;
    }
`;

const MenuBox = styled.div`
    flex : 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;

    & > span {
      color : ${({ theme }) => theme.neutral.gray100};
      font-size: 0.5rem;
    }
`;

const Menulist = styled.ul`
  position: absolute;
  bottom : ${({ $isActiveMobileMenu }) => $isActiveMobileMenu ? '110%' : '80%'};
  right : 5%;
  width: 156px;
  background-color: ${({ theme }) => theme.neutral.gray900};
  border-radius: 4px;
  box-shadow: 0 -1px 5px 1px rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  transition : opacity 0.3s, visibility 0.3s, bottom 0.3s;
  opacity: ${({ $isActiveMobileMenu }) => $isActiveMobileMenu ? '1' : '0'};
  visibility: ${({ $isActiveMobileMenu }) => $isActiveMobileMenu ? 'visible' : 'hidden'};
`;

const MenuItem = styled.li`
  padding : 0 16px;
  font-size: .9rem;
  color : ${({ theme }) => theme.neutral.gray100};
  width: 100%;
  height: 40px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  position: relative;
  transition: background-color 0.3s;
  
  background-color: ${({ theme, $parentCategoryId, $activeParentCategoryId }) =>
    $activeParentCategoryId === $parentCategoryId ? theme.primary.red500 : theme.neutral.gray900};
  font-weight: ${({ $parentCategoryId, $activeParentCategoryId }) =>
    $activeParentCategoryId === $parentCategoryId ? 'bold' : '400'};
`;

const ChildList = styled(motion.ul)`
  white-space: nowrap;
  position: absolute;
  top : 0;
  right : 102%;
  opacity: ${({ $activeParentCategoryId }) => $activeParentCategoryId ? '1' : '0'};
  visibility: ${({ $activeParentCategoryId }) => $activeParentCategoryId ? 'visible' : 'hidden'};

  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap : 8px;
`;

const ChildItem = styled(motion.li)`
  background-color: ${({ theme }) => theme.neutral.gray900};
  color : ${({ theme }) => theme.neutral.gray100};
  width: fit-content;
  padding : 8px;
  border-radius: 4px;
  font-size: .85rem;
  font-weight: bold;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.8);
`;

const MenuCircle = styled.div`
  width: 56px;
  height: 56px;
  background-color: ${({ theme }) => theme.neutral.gray900};
  border : 6px solid ${({ theme }) => theme.neutral.gray0};
  background-color : ${({ theme }) => theme.primary.red700};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s;
  ${({ $isCircleClick }) => $isCircleClick ? 'transform : translateY(-28px)' : 'transform : translateY(0)'};
  position: relative;

  & > svg {
    font-size: 1.4rem;
    color : #fff;
    transition: transform 0.3s;
    ${({ $isCircleClick }) => $isCircleClick ? 'transform : rotate(135deg)' : 'transform : rotate(0deg)'};
  }
`;

const CircleClickNav = styled(motion.ul)`
  position: absolute;
  bottom : 125%;
  display: flex;
  gap : 8px;
  transition: transform 0.6s;
  pointer-events: ${({ $isCircleClick }) => $isCircleClick ? 'auto' : 'none'};
`;

const CircleClickItem = styled(motion.li)`
  background-color: ${({ theme }) => theme.neutral.gray0};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  width: 40px;
  height: 40px;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.8);
  pointer-events: ${({ $isCircleClick }) => $isCircleClick ? 'auto' : 'none'};

  &:nth-child(1) {
    transform : translateY(24px);
  }

  &:nth-child(2) {
    transform : translate(-4px, -12px);
  }

  &:nth-child(3) {
    transform : translate(4px, -12px);
  }

  &:nth-last-child(1) {
    transform: translateY(24px);
  }
  
  & > a {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 9999px;

    padding : 8px;

    & > svg {
      
    }
  }
`;

export {
  NavContainer, NavInnerBox, NavigationContainer, MoveNavLists, MoveNavItem,
  ClickNavigation, ClickNavigationMenus, ClickNavigationItem, ClickInnerBox, ClickChildItem, ClickChildList,
  MobileMenu, MenuCircle, CircleClickItem, CircleClickNav, HomeMenu, MenuBox, Menulist, MenuItem, ChildItem, ChildList
};