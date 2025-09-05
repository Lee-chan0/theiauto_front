import styled from "styled-components";

const TagContainer = styled.div`
  width: 100%;
  margin : 40px 0;
  padding : 0 24px;
  position: relative;

  @media (max-width : 767px) {
    padding : 0 8px;
  }
`;

const TagDescriptionContainer = styled.span`
  background-color: ${({ theme }) => theme.neutral.gray900};
  padding : 4px 8px;
  color : ${({ theme }) => theme.neutral.gray100};
  font-weight: bold;
  font-size: 0.85rem;
  border-radius: 4px;
  position: absolute;
  top : -40px;

  @media (max-width : 767px) {
    font-size: .75rem;
    margin-top: 8px;
  }
`;

const TagInput = styled.input`
  width: 140px;
  height: 25px;
  font-size: 0.9rem;
  border : none;
  outline: none;

  @media (max-width : 767px) {
    font-size: .75rem;
  }
`;

const TagLayOutBox = styled.div`
  display: inline;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  white-space: normal;
  gap : 8px 0px;
`;

const HashTagIcon = styled.div`
  display : flex;
  align-items: center;
  height: 25px;
  margin-right: 8px;
  padding : 0 4px;
  color : ${({ theme }) => theme.neutral.gray600};
  font-size : 0.9rem;
  background-color: ${({ id, $selectedTag, className, $backspaceCount }) =>
    (id === $selectedTag) || (className === 'last-hashtag' && $backspaceCount === 1) ?
      `rgba(0, 0, 0, 0.35)` : 'rgba(0, 0, 0, 0.15)'};
  border : none;
  outline : none;
  border-radius : 3px;

  @media (max-width : 767px) {
    font-size : .75rem;
    font-weight : 500;
  }
`;

export { TagContainer, TagInput, TagLayOutBox, HashTagIcon, TagDescriptionContainer };