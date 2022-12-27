import { GROUP } from "../Util/systemSetting";
import { baseService } from "./baseService";

class QuanLyNguoiDungService extends baseService {
  constructor() {
    super();
  }
  dangKy = (model) => {
    return this.post(`QuanLyNguoiDung/DangKy`, model);
  };
  dangNhap = (model) => {
    return this.post(`QuanLyNguoiDung/DangNhap`, model);
  };
  layThongTinTaiKhoan = () => {
    return this.post(`QuanLyNguoiDung/ThongTinTaiKhoan`);
  };
  layDanhSachNguoiDung = (tuKhoa = "") => {
    if (tuKhoa.trim() !== "") {
      return this.get(
        `QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUP}&tuKhoa=${tuKhoa}`
      );
    }
    return this.get(`QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUP}`);
  };
  layDanhSachLoaiNguoiDung = () => {
    return this.get(`QuanLyNguoiDung/LayDanhSachLoaiNguoiDung
`);
  };
  themNguoiDung = (model) => {
    return this.post(`QuanLyNguoiDung/ThemNguoiDung`, model);
  };
  xoaNguoiDung = (taiKhoan) => {
    return this.delete(`QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`);
  };
  capNhatThongTinCaNhan = (model) => {
    return this.put(`QuanLyNguoiDung/CapNhatThongTinNguoiDung`, model);
  };
  doiMatKhau = (model) => {
    return this.put(`QuanLyNguoiDung/CapNhatThongTinNguoiDung`, model);
  };
  capNhatThongTinNguoiDung = (model) => {
    return this.post(`QuanLyNguoiDung/CapNhatThongTinNguoiDung`, model);
  };
}

export const quanLyNguoiDungService = new QuanLyNguoiDungService();
