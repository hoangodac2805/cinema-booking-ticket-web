import { configureStore } from "@reduxjs/toolkit";
import QuanLyPhimReducer from "./Reducer/QuanLyPhimReducer";
import QuanLyRapReducer from "./Reducer/QuanLyRapReducer";
import QuanLyDatVeReducer from "./Reducer/QuanLyDatVeReducer";
import LoadingReducer from "./Reducer/LoadingReducer";
import QuanLyNguoiDungReducer from "./Reducer/QuanLyNguoiDungReducer";
import DrawerReducer from "./Reducer/DrawerReducer";
import ModalReducer from "./Reducer/ModalReducer";
export default configureStore({
  reducer: {
    DrawerReducer,
    QuanLyPhimReducer,
    QuanLyRapReducer,
    QuanLyDatVeReducer,
    LoadingReducer,
    QuanLyNguoiDungReducer,
    ModalReducer,
  },
});
