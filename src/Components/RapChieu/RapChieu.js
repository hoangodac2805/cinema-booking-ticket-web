import React, { Fragment, useEffect } from "react";
import { Button, Tabs, Collapse } from "antd";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import Style from "./RapChieu.module.css";
import {
  layThongTinHeThongRapAction,
  layThongTinLichChieuHeThongRapAction,
} from "../../Redux/Reducer/QuanLyRapReducer";
import _ from "lodash";
import { history } from "../../App";
export default function RapChieu(props) {
  const { Panel } = Collapse;
  //-------------react-redux----------
  const dispatch = useDispatch();
  const { heThongRap, thongTinLichChieuHeThongRap } = useSelector(
    (state) => state.QuanLyRapReducer
  );
  //---------Functions---------------
  const onChangeCollapseHtRap = (key) => {};
  const onChangeCollapseLichPhim = (key) => {};
  //------------useEffect-----------
  useEffect(() => {
    dispatch(layThongTinHeThongRapAction());
    dispatch(layThongTinLichChieuHeThongRapAction());
    return () => {};
  }, []);

  return (
    <div id="rapChieu" className={Style.rapChieuContainer}>
      <h3 className="font-mono text-center my-10 text-2xl text-red-700 font-bold ">
        HỆ THỐNG RẠP CHIẾU
      </h3>
      <div className={Style.rapChieu}>
        {/* largeSize */}
        <div
          id={Style.largeSize}
          className=" overflow-auto py-2"
          style={{ border: "1px solid #ededee", maxHeight: "600px" }}
        >
          <Tabs tabPosition="left" defaultActiveKey="0">
            {heThongRap?.map((htRap, index) => {
              return (
                <Tabs.TabPane
                  tab={
                    <Fragment>
                      <img
                        src={htRap.logo}
                        style={{ width: "50px" }}
                        className="mb-2"
                      ></img>
                      <hr></hr>
                    </Fragment>
                  }
                  key={index}
                >
                  <Tabs tabPosition="left" defaultActiveKey="0">
                    {thongTinLichChieuHeThongRap
                      ?.filter(
                        (item) => item.maHeThongRap === htRap.maHeThongRap
                      )
                      .map((cumRap, index) => {
                        return cumRap.lstCumRap.map((rap, index) => {
                          return (
                            <Tabs.TabPane
                              style={{ height: "600px" }}
                              className="overflow-auto"
                              tab={
                                <div className="flex gap-3">
                                  <img
                                    src={rap.hinhAnh}
                                    alt={rap.hinhAnh}
                                    style={{ width: "60px" }}
                                  ></img>
                                  <div className="text-left font-mono">
                                    <p className="mb-1 text-red-600">
                                      {rap.tenCumRap}
                                    </p>
                                    <p className="text-xs text-white">
                                      {rap.diaChi.length > 25
                                        ? rap.diaChi.substring(0, 25) + "..."
                                        : rap.diaChi}
                                    </p>
                                  </div>
                                </div>
                              }
                              key={index}
                            >
                              {rap.danhSachPhim.map((phim, index) => {
                                return (
                                  <Fragment key={index}>
                                    <div className="text-center">
                                      <div className="flex mb-3 gap-3">
                                        <img
                                          style={{
                                            width: "100px",
                                            height: "100px",
                                          }}
                                          src={phim.hinhAnh}
                                          alt={phim.hinhAnh}
                                        ></img>

                                        <span className="font-bold font-mono text-red-600">
                                          {phim.tenPhim}
                                        </span>
                                      </div>

                                      <div className="text-left">
                                        {Object.values(
                                          _.groupBy(
                                            phim?.lstLichChieuTheoPhim,
                                            (value) => {
                                              return moment(
                                                value.ngayChieuGioChieu
                                              ).format("DD-MM-YYYY");
                                            }
                                          )
                                        )?.map((lichChieu, index) => {
                                     
                                          return lichChieu.map(
                                            (item, index) => {
                                              if (index === 0) {
                                                return (
                                                  <Fragment key={index}>
                                                    <p className="mb-0 mt-3  font-mono font-bold text-green-700">
                                                      Ngày:{" "}
                                                      {moment(
                                                        item.ngayChieuGioChieu
                                                      ).format("DD-MM-YYYY")}
                                                    </p>
                                                    <Button
                                                      onClick={() => {
                                                        history.push(
                                                          `/checkout/${item.maLichChieu}`
                                                        );
                                                      }}
                                                      className="mr-1 mb-1 text-white"
                                                    >
                                                      {moment(
                                                        item.ngayChieuGioChieu
                                                      ).format("HH:mm")}
                                                    </Button>
                                                  </Fragment>
                                                );
                                              } else {
                                                return (
                                                  <Button
                                                    onClick={() => {
                                                      history.push(
                                                        `/checkout/${item.maLichChieu}`
                                                      );
                                                    }}
                                                    className="mb-1 mr-1 text-white"
                                                    key={index}
                                                  >
                                                    {moment(
                                                      item.ngayChieuGioChieu
                                                    ).format("hh:mm")}
                                                  </Button>
                                                );
                                              }
                                            }
                                          );
                                        
                                        })}
                                      </div>
                                    </div>
                                    <hr className="my-3"></hr>
                                  </Fragment>
                                );
                              })}
                            </Tabs.TabPane>
                          );
                        });
                      })}
                  </Tabs>
                </Tabs.TabPane>
              );
            })}
          </Tabs>
        </div>
        {/* MediumSize */}
        <div id={Style.mediumSize}>
          <Tabs centered defaultActiveKey="0">
            {heThongRap?.map((htRap, index) => {
              return (
                <Tabs.TabPane
                  style={{ height: "500px" }}
                  className="overflow-auto"
                  tab={
                    <Fragment>
                      <img
                        src={htRap.logo}
                        style={{ width: "60px" }}
                        className="mb-2"
                      ></img>
                    </Fragment>
                  }
                  key={index}
                >
                  <Collapse
              
                    expandIconPosition="end"
                    onChange={onChangeCollapseHtRap}
                  >
                    {thongTinLichChieuHeThongRap
                      ?.filter(
                        (item) => item.maHeThongRap === htRap.maHeThongRap
                      )
                      .map((cumRap, index) => {
                        return cumRap.lstCumRap.map((rap, index) => {
                          return (
                            <Panel
                              header={
                                <div className="flex gap-3">
                                  <img
                                    src={rap.hinhAnh}
                                    alt={rap.hinhAnh}
                                    style={{ width: "60px" }}
                                  ></img>
                                  <div className="text-left font-mono">
                                    <p className="mb-1 font-bold text-green-700">
                                      {rap.tenCumRap}
                                    </p>
                                    <p className="text-xs text-white">
                                      {rap.diaChi.length > 70
                                        ? rap.diaChi.substring(0, 70) + "..."
                                        : rap.diaChi}
                                    </p>
                                  </div>
                                </div>
                              }
                              key={index}
                            >
                              <Collapse
                                expandIconPosition="end"
                                onChange={onChangeCollapseLichPhim}
                              >
                                {rap.danhSachPhim?.map((phim, index) => {
                                  return (
                                    <Panel
                                      header={
                                        <div className="flex gap-3">
                                          <img
                                            src={phim.hinhAnh}
                                            alt={phim.hinhAnh}
                                            style={{
                                              width: "50px",
                                              height: "50px",
                                            }}
                                          ></img>
                                          <div>
                                            <p className="text-red-500 font-bold">
                                              {phim.tenPhim}
                                            </p>
                                          </div>
                                        </div>
                                      }
                                      key={index}
                                    >
                                      <div className="">
                                        {Object.values(
                                          _.groupBy(
                                            phim.lstLichChieuTheoPhim,
                                            (value) => {
                                              return moment(
                                                value.ngayChieuGioChieu
                                              ).format("DD-MM-YYYY");
                                            }
                                          )
                                        )?.map((lichChieu, index) => {
                                          return lichChieu.map(
                                            (item, index) => {
                                              if (index === 0) {
                                                return (
                                                  <Fragment key={index}>
                                                    <p className="mb-0 mt-3 font-bold text-green-700">
                                                      Ngày:{" "}
                                                      {moment(
                                                        item.ngayChieuGioChieu
                                                      ).format("DD-MM-YYYY")}
                                                    </p>
                                                    <Button
                                                      onClick={() => {
                                                        history.push(
                                                          `/checkout/${item.maLichChieu}`
                                                        );
                                                      }}
                                                      className="mr-1 mb-1"
                                                    >
                                                      {moment(
                                                        item.ngayChieuGioChieu
                                                      ).format("HH:mm")}
                                                    </Button>
                                                  </Fragment>
                                                );
                                              } else {
                                                return (
                                                  <Button
                                                    onClick={() => {
                                                      history.push(
                                                        `/checkout/${item.maLichChieu}`
                                                      );
                                                    }}
                                                    className="mb-1 mr-1"
                                                    key={index}
                                                  >
                                                    {moment(
                                                      item.ngayChieuGioChieu
                                                    ).format("hh:mm")}
                                                  </Button>
                                                );
                                              }
                                            }
                                          );
                                        })}
                                      </div>
                                    </Panel>
                                  );
                                })}
                              </Collapse>
                            </Panel>
                          );
                        });
                      })}
                  </Collapse>
                </Tabs.TabPane>
              );
            })}
          </Tabs>
        </div>
      </div>
    </div>
  );
}
