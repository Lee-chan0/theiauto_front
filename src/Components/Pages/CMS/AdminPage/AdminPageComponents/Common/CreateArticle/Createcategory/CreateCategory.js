import { useCallback, useEffect, useMemo, useState } from 'react';
import { useFetchCategories } from '../../../../../../../Hooks/ApiHooks/Category/useFetchCategories';
import {
  CreateCategoryContainer, CreateCategoryChild,
  CreateCategoryParent, CreateChildContainer,
  UserSelector, LoginUserBox, SelectUserBox, UserDescriptionBox
} from './CreateCategory.style';

function CreateCategory({ articleValues, setArticleValues, mode, usersData }) {
  const [clickCategoryName, setClickCategoryName] = useState("");
  const [parentCategories, setParentCategories] = useState([]);
  const [parentBoxNum, setParentBoxNum] = useState(null);
  const [userBoxActive, setUserBoxActive] = useState(false);
  const { data: categories } = useFetchCategories();
  const categoriesArray = useMemo(() => categories?.categories || [], [categories]);

  const currentUser = useMemo(() => {
    if (!Array.isArray(usersData) || usersData.length === 0) return null;
    return usersData.find((u) => u.adminId === articleValues.adminId) || null;
  }, [usersData, articleValues.adminId]);

  const otherUsers = useMemo(() => {
    if (!Array.isArray(usersData) || usersData.length === 0) return [];
    if (!currentUser) return usersData;
    return usersData.filter((u) => u.adminId !== currentUser.adminId);
  }, [usersData, currentUser]);


  const handleCheck = (e) => {
    setArticleValues(prev => ({
      ...prev,
      isBanner: !!e.target.checked, // 항상 boolean
    }));
  };

  const handleClickUser = (adminId) => {
    setArticleValues((prev) => ({
      ...prev,
      adminId,
    }));
    setUserBoxActive(false);
  };

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
      <UserDescriptionBox>
        <span>카테고리</span>
        <LoginUserBox className='login-user-box'>
          <div className="login-user-info" onClick={() => setUserBoxActive((prev) => !prev)}>
            {
              currentUser
                ?
                `${currentUser.name} ${currentUser.rank} ${currentUser.email}`
                :
                "작성자 선택"
            }
          </div>
          <SelectUserBox $userBoxActive={userBoxActive}>
            {(currentUser ? otherUsers : usersData || []).map((user) => (
              <UserSelector
                key={user.adminId}
                className="other-user"
                onClick={() => handleClickUser(user.adminId)}
              >
                {user.name} {user.rank} &nbsp; <strong>{user.email}</strong>
              </UserSelector>
            ))}
          </SelectUserBox>
        </LoginUserBox>
      </UserDescriptionBox>
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
                    <input
                      type='radio'
                      name="category"
                      id={i.categoryId}
                      checked={!!(i.categoryId === articleValues?.categoryId)}
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
          <input
            type='checkbox'
            className='banner-checkbox'
            checked={!!articleValues?.isBanner}
            onChange={handleCheck}
          />
          :
          <input
            type='checkbox'
            className='banner-checkbox'
            onChange={handleCheck}
            checked={articleValues.isBanner}
          />
        }
      </div>
    </CreateCategoryContainer>
  )
}

export default CreateCategory;