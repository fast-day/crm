import { ChevronRightIcon } from "@/shared/icons"
import { Button, Dropdown, DropdownContent, DropdownTrigger } from "@/shared/ui"
import { cn } from "@/shared/utils"
import { MONTHS } from "../model/constants/calendar.constant";
import { toDateKey } from "../model/utils/calendar.util";

interface ChangeYearProps {
  goPrevYear: () => void;
  goNextYear: () => void;
  handleSelectDate: (dateKey: string | null) => void;
  handleViewMonthIndex: (idx: number) => void;

  calendarTitle: string;
  viewYear: number;
  yearMin: number;
  yearMax: number;
  viewMonthIndex: number;
}

export const ChangeYear = ({ goNextYear, goPrevYear, handleSelectDate, handleViewMonthIndex, calendarTitle, viewYear, yearMin, yearMax, viewMonthIndex }: ChangeYearProps) => {
  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <Button
            variant={"transparent"}
            size={"size_40"}
            aria-label={"Выбор месяца и года"}
            className={"md:text-lg font-bold"}
            iconRight={<ChevronRightIcon width={18} height={18} className="rotate-90" />}
          >
            {calendarTitle}
          </Button>
        </DropdownTrigger>
        <DropdownContent align="start" side="bottom">
          {({ close }) => (
            <>
              <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
                <span className="font-extrabold">{viewYear}</span>
                <div className="flex items-center gap-1.5">
                  <Button
                    variant={"secondary"}
                    size={"icon_36"}
                    onClick={goPrevYear}
                    disabled={viewYear <= yearMin}
                    className={"px-0 rounded-14!"}
                    aria-label={"Предыдущий год"}
                  >
                    <ChevronRightIcon className="rotate-180" width={20} height={20} />
                  </Button>
                  <Button
                    variant={"secondary"}
                    size={"icon_36"}
                    onClick={goNextYear}
                    disabled={viewYear >= yearMax}
                    className={"px-0 rounded-14!"}
                    aria-label={"Следующий год"}
                  >
                    <ChevronRightIcon width={20} height={20} />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-x-4 px-4 py-3">
                {MONTHS.map((monthLabel, idx) => {
                  const isSelected = idx === viewMonthIndex
                  const dateForKey = toDateKey(viewYear, idx, 1)

                  return (
                    <button
                      key={`${viewYear}-${idx}`}
                      type="button"
                      onClick={() => {
                        handleSelectDate(null);
                        handleViewMonthIndex(idx);
                        close()
                      }}
                      className={cn(
                        "text-center text-sm font-semibold p-2 cursor-pointer hover:bg-primary/10 rounded-12",
                        isSelected && "font-extrabold bg-primary hover:bg-primary text-white",
                      )}
                      aria-label={`${monthLabel} ${viewYear}`}
                      data-date-key={dateForKey}
                    >
                      <span className={cn("text-center text-sm font-semibold px-2.5 py-1 rounded-xl")}>{monthLabel}</span>
                    </button>
                  )
                })}
              </div>
            </>
          )}
          
        </DropdownContent>
      </Dropdown>
    </>
  )
}
