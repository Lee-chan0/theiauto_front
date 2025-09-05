import styled from "styled-components";
import { BsFilterRight } from "react-icons/bs";
import SearchForm from "./SearchForm";
import { useMediaQuery } from "react-responsive";
import { BiSearchAlt2 } from "react-icons/bi";

const Container = styled.div`
  width: 100%;
  display : flex;
  padding : 0 32px;
  margin-top : 40px;
  justify-content: space-between;
  position: relative;

  & > .search-bar {

    &:hover {
      text-decoration: underline;
    }
  }

  @media (max-width : 767px) {
    padding : 0 16px;
    margin-top: 16px;
  }
`;

const ArticleCount = styled.span`
  font-size : 0.9rem;
  font-weight: 500;
  color : ${({ theme }) => theme.neutral.gray600};

  @media (max-width : 767px) {
    font-size: .75rem;
  }
`;

const SearchDescrip = styled.span`
  font-size: 0.9rem;
  color : ${({ theme }) => theme.neutral.gray600};

  @media (max-width : 767px) {
    font-size: .75rem;
  }
`;

function SearchWithArticleCount({ total: articleTotal, categoryName, query,
  needImportant, setIsSearchBarActive, isSearchBarActive, isBanner }) {
  const total = articleTotal || articleTotal === 0 ? articleTotal : '';
  const isMobile = useMediaQuery({ maxWidth: 767 });

  function insertEveryThreeFromEnd(str, separator = ",") {
    const arr = str.split("").reverse();
    let result = [];

    for (let i = 0; i < arr.length; i++) {
      if (i > 0 && i % 3 === 0) result.push(separator);
      result.push(arr[i]);
    }

    return result.reverse().join("");
  };

  const handleClickSearchBar = () => {
    setIsSearchBarActive((prev) => !prev);
  }

  return (
    <Container>
      {(!query && !needImportant) ?
        <ArticleCount>
          {
            categoryName !== '전체' ? categoryName
              : (isBanner === 'true' && categoryName === '전체') ? '배너' : '전체'
          } 총 기사 수 : {insertEveryThreeFromEnd(String(total))} 개
        </ArticleCount>
        :
        !needImportant ?
          <ArticleCount>
            "{query}"에 대한 검색 결과 : {insertEveryThreeFromEnd(String(total))} 개
          </ArticleCount>
          :
          <ArticleCount>
            중요한 기사 : {insertEveryThreeFromEnd(String(total))} 개
          </ArticleCount>
      }
      <div
        className="search-bar"
        style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
        onClick={handleClickSearchBar}
      >
        {
          !isMobile ?
            <BsFilterRight size={19} color="#666666" />
            :
            <BiSearchAlt2 size={17} color="#666666" />
        }
        {!isMobile && <SearchDescrip>{'검색 필터'}</SearchDescrip>}
      </div>
      <SearchForm
        setIsSearchBarActive={setIsSearchBarActive}
        isActive={isSearchBarActive}
      />
    </Container>
  )
}

export default SearchWithArticleCount;