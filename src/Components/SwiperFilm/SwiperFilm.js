import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import { useDispatch, useSelector } from "react-redux";
import { Tabs } from "antd";
import Style from './SwiperFilm.module.css'
import { layDanhSachPhim } from "../../Redux/Reducer/QuanLyPhimReducer";
import { history } from "../../App";
export default function SwiperFilm() {
  //-----------react-redux----------
  const { listFilm } = useSelector((state) => state.QuanLyPhimReducer);
  const dispatch = useDispatch();
  //------------Swiper-----
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 782 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 782, min: 0 },
      items: 1,
    },
  };
  //--------------useEffect------------
  useEffect(() => {
    dispatch(layDanhSachPhim());

    return () => {};
  }, []);
  return (
    <div id='lichChieu' className={`py-20 px-10 ${Style.swiper}`}>
      <Tabs centered defaultActiveKey="1">
        <Tabs.TabPane
          tab={
            <button className="px-10 py-5 bg-green-600 text-white font-bold rounded-md text-sm">
              ĐANG CHIẾU
            </button>
          }
          key="1"
        >
          <Carousel responsive={responsive}>
            {listFilm
              ?.filter(
                (item) => item.dangChieu === true && item.sapChieu === false
              )
              .map((item, index) => {
                return (
                  <div key={index} className="flip-card">
                    <div className="flip-card-inner">
                      <div className="flip-card-front">
                        <img
                          src={item.hinhAnh}
                          alt="Avatar"
                          style={{
                            width: "100%",
                            height: "400px",
                            borderRadius: "10px",
                          }}
                        />
                      </div>
                      <div className="flip-card-back py-3 px-2 relative">
                        <div>
                          <h1 className="text-xl">{item.tenPhim}</h1>
                          <p> {item.moTa.substring(0, 250)}...</p>
                        </div>
                        <div
                          onClick={() => {
                            history.push(`/filmDetail/${item.maPhim}`);
                          }}
                          className="w-full py-3 bg-red-500 hover:bg-green-600 transition-all duration-500 text-center absolute cursor-pointer"
                          style={{ bottom: 0, left: 0, borderRadius: "10px" }}
                        >
                          <span>MUA VÉ</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </Carousel>
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <button className="px-10 py-5 bg-green-600 text-white font-bold rounded-md text-sm">
              SẮP CHIẾU
            </button>
          }
          key="2"
        >
          <Carousel responsive={responsive}>
            {listFilm
              ?.filter(
                (item) => item.dangChieu === false && item.sapChieu === true
              )
              .map((item, index) => {
                return (
                  <div key={index} className="flip-card">
                    <div className="flip-card-inner">
                      <div className="flip-card-front">
                        <img
                          src={item.hinhAnh}
                          alt="Avatar"
                          style={{
                            width: "100%",
                            height: "400px",
                            borderRadius: "10px",
                          }}
                        />
                      </div>
                      <div className="flip-card-back py-3 px-2 relative">
                        <div>
                          <h1 className="text-xl">{item.tenPhim}</h1>
                          <p> {item.moTa.substring(0, 250)}...</p>
                        </div>
                        <div
                          onClick={() => {
                            history.push(`/filmDetail/${item.maPhim}`);
                          }}
                          className="w-full py-3 bg-red-500 hover:bg-green-600 transition-all duration-500 text-center absolute cursor-pointer"
                          style={{ bottom: 0, left: 0, borderRadius: "10px" }}
                        >
                          <span>MUA VÉ</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </Carousel>
        </Tabs.TabPane>
      </Tabs>
     
    </div>
  );
}
