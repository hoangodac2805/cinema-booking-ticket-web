import React, { useEffect, useRef } from "react";
import { Select, Cascader, DatePicker, InputNumber, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  layThongTinCumRapTheoHeThongAction,
  layThongTinHeThongRapAction,
} from "../../Redux/Reducer/QuanLyRapReducer";
import moment from "moment";
import { taoLichChieu } from "../../Redux/Reducer/QuanLyDatVeReducer";
export default function TaoLichChieuANTD(props) {
  const { filmInfo } = props;
  //--------redux--------
  const dispatch = useDispatch();
  const { heThongRap, thongTinCumRapTheoHeThong } = useSelector(
    (state) => state.QuanLyRapReducer
  );
  //---------useRef---------
  const dataRef = useRef({
    maPhim: filmInfo?.maPhim,
    ngayChieuGioChieu: "",
    maRap: "",
    giaVe: 75000,
  });
  //---------Select---------
  const handleChangeSelect = (value) => {
    // console.log(`selected ${value}`);
    dispatch(layThongTinCumRapTheoHeThongAction(value));
  };

  //----------Cascader--------------

  const onChangeCascader = (value) => {
    // console.log(value);
    dataRef.current.maRap = value[0];
  };
  //------DatePicker-------
  const onChangeDate = (value, dateString) => {
    // console.log("Selected Time: ", value);
    // console.log("Formatted Selected Time: ", dateString);
    dataRef.current.ngayChieuGioChieu = moment(dateString).format(
      "DD/MM/YYYY hh:mm:ss"
    );
  };
  const onOk = (value) => {
    // console.log("onOk: ", value);
  };
  //--------InputNumber-------
  const onChange = (value) => {

    dataRef.current.giaVe = value;
  };
  //-------useEffect---------
  useEffect(() => {
    dispatch(layThongTinHeThongRapAction());

    return () => {};
  }, []);

  return (
    <div>
      <div>
        <p className="font-bold text-base">Chọn hệ thống rạp</p>
        <Select
          placeholder="Please select"
          style={{
            width: "100%",
          }}
          onChange={handleChangeSelect}
          options={heThongRap?.map((item, index) => {
            return { value: item.maHeThongRap, label: item.tenHeThongRap };
          })}
        />
      </div>
      <div>
        <p className="font-bold text-base">Chọn cụm rạp</p>
        <Cascader
          style={{ width: "100%" }}
          options={thongTinCumRapTheoHeThong?.map((cumRap, index) => {
            return {
              value: cumRap.maCumRap,
              label: cumRap.tenCumRap,
              children: cumRap.danhSachRap.map((rap, index) => {
                return { value: rap.maRap, label: rap.tenRap };
              }),
            };
          })}
          onChange={onChangeCascader}
          placeholder="Please select"
        />
      </div>
      <div>
        <p className="font-bold text-base">Chọn ngày chiếu</p>
        <DatePicker showTime onChange={onChangeDate} onOk={onOk} />
      </div>
      <div>
        <p className="font-bold text-base">Giá vé(75000 - 200000)</p>
        <InputNumber
          type={"number"}
          min={75000}
          max={200000}
          defaultValue={75000}
          onChange={onChange}
        />
      </div>
      <Button
        onClick={() => {
          dispatch(taoLichChieu(dataRef.current));
      
        }}
        className="mt-5"
        type="primary"
      >
        Tạo lịch chiếu
      </Button>
    </div>
  );
}
