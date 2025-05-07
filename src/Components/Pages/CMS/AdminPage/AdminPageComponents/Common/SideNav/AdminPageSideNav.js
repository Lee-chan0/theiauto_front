import { SideNavContainer, SideNavBannerImg } from "./AdminPageSideNav.style";
import logo from '../../../../../../../Assets/theiautoLogoWhite.png';
import UserProfile from "../UserProfile/UserProfile";
import SideNavMenu from "./SideNavMenu/SideNavMenu";
import CreateButton from "./CreateButton/CreateButton";
import { Link } from "react-router-dom";
import { useSideNavState } from "../../../../../../Hooks/Context/SideNavStateContext";

function AdminPageSideNav({ mode, setIsSearchBarActive }) {
  const { setNeedImportant } = useSideNavState();

  const handleClickLogo = () => {
    setNeedImportant(false);
    setIsSearchBarActive?.(false);
  }

  return (
    <SideNavContainer>
      <CreateButton />
      <Link to={'/theiautoCMS/adminpage'} onClick={handleClickLogo}><SideNavBannerImg src={logo} alt="theiauto-logo" /></Link>
      <UserProfile />
      <SideNavMenu mode={mode} setIsSearchBarActive={setIsSearchBarActive} />
    </SideNavContainer>
  );
};

export default AdminPageSideNav;