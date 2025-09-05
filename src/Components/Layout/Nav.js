// Nav.jsx
import { useLocation, useNavigate } from 'react-router-dom';
import logoWhite from '../../Assets/theiautoLogoWhite.png';
import logoBlack from '../../Assets/theiautoLogoB_NoS.png';
import {
  MobileMenu, NavContainer, NavInnerBox, MenuCircle, CircleClickNav,
  CircleClickItem, HomeMenu, MenuBox, Menulist, MenuItem, ChildList, ChildItem,
  ClickNavigation,
  ClickNavigationMenus,
  ClickNavigationItem,
  ClickInnerBox,
  ClickChildList,
  ClickChildItem,
  MoveNavLists,
  MoveNavItem,
  TranslateContainer,
} from './Nav.style';
import { RiTranslateAi } from "react-icons/ri";
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchNavAd, patchClickCount } from '../../API/generalAPI/generalAdvertisement.api';
import useCarousel from '../Hooks/CommonHooks/useCarousel';
import { FaYoutube } from "react-icons/fa";
import { SiTistory } from "react-icons/si";
import { SiNaver } from "react-icons/si";
import { FaFacebookSquare } from "react-icons/fa";
import { useMediaQuery } from 'react-responsive';
import { BiSearchAlt2 } from "react-icons/bi";
import { useEffect, useMemo, useRef, useState } from 'react';
import { useFetchCategories } from '../Hooks/ApiHooks/Category/useFetchCategories';
import { FaPlus } from "react-icons/fa";
import { AiOutlineHome } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";
import { BiCategory } from "react-icons/bi";
import NavMenuBar from './NavMenuBar';
import { useScrollStickyState } from '../Hooks/Context/ScrollAndStickyCheckContext';

// 'staggerChildren'을 제거하고 부모 컴포넌트가 전체 애니메이션을 담당하도록 수정
const categoryListVariants = {
  hidden: { opacity: 0, x: 15 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5, // 부드럽게 나타나는 시간 설정
    }
  }
};

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    }
  }
};

const itemVariants = {
  hidden: (i) => {
    switch (i) {
      case 0:
        return { opacity: 0, y: 40 };
      case 1:
        return { opacity: 0, x: -4, y: 12 };
      case 2:
        return { opacity: 0, x: 4, y: 12 };
      case 3:
        return { opacity: 0, y: 40 };
      default:
        return { opacity: 0 };
    }
  },
  visible: (customIndex) => {
    switch (customIndex) {
      case 0:
        return { opacity: 1, y: 24, transition: { duration: 0.5 } };
      case 1:
        return { opacity: 1, x: -4, y: -12, transition: { duration: 0.5 } };
      case 2:
        return { opacity: 1, x: 4, y: -12, transition: { duration: 0.5 } };
      case 3:
        return { opacity: 1, y: 24, transition: { duration: 0.5 } };
      default:
        return { opacity: 1, transition: { duration: 0.5 } };
    }
  }
};

// CHANGED: label + code를 함께 관리 (index key, 하드코딩 제거)
const translateItem = [
  { label: '한국어', code: 'ko' },
  { label: 'English', code: 'en' },
  { label: '日本語', code: 'ja' },
];

function Nav() {
  const { data: adArray } = useQuery({
    queryKey: ['advertisement-nav'],
    queryFn: fetchNavAd
  });
  const [searchText, setSearchText] = useState("");
  const [isActive, setIsActive] = useState(false);
  const updateClickMutation = useMutation({
    mutationFn: patchClickCount
  });

  const location = useLocation();
  const navigate = useNavigate();

  const isPage = useMemo(() => {
    const { pathname } = location;
    return {
      isHome: pathname === '/',
      isCategoryPage: pathname.includes('/category/'),
      isNewsPage: pathname.includes('/news/'),
      isInstructionsPage: pathname.includes('/instructions'),
      isMagazinePage: pathname.includes('/magazine/subscribe'),
      isSearchPage: pathname.includes('/search'),
    };
  }, [location]);
  const { data: categoryArray } = useFetchCategories();
  const categories = useMemo(() => categoryArray?.categories || [], [categoryArray]);
  const [parentCategories, setParentCategories] = useState([]);
  const [childCategories, setChildCategories] = useState([]);
  const [activeParentCategoryId, setActiveParentCategoryId] = useState(null);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [isCircleClick, setIsCircleClick] = useState(false);
  const [isActiveMobileMenu, setIsActiveMobileMenu] = useState(false);
  const hasParentCategories = parentCategories?.length > 0;
  const selectedParent = parentCategories?.find(item => item.categoryId === activeParentCategoryId);
  const childItems = childCategories?.filter(child => child.parentCategoryId === activeParentCategoryId);
  const hasChildItems = childItems?.length > 0;
  const [isClickNavigation, setIsClickNavigation] = useState(false);
  const { scrollDirectionUp, focusOut } = useScrollStickyState();
  const adLists = adArray?.ads || [];
  const currentAd = useCarousel(adLists.length > 1 ? adLists : [], 3000);
  const [translateActive, setTranslateActive] = useState(false);
  const translateRef = useRef(null);

  const handleClickMobileMenu = () => {
    setIsActiveMobileMenu((prev) => !prev);
    setActiveParentCategoryId(null);
    setIsCircleClick(false);
  };

  const handleClickParent = (categoryId) => {
    setActiveParentCategoryId(categoryId);
  };

  useEffect(() => {
    if (categories.length === 0) return;
    const filterParent = categories.filter((category) => !category.parentCategoryId);
    setParentCategories(filterParent);
  }, [categories]);

  useEffect(() => {
    if (categories.length === 0) return;
    const filterChild = categories.filter((child) => child.parentCategoryId);
    setChildCategories(filterChild);
  }, [categories]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (translateRef.current && !translateRef.current.contains(e.target)) {
        setTranslateActive(false);
      }
    }

    function handleScroll() {
      setTranslateActive(false);
    }

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClickCount = (adId) => {
    updateClickMutation.mutate(adId);
  };

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleBtnClick = (e) => {
    e.preventDefault();
    setIsActive(true);
    if (isActive) {
      if (searchText.trim() === "") {
        setIsActive(false);
      } else {
        navigate(`/search?keyword=${searchText}`);
        setIsActive(false);
        setSearchText("");
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (searchText.trim() === "") {
        setIsActive(false);
      } else {
        navigate(`/search?keyword=${searchText}`);
        setIsActive(false);
        setSearchText("");
      }
    }
  };

  const getLogoSrc = () => {
    if (isMobile) {
      return logoWhite;
    }

    if (isPage.isNewsPage || isPage.isInstructionsPage || isPage.isMagazinePage || isPage.isSearchPage) {
      return logoWhite;
    }

    if ((isPage.isHome || isPage.isCategoryPage) && !focusOut) {
      return logoBlack;
    }

    return logoWhite;
  };

  const getTranslateSelect = () => {
    return (
      document.querySelector('#google_translate_element select') ||
      document.querySelector('.goog-te-combo')
    );
  };

  const setCookie = (name, value, domain) => {
    let cookie = `${name}=${value}; path=/;`;
    const days = 7;
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    cookie += ` expires=${expires};`;
    if (domain && domain.indexOf('.') !== -1) {
      cookie += ` domain=.${domain};`;
    }
    document.cookie = cookie;
  };

  const changeLanguage = (targetCode) => {
    const select = getTranslateSelect();
    if (select) {
      select.value = targetCode;
      select.dispatchEvent(new Event('change'));
      return;
    }
    const v = `/ko/${targetCode}`;
    setCookie('googtrans', v);
    setCookie('googtrans', v, window.location.hostname);
    window.location.reload();
  };

  return (
    <>
      <NavContainer
        $isHome={isPage.isHome}
        $isCategoryPage={isPage.isCategoryPage}
        $isNewsPage={isPage.isNewsPage}
        $isInstructionsPage={isPage.isInstructionsPage}
        $isMagazinePage={isPage.isMagazinePage}
        $isSearchPage={isPage.isSearchPage}
        $isClickNavigation={isClickNavigation}
        $scrollDirectionUp={scrollDirectionUp}
        $focusOut={focusOut}
        $isMobile={isMobile}
      >
        {
          isMobile &&
          <TranslateContainer
            ref={translateRef}
            $translateActive={translateActive}
            $focusOut={focusOut}
            $isHome={isPage.isHome}
            $isCategoryPage={isPage.isCategoryPage}
          >
            <RiTranslateAi size={!isMobile ? 24 : 20} onClick={() => {
              setTranslateActive((prev) => !prev);
            }} />
            <ul className='translate-list'>
              {
                translateItem.map(({ label, code }) => (
                  <li key={code} onClick={() => changeLanguage(code)}>
                    <span>{label}</span>
                  </li>
                ))
              }
            </ul>
          </TranslateContainer>
        }
        {
          !isMobile &&
          <ClickNavigation
            $isHome={isPage.isHome}
            $isCategoryPage={isPage.isCategoryPage}
            $scrollDirectionUp={scrollDirectionUp}
            $isClickNavigation={isClickNavigation}
            $focusOut={focusOut}
            onMouseLeave={() => setIsClickNavigation(false)}>
            <MoveNavLists>
              <MoveNavItem title='더아이오토 네이버 블로그'>
                <a href='https://blog.naver.com/theiauto' target='_blank' rel='noreferrer'>
                  <SiNaver color={focusOut ? '#F2F2F2' : '#1a1a1a'} />
                </a>
              </MoveNavItem>
              <MoveNavItem title='더아이오토 티스토리 블로그'>
                <a href='https://motor01.tistory.com' target='_blank' rel='noreferrer'>
                  <SiTistory color={focusOut ? '#F2F2F2' : '#1a1a1a'} />
                </a>
              </MoveNavItem>
              <MoveNavItem title='더아이오토 유튜브'>
                <a href='https://www.youtube.com/@theiauto/shorts' target='_blank' rel='noreferrer'>
                  <FaYoutube color={focusOut ? '#F2F2F2' : '#1a1a1a'} size={22} />
                </a>
              </MoveNavItem>
              <MoveNavItem title='더아이오토 페이스북'>
                <a href='https://www.facebook.com/?locale=ko_KR' target='_blank' rel='noreferrer'>
                  <FaFacebookSquare color={focusOut ? '#F2F2F2' : '#1a1a1a'} size={20} />
                </a>
              </MoveNavItem>
            </MoveNavLists>
            <ClickInnerBox>
              <ClickNavigationMenus>
                {
                  parentCategories.map((parent) => (
                    <ClickNavigationItem
                      key={parent.categoryId}
                      $isHome={isPage.isHome}
                      $isCategoryPage={isPage.isCategoryPage}
                      $focusOut={focusOut}
                    >
                      {parent.categoryName}
                      <ClickChildList>
                        {
                          childCategories.filter((item) => item.parentCategoryId === parent.categoryId).map((child) => (
                            <ClickChildItem
                              key={child.categoryId}
                              onClick={() => {
                                navigate(`/category/${child.categoryId}`);
                                setIsClickNavigation(false);
                              }}
                            >
                              {child.categoryName}
                            </ClickChildItem>
                          ))
                        }
                      </ClickChildList>
                    </ClickNavigationItem>
                  ))
                }
              </ClickNavigationMenus>
            </ClickInnerBox>
          </ClickNavigation>
        }
        <NavInnerBox $isActive={isActive}>
          {
            isMobile &&
            <div className='mobile-logo-box'>
              <img
                src={getLogoSrc()}
                alt='logo'
                className='main-logo'
                onClick={() => {
                  navigate('/');
                  setActiveParentCategoryId(null);
                }} />
            </div>
          }
          {
            !isMobile &&
            <img
              src={getLogoSrc()}
              alt='logo'
              className='main-logo'
              onClick={() => {
                navigate('/');
                setActiveParentCategoryId(null);
              }} />
          }
          {
            !isMobile &&
            <NavMenuBar
              isClickNavigation={isClickNavigation}
              setIsClickNavigation={setIsClickNavigation}
              searchText={searchText}
              setSearchText={setSearchText}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              adLists={adLists}
              currentAd={currentAd}
              handleClickAd={handleClickCount}
              translateActive={translateActive}
              setTranslateActive={setTranslateActive}
              focusOut={focusOut}
              isHome={isPage.isHome}
              isCategoryPage={isPage.isCategoryPage}
            />
          }
          {
            isMobile &&
            <div className='menu-handler' style={{ position: 'relative' }}>
              <input
                type='text'
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                value={searchText}
                placeholder='검색어를 입력해주세요.'
              />
              <BiSearchAlt2
                size={22}
                color={isActive ? '#666666' : '#f2f2f2'}
                className='search-bar'
                onClick={handleBtnClick}
              />
            </div>
          }
        </NavInnerBox>
      </NavContainer>
      {
        isMobile &&
        <MobileMenu
          $scrollDirectionUp={scrollDirectionUp}
          onClick={() => {
            setActiveParentCategoryId(null);
          }}>
          <HomeMenu onClick={() => {
            setIsActiveMobileMenu(false);
            setActiveParentCategoryId(null);
            setIsCircleClick(false);
            navigate('/');
          }}>
            <AiOutlineHome color='#f2f2f2' size={24} />
            <span>HOME</span>
          </HomeMenu>
          <MenuCircle $isCircleClick={isCircleClick} onClick={() => {
            setIsCircleClick((prev) => !prev);
            setIsActiveMobileMenu(false);
            setActiveParentCategoryId(null);
          }}>
            <FaPlus />
            <CircleClickNav
              $isCircleClick={isCircleClick}
              variants={listVariants}
              initial="hidden"
              animate={isCircleClick ? 'visible' : 'hidden'}
            >
              <CircleClickItem
                custom={0}
                $isCircleClick={isCircleClick}
                variants={itemVariants}
              >
                <a href='https://blog.naver.com/theiauto' target='_blank' rel='noreferrer'>
                  <SiNaver color='#1a1a1a' />
                </a>
              </CircleClickItem>
              <CircleClickItem
                custom={1}
                $isCircleClick={isCircleClick}
                variants={itemVariants}
              >
                <a href='https://motor01.tistory.com' target='_blank' rel='noreferrer'>
                  <SiTistory color='#1a1a1a' />
                </a>
              </CircleClickItem>
              <CircleClickItem
                custom={2}
                $isCircleClick={isCircleClick}
                variants={itemVariants}
              >
                <a href='https://www.youtube.com/@theiauto/shorts' target='_blank' rel='noreferrer'>
                  <FaYoutube color='#1a1a1a' size={22} />
                </a>
              </CircleClickItem>
              <CircleClickItem
                custom={3}
                $isCircleClick={isCircleClick}
                variants={itemVariants}
              >
                <a href='https://www.facebook.com/?locale=ko_KR' target='_blank' rel='noreferrer'>
                  <FaFacebookSquare color='#1a1a1a' size={20} />
                </a>
              </CircleClickItem>
            </CircleClickNav>
          </MenuCircle>
          <MenuBox onClick={handleClickMobileMenu} >
            <Menulist $isActiveMobileMenu={isActiveMobileMenu}>
              {hasParentCategories && parentCategories.map((parent) => (
                <MenuItem
                  key={parent.categoryId}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClickParent(parent.categoryId);
                  }}
                  $parentCategoryId={parent.categoryId}
                  $activeParentCategoryId={activeParentCategoryId}
                >
                  <IoIosArrowBack />
                  {parent.categoryName}
                </MenuItem>
              ))}

              <ChildList
                key={activeParentCategoryId || 'none'}
                $activeParentCategoryId={activeParentCategoryId}
                variants={categoryListVariants}
                initial="hidden"
                animate={hasParentCategories && selectedParent?.categoryId === activeParentCategoryId ? 'visible' : 'hidden'}
              >
                {hasParentCategories && hasChildItems && activeParentCategoryId &&
                  childItems.map((child) => (
                    <ChildItem
                      key={child.categoryId}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveParentCategoryId(null);
                        setIsActiveMobileMenu(false);
                        navigate(`/category/${child.categoryId}`);
                      }}
                    >
                      {child.categoryName}
                    </ChildItem>
                  ))}
              </ChildList>
            </Menulist>
            <BiCategory color='#f2f2f2' size={24} />
            <span>MENU</span>
          </MenuBox>
        </MobileMenu>
      }
    </>
  );
}

export default Nav;
