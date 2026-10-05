import type { IDirectoryCustomer, IDirectoryLocation, IDirectoryLocationEmployee, IDirectoryLocationService } from "@/entities/directories";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type BookingCreate = {
  service?: IDirectoryLocationService;
  location?: IDirectoryLocation;
  employee?: IDirectoryLocationEmployee;
  // ... more fields
  // ....
  date?: string;
  time?: string;
  // payment_method?: PaymentMethodType;
}

interface BookingState {
  booked: BookingCreate[];
  customer: IDirectoryCustomer | null;
  date: string;
  mark: MarkType;
}

function getTodayFormatted(): string {
  const now = new Date();
  return [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("-");
}

const initialState: BookingState = {
  booked: [],
  customer: null,
  date: getTodayFormatted(),
  mark: "primary",
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBookingCreate: (state, action: PayloadAction<BookingCreate>) => {
      state.booked.push(action.payload);
    },
    updateBookingCreate: (state, action: PayloadAction<{ index: number; item: BookingCreate }>) => {
      state.booked[action.payload.index] = action.payload.item;
    },
    removeBookingCreate: (state, action: PayloadAction<number>) => {
      state.booked = state.booked.filter((_, i) => i !== action.payload);
    },
    changeBookingServicePrice: () => {
      // if (state.booked) {
      //   state.booked.service = {
      //     ...state.booked.service,
      //     prices: {
      //       price: action.payload,
      //       cost_price: state.booked.service?.prices.cost_price,
      //     },
      //   } as IDirectoryLocationService;
      // }
    },
    resetBookingCreate: (state) => {
      state.booked = [];
      state.customer = null;
    },
    setBookingCustomer: (state, action: PayloadAction<IDirectoryCustomer>) => {
      state.customer = action.payload;
    },
    setBookingDate: (state, action: PayloadAction<string>) => {
      state.date = action.payload;
    },
    setBookingMark: (state, action: PayloadAction<MarkType>) => {
      state.mark = action.payload;
    },
  },
});

export const {
  setBookingCreate,
  updateBookingCreate,
  removeBookingCreate,
  changeBookingServicePrice,
  resetBookingCreate,
  setBookingCustomer,
  setBookingDate,
  setBookingMark,
} = bookingSlice.actions;
export default bookingSlice.reducer;
