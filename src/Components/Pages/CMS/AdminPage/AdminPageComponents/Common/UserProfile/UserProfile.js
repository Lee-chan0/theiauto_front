import { useFetchAdminInfo } from "../../../../../../Hooks/ApiHooks/User/useFetchAdminInfo";
import defaultImg from '../../../../../../../Assets/theiautoLogo.png';
import { BiImageAdd } from "react-icons/bi";
import {
  UserProfileContainer, UserProfileImg,
  UserProfileName, UserProfileEmail,
  UserProfileImgBox,
  UserImageWrap
} from "./UserProfile.style";
import { useMemo, useState } from "react";
import { useUpdateUser } from "../../../../../../Hooks/ApiHooks/User/useUpdateUser";

function UserProfile() {
  const { data: adminInfo } = useFetchAdminInfo();
  const [mouseHover, setMouseHover] = useState(false);
  const userInfo = useMemo(() => adminInfo?.userInfo || {}, [adminInfo]);
  const userProfileImgMutation = useUpdateUser();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDate = new FormData();

    formDate.append('file', file);

    userProfileImgMutation.mutate(formDate);
  }

  return (
    <UserProfileContainer>
      <UserProfileImgBox
        onMouseEnter={() => setMouseHover(true)}
        onMouseLeave={() => setMouseHover(false)}
      >
        <UserImageWrap $isHover={mouseHover} htmlFor="userProfile">
          <input type="file" accept="image/*" style={{ display: 'none' }} id="userProfile" onChange={handleFileUpload} />
          <BiImageAdd size={28} color="gray" />
        </UserImageWrap>
        <UserProfileImg
          src={userInfo?.profileImg ? userInfo?.profileImg : defaultImg}
          alt="user-profile-img"
          style={userInfo?.profileImg && { objectFit: 'cover' }}
        />
      </UserProfileImgBox>
      <UserProfileName><strong>{userInfo?.name}</strong>&nbsp;{userInfo?.rank}</UserProfileName>
      <UserProfileEmail>{userInfo?.email}</UserProfileEmail>
    </UserProfileContainer>
  )
}

export default UserProfile;