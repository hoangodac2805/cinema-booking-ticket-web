import { baseService } from "./baseService";
class QuanLyDatVeService extends baseService {
  constructor() {
    super();
  }
  layDanhSachPhongVe = (maLichChieu) => {
    return this.get(
      `QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`
    );
  };
  datVe = (model) => {
    return this.post(`QuanLyDatVe/DatVe`, model);
  };
  taoLichChieu = (model) => {
    return this.post(`QuanLyDatVe/TaoLichChieu`, model);
  };
}
export const quanLyDatVeService = new QuanLyDatVeService();
