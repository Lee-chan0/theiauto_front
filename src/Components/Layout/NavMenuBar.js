import styled from "styled-components";
import { BiSearchAlt2 } from "react-icons/bi";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useScrollStickyState } from "../Hooks/Context/ScrollAndStickyCheckContext";
import { RiTranslateAi } from "react-icons/ri";
import { useMediaQuery } from "react-responsive";

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > .ad-container {
    width: 486px;
    height: 60px;
    overflow: hidden;
    display: flex;
    justify-content: center;

    @media (max-width : 1180px) {
      display: none;
    }

    & > a {
      & > img {
        cursor: pointer;
      }
    }

  }
`;

const BoxList = styled.ul`
    height: 100%;
    display: flex;
    gap : 40px;
`;

const BoxItem = styled.li`
    flex-shrink: 0;
    transition: color 0.3s;
    color : ${({ theme, $isClickNavigation, $item, $isHome, $focusOut }) =>
    ($isClickNavigation && $item === '메뉴' && $isHome && !$focusOut) ? theme.neutral.gray900 : theme.neutral.gray0};
    font-size: 1rem;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.7);
    height: 100%;
    cursor: pointer;
    display: flex;
    align-items: center;
    font-weight: ${({ $isClickNavigation, $item }) => ($isClickNavigation && $item === '메뉴') && 'bold'};

    @media (max-width : 1279px) {
      font-size: .9rem;
    }
`;

const SearchContainer = styled.div`
  position: relative;

  & > svg {
    position: absolute;
    right: 12px;
    top : 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
`;

const SearchInput = styled.input`
  height: 40px;
  border-radius: 99px;
  padding : 0 24px;
  padding-right : 40px;
  font-size: .9rem;
  border : none;
  outline: none;
  will-change: transform, box-shadow;
  box-shadow: ${({ $isSearch }) => $isSearch ? '0 0 20px 0px rgba(0, 0, 0, 0.35)' : '0 0 0 0 rgba(0, 0, 0, 0)'}; 
  transform: ${({ $isSearch }) => $isSearch ? 'scale(1.02)' : 'scale(1)'};
  transition: box-shadow 0.3s, transform 0.3s;
`;

const TranslateContainer = styled.div`
  width: 24px;
  height: 24px;
  position: absolute;
  right : -64px;
  top : 50%;
  transform: translateY(-50%);

  @media (max-width : 1320px) {
    left : -40px;
  }

  @media (max-width : 1279px) {
    left : -40px;
  }

  @media (max-width : 1060px) {
    left : -40px;
  }

  @media (max-width : 767px) {
    width: 20px;
    height: 20px;
  }

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

const menuItems = ['안내', '메뉴'];

const translateItem = [
  { label: '한국어', code: 'ko' },
  { label: 'English', code: 'en' },
  { label: '日本語', code: 'ja' },
];

function NavMenuBar({ isClickNavigation, setIsClickNavigation,
  searchText, onChange, onKeyDown, adLists, currentAd, handleClickAd,
  translateActive, setTranslateActive, isHome, isCategoryPage
}) {
  const [isSearch, setIsSearch] = useState(false);
  const { focusOut } = useScrollStickyState();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const navigate = useNavigate();
  const translateRef = useRef(null);

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
  }, [setTranslateActive]);

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
    <MainContainer>
      <ContentContainer>
        <BoxList>
          {
            menuItems.map((item, i) => (
              <BoxItem
                $isClickNavigation={isClickNavigation}
                $isHome={isHome}
                $item={item}
                $focusOut={focusOut}
                key={i}
                onClick={() => {
                  if (item === '메뉴') {
                    setIsClickNavigation((prev) => !prev);
                  } else if (item === '안내') {
                    navigate('/instructions');
                    setIsSearch(false);
                  }
                }}>{item}</BoxItem>
            ))
          }
        </BoxList>
        {
          adLists.length !== 0 &&
          <div className="ad-container">
            {
              currentAd
                ?
                <a href={currentAd.redirectUrl} target="_blank" rel="noreferrer" onClick={() => handleClickAd(currentAd.advertisementId)}>
                  <img
                    src={currentAd.advertisementImageUrl}
                    alt={currentAd.advertisementTitle}
                  />
                </a>
                :
                adLists?.length !== 0
                &&
                <a href={adLists[0].redirectUrl} target="_blank" rel="noreferrer" onClick={() => handleClickAd(adLists[0].advertisementId)}>
                  <img src={adLists[0].advertisementImageUrl} alt={adLists[0].advertisementTitle} />
                </a>
            }
          </div>
        }
        <SearchContainer>
          <TranslateContainer
            ref={translateRef}
            $translateActive={translateActive}
            $focusOut={focusOut}
            $isHome={isHome}
            $isCategoryPage={isCategoryPage}
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
          <SearchInput
            type="text"
            placeholder='어떤 기사를 찾고 계신가요?'
            $isSearch={isSearch}
            value={searchText}
            onChange={onChange}
            onKeyDown={onKeyDown}
            onFocus={() => setIsSearch(true)}
            onBlur={() => setIsSearch(false)}
          />
          <BiSearchAlt2 size={24} color="#1a1a1a" />
        </SearchContainer>
      </ContentContainer>
    </MainContainer>
  )
}

export default NavMenuBar;