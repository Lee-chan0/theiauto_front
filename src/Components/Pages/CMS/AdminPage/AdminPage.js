import styled from "styled-components";
import AdminPageSideNav from "./AdminPageComponents/Common/SideNav/AdminPageSideNav";
import ArticleManagement from "./AdminPageComponents/Common/Articlemanagement/ArticleManagement";
import { useState } from "react";


const AdminPageMainContainer = styled.div`
`;

function AdminPage() {
  const [isSearchBarActive, setIsSearchBarActive] = useState(false);

  return (
    <AdminPageMainContainer>
      <AdminPageSideNav setIsSearchBarActive={setIsSearchBarActive} />
      <ArticleManagement setIsSearchBarActive={setIsSearchBarActive} isSearchBarActive={isSearchBarActive} />
    </AdminPageMainContainer>
  )
}

export default AdminPage;