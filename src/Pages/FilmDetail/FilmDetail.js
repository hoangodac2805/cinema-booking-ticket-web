import { Button, Popover, Progress, Rate, Tabs, Collapse } from "antd";
import moment from "moment";
import React, { Fragment, useEffect } from "react";
import { PlayCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { layThongTinPhim } from "../../Redux/Reducer/QuanLyPhimReducer";
import FooterHome from "../../Templates/HomeTemplate/HomeTemplateComponent/FooterHome";

import Style from "./FilmDetail.module.css";
import { layThongTinLichChieuPhim } from "../../Redux/Reducer/QuanLyRapReducer";
import _ from "lodash";
import { history } from "../../App";
import HeaderHome2 from "../../Templates/HomeTemplate/HomeTemplateComponent/HeaderHome2";
export default function FilmDetail(props) {
  //-------react-router------
  const params = useParams();

  //----------redux----------
  const { filmInfo } = useSelector((state) => state.QuanLyPhimReducer);
  // const { lichChieuPhim } = useSelector((state) => state.QuanLyRapReducer);
  const dispatch = useDispatch();

  //---------useEffect----------
  useEffect(() => {
    dispatch(layThongTinPhim(params.id));
    dispatch(layThongTinLichChieuPhim(params.id));
    window.scrollTo(0, 0);
    return () => {};
  }, []);
  const content = (
    <div className="">
      <iframe className={Style.iframe} src={filmInfo?.trailer}></iframe>
    </div>
  );
  return (
    <div>
      <HeaderHome2></HeaderHome2>
      <div className={Style.largeSize}>
        <div
          className="mt-24"
          id={Style.filmDetailsContent}
          style={{ backgroundImage: `url(${filmInfo?.hinhAnh})` }}
        >
          <div
            className="w-full bg-opacity-80 bg-clip-padding py-44"
            style={{ backdropFilter: "blur(10px)" }}
          >
            <div className="grid grid-cols-10 gap-10 px-10">
              <div className="col-span-6 flex gap-5 items-center justify-center">
                <div id={Style.imgFilm}>
                  <img
                    src={filmInfo?.hinhAnh}
                    style={{ width: "280px", height: "400px" }}
                  ></img>
                  <div className="flex justify-center items-center">
                    <Popover
                      content={content}
                      trigger="click"
                      placement="right"
                    >
                      <PlayCircleOutlined
                        id={Style.imgHover}
                        style={{ fontSize: "50px" }}
                      />
                    </Popover>
                  </div>
                </div>
                <div>
                  <div className="flex gap-4">
                    <span className="w-fit h-fit text-xs bg-red-500 py-2 px-2 text-white rounded-lg mb-0">
                      HOT
                    </span>
                    <p className="text-2xl text-white">{filmInfo?.tenPhim}</p>
                  </div>
                  <div>
                    <p className="text-white">
                      Ngày khởi chiếu{" "}
                      {moment(filmInfo?.ngayKhoiChieu).format(
                        "DD-MM-YYYY | HH:mm"
                      )}
                    </p>
                    <a
                      href="#banVe"
                      className=" w-fit h-fit bg-red-500 w-fit px-5 py-3 text-white rounded-lg mb-0"
                    >
                      Mua vé
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-span-4 flex justify-start items-center">
                <div>
                  <Progress
                    width={150}
                    status="normal"
                    type="circle"
                    strokeColor="#7ed321"
                    format={() => {
                      return filmInfo?.danhGia;
                    }}
                    percent={filmInfo?.danhGia * 10}
                  />
                  <br></br>
                  <Rate
                    className="ml-4"
                    disabled
                    value={Number(filmInfo?.danhGia) / 2}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          id="banVe"
          className="py-28"
          style={{
            minHeight: "50vh",
            backgroundColor: "#0b2029",
          }}
        >
          <FilmTab></FilmTab>
        </div>
      </div>
      <div className={Style.mediumSize}>
        <div
          className="mt-24 relative"
          id={Style.filmDetailsContent}
          style={{ backgroundImage: `url(${filmInfo?.hinhAnh})` }}
        >
          <div className="flex justify-center items-center ">
            <Popover content={content} trigger="click" placement="right">
              <PlayCircleOutlined
                id={Style.imgHover}
                style={{ fontSize: "50px" }}
              />
            </Popover>
          </div>
        </div>
        <div
          style={{
            minHeight: "50vh",
            backgroundColor: "#0b2029",
          }}
          className="mt-32"
        >
          <FilmTabMediumSize></FilmTabMediumSize>
        </div>
      </div>
      <FooterHome></FooterHome>
    </div>
  );
}

function FilmTab() {
  const { filmInfo } = useSelector((state) => state.QuanLyPhimReducer);
  const { lichChieuPhim } = useSelector((state) => state.QuanLyRapReducer);

  return (
    <div className={Style.filmTab}>
      <Tabs centered defaultActiveKey="1">
        <Tabs.TabPane
          className="bg-white rounded-md p-10 overflow-auto"
          style={{ height: "700px" }}
          tab={<p className="text-white text-lg">LỊCH CHIẾU</p>}
          key="1"
        >
          <Tabs defaultActiveKey="0" tabPosition="left">
            {lichChieuPhim?.heThongRapChieu?.map((htRap, index) => {
              return (
                <Tabs.TabPane
                  tab={<img src={htRap.logo} style={{ width: "60px" }}></img>}
                  key={index}
                >
                  <Tabs tabPosition="left" defaultActiveKey="0">
                    {htRap.cumRapChieu.map((cumRap, index) => {
                      return (
                        <Tabs.TabPane
                          tab={
                            <div>
                              <img
                                src={cumRap.hinhAnh}
                                style={{ width: "60px" }}
                                className="rounded-full"
                              ></img>
                              <p>{cumRap.tenCumRap}</p>
                            </div>
                          }
                          key={index}
                        >
                          {Object.values(
                            _.groupBy(cumRap.lichChieuPhim, (value) => {
                              return moment(value.ngayChieuGioChieu).format(
                                "DD-MM-YYYY"
                              );
                            })
                          ).map((lichChieuTheoNgay, index) => {
                            return lichChieuTheoNgay.map((item, index) => {
                              if (index === 0) {
                                return (
                                  <Fragment key={index}>
                                    <p className="mb-1 mt-3 font-bold text-green-700">
                                      Ngày:
                                      {moment(item.ngayChieuGioChieu).format(
                                        "DD-MM-YYYY"
                                      )}
                                    </p>
                                    <Button
                                      onClick={() => {
                                        history.push(
                                          `/checkout/${item.maLichChieu}`
                                        );
                                      }}
                                      className="mr-1 mb-1"
                                    >
                                      {moment(item.ngayChieuGioChieu).format(
                                        "hh:mm"
                                      )}
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
                                    className="mr-1 mb-1"
                                  >
                                    {moment(item.ngayChieuGioChieu).format(
                                      "hh:mm"
                                    )}
                                  </Button>
                                );
                              }
                            });
                          })}
                        </Tabs.TabPane>
                      );
                    })}
                  </Tabs>
                </Tabs.TabPane>
              );
            })}
          </Tabs>
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={<p className="text-white text-lg">THÔNG TIN</p>}
          key="2"
        >
          <div
            className={`grid grid-cols-2 text-white ${Style.tabThongTin} gap-10`}
          >
            <div className="">
              <div>
                <p className="font-bold ">
                  Ngày công chiếu :
                  {moment(filmInfo?.ngayKhoiChieu).format("DD-MM-YYYY")}
                </p>
                <p className="font-bold ">Đạo diễn: Adam Wingard</p>
                <p className="font-bold ">
                  Diễn viên:Kyle Chandler, Rebecca Hall{" "}
                </p>
                <p className="font-bold ">
                  Thể loại:hành động, giả tưởng, ly kỳ, thần thoại{" "}
                </p>
                <p className="font-bold ">Quốc Gia SX:Mỹ </p>
              </div>
            </div>
            <div>
              <p className="font-bold">Nội dung</p>
              <p>{filmInfo?.moTa}</p>
              <div></div>
            </div>
          </div>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}
function FilmTabMediumSize() {
  const { filmInfo } = useSelector((state) => state.QuanLyPhimReducer);
  const { lichChieuPhim } = useSelector((state) => state.QuanLyRapReducer);

  const { Panel } = Collapse;
  const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
  // const onChange = (key) => {
  //   console.log(key);
  // };
  return (
    <div className={`${Style.filmTab} py-4`}>
      <Tabs centered defaultActiveKey="1">
        <Tabs.TabPane
          className="bg-white rounded-md p-4 overflow-auto"
          style={{ height: "700px" }}
          tab={<p className="text-white text-lg">LỊCH CHIẾU</p>}
          key="1"
        >
          <Tabs defaultActiveKey="0" tabPosition="top" centered>
            {lichChieuPhim?.heThongRapChieu?.map((htRap, index) => {
              return (
                <Tabs.TabPane
                  tab={<img src={htRap.logo} style={{ width: "60px" }}></img>}
                  key={index}
                >
                  <Collapse expandIconPosition="end">
                    {htRap.cumRapChieu.map((cumRap, index) => {
                      return (
                        <Panel
                          header={
                            <div className="flex items-center ">
                              <img
                                src={cumRap.hinhAnh}
                                style={{ width: "60px" }}
                                className="rounded-full"
                              ></img>
                              <div className="ml-2">
                                <p className="text-red-600 font-bold mb-1">
                                  {cumRap.tenCumRap}
                                </p>
                                <p className="text-xs">{cumRap.diaChi}</p>
                              </div>
                            </div>
                          }
                          key={index}
                        >
                          {Object.values(
                            _.groupBy(cumRap.lichChieuPhim, (value) => {
                              return moment(value.ngayChieuGioChieu).format(
                                "DD-MM-YYYY"
                              );
                            })
                          ).map((lichChieuTheoNgay, index) => {
                            return lichChieuTheoNgay.map((item, index) => {
                              if (index === 0) {
                                return (
                                  <Fragment key={index}>
                                    <p className="mb-1 mt-3 font-bold text-green-700">
                                      Ngày:
                                      {moment(item.ngayChieuGioChieu).format(
                                        "DD-MM-YYYY"
                                      )}
                                    </p>
                                    <Button
                                      onClick={() => {
                                        history.push(
                                          `/checkout/${item.maLichChieu}`
                                        );
                                      }}
                                      className="mr-1 mb-1"
                                    >
                                      {moment(item.ngayChieuGioChieu).format(
                                        "hh:mm"
                                      )}
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
                                    className="mr-1 mb-1"
                                  >
                                    {moment(item.ngayChieuGioChieu).format(
                                      "hh:mm"
                                    )}
                                  </Button>
                                );
                              }
                            });
                          })}
                        </Panel>
                      );
                    })}
                  </Collapse>
                </Tabs.TabPane>
              );
            })}
          </Tabs>
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={<p className="text-white text-lg">THÔNG TIN</p>}
          key="2"
        >
          <div
            className={`grid grid-cols-2 text-white ${Style.tabThongTin} gap-10`}
          >
            <div className="">
              <div>
                <p className="font-bold ">
                  Ngày công chiếu :
                  {moment(filmInfo?.ngayKhoiChieu).format("DD-MM-YYYY")}
                </p>
                <p className="font-bold ">Đạo diễn: Adam Wingard</p>
                <p className="font-bold ">
                  Diễn viên:Kyle Chandler, Rebecca Hall{" "}
                </p>
                <p className="font-bold ">
                  Thể loại:hành động, giả tưởng, ly kỳ, thần thoại{" "}
                </p>
                <p className="font-bold ">Quốc Gia SX:Mỹ </p>
              </div>
            </div>
            <div>
              <p className="font-bold">Nội dung</p>
              <p>{filmInfo?.moTa}</p>
              <div></div>
            </div>
          </div>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}
