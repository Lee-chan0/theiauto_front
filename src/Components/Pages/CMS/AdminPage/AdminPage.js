import styled from "styled-components";
import AdminPageSideNav from "./AdminPageComponents/Common/SideNav/AdminPageSideNav";
import ArticleManagement from "./AdminPageComponents/Common/Articlemanagement/ArticleManagement";


const AdminPageMainContainer = styled.div`
`;

function AdminPage() {

  return (
    <AdminPageMainContainer>
      <AdminPageSideNav />
      <ArticleManagement />
    </AdminPageMainContainer>
  )
}

export default AdminPage;