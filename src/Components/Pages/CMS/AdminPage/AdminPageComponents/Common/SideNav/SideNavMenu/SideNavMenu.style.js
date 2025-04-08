import { motion } from "framer-motion";
import styled from "styled-components";

const SideNavMenuContainer = styled.div`
  width: 100%;
  display : flex;
  flex-direction: column;
`;

const SideNavMenuTitleBox = styled.div`
  width: 100%;
  margin-top : 24px;

  span {
    display: block;
    font-size : 0.8rem;
    margin-bottom : 8px;
    color : ${({ theme }) => theme.neutral.gray100};
    cursor: pointer;
    transition : color 0.3s;

    &:hover {
      color : ${({ theme }) => theme.primary.red500};
    }
  }
`;

const SideNavMenuTitle = styled.h2`
  color : ${({ theme }) => theme.primary.red500};
  font-weight: 400;
  font-size: 0.95rem;
  margin: 0;
  border-bottom: 2px solid ${({ theme }) => theme.primary.red500};
  padding-bottom: 8px;
  margin-bottom : 8px;
`;

const SideNavMenuLists = styled.ul`
  list-style: none;
  margin : 0;
  padding : 0;
  display : flex;
  flex-direction: column;
  gap : 8px;
  
`;

const SideNavMenuItems = styled.li`
  cursor: pointer;
  color : ${({ theme }) => theme.neutral.gray100};
  font-size: 0.8rem;
  transition : color 0.3s;
  position : relative;

  display : flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    color : ${({ theme }) => theme.primary.red500};
  }

  svg {
    transition: transform 0.2s ease-in-out;

    &.active{
      transform: rotate(180deg);
    }
  }


`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    }
  }
};

const childVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 }
  }
}

const SubCategoryItemsBox = styled(motion.div)`
  position: absolute;
  width: fit-content;
  left: 100%;
  margin-left: 24px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  display: flex;
  flex-direction: column;
  gap : 4px;
  padding : 4px;
  -webkit-backdrop-filter: blur(3px);
  backdrop-filter: blur(3px);
  box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.5);
`;

const SubCategoryItems = styled(motion.div)`
  color : ${({ theme }) => theme.neutral.gray900};
  text-align: center;
  font-weight: bold;
  font-size : .85rem;
  white-space: nowrap;
  padding : 8px 8px;
  color : ${({ theme }) => theme.neutral.gray900};
  border-radius: 4px;
  display : flex;
  align-items: center;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    color : ${({ theme }) => theme.neutral.gray0};
    background-color:${({ theme }) => theme.neutral.gray900};
  }
`;

export {
  SideNavMenuContainer, SideNavMenuTitleBox,
  SideNavMenuTitle, SideNavMenuItems, SideNavMenuLists,
  SubCategoryItems, SubCategoryItemsBox, childVariants,
  containerVariants
};