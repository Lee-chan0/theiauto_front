import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from 'date-fns/locale'
import { addDays, isToday } from "date-fns";
import { CgCloseR } from "react-icons/cg";
import React from "react";

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

  & > svg {
    &:hover {
      opacity: 0.7;
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

const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
  <input
    readOnly
    ref={ref}
    value={value}
    onClick={onClick}
    style={{ cursor: 'pointer' }}
  />
))

function CreateSchedule({ setIsReservation, articleValues, setArticleValues }) {
  const isTodaySelected = isToday(articleValues.publishTime);

  return (
    <ScheduleContainer>
      <CgCloseR size={24} style={{ marginRight: '4px', cursor: 'pointer' }} onClick={() => {
        setIsReservation(false)
        setArticleValues((prev) => ({ ...prev, articleStatus: 'publish' }))
      }} />
      <IsScheduleActive>예약 시간</IsScheduleActive>
      <DatePicker
        locale={ko}
        selected={articleValues.publishTime}
        showTimeSelect
        minDate={new Date()}
        maxDate={addDays(new Date(), 7)}
        minTime={isTodaySelected ? new Date() : new Date(0, 0, 0, 0, 0)}
        maxTime={new Date(0, 0, 0, 23, 59)}
        timeIntervals={5}
        onChange={(date) => setArticleValues((prev) => ({ ...prev, publishTime: date }))}
        dateFormat="yyyy-MM-dd :: aa HH시 mm분"
        timeCaption="시간"
        popperPlacement='bottom-start'
        customInput={<CustomInput />}
      />
    </ScheduleContainer>
  )
}

export default CreateSchedule;