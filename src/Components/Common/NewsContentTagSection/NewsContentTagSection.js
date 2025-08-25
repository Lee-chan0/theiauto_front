import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const TagContainer = styled.div`
  margin : 40px 0;
`;

const TagLists = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap : 12px;
`;

const TagItems = styled.li`
  background-color: ${({ theme }) => theme.neutral.gray300};
  color : ${({ theme }) => theme.neutral.gray600};
  font-weight: bold;
  font-size: .9rem;
  padding : 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: ${({ theme }) => theme.neutral.gray600};
    color : ${({ theme }) => theme.neutral.gray300};
  }

  @media (max-width : 1279px) {
    font-size: .85rem;
    padding : 2px 4px;
    border-radius: 2px;
  }

  @media (max-width : 767px) {
    font-size: .75rem;
  }
`;

function NewsContentTagSection({ newsData }) {
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (newsData?.ArticleTag?.length === 0 || !newsData) return;

    setTags(newsData?.ArticleTag);
  }, [newsData]);


  return (
    <TagContainer>
      <TagLists>
        {
          tags.map((tagItem, i) => (
            <TagItems key={tagItem.tag.tagId} onClick={() => navigate(`/search?keyword=${tagItem.tag.tagName}`)}>
              #&nbsp;{tagItem.tag.tagName}
            </TagItems>
          ))
        }
      </TagLists>
    </TagContainer>
  )
}

export default NewsContentTagSection;