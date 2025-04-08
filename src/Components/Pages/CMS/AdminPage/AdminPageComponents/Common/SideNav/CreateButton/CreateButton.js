import styled from "styled-components";
import { BiSolidPlusSquare } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

const Container = styled.div`
  position : absolute;
  width: 100%;
  bottom : 0;
  left : 0;
`;

const CreateBtn = styled.button`
  width: 100%;
  height: 40px;
  cursor: pointer;
  border : none;
  color : ${({ theme }) => theme.neutral.gray0};
  font-weight: bold;
  background-color: ${({ theme }) => theme.primary.red500};
  display : flex;
  align-items: center;
  justify-content: center;
  gap : 4px;
  transition: background-color 0.2s;

  svg {
    position: relative;
    top : 1px;
  }
  
  &:hover {
    background-color: ${({ theme }) => theme.primary.red700};
  }
`;

function CreateButton() {
  const navigate = useNavigate();

  const handleClickCreate = useCallback(() => {
    navigate('/theiautoCMS/adminpage/create-article');
  }, [navigate]);

  return (
    <Container>
      <CreateBtn onClick={handleClickCreate}><BiSolidPlusSquare size={20} />기사 쓰기</CreateBtn>
    </Container>
  )
}

export default CreateButton;