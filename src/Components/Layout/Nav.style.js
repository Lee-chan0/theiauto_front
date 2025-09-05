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

const TranslateContainer = styled.div`
  position: absolute;
  right: 64px;
  top : 50%;
  transform: translateY(-50%);

& > svg {
  cursor: pointer;
  color: ${({ $focusOut, $isHome, $isCategoryPage }) =>
    $isHome || $isCategoryPage
      ? $focusOut
        ? '#f2f2f2'
        : '#1a1a1a'
      : '#f2f2f2'};

    @media (max-width : 767px) {
      color : #f2f2f2;
    }
}

  & > .translate-list {
    opacity: ${({ $translateActive }) => $translateActive ? '1' : '0'};
    visibility: ${({ $translateActive }) => $translateActive ? 'visible' : 'hidden'};
    pointer-events: ${({ $translateActive }) => $translateActive ? 'auto' : 'none'};
    transition: opacity 0.5s, visibility 0.5s, transform 0.5s;
    position: absolute;
    left : 50%;
    top : 125%;
    transform: ${({ $translateActive }) =>
    $translateActive ? 'translateX(-50%) translateY(5%)' : 'translateX(-50%) translateY(-5%)'};
    border-radius: 4px;
    overflow: hidden;
    border : 1px solid rgba(0, 0, 0, 0.15);

    & > li {
      border-bottom : 1px solid rgba(0, 0, 0, 0.15);
      padding : 8px 24px;
      font-size: .9rem;
      font-weight: 500;
      cursor: pointer;
      text-align: center;
      background-color: ${({ theme }) => theme.neutral.gray0};
      transition: background-color 0.3s;

      &:hover {
        background-color: ${({ theme }) => theme.neutral.gray300};
      }

      &:nth-last-child(1) {
        border-bottom: none;
      }
    }
  }
`;

const NavContainer = styled.header`
  width: 100%;
  position: sticky;
  left: 0;
  right: 0;
  transition: background-color 0.3s, top 0.3s;
  z-index: 9999;

  ${({ $isMobile }) => !$isMobile && css`
    top: ${({ $scrollDirectionUp }) => ($scrollDirectionUp) ? '-80px' : '0px'};
  
    background-color: ${({ $isNewsPage, $isInstructionsPage, $isMagazinePage, $isSearchPage, $isHome, $isCategoryPage, $focusOut, $isClickNavigation, theme }) => {
      if ($isNewsPage || $isInstructionsPage || $isMagazinePage || $isSearchPage) {
        return theme.neutral.gray900;
      }
      if ($isClickNavigation) {
        return 'rgba(242, 242, 242, 0.85)';
      }
      if (($isHome || $isCategoryPage) && $focusOut) {
        return theme.neutral.gray900;
      }
      return 'transparent';
    }};
  
    &:hover {
      ${({ $isNewsPage, $isInstructionsPage, $isMagazinePage, $isSearchPage, $isHome, $isCategoryPage, $focusOut, theme }) => {
      if ($isNewsPage || $isInstructionsPage || $isMagazinePage || $isSearchPage || $focusOut) {
        return `background-color: ${theme.neutral.gray900}`;
      }
      if ($isHome || $isCategoryPage) {
        return 'background-color: rgba(242, 242, 242, 0.85)';
      }
    }}
    }
  `}

  @media (max-width : 767px) {
    background-color: ${({ theme }) => theme.neutral.gray900};
    /* position: ${({ $isNewsPage }) => $isNewsPage ? 'sticky' : 'fixed'};
    top: 0; */
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
  
  & > .mobile-logo-box {
    width: 100%;
    
    & > .main-logo {
      width: 80px;
      height: 20px;
    }
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
    
    justify-content: center;
    gap: 0;
    
    & > .main-logo {
      display: none; 
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
  
  // 스크롤에 따른 움직임 로직 추가
  transition: transform 0.3s;
  transform: translateY(${({ $scrollDirectionUp }) => ($scrollDirectionUp) ? '100%' : '0'});
  
  @media (max-width : 767px) {
    display: flex;
  }
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
  gap : 4px;
`;

const ChildItem = styled(motion.li)`
  background-color: ${({ theme }) => theme.neutral.gray900};
  color : ${({ theme }) => theme.neutral.gray100};
  width: fit-content;
  padding : 8px 24px;
  border-radius: 2px;
  font-size: .85rem;
  font-weight: bold;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.5);
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
  MobileMenu, MenuCircle, CircleClickItem, CircleClickNav, HomeMenu, MenuBox, Menulist, MenuItem, ChildItem, ChildList,
  TranslateContainer
};