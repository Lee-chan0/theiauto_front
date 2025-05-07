import { useLocation } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

const GlobalStyledComponent = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    font-family: 'Noto Sans KR', sans-serif;
    margin : 0;
    font-size: 16px;
    background-color: ${({ isCms, theme }) => isCms ? '#ffffff' : theme.neutral.gray100};
  }

  ul {
    list-style: none;
    margin : 0;
    padding: 0;
  }

  h1, h2, h3, h4, h5, h6 {
    margin : 0;
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

  .delete-popup {
    width: 500px;
    background-color: rgba(0, 0, 0, 0.8);
    color : #fff;
    font-size: 13px;
  }

  .create-popup {
    width: 500px;
    font-size : 13px;
    box-shadow: 0 0 15px 1px rgba(0, 0, 0, 0.2);

    & > .swal2-html-container {
      & > .values-parent {
        display: flex;
        flex-direction: column;
        border-radius: 4px;
        gap : 8px;

        & > p {
          margin : 4px 0;
          text-align: left;
          font-weight: 500;
          line-height: 1.7;
          font-size: .9rem;

          & > strong {
            background-color: rgba(0, 0, 0, 0.8);
            padding : 4px 8px;
            color : #fff;
            display: block;
            margin-bottom: 4px;
          }
        }
      }
    }
  }
  
  .description-popup {
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    font-size: 0.9rem;
    padding: 8px 16px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);

    display : flex !important;
    align-items: center;

    & > .swal2-title {
      margin: 0;
      margin-left: 8px;

    }
  }

  .success-popup {
    background-color: rgba(255, 255, 255, 0.5);
    color: ${({ theme }) => theme.neutral.gray900};
    font-size: 0.9rem;
    padding : 8px 16px;
    box-shadow: 0 0 8px 5px rgba(0, 0, 0, 0.2);
  }

  
`;

export default function GlobalStyle() {
  const location = useLocation();
  const isCms = location.pathname.startsWith('/theiautoCMS');

  return <GlobalStyledComponent isCms={isCms} />;
};