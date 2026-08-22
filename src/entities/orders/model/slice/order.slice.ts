import type { IBookingService } from "@/entities/booking";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface OrderState {
  services: IBookingService[];
  revision: number;
  isDirty: boolean;
  payment_method: PaymentMethodType | null;
}

const initialState: OrderState = {
  services: [],
  revision: 0,
  isDirty: false,
  payment_method: null,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setServices: (state, action: PayloadAction<IBookingService[]>) => {
      state.services = action.payload;
      state.isDirty = false;
    },
    updateCount: (state, action: PayloadAction<Pick<IBookingService, "booking_service_id" | "booking_service_count">>) => {
      const service = state.services.find(s => s.booking_service_id === action.payload.booking_service_id);
      if (service) {
        service.booking_service_count = action.payload.booking_service_count;
        state.revision += 1;
        state.isDirty = true;
      }
    },
    setPaymentMethod: (state, action: PayloadAction<PaymentMethodType | null>) => {
      state.payment_method = action.payload;
    },
  },
});

export const {
  setServices,
  updateCount,
  setPaymentMethod,
} = orderSlice.actions;
export default orderSlice.reducer;
