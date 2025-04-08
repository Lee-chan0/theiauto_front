import {
  UpdateUserContainer, UpadteUserForm, UserInfoContainer, ProfileImgBoxShadow,
  UpdateDesc, UpdateInput, UpdateFormContainer,
  ProfileImageBox, UpdateFormLabel, UpdateBtn
} from "./UpdateUser.style";
import UserProfile from "../UserProfile";
import { useFetchAdminInfo } from "../../../../../../../Hooks/ApiHooks/User/useFetchAdminInfo";
import { useEffect, useMemo, useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import { useUpdateUser } from "../../../../../../../Hooks/ApiHooks/User/useUpdateUser";

function UpdateUser() {
  const [previewImg, setPreviewImg] = useState(null);
  const updateUserMutation = useUpdateUser();
  const { data: userInfomation } = useFetchAdminInfo();
  const userInfo = useMemo(() => userInfomation?.userInfo || [], [userInfomation]);
  const [isHover, setIsHover] = useState(false);
  const [userInfoValues, setUserInfoValues] = useState({
    name: '',
    email: '',
    profileImg: null,
  });


  const handleChange = (e, name) => {
    const value = e.target.value;

    setUserInfoValues((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleChangeImg = (e) => {
    const file = e.target.files[0];
    const preview = URL.createObjectURL(file);
    setUserInfoValues((prev) => ({
      ...prev,
      profileImg: file
    }));
    setPreviewImg(preview);
  }

  const handleSubmit = (e) => {

    e.preventDefault();

    const formData = new FormData();

    formData.append("name", userInfoValues.name);
    formData.append("email", userInfoValues.email);

    if (userInfoValues.profileImg instanceof File) {
      formData.append("file", userInfoValues.profileImg);
    } else {
      formData.append("userImage", userInfoValues.profileImg);
    }

    updateUserMutation.mutate({ adminId: userInfo.adminId, formData });
  }

  useEffect(() => {
    if (userInfo.length === 0) return;

    setUserInfoValues((prev) => ({
      ...prev,
      name: userInfo?.name,
      email: userInfo?.email,
      profileImg: userInfo?.profileImg
    }));

    if (userInfo?.profileImg) setPreviewImg(userInfo.profileImg);
  }, [userInfo]);

  useEffect(() => {
    return () => {
      if (previewImg instanceof File) {
        URL.revokeObjectURL(previewImg);
      }
    }
  }, [previewImg]);

  return (
    <UpdateUserContainer>
      <UserInfoContainer>
        <UserProfile isUpdate={true} />
      </UserInfoContainer>
      <div className="background-img">
        <UpdateFormContainer>
          <UpadteUserForm>
            <UpdateFormLabel>
              <UpdateDesc>이름</UpdateDesc>
              <UpdateInput type="text" name="name" value={userInfoValues.name} onChange={(e) => handleChange(e, 'name')} />
            </UpdateFormLabel>
            <UpdateFormLabel>
              <UpdateDesc>이메일</UpdateDesc>
              <UpdateInput type="email" name="email" value={userInfoValues.email} onChange={(e) => handleChange(e, 'email')} />
            </UpdateFormLabel>
            <UpdateFormLabel className="profile-image-container">
              <UpdateDesc className="profile-image">프로필 이미지</UpdateDesc>
              <ProfileImageBox
                htmlFor="profile-image"
                $src={previewImg}
                $isHover={isHover}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
              >
                <input type="file" accept="image/*" onChange={handleChangeImg} id="profile-image" style={{ display: 'none' }} />
                {isHover && <BiImageAdd size={48} color="white" />}
                <ProfileImgBoxShadow $isHover={isHover} />
              </ProfileImageBox>
            </UpdateFormLabel>
            <UpdateBtn onClick={handleSubmit}>수정</UpdateBtn>
          </UpadteUserForm>
        </UpdateFormContainer>
      </div>
    </UpdateUserContainer>
  )
}

export default UpdateUser;