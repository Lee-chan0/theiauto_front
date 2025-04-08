import styled from "styled-components";
import Loginpage from "./Loginpage";
import { motion } from "framer-motion";
import logoImage from "../../../../Assets/theiautoLogo.png";
import { useEffect, useState } from "react";

// ✅ 애니메이션 컨테이너 (배경)
const AnimationContainer = styled(motion.div)`
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  background: black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// ✅ 로고 이미지 박스 (중앙)
const LogoImageBox = styled(motion.div)`
  position: relative;
  width: 10%;
  height: 10%;
  background-image: url(${logoImage});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;

`;

// ✅ 반짝이는 효과
const ShineEffect = styled(motion.div)`
  position: absolute;
  top: 0%;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(110deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  filter: blur(4px);
  pointer-events: none;
`;

// ✅ Loginpage 컨테이너 (Fade-in 효과 추가)
const LoginpageContainer = styled(motion.div)`
  width: 100%;
  height: 100vh;
`;

function LoginpageAnimation() {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 4200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimationContainer>
        <LogoImageBox
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 4,
            times: [0, 0.8, 1],
          }}
        >
          {/* 반짝이는 효과 */}
          <ShineEffect
            initial={{ x: "-100%", opacity: 0 }}
            animate={{
              x: "100%",
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.5,
              delay: 0.5,
              times: [0.1, 0.5, 1],
            }}
          />
        </LogoImageBox>
      </AnimationContainer>

      {!isAnimating && (
        <LoginpageContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }} // ✅ 부드럽게 페이드 인
        >
          <Loginpage />
        </LoginpageContainer>
      )}
    </>
  );
}

export default LoginpageAnimation;
