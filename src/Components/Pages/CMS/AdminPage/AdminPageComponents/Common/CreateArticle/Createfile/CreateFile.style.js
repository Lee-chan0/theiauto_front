import styled from "styled-components";

const CreateFileContainer = styled.div`
  padding : 0 24px;
  display : grid;
  grid-template-columns: repeat(8, 1fr);
  grid-auto-rows: auto;
  gap : 8px;
  margin-bottom : 40px;

  position: relative;
`;

const CreateFileForm = styled.label`
  display : flex;
  flex-direction: column;
  gap : 4px;
`;

const CreateFileImgBox = styled.div`
  width: 100%;
  height: 104px;
  border-radius: 2px;
  cursor: pointer;
  background-image: url(${({ $src }) => $src ? $src : ""});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: ${({ theme }) => theme.neutral.gray300};

  svg {
    opacity: 1;
    transition: opacity 0.2s;
  }
  &:hover {
      svg {
      opacity: 0.5;
    }
  }
`;

const CreateFileDesc = styled.span`
  width: 100%;
  font-size: 0.8rem;
  font-weight: bold;
  padding : 4px 8px;
  background-color: ${({ theme }) => theme.primary.red100};
  text-align: center;
  border-radius: 2px;
  transition : background-color 0.3s, color 0.3s;
  cursor: pointer;

  &:hover {
      background-color: ${({ theme, id }) => id === 'select' ? theme.primary.red300 : theme.primary.red700};
      color: ${({ theme, id }) => theme.neutral.gray0};
  }
`;

const FileAlert = styled.span`
  position: absolute;
  bottom : 100%;
  font-size : .7rem;
  color : ${({ theme }) => theme.neutral.gray300};
  margin-bottom : 8px;
  left: 24px;
`;

export { CreateFileContainer, CreateFileForm, CreateFileDesc, CreateFileImgBox, FileAlert };