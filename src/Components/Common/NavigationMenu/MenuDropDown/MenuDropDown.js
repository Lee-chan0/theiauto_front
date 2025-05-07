import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const DropDownContainer = styled.div`
  position: absolute;
  width: 100%;
  top: 100%;
`;

const DropDownList = styled(motion.ul)`
  display: flex;
  flex-direction: column;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
`;

const DropDownItem = styled(motion.li)`
  color: ${({ theme }) => theme.neutral.gray100};
  text-align: center;
  font-size: 0.9rem;
  font-weight: 500;
  padding: 8px 8px;
  background-color: ${({ theme }) => theme.neutral.gray900};
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  z-index: 9999;

  &:hover {
    background-color: ${({ theme }) => theme.neutral.gray100};
    color: ${({ theme }) => theme.neutral.gray900};
  }

  &:nth-last-child(1) {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`;

const ListVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    },
  },
};

const ItemVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 },
  },
};

function MenuDropDown({ categoryId, categories }) {
  const [childCategory, setChildCategory] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const navigate = useNavigate();

  const handleClickChild = (categoryId) => {
    navigate(`/category/${categoryId}`);
  }

  useEffect(() => {
    if (!categoryId) {
      setChildCategory([]);
      setIsReady(false);
      return;
    }

    const filterChild = categories.filter((child) => child.parentCategoryId === categoryId);
    setChildCategory(filterChild);
    setIsReady(true);
  }, [categoryId, categories]);

  if (!categoryId || !isReady || childCategory.length === 0) {
    return null;
  }

  return (
    <DropDownContainer>
      <DropDownList
        variants={ListVariants}
        initial="hidden"
        animate="visible"
      >
        {childCategory.map((child) => (
          <DropDownItem
            key={child.categoryId}
            variants={ItemVariants}
            onClick={() => handleClickChild(child.categoryId)}
          >
            {child.categoryName}
          </DropDownItem>
        ))}
      </DropDownList>
    </DropDownContainer>
  );
}

export default MenuDropDown;