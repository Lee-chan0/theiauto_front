import { createGlobalStyle } from "styled-components";

const GlobalStyled = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    font-family: 'Noto Sans KR', sans-serif;
    max-width: 1440px;
    margin : 0 auto;
    font-size: 16px;
  }

  .quill {
    width: 100%;
    position: relative;
  }

  .quill .ql-toolbar {
    width: fit-content;
    border : none;
    background-color:${({ theme }) => theme.neutral.gray600};
    border-radius: 6px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    box-shadow: 0 -2px 5px 1px rgba(0, 0, 0, 0.3);

    display: flex;
    gap : 16px;

    position: absolute;
    top : -40px;
    left : 16px;
  }

  .quill .ql-toolbar .ql-formats {
    margin : 0;
    width: fit-content;
    box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.2);
    background-color: ${({ theme }) => theme.neutral.gray0};
    border-radius: 6px;
    position: relative;
    left : 8px;
    
    div {
      display: none;
    }
  }

  .ql-editor {
    img {
      width: 100%;
      object-fit: contain;
      object-position: left;
      height: 320px;
    }
  }

  .quill .ql-container {
    margin-top : 40px;
    border : none;
    border-radius: 6px;
    height: 500px;
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.2);
    font-size: 0.95rem;
  }

  .react-datepicker {
    display : flex;
    box-shadow: 0 0 15px 2px rgba(0, 0, 0, 0.5);
  }
`;

export default GlobalStyled