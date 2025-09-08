import styled from "styled-components";


const BannerContainer = styled.div`
  width: 100%;
  height: 245px;
  background-color: rgba(0, 0, 0, 0.1);
  position : relative;
  overflow-y: hidden;
  overflow-x: hidden;
  background-image: url(${({ $src }) => $src});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  & > .menu-bar {
    position: absolute;
    top : 4px;
    right: 4px;
    color: ${({ $hasPreview }) => $hasPreview ? '#fff' : '#000'};
  }

  @media (max-width : 767px) {
    height: 160px;
  }
  
  svg {
    opacity: 0.7;
    transition: opacity 0.1s;
    cursor: pointer;
    position: absolute;
    right: 24px;
    bottom : 16px;
    
    &:hover {
      opacity: 0.4;
    }

    @media (max-width : 767px) {
      right: 4px;
      bottom : 4px;
    }
  }
`;

const BannerContainerWrap = styled.div`
  width: 100%;
  height: 100%;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.8) 0%, transparent 100%);
`;

const TitleInput = styled.textarea`
  position: absolute;
  top : 50%;
  left : 50%;
  transform: translate(-50%, -50%);
  background-color: transparent;
  border: none;
  outline: none;
  resize: none;
  width: 400px;
  font-size: 1.4rem;
  overflow-y: hidden;
  font-weight: bold;
  color : ${({ $hasPreview, theme }) => $hasPreview ? theme.neutral.gray0 : theme.neutral.gray900};
  line-height: 1.2;
  text-align: center;

  @media (max-width : 767px) {
    font-size: 1rem;
    width: 80%;
  }

  &::placeholder {
    opacity: 1;
    color : ${({ $hasPreview, theme }) => $hasPreview ? theme.neutral.gray300 : theme.neutral.gray600};
  }

  &:focus {
    &::placeholder {
      opacity: 0;
      transition: opacity 0.1s;
    }
  }
`;

const SubTitleContainer = styled.div`
  position: absolute;
  bottom : 8px;
  width: 100%;

  display : flex;
  align-items: center;
  justify-content: center;
`;

const SubTitleInput = styled.input`
  margin-left: 8px;
  width: 50%;
  height: 24px;
  color : ${({ $hasPreview, theme }) => $hasPreview ? theme.neutral.gray0 : theme.neutral.gray900};
  border : none;
  outline: none;
  background-color: transparent;
  font-size: .85rem;
  text-align: center;
  margin-bottom: 8px;

  @media (max-width : 767px) {
    font-size: .75rem;
  }

  &::placeholder {
    font-weight: 500;
    color : ${({ $hasPreview, theme }) => $hasPreview ? theme.neutral.gray300 : theme.neutral.gray600};
  }

  &:focus {
    &::placeholder {
      opacity: 0;
    }
  }
`;

const LoginUserBox = styled.div`
  position: absolute;
  left : 24px;
  bottom : 4px;
  background-color: #436fd9;
  border-radius: 3px;
  padding : 8px 16px;
  font-weight: 600;
  z-index: 1;
  cursor: pointer;
  color : ${({ theme }) => theme.neutral.gray0};
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.3);

  & > .login-user-info {
    font-size: .8rem;

  @media (max-width : 767px) {
      font-size: .65rem;
    }
  }

  @media (max-width : 767px) {
    left : 0;
    top : 16px;
    bottom : auto;
    border-radius: 0;
    padding : 6px 10px;
  }
`;

const SelectUserBox = styled.ul`
  position: absolute;
  left: 0;
  bottom : calc(100% + 6px);
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  gap : 4px;
  z-index: 1;
  transition: opacity 0.3s, visibility 0.3s, transform 0.3s;

  opacity: ${({ $userBoxActive }) => $userBoxActive ? '1' : '0'};
  visibility: ${({ $userBoxActive }) => $userBoxActive ? 'visible' : 'hidden'};
  transform: ${({ $userBoxActive }) => $userBoxActive ? 'translateY(0px)' : 'translateY(16px)'};

  @media (max-width : 767px) {
    transform: ${({ $userBoxActive }) => $userBoxActive ? 'translateY(0px)' : 'translateY(16px)'};
    left : 0;
    bottom : auto;
    top : calc(100% + 6px);
    border-radius: 0;
  }
`;

const SelectBtn = styled.div`
  position: absolute;
  left : 101%;
  bottom : 0;
  border : none;
  padding : 8px;
  border-radius: 3px;
  font-size: .8rem;
  cursor: pointer;
  z-index: 1;
  transition: transform 0.3s ease, opacity 0.25s;
  background-color: #436fd9;

  transform: ${({ $userBoxActive }) => $userBoxActive ? 'rotate(180deg)' : 'rotate(0deg)'};
  color: #ccdbff;

  &:hover {
    opacity: 0.6;
  }

  @media (max-width : 767px) {
    font-size: .65rem;
    border-radius: 0;
    padding : 6px;

    transform: ${({ $userBoxActive }) => $userBoxActive ? 'rotate(0deg)' : 'rotate(180deg)'};
  }
`;

const UserSelector = styled.li`
  white-space: nowrap;
  width: fit-content;
  font-size: .8rem;
  padding : 8px 16px;
  background-color: #243566;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  font-weight: 400;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.27) inset;
  color : ${({ theme }) => theme.neutral.gray600};

  &:hover {
    background-color: #436fd9;
    color : ${({ theme }) => theme.neutral.gray100};
  }

  @media (max-width : 767px) {
    border-radius: 0;
    font-size: .65rem;
    padding : 6px 10px;
  }
`;

export {
  BannerContainer, TitleInput, SubTitleContainer,
  SubTitleInput, BannerContainerWrap,
  SelectUserBox, UserSelector, SelectBtn, LoginUserBox
};