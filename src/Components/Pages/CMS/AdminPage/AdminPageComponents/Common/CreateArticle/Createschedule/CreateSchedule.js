import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from 'date-fns/locale'
import { addDays, isToday } from "date-fns";
import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useMediaQuery } from "react-responsive";

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
        border-radius: 2px;
        padding : 0 8px;
        cursor: pointer;
        color : ${({ theme }) => theme.neutral.gray900};
        transition: box-shadow 0.3s;
        box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.3);
        outline: none;

        @media (max-width : 767px) {
          font-size: .6rem;
        }
        
        &:hover {
          box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.78);
        }
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
  color : ${({ theme }) => theme.neutral.gray900};
  padding : 4px 8px;
  margin-right: 8px;
  border-radius: 2px;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.3);

  @media (max-width : 767px) {
    font-size: .6rem;
    padding : 6px 8px;
    margin-right: 4px;
  }
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
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <ScheduleContainer>
      <IoIosArrowForward size={isMobile ? 20 : 24} color="#1a1a1a" style={{ marginRight: '4px', cursor: 'pointer' }} onClick={() => {
        setIsReservation(false)
        setArticleValues((prev) => ({ ...prev, articleStatus: 'publish' }))
      }} />
      {!isMobile && <IsScheduleActive>예약 시간</IsScheduleActive>}
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
        dateFormat="yyyy-MM-dd aa HH시 mm분"
        timeCaption="시간"
        popperPlacement='bottom-start'
        customInput={<CustomInput />}
      />
    </ScheduleContainer>
  )
}

export default CreateSchedule;