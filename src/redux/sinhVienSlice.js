import { createSlice , current} from "@reduxjs/toolkit";
import { removeVietnameseTones } from "../util/removeVietnameseTones";
const initialState = {
  sinhVien: [],
  originalSinhVien: [],
};

const sinhVienSlice = createSlice({
  name: "sinhVien",
  initialState,
  reducers: {
    themSinhVien: (state, action) => {
      state.sinhVien.push(action.payload);
      state.originalSinhVien = state.sinhVien;
    },
    xoaSinhVien: (state, action) => {
      let index = state.sinhVien.findIndex(
        (item) => item.mssv == action.payload
      );
      console.log(index);
      if (index != -1) {
        state.sinhVien.splice(index, 1);
        state.originalSinhVien.splice(index, 1);
      }
    },
    capNhatSinhVien: (state, action) => {
    
      const index = state.sinhVien.findIndex(sv => sv.mssv === action.payload.mssv);
      if (index !== -1) {
        state.sinhVien[index] = action.payload;
        state.originalSinhVien = state.sinhVien;
      }
    },
    timKiemSinhVien: (state, action) => {
      const search = removeVietnameseTones(action.payload.toLowerCase());
      state.sinhVien = state.originalSinhVien.filter((item) =>
        removeVietnameseTones(item.mssv.toLowerCase().trim()).includes(search)
      );
    },
  
  },
});

export const { themSinhVien, xoaSinhVien, capNhatSinhVien, timKiemSinhVien, } =
  sinhVienSlice.actions;

export default sinhVienSlice.reducer;
