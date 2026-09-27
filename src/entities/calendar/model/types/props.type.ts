import type { Locale } from "date-fns"
import type { ICalendarLabels } from "../utils/labels.util"
import type { IEvent, TCalendarView } from "./event-calendar.type"
import type { ICalendarClassNames, TEventRenderer, TTimeFormatter } from "../utils/customization.util"
import type { ReactNode } from "react"

export interface ICalendarProps {
  view: TCalendarView;
  onViewChange?: (view: TCalendarView) => void;

  canAdd?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
  availableViews?: TCalendarView[];
  showUserSelect?: boolean;
  labels?: Partial<ICalendarLabels>;
  showViewTooltips?: boolean;
  dateLocale?: Locale;
  navigateOnDayClick?: boolean;
  openDetailsOnEventClick?: boolean;

  onEventCreated?: (event: IEvent) => void;
  onEventUpdated?: (event: IEvent) => void;
  onEventDeleted?: (event: IEvent) => void;

  onDayClick?: (date: string) => void;
  onEventClick?: (event: IEvent) => void;

  renderEvent?: TEventRenderer;
  renderMonthEvent?: TEventRenderer;
  renderAgendaEvent?: TEventRenderer;

  hideHeader?: boolean;
  headerSlot?: ReactNode;
  selectedEventId?: string | null;
  onSelectedEventChange?: (event: IEvent | null) => void;
  hourHeight?: number;
  height?: number | string;
  autoHeight?: boolean;
  maxEventsPerDayCell?: number;
  allDayMaxRows?: number;
  onShowMore?: (date: string) => void;
  classNames?: ICalendarClassNames;
  dayCellClassName?: (date: Date) => string | undefined;
  formatTime?: TTimeFormatter;
}
