import { useCallback, useEffect, useMemo, useRef } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { EditorContainer, NeedReservation, ReservationDescrip } from "./Createcontent.style";
import { createContentImage } from "../../../../../../../../API/article.api";
import CreateSchedule from "../Createschedule/CreateSchedule";


function CreateContent({ articleValues, setArticleValues, setSavedContentImgs, mode, isReservation, setIsReservation }) {
  const quillRef = useRef(null);
  const contentOneRun = useRef(false);

  const imageHandler = useCallback(() => {

    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('file', file);

      try {
        const data = await createContentImage(formData);

        const imageUrl = data.contentByImage;

        setSavedContentImgs((prev) => [...prev, imageUrl]);

        const quill = quillRef.current.getEditor();
        const range = quill.getSelection();
        quill.insertEmbed(range.index, 'image', imageUrl);
        quill.insertText(range.index + 1, '\n');
        quill.setSelection(range.index + 2);
      } catch (err) {
        console.error('이미지 업로드 실패:', err);
      }
    };
  }, [setSavedContentImgs]);

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['image']
      ],
      handlers: {
        image: imageHandler
      }
    }
  }), [imageHandler]);

  const formats = useMemo(() => ([
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'image'
  ]), []);

  const handleChange = (content) => {
    setArticleValues((prev) => ({
      ...prev,
      articleContent: content
    }))
  };

  useEffect(() => {
    if (mode === 'update' && !contentOneRun.current && articleValues.articleContent) {
      const parser = document.createElement("div");
      parser.innerHTML = articleValues.articleContent;
      const imgSrcList = Array.from(parser.querySelectorAll('img')).map((url) => url.src);
      setSavedContentImgs(imgSrcList);
      contentOneRun.current = true;
    }
  }, [articleValues, mode, setSavedContentImgs, contentOneRun]);

  return (
    <EditorContainer>
      {mode === 'create' &&
        <NeedReservation
          onClick={() => {
            setIsReservation(true)
            setArticleValues((prev) => ({ ...prev, articleStatus: 'scheduled' }))
          }}
          $isReservation={isReservation}
        >
          <ReservationDescrip>예약 기사 작성</ReservationDescrip>
        </NeedReservation>
      }
      {(mode === 'create' && isReservation) &&
        <CreateSchedule
          setIsReservation={setIsReservation}
          setArticleValues={setArticleValues}
          articleValues={articleValues}
        />}
      <ReactQuill
        ref={quillRef}
        value={articleValues.articleContent}
        modules={modules}
        formats={formats}
        onChange={handleChange}
      />
    </EditorContainer>
  );
}

export default CreateContent;