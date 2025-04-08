import styled from "styled-components";


const BannerContainer = styled.div`
  width: 100%;
  height: 245px;
  background-color: rgba(0, 0, 0, 0.1);
  position : relative;
  overflow-y: auto;
  overflow-x: hidden;
  background-image: url(${({ $src }) => $src});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  
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
  color : ${({ theme }) => theme.neutral.gray0};
  line-height: 1.2;
  text-align: center;

  &::placeholder {
    opacity: 1;
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
  color : ${({ theme }) => theme.neutral.gray0};
  border : none;
  outline: none;
  background-color: transparent;
  font-size: .85rem;
  text-align: center;
  margin-bottom: 8px;

  &::placeholder {
    font-weight: bold;
  }

  &:focus {
    &::placeholder {
      opacity: 0;
    }
  }
`;

export { BannerContainer, TitleInput, SubTitleContainer, SubTitleInput, BannerContainerWrap };