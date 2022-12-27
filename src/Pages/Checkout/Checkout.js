import _ from "lodash";
import React, { Fragment, useEffect } from "react";
import { Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import {
  datVeAction,
  layDanhSachPhongVeAction,
  setGheDangChon,
} from "../../Redux/Reducer/QuanLyDatVeReducer";
import { USERINFO } from "../../Util/systemSetting";
import Style from "./Checkout.module.css";
import Profile from "../Profile/Profile";
import { history } from "../../App";
export default function Checkout(props) {
  const currentUser = JSON.parse(localStorage.getItem(USERINFO));
  //-------------react-router------------
  const params = useParams();
  //-----------redux--------------
  const dispatch = useDispatch();
  const { danhSachPhongVe, listGheDangChon } = useSelector(
    (state) => state.QuanLyDatVeReducer
  );
  const { thongTinPhim, danhSachGhe } = danhSachPhongVe;
  //-------------function----------
  const renderDanhSachGhe = () => {
    return danhSachGhe?.map((ghe, index) => {
      let gheVip = ghe.loaiGhe === "Vip" ? Style.ghe_vip : "";
      let gheDaDat = ghe.daDat === true ? Style.ghe_daDat : "";
      let checkIndexDangChon = listGheDangChon?.findIndex(
        (gheDangChon) => gheDangChon.maGhe === ghe.maGhe
      );
      let dangChon = checkIndexDangChon !== -1 ? Style.ghe_dangChon : "";
      let gheBanMua =
        ghe.taiKhoanNguoiDat === currentUser.taiKhoan ? Style.ghe_banMua : "";
      let disable = ghe.daDat;
      return (
        <Fragment key={index}>
          <button
            onClick={() => {
              dispatch(setGheDangChon(ghe));
            }}
            disabled={disable}
            className={`${Style.ghe} ${gheVip} ${gheDaDat} ${dangChon} ${gheBanMua}`}
          >
            {disable ? "X" : `${ghe.tenGhe}`}
          </button>
          {(index + 1) % 16 === 0 ? <br></br> : ""}
        </Fragment>
      );
    });
  };
  //-----------useEffect-----------
  useEffect(() => {
    dispatch(layDanhSachPhongVeAction(params.id));

    return () => {};
  }, []);
  if (!localStorage.getItem(USERINFO)) {
    alert("Vui lòng đăng nhập trước khi đặt vé!!!");
    return <Navigate to="/login"></Navigate>;
  }
  return (
    <div>
      <div className="grid grid-cols-12">
        <div className="col-span-12  md:col-span-9 p-3">
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane
              className={Style.danhSachGhe}
              tab={<p className="mb-0">DANH SÁCH GHẾ</p>}
              key="1"
            >
              <div>
                <p className="mb-1 text-center">Màn hình</p>
                <div className={Style.hinh_chu_nhat}></div>
                <div className={Style.hinh_thang}></div>
                <div className="mt-6 w-9/12 mx-auto">{renderDanhSachGhe()}</div>
                <div className="px-5 grid grid-cols-5">
                  <div>
                    {" "}
                    <button className={Style.ghe}>00</button>
                    <span>Ghế thường</span>
                  </div>
                  <div>
                    {" "}
                    <button className={` ${Style.ghe} ${Style.ghe_vip} `}>
                      00
                    </button>
                    <span>Ghế vip</span>
                  </div>
                  <div>
                    {" "}
                    <button className={` ${Style.ghe} ${Style.ghe_daDat} `}>
                      X
                    </button>
                    <span>Ghế khách mua</span>
                  </div>
                  <div>
                    {" "}
                    <button className={` ${Style.ghe} ${Style.ghe_banMua} `}>
                      X
                    </button>
                    <span>Ghế bạn mua</span>
                  </div>
                  <div>
                    {" "}
                    <button className={` ${Style.ghe} ${Style.ghe_dangChon} `}>
                      00
                    </button>
                    <span>Ghế đang chọn</span>
                  </div>
                </div>
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab={<p className="mb-0"> KẾT QUẢ ĐẶT VÉ</p>} key="2">
              <Profile></Profile>
            </Tabs.TabPane>
            <Tabs.TabPane
              tab={
                <p
                  onClick={() => {
                    history.push("/home");
                  }}
                  className="mb-0"
                >
                  {" "}
                  HOME
                </p>
              }
              key="3"
            ></Tabs.TabPane>
          </Tabs>
        </div>
        <div
          className={`${Style.thanhToan_lg} col-span-12 md:col-span-3 min-h-screen w-full md:shadow-2xl relative`}
        >
          <h3 className=" text-xl lg:text-5xl text-center text-green-500 mt-4">
            {listGheDangChon?.reduce((total, ghe) => {
              return total + Number(ghe.giaVe);
            }, 0)}{" "}
            VNĐ
          </h3>
          <hr></hr>
          <div className="px-3 py-1">
            <h3 className=" text-lg lg:text-2xl text-center text-red-500">
              {thongTinPhim?.tenPhim}
            </h3>
            <p className="text-sm lg:text-base">
              Địa điểm: {thongTinPhim?.tenCumRap}
            </p>
            <p className="text-sm lg:text-base">
              Địa chỉ: {thongTinPhim?.diaChi}
            </p>
            <p className="text-sm lg:text-base">
              Ngày chiếu: {thongTinPhim?.ngayChieu}- {thongTinPhim?.tenRap}
            </p>
            <p className="text-sm lg:text-base">
              Giờ chiếu: {thongTinPhim?.gioChieu}
            </p>
          </div>
          <hr></hr>
          <div className="px-3 py-1">
            <p className="text-xs lg:text-sm text-gray-400">
              Email: {currentUser?.email}
            </p>
            <p className="text-xs lg:text-sm text-gray-400">
              Phone: {currentUser?.soDT}
            </p>
          </div>
          <hr></hr>
          <div
            className="flex justify-between px-5 py-5 mb-10 overflow-auto"
            style={{ height: "400px" }}
          >
            <div>
              {_.sortBy(listGheDangChon, "maGhe").map((ghe, index) => {
                return (
                  <p className="text-xs lg:text-sm text-red-500" key={index}>
                    Ghế: {ghe.tenGhe}
                  </p>
                );
              })}
            </div>
            <div>
              {_.sortBy(listGheDangChon, "maGhe").map((ghe, index) => {
                return (
                  <p className="text-xs lg:text-sm text-green-500" key={index}>
                    Giá: {ghe.giaVe} VNĐ
                  </p>
                );
              })}
            </div>
          </div>
          <div
            onClick={() => {
              let model = {
                maLichChieu: params.id,
                danhSachVe: [...listGheDangChon],
              };
              dispatch(datVeAction(model));
            }}
            className="absolute bg-red-400 w-full bottom-0 py-4 transition-all duration-300 hover:bg-green-500 text-center text-white cursor-pointer"
          >
            MUA VÉ
          </div>
        </div>
      </div>
      <div
        className={`${Style.thanhToan_md} min-w-full relative overflow-auto`}
      >
        <h3 className=" text-xl lg:text-5xl text-center text-green-500 mt-4">
          {listGheDangChon?.reduce((total, ghe) => {
            return total + Number(ghe.giaVe);
          }, 0)}{" "}
          VNĐ
        </h3>

        <div className="px-3 py-1 grid grid-cols-2">
          <div>
            <h3 className=" text-lg lg:text-2xl text-center text-red-500">
              {thongTinPhim?.tenPhim}
            </h3>
            <p className="text-sm lg:text-base">
              Địa điểm: {thongTinPhim?.tenCumRap}
            </p>
            <p className="text-sm lg:text-base">
              Địa chỉ: {thongTinPhim?.diaChi}
            </p>
            <p className="text-sm lg:text-base">
              Ngày chiếu: {thongTinPhim?.ngayChieu}- {thongTinPhim?.tenRap}
            </p>
            <p className="text-sm lg:text-base">
              Giờ chiếu: {thongTinPhim?.gioChieu}
            </p>
          </div>
          <div className="grid grid-cols-3 h-fit">
            {_.sortBy(listGheDangChon, "maGhe").map((ghe, index) => {
              return (
                <div key={index}>
                  <p className="text-xs text-red-500 mb-0">
                    Ghế: {ghe.tenGhe}
                  </p>
                  <p className="text-xs text-green-500">
                    Giá: {ghe.giaVe} VNĐ
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div
          onClick={() => {
            let model = {
              maLichChieu: params.id,
              danhSachVe: [...listGheDangChon],
            };
            dispatch(datVeAction(model));
          }}
          className="absolute bg-red-400 w-full bottom-0 py-4 transition-all duration-300 hover:bg-green-500 text-center text-white cursor-pointer"
        >
          MUA VÉ
        </div>
      </div>
    </div>
  );
}
