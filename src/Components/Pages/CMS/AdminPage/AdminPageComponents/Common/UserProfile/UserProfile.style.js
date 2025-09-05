import styled from "styled-components";

const UserProfileContainer = styled.div`
  margin-top: 16px;

  display : flex;
  flex-direction: column;
  
  align-items: center;
  gap : 12px;

  position: relative;

  @media (max-width : 767px) {
    gap : 8px;
    margin-top: 16px;
    margin-bottom: 12px;
  }
`;

const UserProfileImgBox = styled.div`
  width: 140px;
  height: 140px;
  background-color: ${({ theme }) => theme.primary.red100};
  border-radius: 50%;
  cursor: pointer;

  position: relative;
`;

const UserProfileImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: contain;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.9);
  border : 1px solid #fff;

  position: relative;
`;

const UserImageWrap = styled.label`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: red;
  border-radius: 50%;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s, visibility 0.3s;
  cursor: pointer;

  opacity: ${({ $isHover }) => $isHover ? '1' : '0'};
  visibility: ${({ $isHover }) => $isHover ? 'visible' : 'hidden'};
`;

const UserProfileName = styled.span`
  color : ${({ theme }) => theme.neutral.gray100};
  display : flex;
  align-items: center;

  @media (max-width : 767px) {
    font-size: .8rem;
  }
`;

const UserProfileEmail = styled.span`
  font-size : 0.8rem;
  color : ${({ theme }) => theme.neutral.gray600};

  @media (max-width : 767px) {
    font-size: .7rem;
  }
`;

export { UserProfileContainer, UserProfileImgBox, UserProfileName, UserProfileEmail, UserProfileImg, UserImageWrap };