import { useNavigate, useParams, Outlet } from "react-router-dom";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa"; // 아이콘 유지

const MainContainer = styled.section`
  width: 100%;
`;

const MainInnerBox = styled.div`
  max-width: 1280px;
  margin : 0 auto;
  padding : 0 40px;

  @media (max-width : 1279px) {
    max-width: 100%;
    padding : 0 24px;
  }

  @media (max-width : 767px) {
    max-width: 100%;
    padding : 0 16px;
  }
`;

const ContentBox = styled.div`
  margin : 40px 0;

  & > div {
    margin-bottom : 24px;
    font-size: 1.6rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    color : ${({ theme }) => theme.neutral.gray900};
    cursor: pointer;
  }
`;

const CardGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
  margin-top: 30px;
  margin-bottom: 60px;
`;

const Card = styled.li`
  background: ${({ theme }) => theme.neutral.gray0};
  border: 1px solid ${({ theme }) => theme.neutral.gray100};
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.05);
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  cursor: pointer;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, border-color 0.3s ease-in-out;
  
  height: 100%; 
  width: 100%; 

  text-decoration: none;
  color: inherit;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.1);
    border-color: ${({ theme }) => theme.primary.red500};
  }
`;

const CardTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 700;
  color: ${({ theme }) => theme.neutral.gray900};
  margin-bottom: 12px;
  word-break: keep-all;
  white-space: normal;
`;

const CardDescription = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.neutral.gray600};
  line-height: 1.5;
  margin-bottom: 20px;
  flex-grow: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CardLink = styled.span`
  font-size: 0.95rem;
  font-weight: 600;
  color: ${({ theme }) => theme.primary.red500};
  display: flex;
  align-items: center;
  gap: 8px;
  transition: gap 0.2s ease-in-out;

  ${Card}:hover & {
    gap: 12px;
  }
`;

const pageNames = [
  '회사소개',
  '온·오프라인 광고 문의',
  '이용약관',
  '개인정보취급방침',
  '사업제휴',
  '월간지 구독 안내'
];

const pageSlugs = {
  '회사소개': 'about-us',
  '온·오프라인 광고 문의': 'ad-inquiry',
  '이용약관': 'terms-of-service',
  '개인정보취급방침': 'privacy-policy',
  '사업제휴': 'business-partnership',
  '월간지 구독 안내': 'magazine-subscribe'
};

const pageDescriptions = {
  '회사소개': '더아이오토의 비전과 가치를 소개하고, 저희가 걸어온 길을 안내합니다.',
  '온·오프라인 광고 문의': '더아이오토와 함께하는 광고 기회! 다양한 매체 광고 문의를 환영합니다.',
  '이용약관': '더아이오토 서비스 이용에 필요한 약관 및 규정을 확인하실 수 있습니다.',
  '개인정보취급방침': '회원님의 소중한 개인정보를 어떻게 수집하고 보호하는지 안내해 드립니다.',
  '사업제휴': '더아이오토와의 다양한 사업 협력 및 제휴 방안을 제안해 주세요.',
  '월간지 구독 안내': '더아이오토 월간지 구독 신청 방법 및 혜택을 상세히 안내해 드립니다.'
};

function InstructionsForUsePage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const handleCardClick = (slug) => {
    navigate(`/instructions/${slug}`);
  };

  return (
    <>
      <Helmet>
        <title>더아이오토 안내 : 회사소개 · 광고문의 · 이용약관 · 개인정보취급방침 · 사업제휴</title>
        <meta name="description" content="더아이오토의 회사소개, 광고문의, 이용약관 및 사업제휴 페이지입니다. 서비스 이용에 필요한 정보를 확인하세요." />
        <meta property="og:title" content="더아이오토 안내" />
        <meta property="og:description" content="회사소개, 광고 문의, 이용약관 등 더 아이오토의 주요 안내를 확인하세요." />
        <meta property="og:image" content="" />
      </Helmet>
      <MainContainer>
        <MainInnerBox>
          <ContentBox>
            <div onClick={() => navigate('/instructions')}>
              <IoIosInformationCircleOutline size={28} color="#666666" />
              &nbsp;<span style={{ color: '#666666' }}>안내</span>
            </div>

            {!slug && (
              <CardGrid>
                {pageNames.map((name) => (
                  <Card key={name} onClick={() => handleCardClick(pageSlugs[name])}>
                    <CardTitle>{name}</CardTitle>
                    <CardDescription>{pageDescriptions[name]}</CardDescription>
                    <CardLink>
                      자세히 보기 <FaArrowRight size={12} />
                    </CardLink>
                  </Card>
                ))}
              </CardGrid>
            )}

            <Outlet />

          </ContentBox>
        </MainInnerBox>
      </MainContainer>
    </>
  );
}

export default InstructionsForUsePage;