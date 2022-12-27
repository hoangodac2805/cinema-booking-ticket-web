import { GROUP } from "../Util/systemSetting";
import { baseService } from "./baseService";

class QuanLyPhimService extends baseService {
  constructor() {
    super();
  }
  layDanhSachBanner = () => {
    return this.get("QuanLyPhim/LayDanhSachBanner");
  };
  layDanhSachPhim = (tuKhoa = "") => {
    if (tuKhoa.trim() !== "") {
      return this.get(
        `QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP}&tenPhim=${tuKhoa}`
      );
    }
    return this.get(`QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP}`);
  };
  layThongTinPhim = (idFilm) => {
    return this.get(`QuanLyPhim/LayThongTinPhim?MaPhim=${idFilm}`);
  };
  layDanhSachPhimTheoNgay = (ngayBatDau, ngayKetThuc) => {
    return this.get(
      `QuanLyPhim/LayDanhSachPhimTheoNgay?maNhom=${GROUP}&tuNgay=${ngayBatDau}&denNgay=${ngayKetThuc}`
    );
  };
  themPhimUploadHinh = (model) => {
    return this.post(
      `QuanLyPhim/ThemPhimUploadHinh
`,
      model
    );
  };
  xoaPhim = (idFilm) => {
    return this.delete(`QuanLyPhim/XoaPhim?MaPhim=${idFilm}`);
  };
  capNhatPhim = (model) => {
    return this.post(`QuanLyPhim/CapNhatPhimUpload`, model);
  };
}

export const quanLyPhimService = new QuanLyPhimService();
