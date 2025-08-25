import { useParams } from 'react-router-dom';
import TermsOrUsePage from '../TermsOfUse/TermsOfUsePage';
import PrivacyPolicyPage from '../PrivacyPolicy/PrivacyPolicyPage';
import CompanyPage from '../InstructionsPages/CompanyPage';
import BusinessPage from '../BusinessPage/BusinessPage';
import AdHelperPage from '../adHelperPage/AdHelperPage';
import MagazineSubScribPage from '../../MagazineSubScribPage';


function InstructionSubPage() {
  const { slug } = useParams();

  const renderPageContent = () => {
    switch (slug) {
      case 'about-us':
        return <CompanyPage />
      case 'ad-inquiry':
        return <AdHelperPage />
      case 'terms-of-service':
        return <TermsOrUsePage />
      case 'privacy-policy':
        return <PrivacyPolicyPage />
      case 'business-partnership':
        return <BusinessPage />
      case 'magazine-subscribe':
        return <MagazineSubScribPage IsInstruction={true} />
      default:
        return
    }
  };

  return (
    <>
      {renderPageContent()}
    </>
  );
}

export default InstructionSubPage;