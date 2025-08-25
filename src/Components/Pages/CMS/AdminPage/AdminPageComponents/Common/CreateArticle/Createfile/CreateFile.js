import { useEffect, useRef, useState } from 'react';
import { CreateFileContainer, CreateFileForm, CreateFileDesc, CreateFileImgBox, FileAlert } from './CreateFile.style';
import { BiImageAdd } from "react-icons/bi";
import Swal from 'sweetalert2';


const allowedType = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];
const maxFileSize = 25 * 1024 * 1024;


function CreateFile({ articleValues, setArticleValues, mode, prevImageUrls, setPrevImageUrls }) {
  const [previewImg, setPreviewImg] = useState([]);
  const oneRun = useRef(false);

  const handleChangeFiles = (e, index) => {
    if (previewImg.length === 30) return alert('이미지는 *30*장 까지 가능합니다');

    const file = e.target.files[0];

    if (!file) return;

    if (!allowedType.includes(file.type)) {
      Swal.fire({
        toast: true,
        position: 'top',
        width: 'fit-content',
        icon: 'error',
        timer: 2000,
        title: `이미지 파일만 업로드 가능합니다.`,
        showConfirmButton: false,
        showClass: {
          popup: ''
        },
        hideClass: {
          popup: ''
        },
        customClass: {
          popup: 'description-popup'
        }
      });
      return;
    } else if (maxFileSize < file.size) {
      Swal.fire({
        toast: true,
        position: 'top',
        width: 'fit-content',
        icon: 'error',
        timer: 2000,
        title: `이미지 크기는 최대 25MB 입니다.`,
        showConfirmButton: false,
        showClass: {
          popup: ''
        },
        hideClass: {
          popup: ''
        },
        customClass: {
          popup: 'description-popup'
        }
      });
      return;
    }

    const nextFile = URL.createObjectURL(file);

    if (index === undefined) {
      setPreviewImg((prev) => [...prev, nextFile]);
      setArticleValues((prev) => ({
        ...prev,
        articleImageUrl: [...articleValues.articleImageUrl, file]
      }));
    } else {
      const filterFiles = previewImg.map((preview, i) => i === index ? nextFile : preview);
      setPreviewImg(filterFiles);
      setArticleValues((prev) => ({
        ...prev,
        articleImageUrl: [...articleValues.articleImageUrl].map((current, i) => i === index ? file : current)
      }));
    }
    e.target.value = "";
  };

  const handleDelete = (e, i) => {
    e.preventDefault();

    const deletedImg = previewImg[i];

    if (typeof deletedImg === 'string' && deletedImg.startsWith("blob:")) {
      URL.revokeObjectURL(deletedImg);
    }

    const deleteImg = previewImg.filter((_, index) => index !== i);
    setPreviewImg(deleteImg);
    setArticleValues((prev) => ({
      ...prev,
      articleImageUrl: [...articleValues.articleImageUrl].filter((_, index) => index !== i)
    }));
  }

  useEffect(() => {
    if (articleValues.articleImageUrl.length === 0) return;

    const normalizedPreview = articleValues.articleImageUrl.map((img) => {
      return typeof img === 'string' ? img : URL.createObjectURL(img);
    });

    setPreviewImg(normalizedPreview);
  }, [articleValues]);

  useEffect(() => {
    if (articleValues.articleImageUrl.length === 0 || oneRun.current) return;

    oneRun.current = true;

    setPrevImageUrls(articleValues.articleImageUrl);
  }, [oneRun, articleValues, setPrevImageUrls]);

  useEffect(() => {
    return () => {
      previewImg.forEach((item) => {
        if (typeof item !== 'string') {
          URL.revokeObjectURL(item);
        }
      });
    };
  }, [previewImg]);

  useEffect(() => {
    if (mode === 'create') {
      setPreviewImg([]);
    }
  }, [mode]);

  return (
    <CreateFileContainer>
      <FileAlert>추가 이미지는 최대 *30장*까지 가능합니다.</FileAlert>
      {
        (previewImg.length !== 0) &&
        previewImg.map((item, i) => (
          <CreateFileForm key={i} htmlFor={`image-uploader-${i}`}>
            <input
              type='file'
              accept='image/*'
              id={`image-uploader-${i}`}
              style={{ display: 'none' }}
              onChange={(e) => handleChangeFiles(e, i)}
            />
            <CreateFileImgBox $src={item} />
            <CreateFileDesc id='select'>사진 선택</CreateFileDesc>
            <CreateFileDesc id='delete' onClick={(e) => handleDelete(e, i)}>삭제</CreateFileDesc>
          </CreateFileForm>
        ))
      }
      <CreateFileForm htmlFor='image-uploader'>
        <input type='file' accept='image/*' id='image-uploader' style={{ display: 'none' }} onChange={(e) => handleChangeFiles(e)} />
        <CreateFileImgBox style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <BiImageAdd size={40} color='gray' />
        </CreateFileImgBox>
        <CreateFileDesc id='select'>사진 선택</CreateFileDesc>
      </CreateFileForm>
    </CreateFileContainer>
  )
}

export default CreateFile;