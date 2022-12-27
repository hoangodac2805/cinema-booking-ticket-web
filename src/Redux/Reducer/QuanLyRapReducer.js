import { createSlice } from "@reduxjs/toolkit";
import { quanLyRapService } from "../../Services/QuanLyRapService";

const initialState = {
  heThongRap: [],
  thongTinCumRapTheoHeThong: [],
  thongTinLichChieuHeThongRap: [],
  lichChieuPhim: {},
};

const QuanLyRapReducer = createSlice({
  name: "QuanLyRapReducer",
  initialState,
  reducers: {
    setHeThongRapRedux: (state, action) => {
      state.heThongRap = action.payload;
    },
    setThongTinCumRapTheoHeThong: (state, action) => {
      state.thongTinCumRapTheoHeThong = action.payload;
    },
    setThongTinHeThongRapRedux: (state, action) => {
      state.thongTinLichChieuHeThongRap = action.payload;
    },
    setLichChieuPhim: (state, action) => {
      state.lichChieuPhim = action.payload;
    },
  },
});

export const {
  setHeThongRapRedux,
  setThongTinHeThongRapRedux,
  setLichChieuPhim,
  setThongTinCumRapTheoHeThong,
} = QuanLyRapReducer.actions;

export default QuanLyRapReducer.reducer;

//---------------------Thunk---------
export const layThongTinHeThongRapAction = () => {
  return async (dispatch) => {
    try {
      const { data, status } = await quanLyRapService.layThongTinHeThongRap();
      if (status === 200) {
        dispatch(setHeThongRapRedux(data.content));
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const layThongTinCumRapTheoHeThongAction = (maHeThongRap) => {
  return async (dispatch) => {
    try {
      const { data, status } =
        await quanLyRapService.layThongTinCumRapTheoHeThong(maHeThongRap);
      if (status === 200) {
        dispatch(setThongTinCumRapTheoHeThong(data.content));
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const layThongTinLichChieuHeThongRapAction = () => {
  return async (dispatch) => {
    try {
      const { data, status } =
        await quanLyRapService.layThongTinLichChieuHeThongRap();
      if (status === 200) {
        dispatch(setThongTinHeThongRapRedux(data.content));
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const layThongTinLichChieuPhim = (idFilm) => {
  return async (dispatch) => {
    try {
      const { data, status } = await quanLyRapService.layThongTinLichChieuPhim(
        idFilm
      );
      if (status === 200) {
        dispatch(setLichChieuPhim(data.content));
      }
    } catch (error) {
      console.log(error);
    }
  };
};
