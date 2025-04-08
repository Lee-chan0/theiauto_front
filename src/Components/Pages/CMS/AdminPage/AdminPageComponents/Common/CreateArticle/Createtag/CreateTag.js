import { useState } from "react";
import { HashTagIcon, TagContainer, TagInput, TagLayOutBox, TagDescriptionContainer } from "./CreateTag.style";
import React from "react";

function CreateTag({ articleValues, setArticleValues }) {
  const [tagValue, setTagValue] = useState("");
  const [selectedTag, setSelectedTag] = useState(null);
  const [backspaceCount, setBackspaceCount] = useState(0);

  const handleKeyDown = (e) => {
    if (['Enter', ','].includes(e.key)) {
      const value = tagValue.trim();

      if (value === '') return;

      if (articleValues.tagName.includes(value)) {
        alert('동일한 태그가 이미 있습니다.');
      } else {
        setArticleValues((prev) => ({
          ...prev,
          tagName: [...prev.tagName, value]
        }));
      }
      setTagValue('');
      setBackspaceCount(0); // 태그 추가 시 초기화
    } else if (e.key === 'Backspace') {
      const value = tagValue.trim();

      if (value === '') {
        if (backspaceCount === 1) {
          setArticleValues((prev) => ({
            ...prev,
            tagName: [...prev.tagName.slice(0, -1)]
          }));
          setTagValue("");
          setBackspaceCount(0); // 초기화
        } else {
          setBackspaceCount(1); // 첫 번째 백스페이스 → 선택된 상태로 보기
        }
      } else {
        setBackspaceCount(0); // 입력 중이면 리셋
      }
    } else {
      setBackspaceCount(0); // 다른 키 입력 시 리셋
    }
  };

  const handleRemoveTag = (e) => {
    if (e.key === 'Backspace') {
      const filteringTag = articleValues.tagName.filter((tag) => tag !== selectedTag);
      setSelectedTag(null);
      setArticleValues((prev) => ({
        ...prev,
        tagName: filteringTag
      }))
    }
  }

  const handleFocusAndClick = (tagName) => {
    setBackspaceCount(0);
    setSelectedTag(tagName);
  }

  const handleBlur = () => {
    setSelectedTag(null);
  }

  const handleChangeTagValue = (e) => {
    const value = e.target.value;

    if (value.trim() === "") {
      setTagValue("");
    } else {
      setTagValue(value);
    }
  };

  return (
    <TagContainer>
      <TagDescriptionContainer>
        태그
      </TagDescriptionContainer>
      <TagLayOutBox >
        {
          articleValues.tagName.map((item, i) => (
            <HashTagIcon
              tabIndex={0}
              className={i === articleValues.tagName.length - 1 ? 'last-hashtag' : ''}
              $backspaceCount={backspaceCount}
              key={i}
              id={`${item}`}
              $selectedTag={selectedTag}
              onClick={() => handleFocusAndClick(item)}
              onFocus={() => handleFocusAndClick(item)}
              onKeyDown={handleRemoveTag}
              onBlur={handleBlur}
            >
              <div style={{ display: 'inline' }}>#</div>
              <span>{item}</span>
            </HashTagIcon>
          ))
        }
        <TagInput
          type="text"
          maxLength={15}
          value={tagValue}
          onKeyDown={handleKeyDown}
          onChange={handleChangeTagValue}
          placeholder="# 태그를 입력하세요."
        />
      </TagLayOutBox>
    </TagContainer >
  )
}

export default CreateTag;