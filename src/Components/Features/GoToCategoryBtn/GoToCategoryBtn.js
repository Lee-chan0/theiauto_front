import styled from "styled-components";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";


const BtnBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  & > button {
    display: flex;
    align-items: center;
    gap : 4px;

    font-size: .85rem;
    border : none;
    box-shadow: 0 0 10px 0px rgba(0, 0, 0, 0.2);
    padding : 4px 16px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 500;
    position: relative;
    overflow: hidden;

    @media (max-width : 767px) {
      padding : 4px 8px;
      
    }

    & > span {
      transition: color 0.5s;
      z-index: 1;
      color : ${({ $isHover }) => $isHover ? '#f2f2f2' : '#1a1a1a'};

      @media (max-width : 767px) {
        font-size: .6rem;
      }
    }

    & > svg {
      z-index: 1;
      transition: color 0.5s;
    }

    
    &::before {
      content: '';
      width: 125%;
      height: 125%;
      position: absolute;
      transition: right 0.5s;
      right : ${({ $isHover }) => !$isHover ? '100%' : '0'};
      background-color: rgba(0, 0, 0, 0.5);
      border-radius: 8px;
    }
  }
`;

function GoToCategoryBtn({ onClick }) {
  const [isHover, setIsHover] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <BtnBox $isHover={isHover}>
      <button onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} onClick={(e) => onClick(e)}>
        <span>View More</span>
        <MdOutlineArrowRightAlt size={isMobile ? 16 : 24} color={isHover ? '#f2f2f2' : '#1a1a1a'} /></button>
    </BtnBox>
  )
}

export default GoToCategoryBtn;