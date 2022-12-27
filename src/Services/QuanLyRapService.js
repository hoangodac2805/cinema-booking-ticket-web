import { GROUP } from "../Util/systemSetting";
import { baseService } from "./baseService";

class QuanLyRapService extends baseService {
  constructor() {
    super();
  }
  layThongTinHeThongRap = () => {
    return this.get(`QuanLyRap/LayThongTinHeThongRap`);
  };
  layThongTinCumRapTheoHeThong = (maHeThongRap) => {
    return this
      .get(`QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}

`);
  };
  layThongTinLichChieuHeThongRap = () => {
    return this.get(`QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUP}`);
  };

  layThongTinLichChieuPhim = (idFilm) => {
    return this.get(`QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${idFilm}`);
  };
}
export const quanLyRapService = new QuanLyRapService();
