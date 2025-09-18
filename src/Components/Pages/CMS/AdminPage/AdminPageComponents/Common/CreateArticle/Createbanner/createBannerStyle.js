import styled from "styled-components";

const BannerContainer = styled.div`
  width: 100%;
  height: 245px;
  background-color: rgba(0, 0, 0, 0.1);
  position : relative;
  overflow-y: hidden;
  overflow-x: hidden;
  background-image: url(${({ $src }) => (typeof $src === 'string' && $src ? $src : 'none')});
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
  
  .add-image {
    opacity: 0.7;
    transition: opacity 0.1s;
    cursor: pointer;
    position: absolute;
    right: 24px;
    bottom: 16px;
    z-index: 1;

    &:hover {
      opacity: 0.4;
    }

    @media (max-width: 767px) {
      right: 4px;
      bottom: 4px;
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
  width: 480px;
  height: auto;
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


export {
  BannerContainer, TitleInput, SubTitleContainer,
  SubTitleInput, BannerContainerWrap
};