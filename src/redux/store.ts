import { configureStore } from "@reduxjs/toolkit";
import { klaviyoApi } from "./services/profileApi";

export const store = configureStore({
  reducer: {
    [klaviyoApi.reducerPath]: klaviyoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(klaviyoApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
