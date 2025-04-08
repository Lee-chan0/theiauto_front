import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { ko } from 'date-fns/locale'

const ScheduleContainer = styled.div`
  position: absolute;
  right : 24px;
  top : 16px;

  display : flex;
  align-items: center;

  & > .react-datepicker-wrapper {
    .react-datepicker__input-container {
      input {
        font-size: .85rem;
        border : none;
        height: 24px;
        border-radius: 4px;
        padding : 0 8px;
        cursor: pointer;
        background-color: ${({ theme }) => theme.neutral.gray900};
        color : ${({ theme }) => theme.neutral.gray0};
      }
    }
  }
`;

const IsScheduleActive = styled.span`
  font-size: 0.85rem;
  color : ${({ theme }) => theme.neutral.gray0};
  background-color: ${({ theme }) => theme.neutral.gray900};
  padding : 4px 8px;
  font-weight: bold;
  margin-right: 8px;
  border-radius: 4px;
`;

function CreateSchedule() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <ScheduleContainer>
      <IsScheduleActive>예약 시간</IsScheduleActive>
      <DatePicker
        locale={ko}
        selected={selectedDate}
        showTimeSelect
        timeIntervals={15}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="yyyy-MM-dd :: aa HH시 mm분"
        timeCaption="시간"
        popperPlacement='bottom-start'
      />
    </ScheduleContainer>
  )
}

export default CreateSchedule;