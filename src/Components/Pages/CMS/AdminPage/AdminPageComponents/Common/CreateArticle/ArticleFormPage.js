import styled, { keyframes } from "styled-components";
import AdminPageSideNav from "../SideNav/AdminPageSideNav";
import CreateBanner from "./Createbanner/CreateBanner";
import CreateCategory from "./Createcategory/CreateCategory";
import CreateContent from "./Createcontent/CreateContent";
import CreateTag from "./Createtag/CreateTag";
import CreateFile from "./Createfile/CreateFile";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useFetchArticle } from "../../../../../../Hooks/ApiHooks/Article/useFetchArticle";
import { useCreateArticle } from "../../../../../../Hooks/ApiHooks/Article/useCreateArticle";
import { useUpdateArticle } from "../../../../../../Hooks/ApiHooks/Article/useUpdateArticle";
import { useDeleteArticle } from "../../../../../../Hooks/ApiHooks/Article/useDeleteArticle";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { CgSpinner } from "react-icons/cg";

function change5MinDate() {
  const now = new Date();
  const ms = 1000 * 60 * 5;
  return new Date(Math.ceil(now.getTime() / ms) * ms);
}

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

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

  & > .spinner-container {
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      animation: ${rotate} 1s linear infinite;
    }
  }
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

  &.delete-btn {
    width: 80px;
  }

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
  categoryName: '',
  tagName: [],
  articleStatus: 'publish',
  publishTime: change5MinDate(),
  isBanner: false
};

function ArticleFormPage({ mode }) {
  const [articleValues, setArticleValues] = useState(INITIAL_ARTICLE_VALUES);
  const [isReservation, setIsReservation] = useState(false);
  const [prevImageUrls, setPrevImageUrls] = useState([]); // 삭제되면 object storage에서 삭제하는 로직
  const [savedContentImgs, setSavedContentImgs] = useState([]);
  const { articleId } = useParams();
  const { data: findArticle, isLoading } = useFetchArticle(articleId);
  const needUpdateArticle = useMemo(() => findArticle?.findArticle || [], [findArticle]);
  const createMutation = useCreateArticle();
  const updateMutation = useUpdateArticle();
  const deleteMutation = useDeleteArticle();
  const navigate = useNavigate();

  const handleDelete = (e) => {
    e.preventDefault();

    Swal.fire({
      title: '정말 <span style="color: #e23b3f">삭제</span>하시겠습니까?',
      html: '삭제하면 <b>복구할 수 없습니다.</b>',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '삭제',
      cancelButtonText: '취소',
      confirmButtonColor: '#e23b3f',
      customClass: {
        popup: 'delete-popup'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate({ articleId, prevImageUrls }, {
          onSuccess: () => {
            setArticleValues(INITIAL_ARTICLE_VALUES);
            navigate('/theiautoCMS/adminpage');
          }
        })
      }
    })
  }


  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    const notAllowedKeys = ['tagName', 'articleImageUrl', 'articleBanner'];

    const parser = document.createElement('div');
    parser.innerHTML = articleValues.articleContent;
    const imgSrcList = Array.from(parser.querySelectorAll("img")).map((img) => img.src);
    const filterImageArr = savedContentImgs.filter((url) => !imgSrcList.includes(url));
    filterImageArr.forEach((delUrl) => formData.append('needfulDelUrl', delUrl));

    const canSkipKeys = ['articleImageUrl', 'publishTime', 'isBanner'];

    for (const item of Object.keys(articleValues)) {
      if (!canSkipKeys.includes(item)) {
        if (!articleValues[item] || articleValues[item].length === 0) {
          Swal.fire({
            toast: true,
            position: 'top',
            width: 'fit-content',
            icon: 'error',
            timer: 2000,
            title: `${FILED_LABEL[item]}은/는 필수 입력란입니다.`,
            showConfirmButton: false,
            customClass: {
              popup: 'description-popup'
            }
          })
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

    Swal.fire({
      title: '이대로 게시하시겠습니까?',
      html: `
        <div class="values-parent">
          <p><strong>제목</strong> ${articleValues.articleTitle}</p>
          <p><strong>소제목</strong> ${articleValues.articleSubTitle}</p>
          <p><strong>카테고리</strong> ${articleValues.categoryName}</p>
          <p><strong>태그</strong> ${articleValues.tagName}</p>
          <p><strong>예약 기사(${articleValues.articleStatus === 'publish' ?
          '<span style="color : #e23b3f">OFF</span>' : '<span style="color : #4169e1">ON</span>'})</strong> 
          ${articleValues.articleStatus === 'publish' ? '' : format(articleValues.publishTime, "yyyy년 MM월 dd일 a hh시 mm분", { locale: ko })}
          </p>
        </div>
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: '업로드',
      cancelButtonText: '취소',
      confirmButtonColor: '#e23b3f',
      customClass: {
        popup: 'create-popup'
      }
    }).then((result) => {
      if (result.isConfirmed) {
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
      }
    })

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
        articleStatus: needUpdateArticle?.articleStatus,
        categoryName: needUpdateArticle?.category?.categoryName,
        publishTime: null,
        tagName: tagNames,
        isBanner: needUpdateArticle?.isBanner
      });

    } else if (mode === 'create') {
      setArticleValues(INITIAL_ARTICLE_VALUES);
    }
  }, [mode, needUpdateArticle]);


  if (isLoading) {
    return (
      <CreateArticleContainer>
        <AdminPageSideNav />
        <LayoutContainer>
          <div className="spinner-container">
            <CgSpinner size={32} />
          </div>
        </LayoutContainer>
      </CreateArticleContainer>
    )
  }

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
          isReservation={isReservation}
          setIsReservation={setIsReservation}
          mode={mode}
        />
        <CreateTag articleValues={articleValues} setArticleValues={setArticleValues} />
        <CreateFile articleValues={articleValues} setArticleValues={setArticleValues} mode={mode} prevImageUrls={prevImageUrls} setPrevImageUrls={setPrevImageUrls} />
        <div style={{ width: '100%', padding: '24px', paddingTop: '0' }}>
          <SubmitBtn onClick={handleSubmit}>{mode === 'create' ? '업로드' : '수정'}</SubmitBtn>
          {mode === 'update' &&
            (
              <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'row-reverse' }}>
                <SubmitBtn className="delete-btn" onClick={handleDelete}>삭제</SubmitBtn>
              </div>
            )
          }
        </div>
      </LayoutContainer>
    </CreateArticleContainer>
  )
}

export default ArticleFormPage;