import { useEffect, useRef, useState, useMemo } from "react";
import {
  BannerContainer,
  TitleInput,
  SubTitleContainer,
  SubTitleInput,
  BannerContainerWrap,
  SelectUserBox,
  UserSelector,
  SelectBtn,
  LoginUserBox,
} from "./createBannerStyle";
import { BiImageAdd } from "react-icons/bi";
import Swal from "sweetalert2";
import { useMediaQuery } from "react-responsive";
import { IoMenu } from "react-icons/io5";
import { useSideNavState } from "../../../../../../../Hooks/Context/SideNavStateContext";

const allowedType = ["image/jpg", "image/jpeg", "image/png", "image/gif"];
const maxFileSize = 25 * 1024 * 1024;

function CreateBanner({ articleValues, setArticleValues, mode, usersData }) {
  const [previewImg, setPreviewImg] = useState(null);
  const updateOneRun = useRef(false);
  const createOneRun = useRef(false);
  const [userBoxActive, setUserBoxActive] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const { setMobileMenuActive } = useSideNavState();

  const persistedAdminId = useMemo(() => {
    try {
      return (
        sessionStorage.getItem("adminId") ||
        localStorage.getItem("adminId") ||
        null
      );
    } catch {
      return null;
    }
  }, []);

  const currentUser = useMemo(() => {
    if (!Array.isArray(usersData) || usersData.length === 0) return null;
    return usersData.find((u) => u.adminId === articleValues.adminId) || null;
  }, [usersData, articleValues.adminId]);

  const otherUsers = useMemo(() => {
    if (!Array.isArray(usersData) || usersData.length === 0) return [];
    if (!currentUser) return usersData;
    return usersData.filter((u) => u.adminId !== currentUser.adminId);
  }, [usersData, currentUser]);

  const handleTitleChange = (e) => {
    setArticleValues((prev) => ({
      ...prev,
      articleTitle: e.target.value,
    }));
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  const handleChangeBannerImg = (e) => {
    const bannerFile = e.target.files[0];
    if (!bannerFile) return;

    if (!allowedType.includes(bannerFile.type)) {
      Swal.fire({
        toast: true,
        position: "top",
        width: "fit-content",
        icon: "error",
        timer: 2000,
        title: `이미지 파일만 업로드 가능합니다.`,
        showConfirmButton: false,
        customClass: { popup: "description-popup" },
      });
      return;
    } else if (maxFileSize < bannerFile.size) {
      Swal.fire({
        toast: true,
        position: "top",
        width: "fit-content",
        icon: "error",
        timer: 2000,
        title: `이미지 크기는 최대 25MB 입니다.`,
        showConfirmButton: false,
        customClass: { popup: "description-popup" },
      });
      return;
    }

    const nextPreview = URL.createObjectURL(bannerFile);
    if (previewImg) URL.revokeObjectURL(previewImg);

    setPreviewImg(nextPreview);
    setArticleValues((prev) => ({
      ...prev,
      articleBanner: bannerFile,
    }));
  };

  const handleClickUser = (adminId) => {
    setArticleValues((prev) => ({
      ...prev,
      adminId,
    }));
    setUserBoxActive(false);
  };

  useEffect(() => {
    if (!previewImg) return;
    return () => URL.revokeObjectURL(previewImg);
  }, [previewImg]);

  useEffect(() => {
    if (mode === "update" && !updateOneRun.current && articleValues.articleBanner) {
      setPreviewImg(articleValues.articleBanner);
      updateOneRun.current = true;
    }
    if (mode === "create" && !createOneRun.current) {
      setPreviewImg(null);
      createOneRun.current = true;
    }
  }, [articleValues, mode]);

  useEffect(() => {
    if (mode !== "create") return;
    if (articleValues.adminId) return;
    if (!Array.isArray(usersData) || usersData.length === 0) return;

    const inList = (id) => usersData.some((u) => u.adminId === id);

    const nextId =
      (persistedAdminId && inList(persistedAdminId) && persistedAdminId) ||
      usersData[0].adminId;

    setArticleValues((prev) => ({ ...prev, adminId: nextId }));
  }, [mode, articleValues.adminId, usersData, persistedAdminId, setArticleValues]);

  return (
    <BannerContainer $src={previewImg} $hasPreview={previewImg}>
      {isMobile && <IoMenu className="menu-bar" size={28} onClick={() => setMobileMenuActive((prev) => !prev)} />}
      {previewImg && <BannerContainerWrap style={{ pointerEvents: "none" }} />}

      <LoginUserBox>
        <div className="login-user-info" >
          {currentUser
            ? `${currentUser.name} ${currentUser.rank} ${currentUser.email}`
            : "작성자 선택"}
        </div>

        <SelectBtn
          $userBoxActive={userBoxActive}
          onClick={() => setUserBoxActive((prev) => !prev)}
          aria-label="작성자 선택 열기/닫기"
          $hasPreview={previewImg}
        >
          ▲
        </SelectBtn>

        <SelectUserBox $userBoxActive={userBoxActive}>
          {(currentUser ? otherUsers : usersData || []).map((user) => (
            <UserSelector
              key={user.adminId}
              className="other-user"
              onClick={() => handleClickUser(user.adminId)}
            >
              {user.name} {user.rank} <strong>{user.email}</strong>
            </UserSelector>
          ))}
        </SelectUserBox>
      </LoginUserBox>

      <input
        type="file"
        id="banner-image"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleChangeBannerImg}
      />
      <label htmlFor="banner-image">
        <BiImageAdd className="add-image" size={isMobile ? 36 : 48} color="white" style={{ zIndex: 1 }} />
      </label>

      <TitleInput
        value={articleValues.articleTitle || ""}
        $hasPreview={previewImg}
        maxLength={100}
        onChange={handleTitleChange}
        placeholder="제목을 입력하세요."
      />

      <SubTitleContainer>
        <SubTitleInput
          $hasPreview={previewImg}
          type="text"
          maxLength={100}
          placeholder="소제목을 입력하세요."
          value={articleValues.articleSubTitle || ""}
          onChange={(e) =>
            setArticleValues((prev) => ({ ...prev, articleSubTitle: e.target.value }))
          }
        />
      </SubTitleContainer>
    </BannerContainer>
  );
}

export default CreateBanner;
