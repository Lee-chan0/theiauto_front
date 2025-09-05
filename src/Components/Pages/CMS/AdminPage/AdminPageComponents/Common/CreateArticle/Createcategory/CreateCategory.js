import { useCallback, useEffect, useMemo, useState } from 'react';
import { useFetchCategories } from '../../../../../../../Hooks/ApiHooks/Category/useFetchCategories';
import {
  CreateCategoryContainer, CreateCategoryChild,
  CreateCategoryParent, CreateChildContainer
} from './CreateCategory.style';

function CreateCategory({ articleValues, setArticleValues, mode }) {
  const [clickCategoryName, setClickCategoryName] = useState("");
  const [parentCategories, setParentCategories] = useState([]);
  const [parentBoxNum, setParentBoxNum] = useState(null);
  const { data: categories } = useFetchCategories();
  const categoriesArray = useMemo(() => categories?.categories || [], [categories]);


  const handleCheck = (e) => {
    setArticleValues((prev) => ({
      ...prev,
      isBanner: e.target.checked
    }))
  }

  const handleChangeCategory = useCallback((e, name, parentCategoryId) => {
    const categoryId = e.target.id;

    setClickCategoryName(name);

    setParentBoxNum(+parentCategoryId);

    setArticleValues((prev) => ({
      ...prev,
      categoryId: +categoryId,
      categoryName: name,
    }));
  }, [setArticleValues]);

  useEffect(() => {
    const filterParentCategories = categoriesArray.filter((category) => !category.parentCategoryId);

    setParentCategories(filterParentCategories);
  }, [categoriesArray]);
  return (
    <CreateCategoryContainer>
      <span className='category-title'>카테고리</span>
      {
        parentCategories.map(({ categoryName, categoryId }) => (
          <CreateCategoryParent
            key={categoryId}
            $isActive={categoryId === parentBoxNum}
          >
            <h6>{categoryName}</h6>
            <CreateChildContainer>
              {
                categoriesArray?.filter((item) => item.parentCategoryId === categoryId).map((i) => (
                  <CreateCategoryChild
                    key={i.categoryId}
                    htmlFor={i.categoryId}
                    $activeCategoryName={i.categoryName}
                    $categoryName={clickCategoryName}
                  >
                    {i.categoryName}
                    <input type='radio'
                      name="category"
                      id={i.categoryId}
                      checked={i.categoryId === articleValues.categoryId}
                      onChange={(e) => handleChangeCategory(e, i.categoryName, categoryId)}
                    />
                  </CreateCategoryChild>
                ))
              }
            </CreateChildContainer>
          </CreateCategoryParent>
        ))
      }
      <div className='banner-box'>
        <span className='banner-check-descrip'>TOP 배너</span>
        <small>배너 기사는 최대 3개까지 가능합니다.</small>
        {mode === 'create'
          ?
          <input type='checkbox' className='banner-checkbox' onChange={handleCheck} />
          :
          <input type='checkbox' className='banner-checkbox' onChange={handleCheck} checked={articleValues.isBanner} />
        }
      </div>
    </CreateCategoryContainer>
  )
}

export default CreateCategory;