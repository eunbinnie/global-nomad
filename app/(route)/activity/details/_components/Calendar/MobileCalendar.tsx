'use client';

import { useState } from 'react';
import Image from 'next/image';

import Button from '@/_components/Button';

import MobilePeopleCounter from './MobilePeopleCounter';
import TimeSelection from './TimeSelection';
import type { ActivityData } from './types';

import CalArrow from 'public/assets/icons/cal-arrow.svg';
import CalNext from 'public/assets/icons/cal-next.svg';
import CalPrev from 'public/assets/icons/cal-prev.svg';

interface MobileCalendarProps {
  activityData: ActivityData | null;
  currentDate: Date;
  handleReservation: () => Promise<void>;
  peopleCount: number;
  selectedDate: string | null;
  selectedTime: string | null;
  setCurrentDate: (date: Date) => void;
  setPeopleCount: (count: number) => void;
  setSelectedDate: (date: string | null) => void;
  setSelectedTime: (time: string | null) => void;
  totalPrice: number;
}

export default function MobileCalendar({
  currentDate,
  setCurrentDate,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  activityData,
  handleReservation,
  peopleCount,
  setPeopleCount,
  totalPrice,
}: MobileCalendarProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isPeopleCountOpen, setIsPeopleCountOpen] = useState(false);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const handleDateSelection = (date: string) => {
    if (selectedDate === date) {
      setSelectedDate(null);
      setSelectedTime(null);
    } else {
      setSelectedDate(date);
      setSelectedTime(null);
    }
  };

  const renderCalendar = () => {
    const days = [];
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const prevMonthDays = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();

    for (let i = firstDayOfMonth - 1; i >= 0; i -= 1) {
      const day = prevMonthDays - i;
      days.push(
        <div key={`prev-${day}`} className="py-[10px] text-center text-sm text-gray-500">
          {day}
        </div>,
      );
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      const date = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const hasSchedule = activityData?.schedules.some((schedule) => schedule.date === date);
      days.push(
        <div
          key={day}
          className={`cursor-pointer rounded-[8px] py-[10px] text-center ${hasSchedule ? '' : 'text-gray-700'} ${
            selectedDate === date ? 'bg-green-200 text-white' : hasSchedule ? 'bg-green-100 text-green-200' : 'text-gray-700'
          } text-[13px] font-[600]`}
          onClick={() => hasSchedule && handleDateSelection(date)}
        >
          {day}
        </div>,
      );
    }

    let nextMonthDay = 1;
    while (days.length < 35) {
      days.push(
        <div key={`next-${nextMonthDay}`} className="py-[6px] text-center text-[13px] text-gray-500">
          {nextMonthDay}
        </div>,
      );
      nextMonthDay += 1;
    }

    return days;
  };

  return (
    <div className="flex items-center justify-between p-[16px]">
      <div className="flex flex-col gap-[8px]">
        <div onClick={() => setIsPeopleCountOpen(true)} className="flex items-center gap-[6px]">
          <span className="text-xl font-bold text-black">₩{totalPrice.toLocaleString()} / </span>
          <span className="cursor-pointer text-2lg font-medium text-green-200">{peopleCount > 1 ? `총 ${peopleCount}인` : `${peopleCount}명`}</span>
        </div>
        <div onClick={() => setIsCalendarOpen(true)} className="flex cursor-pointer items-center justify-between">
          <span className={`text-md font-semibold text-green-200 ${!selectedDate ? 'underline' : ''}`}>
            {selectedDate
              ? `${new Date(selectedDate)
                  .toLocaleDateString('ko-KR', {
                    year: '2-digit',
                    month: '2-digit',
                    day: '2-digit',
                  })
                  .replace(/\./g, '/')
                  .replace(/\s/g, '')} ${selectedTime?.replace('-', ' ~ ')}`
              : '날짜 선택하기'}
          </span>
        </div>

        {isCalendarOpen && (
          <div className="fixed inset-0 z-50 flex flex-col justify-between bg-white p-[24px]">
            <div className="w-full">
              <div className="mb-4 flex items-center justify-between">
                <div className="text-[28px] font-bold">날짜</div>
                <div className="relative aspect-square size-6">
                  <Image src={CalArrow} className="cursor-pointer" alt="닫기" fill onClick={() => setIsCalendarOpen(false)} />
                </div>
              </div>
              <div className="rounded-[8px] border border-gray-100 px-[27px] py-[5px]">
                <div className="mb-2 flex justify-between py-[5px]">
                  <div className="relative aspect-[8/11] h-[22px] w-4">
                    <Image
                      src={CalPrev}
                      alt="이전 달로 이동"
                      fill
                      className="cursor-pointer"
                      onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}
                    />
                  </div>
                  <span className="text-sm font-bold text-black">
                    {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </span>
                  <div className="relative aspect-[8/11] h-[22px] w-4">
                    <Image
                      src={CalNext}
                      alt="다음 달로 이동"
                      fill
                      className="cursor-pointer"
                      onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-px">
                  {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                    <div key={day} className="text-center text-md font-bold text-gray-700">
                      {day}
                    </div>
                  ))}
                  {renderCalendar()}
                </div>
              </div>
            </div>

            {selectedDate && (
              <div className="mt-4">
                <TimeSelection selectedDate={selectedDate} selectedTime={selectedTime} setSelectedTime={setSelectedTime} activityData={activityData} />
              </div>
            )}
            <div className="mt-auto w-full">
              <Button
                variant="black"
                className={`mt-4 h-[50px] w-full py-2 text-white ${!selectedDate || !selectedTime ? 'cursor-not-allowed bg-gray-400' : 'cursor-pointer bg-black'}`}
                onClick={() => {
                  if (selectedDate && selectedTime) {
                    setIsCalendarOpen(false);
                  }
                }}
                disabled={!selectedDate || !selectedTime}
              >
                확인
              </Button>
            </div>
          </div>
        )}

        {isPeopleCountOpen && (
          <div className="fixed inset-0 z-50 flex flex-col justify-between bg-white p-[24px]">
            <div className="w-full">
              <div className="mb-4 flex items-center justify-between">
                <div className="text-[28px] font-bold">인원</div>
                <Image src={CalArrow} className="cursor-pointer" alt="닫기" width={40} height={40} onClick={() => setIsPeopleCountOpen(false)} />
              </div>
              <MobilePeopleCounter peopleCount={peopleCount} setPeopleCount={setPeopleCount} />
            </div>

            <div className="mt-auto w-full">
              <Button variant="black" className="mt-4 h-[50px] w-full py-2 text-white" onClick={() => setIsPeopleCountOpen(false)}>
                확인
              </Button>
            </div>
          </div>
        )}
      </div>
      <div>
        <Button
          variant="black"
          onClick={handleReservation}
          borderRadius="6px"
          className="h-[48px] w-[106px] bg-blue-500 py-2 text-white"
          disabled={!selectedDate || !selectedTime}
        >
          예약하기
        </Button>
      </div>
    </div>
  );
}
