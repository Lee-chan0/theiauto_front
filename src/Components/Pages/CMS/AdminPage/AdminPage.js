import styled from "styled-components";
import AdminPageSideNav from "./AdminPageComponents/Common/SideNav/AdminPageSideNav";
import ArticleManagement from "./AdminPageComponents/Common/Articlemanagement/ArticleManagement";
import { useSideNavState } from "../../../Hooks/Context/SideNavStateContext";

const AdminPageMainContainer = styled.div`
  @media (max-width : 767px) {
    position: relative;
  }
`;

function AdminPage() {
  const { isSearchBarActive, setIsSearchBarActive } = useSideNavState();


  return (
    <AdminPageMainContainer>
      <AdminPageSideNav setIsSearchBarActive={setIsSearchBarActive} />
      <ArticleManagement setIsSearchBarActive={setIsSearchBarActive} isSearchBarActive={isSearchBarActive} />
    </AdminPageMainContainer>
  )
}

export default AdminPage;