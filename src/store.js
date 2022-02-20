import { configureStore } from "@reduxjs/toolkit";
import mainSlice from "./pages/mainSice";

export const store = configureStore({
  reducer: {
    mainSlice,
  },
});
