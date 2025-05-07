import { useCallback, useEffect, useRef } from "react";
import { BiSolidLeftArrow } from "react-icons/bi";
import { BiSolidRightArrow } from "react-icons/bi";
import styled from "styled-components";

const DotContainer = styled.div`
  position: absolute;
  right: 40px;
  bottom : 40px;

  display : flex;
  align-items: center;
  gap : 16px;

  z-index: 1;

  svg {
    cursor: pointer;
    opacity: 0.5;

    &:hover {
      opacity: 1;
    }
  }
`;

const Dot = styled.div`
  width: ${({ $isActive }) => $isActive ? '12px' : '4px'};
  height: ${({ $isActive }) => $isActive ? '12px' : '4px'};
  background-color: ${({ theme, $isActive }) => !$isActive ? 'rgba(242, 242, 242, 0.8)' : theme.primary.red700};
  border-radius: 9999px;

  transition : width 0.5s, height 0.5s, background-color 0.5s;
`;

function ChangeBannerDot({ activeIndex, setActiveIndex, articleLength, isArticleHover }) {
  const intervalRef = useRef(null);

  const resetInterval = useCallback(() => {
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => {
        if (prev + 1 > articleLength - 1) {
          return 0;
        } else {
          return prev + 1;
        }
      })
    }, 4000);
  }, [articleLength, setActiveIndex]);

  const handleChangeIndex = (direction) => {
    if (!direction) return;

    direction === 'left' ?
      setActiveIndex((prev) => {
        if (prev - 1 < 0) {
          return articleLength - 1;
        } else {
          return prev - 1;
        }
      })
      :
      setActiveIndex((prev) => {
        if (prev + 1 > articleLength - 1) {
          return 0
        } else {
          return prev + 1;
        }
      });

    resetInterval();
  }

  useEffect(() => {
    resetInterval();

    return () => {
      clearInterval(intervalRef.current);
    }
  }, [resetInterval]);

  useEffect(() => {
    if (isArticleHover) {
      clearInterval(intervalRef.current);
    } else {
      resetInterval();
    }
  }, [isArticleHover, resetInterval]);

  return (
    <DotContainer>
      <BiSolidLeftArrow size={20} color="gray" onClick={() => handleChangeIndex('left')} />
      {
        [...Array(articleLength)].map((_, index) => (
          <Dot key={index} $isActive={index === activeIndex} />
        ))
      }
      <BiSolidRightArrow size={20} color="gray" onClick={() => handleChangeIndex('right')} />
    </DotContainer>
  )
}

export default ChangeBannerDot;