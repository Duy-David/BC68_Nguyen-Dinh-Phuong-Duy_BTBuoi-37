import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  sinhVien: [],
};

// Tạo slice
const sinhVienSlice = createSlice({
  name: "sinhVien",
  initialState,
  reducers: {
    themSinhVien: (state, action) => {
        // console.log(current(state));
        // console.log(action);
        const newsinhVien = action.payload;
        state.sinhVien.push(newsinhVien)

      },
  },
});

// Xuất các action creators được tạo tự động bởi createSlice
export const {themSinhVien} = sinhVienSlice.actions;

// Xuất reducer của slice
export default sinhVienSlice.reducer;
