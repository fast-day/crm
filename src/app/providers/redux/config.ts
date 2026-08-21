import { accountSlice } from "@/entities/account";
import { bookingSlice } from "@/entities/booking";
import { dialogSlice } from "@/entities/dialog";
import { navigationSlice } from "@/entities/navigation";
import { orderSlice } from "@/entities/orders";
import { companySlice } from "@/pages/company";
import { API } from "@/shared/api";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    [API.reducerPath]: API.reducer,

    // ...
    company: companySlice,
    account: accountSlice,
    navigation: navigationSlice,

    /**
      ===== BOOKINGS =====
    **/
    booking: bookingSlice,

    /**
      ===== ORDERS =====
    **/
    order: orderSlice,

    /**
      ===== DIALOG ===== 
    **/
   dialog: dialogSlice,
  },

  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat([API.middleware]);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
