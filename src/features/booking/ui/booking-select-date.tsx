import { setBookingCreate } from '@/entities/booking';
import { useAppDispatch } from '@/shared/hooks';
import { CalendarIcon } from '@/shared/icons';
import { Calendar, Card, CardContent } from '@/shared/ui';
import { formatDateWeek } from '@/shared/utils';
import { useEffect, useMemo, useRef, useState } from 'react'

interface BookingSelectDateProps {
  date: string | undefined;
}

export const BookingSelectDate = ({ date }: BookingSelectDateProps) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState<Date>(new Date());
  const containerRef = useRef<HTMLDivElement>(null);

  const calendarDate = useMemo(() => {
    if (!date) return undefined;
    const [day, mo, year] = date.split("-").map(Number);
    return new Date(year, mo - 1, day);
  }, [date]);

  useEffect(() => {
    if (calendarDate) setMonth(calendarDate);
  }, [calendarDate]);
  
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(selected: Date | undefined) {
    console.log(selected);
    if (!selected) return;
    const formatted = [
      String(selected.getDate()).padStart(2, "0"),
      String(selected.getMonth() + 1).padStart(2, "0"),
      selected.getFullYear(),
    ].join("-");
    console.log(formatted)
    dispatch(setBookingCreate({ date: formatted }));
    setOpen(false);
  }

  return (
    <div className='relative w-full' ref={containerRef}>
      <Card className="relative cursor-pointer select-none" onClick={() => setOpen((prev) => !prev)}>
        <CardContent>
          <div className="text-center font-semibold text-lg">
            {/* {!booking_create?.date ? (
              "- - - - -"
            ) : (
              formatDateWeek()
            )} */}
            {formatDateWeek(calendarDate)}
            
            {/* Вт, 25 Апреля 2026г. 10:13 */}
          </div>
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-card-accent border-4 border-card-ring w-11 h-11 flex items-center justify-center rounded-full">
            <CalendarIcon width={22} height={22}/>
          </div>
        </CardContent>
      </Card>

      {open && (
        <div
          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50 shadow-lg rounded-xl bg-popover border border-border"
          onClick={(e) => e.stopPropagation()}
        >
          <Calendar
            mode={"single"}
            selected={calendarDate}
            onSelect={handleSelect}
            onMonthChange={setMonth}
            month={month}
            captionLayout={"dropdown-years"}
          />
        </div>
      )}
    </div>
  )
}
