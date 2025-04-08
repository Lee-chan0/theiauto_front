import { useFetchAdminInfo } from "../../../../../../Hooks/ApiHooks/User/useFetchAdminInfo";
import defaultImg from '../../../../../../../Assets/theiautoLogo.png';
import {
  UserProfileContainer, UserProfileImg,
  UserProfileName, UserProfileEmail,
  UserProfileImgBox
} from "./UserProfile.style";
import { BsFillGearFill } from "react-icons/bs";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

function UserProfile({ isUpdate }) {
  const navigate = useNavigate();
  const { data: adminInfo, isLoading, isError } = useFetchAdminInfo();
  const userInfo = useMemo(() => adminInfo?.userInfo || {}, [adminInfo]);

  const handleClickUpdate = () => {
    navigate('/theiautoCMS/adminpage/update-user-profile');
  }

  return (
    <UserProfileContainer>
      <UserProfileImgBox>
        <UserProfileImg
          src={userInfo?.profileImg ? userInfo?.profileImg : defaultImg}
          alt="user-profile-img"
          style={userInfo?.profileImg && { objectFit: 'cover' }}
        />
      </UserProfileImgBox>
      <UserProfileName><strong>{userInfo?.name}</strong>&nbsp;{userInfo?.rank}</UserProfileName>
      <UserProfileEmail>{userInfo?.email}</UserProfileEmail>
      {!isUpdate && <BsFillGearFill size={12} color="white" onClick={handleClickUpdate} />}
    </UserProfileContainer>
  )
}

export default UserProfile;