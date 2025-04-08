import styled from "styled-components";
import logo from '../../../../../../../../Assets/theiautoLogo.png';

const UpdateUserContainer = styled.div`
  width: calc(100% - 240px);
  height: 100%;
  position : fixed;
  right : 0;
  top : 0;
  z-index: -1;
  overflow-y: auto;

  & > .background-img {
    width: 100%;
    height: auto;
    background-image: url(${logo});
    background-size: 160px;
    background-repeat: repeat;
  }
`;

const UserInfoContainer = styled.div`
  background-image: linear-gradient(90deg, rgba(26, 26, 26, 1) 36%, rgb(209, 35, 42) 100%);
  padding : 24px;
`;

const UpdateFormContainer = styled.div`
  display : flex;
  justify-content: center;
  padding : 40px 0;
`;

const UpadteUserForm = styled.form`
  width: 400px;
  display : flex;
  flex-direction: column;
  gap : 16px;
  padding : 24px 16px;
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  background-color: ${({ theme }) => theme.neutral.gray100};
`;

const UpdateFormLabel = styled.label`
    width: 100%;
    display: ${({ className }) => className === 'profile-image-container' ? `block` : 'flex'};
    align-items: center;
    gap : 8px;
`;

const UpdateDesc = styled.span`
  flex : 0 0 20%;
  font-weight: bold;
  text-align: ${({ className }) => className === 'profile-image' ? `left` : `right`};
  font-size: .85rem;

  &.profile-image {
    
  }
`;

const UpdateInput = styled.input`
  flex : 0 0 70%;
  height: 24px;
  font-size : 0.8rem;
  border : none;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.5);
  transition: border-radius 0.3s, box-shadow 0.3s;
  padding : 0 8px;
  
  &:focus { 
    outline: 3px solid rgba(255, 0, 0, 0.5);
    border-radius: 16px;
  }
`;
const ProfileImgBoxShadow = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: ${({ $isHover }) => $isHover ? `rgba(0, 0, 0, 0.6)` : `rgba(0, 0, 0, 0)`};

  transition : background-color 0.2s;
`;


const ProfileImageBox = styled.label`
  width: 100%;
  height: 200px;
  border-radius: 2px;
  background-color: ${({ theme }) => theme.neutral.gray300};
  margin-top: 8px;
  position: relative;

  display : flex;
  align-items: center;
  justify-content: center;

  background-image: url(${({ $src }) => $src ? $src : logo});
  background-size: ${({ $src }) => $src ? 'cover' : '200px 72px'};
  background-repeat: no-repeat;
  background-position: center;
  
  transition: background-color 0.3s;

  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.neutral.gray600};
  }

  svg {
    z-index: 1;
    opacity: 0.8;
  }
`;

const UpdateBtn = styled.button`
  cursor: pointer;
  border : none;
  font-size : 0.9rem;
  font-weight: bold;
  padding : 8px 0;
  background-color: ${({ theme }) => theme.neutral.gray900};
  border-radius: 2px;
  color : ${({ theme }) => theme.neutral.gray0};
  transition: background-color 0.3s, transform 0.3s, box-shadow 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.primary.red700};
    transform : scale(1.003);
    box-shadow: 0 3px 5px 1px rgba(0, 0, 0, 0.5);
  }
`;

export {
  UpdateUserContainer, UpadteUserForm, UserInfoContainer, UpdateBtn, ProfileImgBoxShadow,
  UpdateDesc, UpdateInput, UpdateFormContainer, ProfileImageBox, UpdateFormLabel
};