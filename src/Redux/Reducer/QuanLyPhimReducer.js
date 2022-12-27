import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { history } from "../../App";
import { quanLyPhimService } from "../../Services/QuanLyPhimService";
import { openNotificationWithIcon } from "../../Util/notification";
import { setOpenDrawer } from "./DrawerReducer";
import { setLoadingAction } from "./LoadingReducer";
const initialState = {
  listBanner: [],
  listFilm: [],
  filmInfo: {
    maPhim: 1283,
    tenPhim: "Lat mat 48h",
    biDanh: "lat-mat-48h",
    trailer: "https://www.youtube.com/embed/w3VI43L_Mn8",
    hinhAnh: "http://movieapi.cyberlearn.vn/hinhanh/trainwreck.jpg",
    moTa: "Having thought that monogamy was never possible, a commitment-phobic career woman may have to face her fears when she meets a good guy.",
    maNhom: "GP00",
    hot: false,
    dangChieu: true,
    sapChieu: false,
    ngayKhoiChieu: "2019-07-29T00:00:00",
    danhGia: 5,
  },
};

const QuanLyPhimReducer = createSlice({
  name: "QuanLyPhimReducer",
  initialState,
  reducers: {
    setListBannerRedux: (state, action) => {
      state.listBanner = action.payload;
    },
    setListFilmRedux: (state, action) => {
      state.listFilm = action.payload;
    },
    setFilmInfo: (state, action) => {
      state.filmInfo = action.payload;
    },
  },
});

export const { setListBannerRedux, setListFilmRedux, setFilmInfo } =
  QuanLyPhimReducer.actions;

export default QuanLyPhimReducer.reducer;

//------------actions thunk -----------------
export const layDanhSachBanner = () => {
  return async (dispatch) => {
    await dispatch(setLoadingAction(true));
    try {
      const { data, status } = await quanLyPhimService.layDanhSachBanner();
      if (status === 200) {
        dispatch(setListBannerRedux(data.content));
      }
    } catch (error) {
      console.log(error);
    }
    await dispatch(setLoadingAction(false));
  };
};
export const layDanhSachPhim = (tuKhoa = "") => {

  return async (dispatch) => {
    await dispatch(setLoadingAction(true));
    try {
      const { data, status } = await quanLyPhimService.layDanhSachPhim(tuKhoa);
      if (status === 200) {
        dispatch(setListFilmRedux(data.content));
      }
    } catch (error) {
      console.log(error);
    }
    await dispatch(setLoadingAction(false));
  };
};
export const layDanhSachPhimTheoNgay = (ngayBatDau, ngayKetThuc) => {
  return async (dispatch) => {
    await dispatch(setLoadingAction(true));
    try {
      const { data, status } = await quanLyPhimService.layDanhSachPhimTheoNgay(
        ngayBatDau,
        ngayKetThuc
      );
      if (status === 200) {
        dispatch(setListFilmRedux(data.content));
      }
    } catch (error) {
      console.log(error);
    }
    await dispatch(setLoadingAction(false));
  };
};
export const layThongTinPhim = (idFilm) => {
  return async (dispatch) => {
    await dispatch(setLoadingAction(true));
    try {
      const { data, status } = await quanLyPhimService.layThongTinPhim(idFilm);
      if (status === 200) {
        dispatch(setFilmInfo(data.content));
      }
    } catch (error) {
      console.log(error);
    }
    await dispatch(setLoadingAction(false));
  };
};
export const themPhimUploadHinh = (model) => {
  return async (dispatch) => {
    await dispatch(setLoadingAction(true));
    try {
      const { data, status } = await quanLyPhimService.themPhimUploadHinh(
        model
      );
      if (status === 200) {
        openNotificationWithIcon("success", "Thêm phim thành công", "");

        await dispatch(layDanhSachPhim());
        history.push("/admin/filmManagement");
      }
    } catch (error) {
      console.log(error);
      openNotificationWithIcon(
        "error",
        "Thêm phim không  thành công!",
        error.response.data.content
      );
    }
    await dispatch(setLoadingAction(false));
  };
};
export const xoaPhim = (idFilm) => {
  return async (dispatch) => {
    await dispatch(setLoadingAction(true));
    try {
      const { data, status } = await quanLyPhimService.xoaPhim(idFilm);
      if (status === 200) {
        openNotificationWithIcon("success", "Xoá phim thành công", "");

        await dispatch(layDanhSachPhim());
      }
    } catch (error) {
      console.log(error);
      openNotificationWithIcon(
        "error",
        "Xoá phim không  thành công!",
        error.response.data.content
      );
    }
    await dispatch(setLoadingAction(false));
  };
};
export const capNhatPhimUpload = (model) => {
  return async (dispatch) => {
    await dispatch(setLoadingAction(true));
    try {
      const { data, status } = await quanLyPhimService.capNhatPhim(model);
      if (status === 200) {
        openNotificationWithIcon("success", "Cập nhật phim thành công", "");
        await dispatch(layDanhSachPhim());
        await dispatch(
          setOpenDrawer({
            status: false,
            content: <p>Mặc định</p>,
            title: "Mặc định",
          })
        );
        history.push("/admin/filmManagement");
      }
    } catch (error) {
      console.log(error);
      openNotificationWithIcon(
        "error",
        "Cập nhật phim không  thành công!",
        error.response.data.content
      );
    }
    await dispatch(setLoadingAction(false));
  };
};
