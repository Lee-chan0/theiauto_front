import styled from "styled-components";

const UserProfileContainer = styled.div`
  margin-top: 16px;

  display : flex;
  flex-direction: column;
  align-items: center;
  gap : 12px;

  position: relative;
  
  svg {
    margin-left: 8px;
    cursor: pointer;
    opacity: 0.5;
    position: absolute;
    right : 0;

    &:hover {
      opacity: 0.8;
    }
  }
`;

const UserProfileImgBox = styled.div`
  width: 140px;
  height: 140px;
  background-color: ${({ theme }) => theme.primary.red100};
  border-radius: 50%;
`;

const UserProfileImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: contain;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.9);
  border : 1px solid #fff;
`;

const UserProfileName = styled.span`
  color : ${({ theme }) => theme.neutral.gray100};
  display : flex;
  align-items: center;
`;

const UserProfileEmail = styled.span`
  font-size : 0.8rem;
  color : ${({ theme }) => theme.neutral.gray600};
`;

export { UserProfileContainer, UserProfileImgBox, UserProfileName, UserProfileEmail, UserProfileImg };