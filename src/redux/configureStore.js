import { configureStore } from "@reduxjs/toolkit";
import sinhVienSlice from "./sinhVienSlice";

export const store = configureStore({
  reducer: {
    tenNYC: () => "phuong uyen",
    sinhVienSlice,
  },
});
