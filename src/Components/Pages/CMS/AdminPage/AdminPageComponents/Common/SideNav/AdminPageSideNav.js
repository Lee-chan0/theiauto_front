import { SideNavContainer, SideNavBannerImg } from "./AdminPageSideNav.style";
import logo from '../../../../../../../Assets/theiautoLogoWhite.png';
import UserProfile from "../UserProfile/UserProfile";
import SideNavMenu from "./SideNavMenu/SideNavMenu";
import CreateButton from "./CreateButton/CreateButton";
import { Link } from "react-router-dom";
import { useSideNavState } from "../../../../../../Hooks/Context/SideNavStateContext";
import { useEffect } from "react";

function AdminPageSideNav({ setIsSearchBarActive }) {
  const { setNeedImportant, mobileMenuActive, setMobileMenuActive } = useSideNavState();

  const handleClickLogo = () => {
    setNeedImportant(false);
    setIsSearchBarActive?.(false);
    setMobileMenuActive?.(false);
  }

  useEffect(() => {

  }, []);

  return (
    <SideNavContainer $mobileMenuActive={mobileMenuActive}>
      <CreateButton />
      <Link to={'/theiautoCMS/adminpage'} onClick={handleClickLogo}><SideNavBannerImg src={logo} alt="theiauto-logo" /></Link>
      <UserProfile />
      <SideNavMenu setIsSearchBarActive={setIsSearchBarActive} />
    </SideNavContainer>
  );
};

export default AdminPageSideNav;