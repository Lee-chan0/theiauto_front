import styled from "styled-components";
import { FiChevronUp } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

const BorderLine = styled.div`
  position: fixed;
  bottom : 40px;
  right : 40px;
  z-index: 15;
  cursor: pointer;
  border-radius: 4px;
  padding : 8px 16px;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  pointer-events: ${({ $visible }) => ($visible ? 'auto' : 'none')};
  transition : opacity 0.4s ease, background-color 0.4s;
  background-color: rgba(26, 26, 26, 0.65);
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: ${({ theme }) => theme.primary.red700};
  }

  & > span {
    font-size: 1rem;
    color : ${({ theme }) => theme.neutral.gray100};
    font-weight: bold;
    letter-spacing: 2px;
    position: relative;
    left : 2px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media (max-width : 767px) {
      font-size: .7rem;
    }
  }

  @media (max-width : 767px) {
    bottom : 64px;
    right : 16px;
  }
`;

function HandleScrollTopBtn() {
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      setIsVisible(scrollPercent > 30);
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <BorderLine $visible={isVisible} onClick={handleClick}>
      <span>
        <FiChevronUp size={isMobile ? 20 : 28} />
        UP
      </span>
    </BorderLine>
  )
}

export default HandleScrollTopBtn;