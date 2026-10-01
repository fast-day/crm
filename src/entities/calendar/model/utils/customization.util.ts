import { createContext, useContext, type ReactNode } from 'react'
import type { IEvent, TBadgeVariant } from '../types/event-calendar.type'

const MARK_COLORS: MarkType[] = [
  "red",
  "orange",
  "green",
  "blue",
  "purple",
  "teal",
  "pink",
  "primary",
  "gray"
]

export function isMarkColor(color: string | undefined | null): color is MarkType {
  return !!color && (MARK_COLORS as string[]).includes(color)
}

/** Which surface the event is being rendered on. */
export type TEventRenderView = 'week' | 'day' | 'month' | 'agenda'

/** Context handed to a custom event renderer. */
export interface IEventRenderContext {
  view: TEventRenderView
  selected: boolean
  badgeVariant: TBadgeVariant
  /** The markup the library would have rendered — return it to opt out per event. */
  defaultContent: ReactNode
}

export type TEventRenderer = (event: IEvent, ctx: IEventRenderContext) => ReactNode

/** Which clock label is being formatted: the day/week hour axis, the now-marker, or an event time. */
export type TTimeFormatKind = 'axis' | 'now' | 'event'

/**
 * Host override for every clock label. `axis` receives the top of each hour and
 * should return an hour-only label; `now` and `event` return a full time.
 */
export type TTimeFormatter = (date: Date, kind: TTimeFormatKind) => string

/** Extra class names merged onto the library's own structural elements. */
export interface ICalendarClassNames {
  root?: string
  header?: string
  dayCell?: string
  hourRow?: string
  eventBlock?: string
  timeline?: string
}

export interface ICalendarCustomization {
  renderEvent?: TEventRenderer
  renderMonthEvent?: TEventRenderer
  renderAgendaEvent?: TEventRenderer
  selectedEventId?: string | null
  hourHeight: number
  height?: number | string
  autoHeight?: boolean
  maxEventsPerDayCell: number
  allDayMaxRows?: number
  onShowMore?: (date: string) => void
  classNames?: ICalendarClassNames
  dayCellClassName?: (date: Date) => string | undefined
  formatTime?: TTimeFormatter
}

/** Defaults reproduce v1.1.0 behavior exactly for standalone-exported views. */
export const DEFAULT_CUSTOMIZATION: ICalendarCustomization = {
  hourHeight: 96,
  maxEventsPerDayCell: 3,
}

export const CalendarCustomizationContext =
  createContext<ICalendarCustomization>(DEFAULT_CUSTOMIZATION)

export function useCalendarCustomization(): ICalendarCustomization {
  return useContext(CalendarCustomizationContext)
}
