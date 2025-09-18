import { useLocation } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

const GlobalStyledComponent = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html {

    @media (max-width : 767px) {
      overflow-x: hidden;
    }
  }

  body {
    font-family: 'Noto Sans KR', sans-serif;
    margin : 0;
    font-size: 16px;
    background-color: ${({ isCms, theme }) => isCms ? '#ffffff' : theme.neutral.gray100};
    overflow-x: hidden;

    @media (max-width : 1279px) {
      font-size: 15px;
    }
  }

  ul {
    list-style: none;
    margin : 0;
    padding: 0;
  }

  h1, h2, h3, h4, h5, h6 {
    margin : 0;
  }

  p {
    margin : 0;
  }

  .quill {
    width: 100%;
    position: relative;
  }

  .quill .ql-toolbar {
    width: fit-content;
    border : none;
    background-color: #ccdbff;
    border-radius: 4px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    box-shadow: 0px -2px 3px 1px rgba(0, 0, 0, 0.2);

    display: flex;
    gap : 16px;

    position: absolute;
    top : -40px;
    left : 16px;

    @media (max-width : 767px) {
      padding : 8px 0;
    }
  }

  .quill .ql-toolbar .ql-formats {
    margin : 0;
    width: fit-content;
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

      @media (max-width : 767px) {
        height: auto;
      }
    } 
  }

  .quill .ql-container {
    margin-top : 40px;
    border : none;
    border-radius: 6px;
    height: 500px;
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.2);
    font-size: 0.95rem;

    @media (max-width : 767px) {
      font-size: .75rem;
    }
  }

  .react-datepicker {
    display : flex;
    box-shadow: 0 0 15px 2px rgba(0, 0, 0, 0.5);
  }

  @keyframes slideUpIn {
    from {
      transform: translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slideUpOut {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(100%);
      opacity: 0;
    }
  }

  @keyframes clipBoardSlideUp {
    from {
      transform: translateY(-100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes clipBoardSlideUpOut {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(-100%);
      opacity: 0;
    }
  }

  .swal-slide-up-in {
    animation: slideUpIn 0.4s ease-out;
  }

  .swal-slide-up-out {
    animation: slideUpOut 0.3s ease-in forwards;
  }

  .swal-clipboard-up-in {
    animation: clipBoardSlideUp 0.4s ease-out;
  }

  .swal-clipboard-up-out {
    animation: clipBoardSlideUpOut 0.3s ease-in forwards;
  }

  .delete-popup {
    width: 320px;
    border-radius: 0 !important;

    & > h2 {
      font-size: 1rem;
      font-weight: 400;
    }

    & > .swal2-html-container {
      width: 100%;
      font-size: 0.8rem;
      display: flex !important;
      align-items: center;

      & > * {
        margin-left : 4px;
      }
    }

    & > * {
      padding : 0;
    }

    background-color: ${({ theme }) => theme.neutral.gray0};
    color : ${({ theme }) => theme.neutral.gray900};
    font-size: .75rem;
    border-radius: 4px;
    padding : 16px;
    display: flex;
    flex-direction: column;
    gap : 12px;

    & > .swal2-actions {
      margin : 0;
      width: 100%;
      display: flex !important;

      & > .swal2-cancel {
        background-color: ${({ theme }) => theme.neutral.gray300} !important;
      }

      & > button {
        width: 100%;
        flex : 1;
        border-radius: 0 !important;
      }
    }
  }

  .create-popup {
    position: fixed;
    bottom: 0;
    left : 0;
    right: 0;
    width: 100%;
    height: 400px;
    box-shadow: 0 0 15px 1px rgba(0, 0, 0, 0.2);
    border-radius: 0;
    padding : 0 80px;

    @media (max-width : 767px) {
      padding : 0px;
      
    }

    & > .swal2-actions {
      margin : 16px 0;
      display: flex;
      gap : 8px;

      & > .swal2-confirm {
        border-radius: 99px;
        font-size: .85rem;
        background-color: #000;

        @media (max-width : 767px) {
          font-size: .7rem;
        }

        &:hover {
          background-color: rgba(0, 0, 0, 0.8);
        }
      }

      & > .swal2-cancel {
        border-radius: 99px;
        font-size: .85rem;
        background-color: ${({ theme }) => theme.neutral.gray300};

        @media (max-width : 767px) {
          font-size: .7rem;
        }
      }
    }

    & > .swal2-title {
      text-align: left;
      font-weight: bold;
      margin : 8px;
      margin-left: 0;
      color : ${({ theme }) => theme.neutral.gray900};

      @media (max-width : 767px) {
        font-size: 1rem;
        text-align: center;
        margin: 0;
        font-weight: 900;
      }
    }

    & > .swal2-html-container {
      & > .values-parent {

        display: flex;
        flex-direction: column;

        & > p {
          border-bottom: 2px solid ${({ theme }) => theme.neutral.gray300};
          text-align: left;
          font-weight: 500;
          font-size: .95rem;
          padding : 16px 0;
          display: flex;
          gap : 24px;
          justify-content: space-between;
          color : ${({ theme }) => theme.neutral.gray900};

          @media (max-width : 767px) {
            font-size: .7rem;
          }

          & > span {
            flex-basis: 120px;
            font-weight: 700;
            font-size: .95rem;
            color : ${({ theme }) => theme.neutral.gray900};

            @media (max-width : 767px) {
              font-size: .7rem;
            }
          }
        }
      }
    }
  }
  
  .description-popup {
    background-color: ${({ theme }) => theme.neutral.gray100};
    color: ${({ theme }) => theme.neutral.gray900};
    font-size: 0.8rem;
    padding: 6px 16px;
    border-radius: 1px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);

    display : flex !important;
    align-items: center;

    & > .swal2-icon {
      width: 32px;
      height: 32px;
      
      & > .swal2-x-mark{
        & > * {

          &:nth-child(1) {
            display: none;
          }
          &:nth-child(2) {
            position: relative;
            left : 50%;
            top : 50%;
            transform: rotate(0deg);
            transform : translate(-50%, -50%);
          }
          
        }
      }
    }

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

  .clipboard-container {
    z-index: 9999 !important;
  }

  .success-clipboard {
    background-color: ${({ theme }) => theme.neutral.gray0};
    color: ${({ theme }) => theme.neutral.gray900};
    font-size: 0.9rem;
    padding : 8px 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.22);
    border-radius: 2px;
  }

  .search-container {
    z-index: 9999 !important;
    margin-top : 24px;
  }

  .search-error {
    background-color: ${({ theme }) => theme.neutral.gray900};
    color: ${({ theme }) => theme.neutral.gray100};
    font-size: 0.9rem;
    padding : 8px 12px;
    box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.5);
  }
`;

export default function GlobalStyle() {
  const location = useLocation();
  const isCms = location.pathname.startsWith('/theiautoCMS');

  return <GlobalStyledComponent isCms={isCms} />;
};