import styled, { keyframes } from "styled-components";
import { FaSpinner } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";

const spinner = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoadingContainer = styled.div`
  width: 100%;
`;

const LoadingInnerBox = styled.div`
  max-width: 1280px;
  margin : 0 auto;
  padding : 40px;

  @media (max-width : 1279px) {
    max-width: 100%;
    padding : 24px;
  }
`;

const LoadingContentBox = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const SpinnerBox = styled.div`
  padding : 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.neutral.gray600};
  box-shadow: 0 0 15px 2px rgba(0, 0, 0, 0.2);
  border-radius: 8px;

  & > svg {
    animation: ${spinner} 1s linear infinite;
  }
`;

function NewsLoadingPage() {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <LoadingContainer>
      <LoadingInnerBox>
        <LoadingContentBox>
          <SpinnerBox>
            <FaSpinner size={isMobile ? 28 : 32} color="#f2f2f2" />
          </SpinnerBox>
        </LoadingContentBox>
      </LoadingInnerBox>
    </LoadingContainer>
  )
}

export default NewsLoadingPage;