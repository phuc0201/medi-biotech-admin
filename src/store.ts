import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { allRTKServices } from "./services/allRTKServices";

const reducers = Object.values(allRTKServices).reduce((acc: any, service: any) => {
  acc[service.reducerPath] = service.reducer;
  return acc;
}, {});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      ...Object.values(allRTKServices).map((service: any) => service.middleware),
    ),
});

setupListeners(store.dispatch);
