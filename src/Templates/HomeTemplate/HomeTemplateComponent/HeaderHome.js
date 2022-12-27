import React, { Fragment, useRef } from "react";
import { UserOutlined } from "@ant-design/icons";
import { BsList, BsCaretRight } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";
import Style from "./HeaderHome.module.css";
import { handleActive } from "../../../Active/NavlinkActive";
import { USERINFO } from "../../../Util/systemSetting";
import { history } from "../../../App";
export default function HeaderHome(props) {
  const navRef = useRef();

  const showNav = () => {
    navRef.current.classList.toggle(Style.nav_responsive);
  };
  const navigate = useNavigate();
  const currentUserInfo = JSON.parse(localStorage.getItem(USERINFO));
  return (
    <div>
      <div className={Style.header_shadow}>
        <div className={Style.nav}>
          <div className="w-5/12">
            <img
              style={{ width: "50px" }}
              src={require("../../../Assets/img/logo-gif.gif")}
              alt="logo"
            ></img>
          </div>
          <div
            className={`${Style.middleNav} flex justify-between items-center w-7/12`}
          >
            <ul className="flex justify-center gap-6">
              <li>
                <NavLink className={handleActive()} to="/home">
                  Trang chủ
                </NavLink>
              </li>
              <li>
                <NavLink className={handleActive()} to="/profile">
                  Profile
                </NavLink>
              </li>

              {currentUserInfo?.maLoaiNguoiDung === "QuanTri" ? (
                <li>
                  <NavLink
                    className={handleActive()}
                    to="/admin/userManagement"
                  >
                    Admin
                  </NavLink>
                </li>
              ) : (
                ""
              )}
            </ul>
            <div className="flex items-center justify-between">
              {localStorage.getItem(USERINFO) ? (
                <div className="dropdown relative">
                  <button
                    className="
          dropdown-toggle
          px-3
          py-1
         
          text-white
          font-medium
          text-xs
          leading-tight
          uppercase
          rounded
          shadow-md
hover:shadow-lg
          focus:shadow-lg focus:outline-none focus:ring-0
         active:shadow-lg active:text-white
          transition
          duration-150
          ease-in-out
          flex
          items-center
          whitespace-nowrap
        "
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <div
                      style={{
                        width: "50px",
                        height: "50px",
                        lineHeight: "40px",
                      }}
                      className="bg-gray-400 text-center rounded-full mr-2"
                    >
                      <UserOutlined style={{ fontSize: "20px" }}></UserOutlined>
                    </div>
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="caret-down"
                      className="w-2 ml-2 text-black "
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 320 512"
                    >
                      <path
                        fill="currentColor"
                        d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
                      ></path>
                    </svg>
                  </button>
                  <ul
                    className="
          dropdown-menu
          min-w-max
          absolute
          hidden
          bg-white
          text-base
          z-50
          float-left
          py-2
          list-none
          text-left
          rounded-lg
          shadow-lg
          mt-1
          hidden
          m-0
          bg-clip-padding
          border-none
        "
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <a
                        onClick={() => {
                          localStorage.clear();
                          history.push("/login");
                        }}
                        className="
              dropdown-item
              text-sm
              py-2
              px-4
              font-normal
              block
              w-full
              whitespace-nowrap
              bg-transparent
              text-gray-700
              hover:bg-gray-100
            "
                      >
                        Đăng xuất
                      </a>
                    </li>
                  </ul>
                </div>
              ) : (
                <Fragment>
                  <button
                    onClick={() => {
                      navigate("/login");
                    }}
                    className={`${Style.button_nav} mr-3`}
                  >
                    Đăng nhập
                  </button>
                  <span>|</span>
                  <button
                    onClick={() => {
                      navigate("/signup");
                    }}
                    className={`${Style.button_nav} ml-3`}
                  >
                    Đăng ký
                  </button>
                </Fragment>
              )}
            </div>
          </div>

          <button
            onClick={() => {
              showNav();
            }}
            className={Style.button_open_close}
          >
            <BsList style={{ fontSize: "25px" }}></BsList>
          </button>
        </div>
      </div>
      <div ref={navRef} className={Style.nav_col}>
        <div className="flex items-center justify-between mb-3">
          <div
            style={{ width: "50px", height: "50px", lineHeight: "40px" }}
            className="bg-gray-400 text-center rounded-full mr-2"
          >
            <UserOutlined style={{ fontSize: "20px" }}></UserOutlined>
          </div>
          {!localStorage.getItem(USERINFO) ? (
            <button
              onClick={() => {
                navigate("/login");
              }}
              className={`${Style.button_nav} mr-3`}
            >
              Đăng nhập
            </button>
          ) : (
            <button
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
              className={`${Style.button_nav} mr-3`}
            >
              Đăng xuất
            </button>
          )}

          <button
            onClick={() => {
              showNav();
            }}
          >
            <BsCaretRight style={{ fontSize: "25px" }}></BsCaretRight>
          </button>
        </div>
        <ul className="flex-col justify-center items-center">
          <li className="mb-3">
            <NavLink to="/home">Trang chủ</NavLink>
          </li>
          <li className="mb-3">
            <NavLink className={handleActive()} to="/profile">
              Profile
            </NavLink>
          </li>
          {currentUserInfo?.maLoaiNguoiDung === "QuanTri" ? (
            <li>
              <NavLink className={handleActive()} to="/admin/userManagement">
                Admin
              </NavLink>
            </li>
          ) : (
            ""
          )}
          {!localStorage.getItem(USERINFO) ? (
            <li className="mb-3">
              <NavLink to="/signup">Đăng ký</NavLink>
            </li>
          ) : (
            ""
          )}
        </ul>
      </div>
    </div>
  );
}
