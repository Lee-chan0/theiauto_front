import { SideNavContainer, SideNavBannerImg } from "./AdminPageSideNav.style";
import logo from '../../../../../../../Assets/theiautoLogoWhite.png';
import UserProfile from "../UserProfile/UserProfile";
import SideNavMenu from "./SideNavMenu/SideNavMenu";
import CreateButton from "./CreateButton/CreateButton";
import { Link } from "react-router-dom";
import { useSideNavState } from "../../../../../../Hooks/Context/SideNavStateContext";

function AdminPageSideNav({ mode }) {
  const { setNeedImportant } = useSideNavState();

  const handleClickLogo = () => {
    setNeedImportant(false);
  }

  return (
    <SideNavContainer>
      <CreateButton />
      <Link to={'/theiautoCMS/adminpage'} onClick={handleClickLogo}><SideNavBannerImg src={logo} alt="theiauto-logo" /></Link>
      <UserProfile />
      <SideNavMenu mode={mode} />
    </SideNavContainer>
  );
};

export default AdminPageSideNav;