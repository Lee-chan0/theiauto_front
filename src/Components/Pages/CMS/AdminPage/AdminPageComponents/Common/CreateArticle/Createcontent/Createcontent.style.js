import styled from "styled-components";

const EditorContainer = styled.div`
  width: 100%;
  padding : 24px;
  padding-top : 8px;
  position: relative;
`;

const NeedReservation = styled.div`
  width: fit-content;
  height: 30px;
  padding : 4px 8px;
  background-color: ${({ theme }) => theme.neutral.gray900};
  color : ${({ theme }) => theme.neutral.gray0};
  border-radius: 3px;
  display : flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: absolute;
  right : 24px;
  opacity: ${({ $isReservation }) => $isReservation ? '0' : '1'};
  visibility: ${({ $isReservation }) => $isReservation ? 'hidden' : 'visible'};
  transition: background-color 0.3s, box-shadow 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.primary.red700};
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.5);
  }
`;

const ReservationDescrip = styled.span`
  font-size: 0.85rem;
  font-weight: bold;
`;

export { EditorContainer, NeedReservation, ReservationDescrip };