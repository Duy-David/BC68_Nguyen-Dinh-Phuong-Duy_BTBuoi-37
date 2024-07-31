import { configureStore } from "@reduxjs/toolkit";
import sinhVienSlice from "./sinhVienSlice";

export const store = configureStore({
  reducer: {
    ten: () => "phuong uyen",
    sinhVienSlice,
  },
});
