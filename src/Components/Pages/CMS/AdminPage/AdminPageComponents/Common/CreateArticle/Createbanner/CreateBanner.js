import { useEffect, useRef, useState } from "react";
import {
  BannerContainer, TitleInput, SubTitleContainer,
  SubTitleInput, BannerContainerWrap
} from "./createBannerStyle";
import { BiImageAdd } from "react-icons/bi";

function CreateBanner({ articleValues, setArticleValues, mode }) {
  const [previewImg, setPreviewImg] = useState(null);
  const updateOneRun = useRef(false);
  const createOneRun = useRef(false);


  const handleTitleChange = (e) => {
    setArticleValues((prev) => ({
      ...prev,
      articleTitle: e.target.value
    }));

    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  const handleChangeBannerImg = (e) => {
    const bannerFile = e.target.files[0];
    if (!bannerFile) return;
    const nextPreview = URL.createObjectURL(bannerFile);

    if (previewImg) URL.revokeObjectURL(previewImg);

    setPreviewImg(nextPreview);
    setArticleValues((prev) => ({
      ...prev,
      articleBanner: bannerFile
    }));
  };

  useEffect(() => {
    if (!previewImg) return;

    return () => URL.revokeObjectURL(previewImg);
  }, [previewImg]);

  useEffect(() => {
    if (mode === 'update' && !updateOneRun.current && articleValues.articleBanner) {
      setPreviewImg(articleValues.articleBanner);
      updateOneRun.current = true;
    }

    if (mode === 'create' && !createOneRun.current) {
      setPreviewImg(null);
      createOneRun.current = true;
    }
  }, [articleValues, mode]);

  return (
    <BannerContainer $src={previewImg}>
      {previewImg && <BannerContainerWrap />}
      <input type="file" id="banner-image" accept='image/*' style={{ display: 'none' }} onChange={handleChangeBannerImg} />
      <label htmlFor="banner-image">
        <BiImageAdd size={48} color="white" style={{ zIndex: '1' }} />
      </label>
      <TitleInput
        value={articleValues.articleTitle || ''}
        maxLength={100}
        onChange={handleTitleChange}
        placeholder="제목을 입력하세요."
      />
      <SubTitleContainer>
        <SubTitleInput
          type="text"
          maxLength={100}
          placeholder="소제목을 입력하세요."
          value={articleValues.articleSubTitle || ''}
          onChange={(e) => setArticleValues((prev) => ({ ...prev, articleSubTitle: e.target.value }))}
        />
      </SubTitleContainer>
    </BannerContainer>
  )
}

export default CreateBanner;