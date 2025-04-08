import styled from "styled-components";

const ManagementContainer = styled.div`
  width: calc(100% - 240px);
  height: 100%;
  position : fixed;
  right : 0;
  top : 0;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: -1;
`;

export { ManagementContainer };