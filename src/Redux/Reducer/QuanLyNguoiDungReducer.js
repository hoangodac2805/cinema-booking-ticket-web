import { createSlice } from "@reduxjs/toolkit";
import { quanLyNguoiDungService } from "../../Services/QuanLyNguoiDungService";
import { setLoadingAction } from "./LoadingReducer";

const initialState = {
  currentUserInfo: {},
  thongTinTaiKhoan: {},
  danhSachNguoiDung: [],
  danhSachLoaiNguoiDung: [],
  isDataLoading: true,

};

const QuanLyNguoiDungReducer = createSlice({
  name: "QuanLyNguoiDungReducer",
  initialState,
  reducers: {
    setCurrentUserInfo: (state, action) => {
      console.log(action);
      state.currentUserInfo = action.payload;
    },
    setThongTinTaiKhoan: (state, action) => {
      state.thongTinTaiKhoan = action.payload;
    },
    setDanhSachNguoiDung: (state, action) => {
      state.danhSachNguoiDung = action.payload;
    },
    setDanhSachLoaiNguoiDung: (state, action) => {
      state.danhSachLoaiNguoiDung = action.payload;
    },
    setIsDataLoading: (state, action) => {
      state.isDataLoading = action.payload;
    },
  },
});

export const {
  setCurrentUserInfo,
  setThongTinTaiKhoan,
  setDanhSachNguoiDung,
  setDanhSachLoaiNguoiDung,
  setIsDataLoading,
} = QuanLyNguoiDungReducer.actions;

export default QuanLyNguoiDungReducer.reducer;
//---------thunk-----------
export const layDanhSachNguoiDung = (tuKhoa = "") => {
  return async (dispatch) => {
    await dispatch(setLoadingAction(true));
    dispatch(setIsDataLoading(true));
    try {
      const { data, status } =
        await quanLyNguoiDungService.layDanhSachNguoiDung(tuKhoa);
      if (status === 200) {
       await dispatch(setDanhSachNguoiDung(data.content));
      }
    } catch (error) {
      console.log(error);
    }
       dispatch(setIsDataLoading(false));
    await dispatch(setLoadingAction(false));
  };
};
export const layDanhSachLoaiNguoiDung = () => {
  return async (dispatch) => {
    dispatch(setIsDataLoading(true));
    try {
      const { data, status } =
        await quanLyNguoiDungService.layDanhSachLoaiNguoiDung();
      if (status === 200) {
        await dispatch(setDanhSachLoaiNguoiDung(data.content));
      }
    } catch (error) {
      console.log(error);
    }
    dispatch(setIsDataLoading(false));
  };
};
