import styled from "styled-components";
import AdminPageSideNav from "../SideNav/AdminPageSideNav";
import CreateBanner from "./Createbanner/CreateBanner";
import CreateCategory from "./Createcategory/CreateCategory";
import CreateContent from "./Createcontent/CreateContent";
import CreateTag from "./Createtag/CreateTag";
import CreateFile from "./Createfile/CreateFile";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchArticle } from "../../../../../../Hooks/ApiHooks/Article/useFetchArticle";
import { useCreateArticle } from "../../../../../../Hooks/ApiHooks/Article/useCreateArticle";
import { useUpdateArticle } from "../../../../../../Hooks/ApiHooks/Article/useUpdateArticle";

const CreateArticleContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const LayoutContainer = styled.div`
  width: calc(100% - 240px);
  height: 100%;
  position : fixed;
  right : 0;
  top : 0;
  z-index: -1;
  overflow-y: auto;
`;

const SubmitBtn = styled.button`
  width: 100%;
  border : none;
  padding : 8px 16px;
  border-radius: 2px;
  font-size : 1rem;
  font-weight: bold;
  color: ${({ theme }) => theme.neutral.gray0};
  background-color: ${({ theme }) => theme.neutral.gray900};
  cursor: pointer;
  transition: background-color 0.2s, transform 0.2s, box-shadow 0.2s;
  will-change: background-color, transform, box-shadow;

  &:hover {
    background-color: ${({ theme }) => theme.primary.red700};
    transform: scale(1.005);
    box-shadow: 0 5px 3px 1px rgba(0, 0, 0, 0.2);
  }
`;

const FILED_LABEL = {
  articleTitle: '제목',
  articleSubTitle: '소제목',
  articleContent: '내용',
  articleBanner: '대표 이미지',
  categoryId: '카테고리 선택',
  tagName: '태그'
}

const INITIAL_ARTICLE_VALUES = {
  articleTitle: '',
  articleSubTitle: '',
  articleContent: '',
  articleBanner: null,
  articleImageUrl: [],
  categoryId: null,
  tagName: [],
};

function ArticleFormPage({ mode }) {
  const [articleValues, setArticleValues] = useState(INITIAL_ARTICLE_VALUES);
  const [savedContentImgs, setSavedContentImgs] = useState([]);
  const { articleId } = useParams();
  const { data: findArticle, isLoading, isError } = useFetchArticle(articleId);
  const needUpdateArticle = useMemo(() => findArticle?.findArticle || [], [findArticle]);
  const createMutation = useCreateArticle();
  const updateMutation = useUpdateArticle();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    const notAllowedKeys = ['tagName', 'articleImageUrl', 'articleBanner'];

    const parser = document.createElement('div');
    parser.innerHTML = articleValues.articleContent;
    const imgSrcList = Array.from(parser.querySelectorAll("img")).map((img) => img.src);
    const filterImageArr = savedContentImgs.filter((url) => !imgSrcList.includes(url));
    filterImageArr.forEach((delUrl) => formData.append('needfulDelUrl', delUrl));

    for (const item of Object.keys(articleValues)) {
      if (item !== 'articleImageUrl') {
        if (!articleValues[item] || articleValues[item].length === 0) {
          alert(`${FILED_LABEL[item]}은/는 필수 입력란입니다.`);
          return;
        }
      }
    }

    articleValues.tagName.forEach((tag) => formData.append('tagName', tag));

    Object.keys(articleValues).forEach((key) => {
      if (!notAllowedKeys.includes(key)) {
        formData.append(key, articleValues[key]);
      }
    });
    if (mode === 'create') {
      formData.append('file', articleValues.articleBanner);
      articleValues.articleImageUrl.forEach((file) => formData.append("files", file));

      createMutation.mutate(formData, {
        onSuccess: () => {
          setArticleValues(INITIAL_ARTICLE_VALUES);
          navigate('/theiautoCMS/adminpage');
        }
      });
    } else if (mode === 'update') {
      if (articleValues.articleBanner instanceof File) {
        formData.append('file', articleValues.articleBanner)
      } else {
        formData.append('articleBanner', articleValues.articleBanner);
      }

      articleValues.articleImageUrl.forEach((img) =>
        img instanceof File ? formData.append("files", img) : formData.append("articleImageUrl", img));

      updateMutation.mutate({ formData: formData, articleId: articleId }, {
        onSuccess: () => {
          setArticleValues(INITIAL_ARTICLE_VALUES);
          navigate('/theiautoCMS/adminpage');
        }
      });
    }
  };

  useEffect(() => {
    if (mode === 'update' && needUpdateArticle) {
      const articleImages = needUpdateArticle?.ArticleImage?.map(img => img.articleImageUrl) || [];
      const tagNames = needUpdateArticle?.ArticleTag?.map(tag => tag.tag.tagName) || [];

      setArticleValues({
        articleTitle: needUpdateArticle?.articleTitle,
        articleSubTitle: needUpdateArticle?.articleSubTitle,
        articleContent: needUpdateArticle?.articleContent,
        articleBanner: needUpdateArticle?.articleBanner,
        articleImageUrl: articleImages,
        categoryId: needUpdateArticle?.CategoryId,
        tagName: tagNames,
      });

    } else if (mode === 'create') {
      setArticleValues(INITIAL_ARTICLE_VALUES);
    }
  }, [mode, needUpdateArticle]);

  return (
    <CreateArticleContainer>
      <AdminPageSideNav mode={mode} />
      <LayoutContainer>
        <CreateBanner articleValues={articleValues} setArticleValues={setArticleValues} mode={mode} />
        <CreateCategory articleValues={articleValues} setArticleValues={setArticleValues} mode={mode} />
        <CreateContent
          articleValues={articleValues}
          setArticleValues={setArticleValues}
          setSavedContentImgs={setSavedContentImgs}
          mode={mode}
        />
        <CreateTag articleValues={articleValues} setArticleValues={setArticleValues} />
        <CreateFile articleValues={articleValues} setArticleValues={setArticleValues} mode={mode} />
        <div style={{ width: '100%', padding: '24px', paddingTop: '0' }}>
          <SubmitBtn onClick={handleSubmit}>{mode === 'create' ? '업로드' : '수정'}</SubmitBtn>
        </div>
      </LayoutContainer>
    </CreateArticleContainer>
  )
}

export default ArticleFormPage;