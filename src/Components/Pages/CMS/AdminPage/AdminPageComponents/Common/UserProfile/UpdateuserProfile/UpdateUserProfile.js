import styled from "styled-components";
import AdminPageSideNav from "../../SideNav/AdminPageSideNav";
import UpdateUser from "./UpdateUser";

const UpdateUserProfileContainer = styled.div`

`;

function UpdateUserProfilePage() {
  return (
    <UpdateUserProfileContainer>
      <AdminPageSideNav />
      <UpdateUser />
    </UpdateUserProfileContainer>
  )
}

export default UpdateUserProfilePage;