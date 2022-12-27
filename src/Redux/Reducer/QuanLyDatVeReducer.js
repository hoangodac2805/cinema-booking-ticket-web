import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import { quanLyDatVeService } from "../../Services/QuanLyDatVeService";
import { openNotificationWithIcon } from "../../Util/notification";
import { layThongTinTaiKhoan } from "../Action/QuanLyNguoiDungAction";
import { setOpenDrawer } from "./DrawerReducer";
import { setLoadingAction } from "./LoadingReducer";

const initialState = {
  danhSachPhongVe: {},
  listGheDangChon: [],
};

const QuanLyDatVeReducer = createSlice({
  name: "QuanLyDatVeReducer",
  initialState,
  reducers: {
    setDanhSachPhongVe: (state, action) => {
      state.danhSachPhongVe = action.payload;
    },
    setGheDangChon: (state, action) => {
      let checkIndex = state.listGheDangChon.findIndex(
        (ghe) => ghe.maGhe === action.payload.maGhe
      );
      if (checkIndex === -1) {
        state.listGheDangChon.push(action.payload);
      } else {
        state.listGheDangChon.splice(checkIndex, 1);
      }
    },
    resetListGheDangChon: (state, action) => {
      state.listGheDangChon = [];
    },
  },
});

export const { setDanhSachPhongVe, setGheDangChon, resetListGheDangChon } =
  QuanLyDatVeReducer.actions;

export default QuanLyDatVeReducer.reducer;

//-----------------thunk-----------------
export const layDanhSachPhongVeAction = (maLichChieu) => {
  return async (dispatch) => {
    await dispatch(setLoadingAction(true));
    try {
      const { data, status } = await quanLyDatVeService.layDanhSachPhongVe(
        maLichChieu
      );
      if (status === 200) {
        dispatch(setDanhSachPhongVe(data.content));
      }
    } catch (error) {
      console.log(error);
    }

    await dispatch(setLoadingAction(false));
  };
};
export const datVeAction = (model) => {
  return async (dispatch) => {
    await dispatch(setLoadingAction(true));
    try {
      const { data, status } = await quanLyDatVeService.datVe(model);
      if (status === 200) {
        dispatch(layDanhSachPhongVeAction(model.maLichChieu));
        dispatch(resetListGheDangChon());
        dispatch(layThongTinTaiKhoan());
        openNotificationWithIcon("success", "Đặt vé thành công!");
      }
    } catch (error) {
      console.log(error);
      openNotificationWithIcon("error", "Đặt vé thất bại!");
    }
    await dispatch(setLoadingAction(false));
  };
};
export const taoLichChieu = (model) => {
  return async (dispatch) => {
    await dispatch(setLoadingAction(true));
    try {
      const { data, status } = await quanLyDatVeService.taoLichChieu(model);
      if (status === 200) {
        openNotificationWithIcon("success", "Tạo lịch chiếu thành công!");
        dispatch(
          setOpenDrawer({
            status: false,
            title: "Mặc định",
            content: <p>Mặc định</p>,
          })
        );
      }
    } catch (error) {
      console.log(error);
      openNotificationWithIcon(
        "error",
        "Tạo lịch chiếu không  thành công!",
        error.response.data.content
      );
    }
    await dispatch(setLoadingAction(false));
  };
};
