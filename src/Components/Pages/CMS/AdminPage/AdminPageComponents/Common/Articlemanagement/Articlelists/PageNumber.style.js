import { motion } from "framer-motion";
import styled from "styled-components";

const NumberContainer = styled.div`
  display : flex;
  justify-content: center;
  gap : 16px;
  position: relative;
  margin : 48px 0 40px 0;  

  input {
    width: 48px;
    height: 24px;
    font-size : .7rem;
    border : none;
    outline: none;
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.2);
    border-radius: 9999px;
    padding : 0 8px;
    font-weight: 700;
    color : ${({ theme }) => theme.primary.red500};
  }
`;

const numberAmountVariants = {
  hidden: { opacity: 0, y: 0 },
  visible: {
    opacity: 1,
    y: -32,
    transition: {
      duration: 0.2, ease: "easeInOut", type: "spring", stiffness: 150, damping: 10
    }
  }
}

const NumberAmountBtn = styled(motion.div)`
  position: absolute;
  display : flex;
  align-items: center;
  justify-content: center;
  padding : 4px 6px;
  gap : 4px;
  margin: 0;
  font-size : .6rem;
  border : none;
  font-weight: bold;
  background-color: ${({ theme }) => theme.primary.red500};
  color : ${({ theme }) => theme.neutral.gray100};
  border-radius: 9999px;

  width: 48px;
  height: 24px;
  cursor: pointer;

  transition: background-color 0.3s;

  opacity: ${({ $movePage }) => $movePage ? '1' : '0'};
  pointer-events: ${({ $movePage }) => $movePage ? 'auto' : 'none'};

  &:hover {
    background-color: ${({ theme }) => theme.primary.red700};
  }
`;

const NumberBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap : 16px;

  svg {
    cursor: pointer;
    transition : color 0.3s;

    &:hover {
      color : ${({ theme }) => theme.primary.red700};
    }
  }
`;

export { NumberContainer, NumberBox, NumberAmountBtn, numberAmountVariants };