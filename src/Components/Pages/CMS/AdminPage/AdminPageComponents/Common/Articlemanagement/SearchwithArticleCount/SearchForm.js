import styled from "styled-components";
import { useFetchCategories } from "../../../../../../../Hooks/ApiHooks/Category/useFetchCategories";
import { useEffect, useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { BiRefresh } from "react-icons/bi";

const SearchFormContainer = styled.form`
  position: absolute;
  z-index: 11;
  top : 24px;
  right : 32px;
  left : 32px;
  display : flex;
  flex-wrap: wrap;
  justify-content: center;
  padding : 24px 40px;
  backdrop-filter: blur(5px);
  border-radius: 4px;
  border : 2px solid ${({ theme }) => theme.primary.red500};
  opacity: ${({ $isActive }) => $isActive ? '1' : '0'};
  visibility: ${({ $isActive }) => $isActive ? 'visible' : 'hidden'};
  transition: opacity 0.3s, visibility 0.3s;
`;

const SelectCategoryLists = styled.ul`
  width: 100%;
  list-style: none;
  display : grid;
  gap : 8px 4px;
  grid-template-columns: repeat(8, 1fr);
  grid-auto-rows: 40px;
  padding: 0;
  margin: 0;
  margin-bottom: 40px;
`;

const CategoryItem = styled.li`
  text-align: center;
  font-size: 0.8rem;
  display : flex;
  align-items: center;
  justify-content: center;
  padding : 4px 4px;
  border-radius: 3px;
  cursor: pointer;
  box-shadow: 0 0 5px 0px rgba(0, 0, 0, 0.5);
  transition : background-color 0.2s, color 0.2s;
  font-weight: 500;
  background-color: ${({ $index, $activeIndex, theme }) => $index === $activeIndex ? theme.primary.red500 : 'transparent'};
  color : ${({ $index, $activeIndex, theme }) => $index === $activeIndex ? theme.neutral.gray100 : theme.neutral.gray900};

  &:hover {
    background-color: ${({ theme }) => theme.primary.red500};
    color : #fff;
  }
`;

const SearchBarInput = styled.input`
  width: 100%;
  height: 40px;
  border : 3px solid ${({ theme }) => theme.primary.red500};
  outline: none;
  border-radius: 9999px;
  padding : 0 56px 0 16px;
`;

const SearchRangeDescrip = styled.span`
  position : absolute;
  height: 20px;
  left : 0;
  top : -24px;
  font-weight: 300;
  font-size: 0.8rem;
  color : ${({ theme }) => theme.neutral.gray600};
  display : flex;
  align-items : center;

  svg {
    cursor: pointer;

    &:hover {
      color : #000;
    }
  }
`;

const ReloadBox = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  transition: transform 0.3s;
  transform : ${({ $reloadRotate }) => `rotate(${$reloadRotate}deg)`};
`;

function SearchForm({ isActive, setIsSearchBarActive }) {
  const [searchValues, setSearchValues] = useState({
    categoryId: "none",
    searchQuery: "",
  });
  const [reloadRotate, setReloadRotate] = useState(0);
  const [selectedCategoryName, setSelectedCategoryName] = useState("전체");
  const [childCategory, setChildCategory] = useState([]);
  const { data: categories } = useFetchCategories();
  const navigate = useNavigate();

  const handleKeyCheck = (e) => {

    const value = searchValues.searchQuery;
    if (e.key === 'Enter') {
      e.preventDefault();
      if (value.trim() === "") {
        alert('검색어는 한 글자 이상으로 작성해주세요.');
        return;
      } else {
        e.preventDefault();
        setIsSearchBarActive(false);
        setSelectedCategoryName("전체");
        navigate(`?query=${encodeURIComponent(searchValues.searchQuery)}&category=${searchValues.categoryId}&page=1`);
        setSearchValues({ searchQuery: "", categoryId: "none" })
      }
    }
  }

  const handleValueChange = (e) => {
    setSearchValues((prev) => ({
      ...prev,
      searchQuery: e.target.value
    }))
  };

  const handleClickCateogry = (e, id, name) => {
    setSearchValues((prev) => ({
      ...prev,
      categoryId: id
    }));
    setSelectedCategoryName(name);
  };

  const handleClickSearch = (e) => {
    const value = searchValues.searchQuery;
    if (value.trim() === "") {
      alert('검색어는 한글자 이상 작성해주세요.');
      return;
    } else {
      setIsSearchBarActive(false);
      setSelectedCategoryName("전체");
      navigate(`?query=${encodeURIComponent(searchValues.searchQuery)}&category=${searchValues.categoryId}`);
      setSearchValues({ searchQuery: "", categoryId: "none" });
    }
  }

  const handleClickReload = () => {
    if (searchValues.searchQuery || searchValues.categoryId !== "none") {
      setSearchValues({ searchQuery: "", categoryId: "none" });
      setSelectedCategoryName("전체");
      setReloadRotate((prev) => prev + -360);
    }
  }

  useEffect(() => {
    if (!categories) return;

    const filterChild = categories?.categories.filter((category) => category.parentCategoryId);

    setChildCategory(filterChild);
  }, [categories]);

  return (
    <SearchFormContainer $isActive={isActive} onKeyDown={handleKeyCheck}>
      <SelectCategoryLists>
        {
          childCategory.map((child) => (
            <CategoryItem
              key={child.categoryId}
              onClick={(e) => handleClickCateogry(e, child.categoryId, child.categoryName)}
              $index={child.categoryId}
              $activeIndex={searchValues.categoryId}
            >
              {child.categoryName}
            </CategoryItem>
          ))
        }
      </SelectCategoryLists>
      <div style={{ width: '100%', position: 'relative' }}>
        <SearchRangeDescrip>
          현재 검색 범위 : <strong>{selectedCategoryName ? selectedCategoryName : '전체'}</strong>
          <ReloadBox
            onClick={handleClickReload}
            style={{ position: 'absolute', top: '0', right: '-20px' }}
            $reloadRotate={reloadRotate}
          >
            <BiRefresh size={16} />
          </ReloadBox>
        </SearchRangeDescrip>
        <SearchBarInput
          type="text"
          value={searchValues.searchQuery}
          onChange={handleValueChange} />
        <BiSearchAlt2
          style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', cursor: "pointer" }}
          size={24}
          color='black'
          onClick={handleClickSearch}
        />
      </div>
    </SearchFormContainer>
  )
}

export default SearchForm;