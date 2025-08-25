import logo from '../../Assets/theiautoLogoWhite.png';
import styled, { keyframes } from 'styled-components';
import { Navigate, useNavigate, useNavigationType } from 'react-router-dom';

const float = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.06); }
  100% { transform: scale(1); }
`;

const colorFade = keyframes`
  0% { color: #d1232a; }     /* red300 비슷한 색 */
  50% { color: #f26b6e; }
  100% { color: #d1232a; }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const NotFoundWrapper = styled.div`
  height: 100vh;
  background-color: ${({ theme }) => theme.neutral.gray900 || '#121212'};
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
`;

const LogoImg = styled.div`
  width: 144px;
  height: 40px;
  position: absolute;
  left : 24px;
  top : 24px;
  background-image: url(${logo});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
`;

const Title = styled.h1`
  font-size: 8rem;
  margin: 0;
  font-weight: 800;
  animation:
    ${float} 2.5s ease-in-out infinite,
    ${colorFade} 3s ease-in-out infinite;
`;

const SubTitle = styled.p`
  font-size: 2rem;
  margin-top: 8px;
  animation: ${fadeIn} 1.2s ease-out forwards;
  opacity: 0;
`;

const Message = styled.p`
  font-size: 1.25rem;
  margin: 16px 0;
  animation: ${fadeIn} 1.4s ease-out forwards;
  opacity: 0;
`;

const BackButton = styled.button`
  margin-top: 24px;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.neutral.gray600};
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.primary.red700};
  }
`;

function ErrorPage() {
  const navigate = useNavigate();
  const navigateType = useNavigationType();

  if (navigateType === 'POP') {
    return <Navigate to='/' replace />
  }

  return (
    <NotFoundWrapper>
      <LogoImg onClick={() => navigate('/')} />
      <Title>500</Title>
      <SubTitle>Internal Server Error</SubTitle>
      <Message>서버에서 예상치 못한 에러가 발생했습니다.</Message>
      <Message style={{ margin: 0 }}>새롭게 요청해주세요 😢</Message>
      <BackButton onClick={() => navigate('/')}>홈으로 돌아가기</BackButton>
    </NotFoundWrapper>
  );
}

export default ErrorPage;