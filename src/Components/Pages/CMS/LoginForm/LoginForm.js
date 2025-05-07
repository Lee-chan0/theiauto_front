import {
  LoginFormContainer, LoginFormBox, CopyRight,
  LoginFormBannerImage, LoginFormLabel, LoginPlaceHolder,
  LoginFormTextInput, LoginFormLayoutBox, LoginFormButton, HasValues,
  BackGroundImgBox,
  BackGroundLogo
} from './LoginForm.style';
import logo from '../../../../Assets/theiautoLogoWhite.png';
import logoBlack from '../../../../Assets/theiautoLogo.png';
import { useState } from 'react';
import { useLogin } from '../../../Hooks/ApiHooks/User/useLogin';
import { CgSpinner } from "react-icons/cg";

function LoginForm() {
  const loginMutation = useLogin();
  const [hasValues, setHasValues] = useState(true);
  const [isActiveInput, setIsActiveInput] = useState({
    loginId: false,
    password: false,
  });
  const [loginValues, setLoginValues] = useState({
    loginId: "",
    password: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    const id = e.target.id;

    setLoginValues((prev) => ({
      ...prev,
      [id]: value
    }))
  };

  const handleInput = (el) => {
    setIsActiveInput((prev) => ({
      ...prev,
      [el]: true
    }))
  }

  const handleOutput = (el) => {
    if (!loginValues[el]) {
      setIsActiveInput((prev) => ({
        ...prev,
        [el]: false
      }))
    }
  }

  const handleInputClick = () => {
    setHasValues(true);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (loginValues.password.trim() === "" || loginValues.loginId.trim() === "") {
      setHasValues(false);
      return;
    }

    loginMutation.mutate(loginValues, {
      onSuccess: (data) => {
        const { accessToken } = data;
        sessionStorage.setItem('accessToken', accessToken);
      },
      onError: () => {
        setHasValues(false);
      }
    });

    setLoginValues({ loginId: "", password: "" });
    setIsActiveInput({ loginId: false, password: false });
  }

  return (
    <LoginFormContainer>
      <BackGroundImgBox>
        <BackGroundLogo src={logoBlack} alt="logo" />
      </BackGroundImgBox>
      <CopyRight>Designed By Freepik</CopyRight>
      <LoginFormBox onSubmit={handleSubmit} onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}>
        <LoginFormBannerImage>
          <img src={logo} alt="logo" />
          <span>관리자 로그인</span>
        </LoginFormBannerImage>
        <LoginFormLayoutBox>
          <LoginFormLabel htmlFor='loginId'>
            <LoginFormTextInput
              type='text'
              id='loginId'
              $isActive={isActiveInput.loginId}
              $hasValues={hasValues}
              value={loginValues.loginId}
              onChange={handleChange}
              onFocus={() => handleInput('loginId')}
              onBlur={() => handleOutput('loginId')}
              onClick={handleInputClick}
            />
            <LoginPlaceHolder $isActive={isActiveInput.loginId} $isId={true}>
              ID
            </LoginPlaceHolder>
          </LoginFormLabel>
          <LoginFormLabel htmlFor='password'>
            <LoginFormTextInput
              type='password'
              id='password'
              $isActive={isActiveInput.password}
              $hasValues={hasValues}
              value={loginValues.password}
              onChange={handleChange}
              onFocus={() => handleInput('password')}
              onBlur={() => handleOutput('password')}
              onClick={handleInputClick}
            />
            <LoginPlaceHolder $isActive={isActiveInput.password}>PASSWORD</LoginPlaceHolder>
          </LoginFormLabel>
          <HasValues $hasValues={hasValues}>아이디 및 비밀번호를 확인해 주세요.</HasValues>
          <LoginFormButton type='submit'>{loginMutation.isPending ? <CgSpinner size={24} /> : 'LOGIN'}</LoginFormButton>
        </LoginFormLayoutBox>
      </LoginFormBox>
    </LoginFormContainer>
  )
}

export default LoginForm;