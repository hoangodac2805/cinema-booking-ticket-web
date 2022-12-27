import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { layDanhSachBanner } from "../../Redux/Reducer/QuanLyPhimReducer";
import Style from "./Banner.module.css";
import ImageGallery from "react-image-gallery";
export default function Banner(props) {
  //----react-redux------
  const dispatch = useDispatch();
  const { listBanner } = useSelector((state) => state.QuanLyPhimReducer);

  //---function-------
  const renderItemCarousel = () => {
    return listBanner?.map((item, index) => {
      return (
        <div key={index}>
          <img
            src={item.hinhAnh}
            alt={item.hinhAnh}
            className={Style.img}
          ></img>
        </div>
      );
    });
  };
  //-----useEffect------
  useEffect(() => {
    dispatch(layDanhSachBanner());
    return () => {};
  }, []);

  return (
   
      <ImageGallery
      className={Style.banner}
        items={listBanner?.map((item, index) => {
          return {
            original: item.hinhAnh,
            thumbnail: item.hinhAnh,
          };
        })}
      />

  );
}
