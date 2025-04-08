import { useCallback, useEffect, useMemo, useState } from 'react';
import { useFetchCategories } from '../../../../../../../Hooks/ApiHooks/Category/useFetchCategories';
import {
  CreateCategoryContainer, CreateCategoryChild,
  CreateCategoryParent, CreateChildContainer
} from './CreateCategory.style';

function CreateCategory({ articleValues, setArticleValues, mode }) {
  const [clickCategoryName, setClickCategoryName] = useState("");
  const [parentCategories, setParentCategories] = useState([]);
  const { data: categories, isLoading, isError } = useFetchCategories();
  const categoriesArray = useMemo(() => categories?.categories || [], [categories]);

  const handleChangeCategory = useCallback((e, name) => {
    const categoryId = e.target.id;

    setClickCategoryName(name);

    setArticleValues((prev) => ({
      ...prev,
      categoryId: +categoryId
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
          <CreateCategoryParent key={categoryId}>
            <h6>{categoryName}</h6>
            <CreateChildContainer>
              {
                categoriesArray?.filter((item) => item.parentCategoryId === categoryId).map((i) => (

                  <CreateCategoryChild
                    key={i.categoryId}
                    htmlFor={i.categoryName}
                    $activeCategoryName={i.categoryName}
                    $categoryName={clickCategoryName}
                  >
                    {i.categoryName}
                    <input type='radio'
                      name="category"
                      id={i.categoryId}
                      checked={i.categoryId === articleValues.categoryId}
                      onChange={(e) => handleChangeCategory(e, i.categoryName)}
                    />
                  </CreateCategoryChild>
                ))
              }
            </CreateChildContainer>
          </CreateCategoryParent>
        ))
      }
    </CreateCategoryContainer>
  )
}

export default CreateCategory;