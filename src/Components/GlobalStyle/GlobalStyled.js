import { createGlobalStyle } from "styled-components";

const GlobalStyled = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    font-family: 'Noto Sans KR', sans-serif;
    max-width: 1440px;
    margin : 0 auto;
    padding : 0 40px;
  }
`;

export default GlobalStyled