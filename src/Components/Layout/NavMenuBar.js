import styled from "styled-components";
import { BiSearchAlt2 } from "react-icons/bi";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useScrollStickyState } from "../Hooks/Context/ScrollAndStickyCheckContext";
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

    @media (max-width : 1024px) {
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
    display: ${({ $layoutHelper, $item }) => ($layoutHelper && $item === '회사소개') && 'none'};

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

const menuItems = ['안내', '메뉴'];

function NavMenuBar({ isClickNavigation, setIsClickNavigation, searchText, onChange, onKeyDown, adLists, currentAd, handleClickAd }) {
  const [isSearch, setIsSearch] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/' ? true : false;
  const { focusOut } = useScrollStickyState();
  const navigate = useNavigate();
  const layoutHelper = useMediaQuery({ maxWidth: 1130 });

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
                $layoutHelper={layoutHelper}
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