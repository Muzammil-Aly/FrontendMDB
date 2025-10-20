import { configureStore } from "@reduxjs/toolkit";
import { klaviyoApi } from "./services/profileApi";
import { OrdersApi } from "./services/ordersApi";
import { supportTicketsApi } from "./services/supportTicketsApi";
import { InventoryApi } from "./services/InventoryApi";
import { MarketingEventsApi } from "./services/MarketingEvents";
export const store = configureStore({
  reducer: {
    [klaviyoApi.reducerPath]: klaviyoApi.reducer,
    [OrdersApi.reducerPath]: OrdersApi.reducer,
    [supportTicketsApi.reducerPath]: supportTicketsApi.reducer,
    [MarketingEventsApi.reducerPath]: MarketingEventsApi.reducer,
    [InventoryApi.reducerPath]: InventoryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(klaviyoApi.middleware)
      .concat(OrdersApi.middleware)
      .concat(supportTicketsApi.middleware)
      .concat(MarketingEventsApi.middleware)

      .concat(InventoryApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
