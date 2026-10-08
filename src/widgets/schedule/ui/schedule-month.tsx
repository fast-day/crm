import type { TScheduleItem } from "@/entities/schedule";
import { CalendarDayItem, ChangeYear, CurrentDate, WEEKDAYS_MONDAY_START, type DayInfo, type ScheduleEditInfo } from "@/features/calendar"
import type { UseCalendarReturnProps } from "@/features/calendar/model/hooks/calendar.hook";
import { CustomizedClose, CustomizedOffDay, CustomizedSheet, PRESETS, ScheduleBulkSelect } from "@/features/schedule";
import { Button, Card, CardContent } from "@/shared/ui";
import { LazyBlur } from "@/widgets/loading";
import { useMemo } from "react";
import { useMediaQuery } from "react-responsive";

interface ScheduleProps {
  userId: string;
  locationId: string;
  calendar: UseCalendarReturnProps;
  dayInfoByKey: Map<string, DayInfo>;
  scheduleEditByKey: Map<string, ScheduleEditInfo>;
  isLoading?: boolean;
  isFetching: boolean;
}

export const ScheduleMonth = ({  userId, locationId, calendar, dayInfoByKey, scheduleEditByKey, isLoading=false, isFetching }: ScheduleProps) => {
  const isTablet = useMediaQuery({ query: `(max-width: 1099px)` });

  const handleChangeSchedule = (data: TScheduleItem) => {
    const editInfo = scheduleEditByKey.get(data.date_key);

    if (calendar.isFlexMode) {
      calendar.handleSelectDateItem({ ...data, ...editInfo });
    } else {
      calendar.handleChangeSchedule(data, editInfo);
    }
  };

  const handlePreset = ({ value }: { value: string }) => {
    const test = PRESETS.find((p) => p.value === value)?.test;
    if (!test) return;

    const items = calendar.calendarCells
      .filter((c) => c.inMonth && test(c))
      .map((c) => ({
        date_key: c.dateKey,
        year: c.year,
        month_index: c.monthIndex,
        day: c.day,
        in_month: c.inMonth,
        day_info: dayInfoByKey.get(c.dateKey),
        ...scheduleEditByKey.get(c.dateKey),
      }));

    calendar.selectDates(items);
  };

  const customizedKeys = useMemo(() => new Set(calendar.customizedDate.map(d => d.date_key)), [calendar.customizedDate]);

  return (
    <div className="mt-8">

      {(calendar.isFlexMode && calendar.customizedDate.length > 0) && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-10">
          <Card className="bg-white overflow-hidden">
            <CardContent className="p-0 flex">
              <CustomizedSheet
                dates={calendar.customizedDate.map((d) => d.date_key)}
                userId={userId}
                locationId={locationId}
                onSuccess={calendar.toggleFlexMode}
              />
              <CustomizedOffDay
                dates={calendar.customizedDate.map((d) => d.date_key)}
                userId={userId}
                locationId={locationId}
                onSuccess={calendar.toggleFlexMode}
              />
              <CustomizedClose onClick={calendar.toggleFlexMode} />
            </CardContent>
          </Card>
        </div>
      )}
      
      <div className="flex items-start justify-between gap-6 flex-wrap">
        {!isTablet && <CurrentDate calendarTitle={calendar.calendarTitle} goPrevMonth={calendar.goPrevMonth} goNextMonth={calendar.goNextMonth} />}

        <ChangeYear
          goPrevYear={calendar.goPrevYear}
          goNextYear={calendar.goNextYear}
          calendarTitle={calendar.calendarTitle}
          viewYear={calendar.viewYear}
          yearMin={calendar.yearMin}
          yearMax={calendar.yearMax}
          viewMonthIndex={calendar.viewMonthIndex}
          handleSelectDate={calendar.handleSelectDate}
          handleViewMonthIndex={calendar.handleViewMonthIndex}
        />
      </div>

      <div className="mt-6 max-w-260 w-full mx-auto space-y-4">
        <div className="flex items-center justify-end gap-2.5">
          {calendar.isFlexMode && (
            <ScheduleBulkSelect
              isFlexMode={calendar.isFlexMode}
              viewYear={calendar.viewYear}
              viewMonthIndex={calendar.viewMonthIndex}
              onPreset={handlePreset}
            />
          )}
          <Button
            type={"button"}
            size={"size_40"}
            variant={"white"}
            animation={"toggle_sm"}
            className={"text-sm font-semibold w-fit px-4"}
            onClick={calendar.toggleFlexMode}
          >
            {calendar.isFlexMode ? "Отменить" : "Множественный выбор" }
          </Button>
        </div>

        <div>
          {!isTablet && (
            <div className="grid grid-cols-7 gap-2.5">
              {WEEKDAYS_MONDAY_START.map((w) => (
                <div key={w} className="text-xs opacity-50 xl:text-sm font-bold text-center">
                  {w}
                </div>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 1100:grid-cols-7 gap-2.5 mt-2.5 relative">
            {isFetching && <LazyBlur />}
            {isLoading && <div className="absolute top-0 left-0 h-full w-full rounded-xl z-10 backdrop-blur-xs" />}
            {calendar.calendarCells.map((cell) => {
              const dayInfo = dayInfoByKey.get(cell.dateKey);
              return (
                <CalendarDayItem
                  key={cell.dateKey}
                  dayInfo={dayInfo}
                  isMarked={Boolean(dayInfo)}
                  isSelected={customizedKeys.has(cell.dateKey)}
                  isToday={cell.dateKey === calendar.todayDateKey}
                  isCurrentDay={calendar.selectedDateKey === cell.dateKey}
                  onClick={handleChangeSchedule}
                  cell={cell}
                />
              );
            })}
          </div>
        </div>

      </div>
    </div>
  )
}
