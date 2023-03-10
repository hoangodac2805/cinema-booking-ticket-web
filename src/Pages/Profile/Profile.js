import { Button } from "antd";
import _ from "lodash";
import moment from "moment";
import { Tabs } from "antd";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";
import { layThongTinTaiKhoan } from "../../Redux/Action/QuanLyNguoiDungAction";
import { USERINFO } from "../../Util/systemSetting";
import { setModalOpen } from "../../Redux/Reducer/ModalReducer";
import ChangePassword from "../../Components/Modal/ChangePassword";
import ChangeInfo from "../../Components/Modal/ChangeInfo";
import Style from "./Profile.module.css";
export default function Profile() {
  //----------redux----------

  const { thongTinTaiKhoan } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );

  const thongTinDatVe = Object.entries(
    _.groupBy(thongTinTaiKhoan?.thongTinDatVe, "tenPhim")
  );

  const dispatch = useDispatch();
  //--------useRef----------
  const checkPass = useRef("");
  //----------useState--------
  const [checkPassword, setCheckPassword] = useState(false);
  //---------function---------

  const renderThongTin = () => {
    return thongTinDatVe?.map((phim, index) => {
      return (
        <section key={index} className="text-gray-600 body-font">
          <div className="container px-5 py-5 mx-auto">
            <div className="flex flex-wrap w-full mb-10 flex-col items-center text-center">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-red-600">
                {phim[0]}
              </h1>
            </div>
            <div className="flex flex-wrap -m-4">
              {phim[1]?.map((item, index) => {
                return (
                  <div className="xl:w-1/2 md:w-full p-4" key={index}>
                    <div className="border border-gray-200 p-6 rounded-lg">
                      <div className="inline-flex items-center justify-center  mb-4">
                        <img
                          src={item.hinhAnh}
                          alt={item.hinhAnh}
                          style={{ width: "150px" }}
                        ></img>
                        <div className="ml-3">
                          <p className="font-bold">
                            Ng??y ?????t:{" "}
                            {moment(item.ngayDat).format(" DD-MM-YYYY")}
                          </p>
                          <p className="font-bold">
                            Gi??? ?????t: {moment(item.ngayDat).format(" hh:mm")}
                          </p>
                          <p className="font-bold">
                            Th???i l?????ng phim: {item.thoiLuongPhim} ph??t
                          </p>
                        </div>
                      </div>
                      {item.danhSachGhe.map((item, index) => {
                        if (index === 0) {
                          return (
                            <Fragment key={index}>
                              <h2 className="text-lg text-red-600 font-medium title-font mb-2">
                                {item.tenHeThongRap}-{item.tenRap}
                              </h2>
                              <Button className="leading-relaxed text-base text-green-500 mr-1 mb-1">
                                Gh??? -{item.tenGhe}
                              </Button>
                            </Fragment>
                          );
                        } else {
                          return (
                            <Button
                              key={index}
                              className="leading-relaxed text-base text-green-500  mr-1 mb-1"
                            >
                              Gh??? -{item.tenGhe}
                            </Button>
                          );
                        }
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      );
    });
  };
  //-----------useEffect--------
  useEffect(() => {
    dispatch(layThongTinTaiKhoan());

    return () => {};
  }, []);

  if (localStorage.getItem(USERINFO)) {
    return (
      <div className="mt-36">
        <Tabs centered defaultActiveKey="1">
          <Tabs.TabPane
            tab={
              <button className="px-10 py-5 bg-green-600 text-white font-bold rounded-md text-sm">
                TH??NG TIN
              </button>
            }
            key="1"
          >
            <div
              className={`${Style.thongTin} px-3 flex justify-center items-center`}
            >
              <div
                style={{ backdropFilter: "blur(10px)" }}
                className="w-full text-white  bg-opacity-80 bg-clip-padding py-44"
              >
                <h3 className="text-center text-lg ">Th??ng tin c?? nh??n</h3>
                <div className="grid grid-cols-2">
                  <div className="text-center">
                    <p>T??i kho???n: {thongTinTaiKhoan?.taiKhoan}</p>
                    <p>Email:{thongTinTaiKhoan?.email}</p>
                    <p>M?? lo???i ng?????i d??ng:{thongTinTaiKhoan?.loaiNguoiDung}</p>
                    <Button
                      onClick={() => {
                        dispatch(
                          setModalOpen({
                            content: (
                              <ChangeInfo
                                userInfo={thongTinTaiKhoan}
                              ></ChangeInfo>
                            ),
                            title: "Thay ?????i th??ng tin",
                          })
                        );
                      }}
                      className="text-green-500"
                      icon={<EditOutlined></EditOutlined>}
                    >
                      Ch???nh s???a th??ng tin
                    </Button>
                  </div>
                  <div className="text-center">
                    <p className="inline-block mr-3">M???t kh???u: **********</p>{" "}
                    <span
                      onClick={() => {
                        dispatch(
                          setModalOpen({
                            content: (
                              <ChangePassword
                                userInfo={thongTinTaiKhoan}
                              ></ChangePassword>
                            ),
                            title: "?????i m???t kh???u",
                          })
                        );
                      }}
                      className="text-blue-500 cursor-pointer"
                    >
                      ?????i m???t kh???u
                    </span>
                    <p>S??? ??i???n tho???i:{thongTinTaiKhoan?.soDT}</p>
                    <p>M?? nh??m:{thongTinTaiKhoan?.maNhom}</p>
                  </div>
                </div>
              </div>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <button className="px-10 py-5 bg-green-600 text-white font-bold rounded-md text-sm">
                L???CH S??? ?????T V??
              </button>
            }
            key="2"
          >
            <div style={{ height: "88vh" }} className="overflow-auto">
              {renderThongTin()}
            </div>
          </Tabs.TabPane>
        </Tabs>
      </div>
    );
  } else {
    alert("Y??u c???u ????ng nh???p v??o t??i kho???n!!");
    return <Navigate to="/login"></Navigate>;
  }
}
