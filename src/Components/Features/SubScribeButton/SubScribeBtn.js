import styled from "styled-components";
import logo from '../../../Assets/theiautoLogo.png';
import { BsArrowRightShort } from "react-icons/bs";
import { useState } from "react";

const SubScribeContainer = styled.div`
  width: ${({ $isActive }) => $isActive ? '284px' : '152px'};
  height: 36px;
  padding : 4px;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.neutral.gray100};
  position: relative;
  cursor: pointer;
  transition: width 0.3s;

  svg {
    position: absolute;
    top: 50%;
    right: 8px;

    transform: translateY(-50%);
  }
`;

const SubScribeBox = styled.div`
  width: 116px;
  height: 100%;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5)inset;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.neutral.gray300};
  display: flex;
  align-items: center;
  justify-content: center;

  & > .subscribe-logo {
    width: 80px;
    height: 30px;
    margin: 0;
  }
`;

const SubScribeDescrip = styled.span`
  position: absolute;
  font-size: .85rem;
  color : ${({ theme }) => theme.neutral.gray600};
  right : 32px;
  top: 50%;
  transform : translateY(-50%);

  opacity: ${({ $isActive }) => $isActive ? '1' : '0'};
  visibility: ${({ $isActive }) => $isActive ? 'visible' : 'hidden'};

  transition: opacity 0.7s;
`;

function SubScribeBtn() {
  const [isActive, setIsActive] = useState(false);

  return (
    <SubScribeContainer
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      $isActive={isActive}
    >
      <SubScribeBox>
        <img src={logo} alt="logo" className="subscribe-logo" />
      </SubScribeBox>
      <SubScribeDescrip $isActive={isActive}>월간지 구독하러 가기</SubScribeDescrip>
      <BsArrowRightShort size={20} color="gray" />
    </SubScribeContainer>
  )
}

export default SubScribeBtn;