import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { DEFAULT_VISIBLE_HOURS } from "../constants/calendar.constant";
import type { TCalendarView, TVisibleHours } from "../types/event-calendar.type";

interface CalendarState {
  currentDate: string;
  visibleHours: TVisibleHours;
  availableViews: (Exclude<TCalendarView, "month" | "year"> | "list")[];
}

const initialState: CalendarState = {
  currentDate: new Date().toISOString(),
  visibleHours: DEFAULT_VISIBLE_HOURS,
  availableViews: ["day", "week", "list"],
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setCalendarCurrentDate: (state, action: PayloadAction<string>) => {
      state.currentDate = action.payload;
    },
  },
});

export const {
  setCalendarCurrentDate,
} = calendarSlice.actions;
export default calendarSlice.reducer;
