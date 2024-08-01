import { createSlice , current} from "@reduxjs/toolkit";
import { removeVietnameseTones } from "../util/removeVietnameseTones";
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
      console.log(current(state));
      // console.log(action);
      const newsinhVien = action.payload;
      state.sinhVien.push(newsinhVien);
    },
    xoaSinhVien: (state, action) => {
      let index = state.sinhVien.findIndex(
        (item) => item.mssv == action.payload
      );
      console.log(index);
      if (index != -1) {
        state.sinhVien.splice(index, 1);
      }
      console.log(state.sinhVien);
    },
    capNhatSinhVien: (state, action) => {
      const updatedSinhVien = action.payload;
      const index = state.sinhVien.findIndex(
        (item) => item.mssv == updatedSinhVien.mssv
      );
      if (index !== -1) {
        state.sinhVien[index] = updatedSinhVien;
      }
    },
    timKiemSinhVien: (state, action) => {
      const search = removeVietnameseTones(action.payload.toLowerCase());
      state.sinhVien = state.sinhVien.filter((item) =>
        removeVietnameseTones(item.mssv.toLowerCase()).includes(search)
      );
      console.log(state.sinhVien);
    },
  },
});

// Xuất các action creators được tạo tự động bởi createSlice
export const { themSinhVien, xoaSinhVien, capNhatSinhVien, timKiemSinhVien } =
  sinhVienSlice.actions;

// Xuất reducer của slice
export default sinhVienSlice.reducer;
