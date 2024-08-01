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
      state.sinhVien.push(newsinhVien);
    },
    xoaSinhVien: (state, action) => {
       console.log(action.payload)
       console.log(state.sinhVien) 
      let index = state.sinhVien.findIndex(
       
        (item) => item.mssv == action.payload
      );
      console.log(index)
      if (index != -1) {
        state.sinhVien.splice(index, 1);
      }
      console.log(state.sinhVien)
    },
  },
});

// Xuất các action creators được tạo tự động bởi createSlice
export const { themSinhVien,xoaSinhVien} = sinhVienSlice.actions;

// Xuất reducer của slice
export default sinhVienSlice.reducer;
