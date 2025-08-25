import { useSideNavState } from "../../../Hooks/Context/SideNavStateContext";
import AdminPageSideNav from "../AdminPage/AdminPageComponents/Common/SideNav/AdminPageSideNav";
import AdControl from "./AdControl";



function AdPage() {
  const { setIsSearchBarActive } = useSideNavState();


  return (
    <>
      <AdminPageSideNav setIsSearchBarActive={setIsSearchBarActive} />
      <AdControl />
    </>
  )
}

export default AdPage;