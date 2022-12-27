import React, { useEffect, useRef, useState } from "react";
import { BsList, BsReverseBackspaceReverse } from "react-icons/bs";
import Style from "./HeaderHome2.module.css";
import { USERINFO } from "../../../Util/systemSetting";
import { history } from "../../../App";

export default function HeaderHome2(props) {
  const [menuActive, setMenuActive] = useState(false);
  const menuRef = useRef();

  const showMenu = () => {
    menuRef.current.classList.toggle(Style.menu_header_block);
  };
  const userInfo = JSON.parse(localStorage.getItem(USERINFO));
 

  return (
    <div>
      <div className={Style.header}>
        <div className={`${Style.header_top} grid grid-cols-3 py-3 px-6`}>
          <div className="flex items-center justify-start">
            {menuActive ? (
              <BsReverseBackspaceReverse
                onClick={() => {
                  setMenuActive(!menuActive);
                  showMenu();
                }}
                className="text-4xl text-green-600 cursor-pointer"
              ></BsReverseBackspaceReverse>
            ) : (
              <BsList
                onClick={() => {
                  setMenuActive(!menuActive);
                  showMenu();
                }}
                className="text-4xl text-green-600 cursor-pointer"
              ></BsList>
            )}
          </div>
          <div className="flex items-center justify-center">
            <img
              style={{ cursor: "pointer" }}
              onClick={() => {
                history.push("/home");
              }}
              className={Style.header_logo}
              src={require("../../../Assets/img/logo-gif.gif")}
            ></img>
          </div>
          <div className="flex items-center justify-end">
            {userInfo ? (
              <button
                onClick={() => {
                  localStorage.clear();
                  // eslint-disable-next-line no-restricted-globals
                  location.reload();
                }}
                className="bg-green-600 py-3 px-5 rounded-md transition-all duration-300 hover:bg-red-600 hover:font-bold"
              >
                ĐĂNG XUẤT
              </button>
            ) : (
              <button
                onClick={() => {
                  history.push("/login");
                }}
                className="bg-green-600 py-3 px-5 rounded-md transition-all duration-300 hover:bg-red-600 hover:font-bold"
              >
                ĐĂNG NHẬP
              </button>
            )}
          </div>
        </div>
        <img
          className={Style.header_img}
          src={require("../../../Assets/img/line-header1.png")}
        ></img>
      </div>
      <div ref={menuRef} className={`${Style.menu_header} py-16`}>
        <ul>
          <a
            onClick={() => {
              history.push("/home");
            }}
          >
            TRANG CHỦ
          </a>
          <a href="#lichChieu">LỊCH CHIẾU</a>
          <a href="#rapChieu">HỆ THỐNG RẠP</a>
          {userInfo ? (
            <a
              onClick={() => {
                history.push("/profile");
              }}
            >
              TRANG CÁ NHÂN
            </a>
          ) : (
            ""
          )}
        </ul>
      </div>
    </div>
  );
}
