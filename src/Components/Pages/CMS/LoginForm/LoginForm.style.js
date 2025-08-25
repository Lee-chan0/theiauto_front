import styled, { css, keyframes } from "styled-components";
import userIcon from '../../../../Assets/userIcon.svg';
import passwordIcon from '../../../../Assets/passwordIcon.svg';
import backImg from '../../../../Assets/road-6654573_1920.jpg';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoginFormContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BackColor = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.neutral.gray900};
  
  opacity: ${({ $isTablet }) => !$isTablet ? '0.4' : '1'};
  background-image: ${({ $isTablet }) => !$isTablet ? `url(${backImg})` : ''};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const BackGroundImgBox = styled.div`
  max-width: 1280px;
  max-height: 720px;
  width: 100%;
  height: 100%;
  position: absolute;
`;

const HasValues = styled.span`
  color : ${({ theme }) => theme.primary.red700};
  font-size : 0.9rem;
  max-height: ${({ $hasValues }) => $hasValues ? '0' : '16px'};
  opacity: ${({ $hasValues }) => $hasValues ? '0' : '1'};
  visibility: ${({ $hasValues }) => $hasValues ? 'hidden' : 'visible'};

  transition: all 0.3s;
`;

const LoginFormBox = styled.form`
  width : 400px;
  padding: 16px 30px 16px 30px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 3px;
  backdrop-filter: blur(4px);
  border : 1px solid rgba(255, 255, 255, 0.2);
  transition : height 0.3s;

`;

const LoginFormBannerImage = styled.div`
  width: 100%;
  height: 36px;
  margin-bottom: 16px;
  display : flex;
  align-items: center;
  justify-content: space-between;

  img {
    width: 30%;
    height: 65%;
    opacity: 0.8;
  }

  span {
    color : ${({ theme }) => theme.neutral.gray0};
    font-size : .9rem;
    font-weight: 100;
  }
`;

const LoginFormLayoutBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  & > * {
    margin-bottom : 8px;
  }
`;

const LoginFormLabel = styled.label`
  width: 100%;
  display : flex;
  align-items: center;
  justify-content: right;
`;

const LoginFormTextInput = styled.input`
  width: ${({ $isActive }) => $isActive ? '80%' : '100%'};
  border : ${({ theme, $hasValues }) => $hasValues ?
    `none` : `2px solid rgba(255, 0, 0, 0.8)`};
  border-radius : ${({ $isActive }) => $isActive ? '20px' : '3px'};
  height: 36px;
  font-size : 0.9rem;
  position: relative;
  transition : all 0.5s;
  outline: none;
  padding-left : 16px;

  background-image : url(${({ id }) => id === 'password' ? passwordIcon : userIcon});
  background-size : 20px;
  background-position : 95% 50%;
  background-repeat : no-repeat;
`;

const LoginPlaceHolder = styled.div`
  cursor: text;
  margin-right : 8px;
  position: absolute;
  z-index: 1;
  margin-left: 4px;
  
  transition: color 0.5s, font-size 0.5s, left 0.5s ;
  color : ${({ $isActive, theme }) => $isActive ? '#fff' : theme.neutral.gray600};
  font-size: ${({ $isActive }) => $isActive ? '0.9rem' : '0.8rem'};
  left : ${({ $isActive, $isId }) => {
    if ($isActive && $isId) {
      return '18%';
    } else if ($isActive) {
      return '12px';
    } else {
      return '8%';
    }
  }};
  
`;

const LoginFormButton = styled.button`
  width: 100%;
  height: 40px;
  background-color: ${({ theme }) => theme.neutral.gray900};
  color : ${({ theme }) => theme.neutral.gray100};
  border : none;
  outline: none;
  font-weight: bold;
  letter-spacing: 3px;
  transition: background-color 0.3s, transform 0.3s;
  will-change: transform;
  margin-top : 4px;
  cursor: pointer;
  overflow: hidden;
  
    &::after {
      content: "";
      position: absolute;
      right : -100%;
      top : 0;
      width: 100%;
      height: 100%;
      transition: right 0.5s;
      pointer-events: none;
      background-color: rgba(255, 255, 255, 0.05);
    }
  
    &::before {
      content: "";
      position: absolute;
      left : -100%;
      bottom : 0;
      width: 100%;
      height: 100%;
      transition: left 0.5s;
      pointer-events: none;
      background-color: rgba(255, 255, 255, 0.05);
    }
  
  &:hover {
    background-color: #000;
    transform : scale(1.01);

    &::before {
      content: "";
      left : 0%;
    }

    &::after {
      content : "";
      right : 0%;
    }
  }

  svg {
    animation: ${rotate} 0.5s linear infinite;
  }
`;



export {
  LoginFormContainer, LoginFormBox, LoginPlaceHolder, HasValues,
  LoginFormBannerImage, LoginFormLabel, BackGroundImgBox,
  LoginFormTextInput, LoginFormLayoutBox, LoginFormButton, BackColor
};