import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { capNhatThongTinCaNhan } from "../../Redux/Action/QuanLyNguoiDungAction";
import {
  
  setModalSubmit,
} from "../../Redux/Reducer/ModalReducer";


export default function ChangeInfo({ userInfo }) {
 
  //---------redux-------
  const { isModalLoading } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );
  const dispatch = useDispatch();
  //------useState-------
  const [info, setInfo] = useState({
    taiKhoan: userInfo?.taiKhoan,
    matKhau: userInfo?.matKhau,
    email: userInfo?.email,
    soDt: userInfo?.soDT,
    maNhom: userInfo?.maNhom,
    maLoaiNguoiDung:
      userInfo?.loaiNguoiDung === "Quản trị" ? "QuanTri" : "KhachHang",
    hoTen: userInfo?.taiKhoan,
  });
  const [infoError, setInfoError] = useState({
    email: "",
    soDt: "",
    hoTen: "",
  });
  //---------functions-----------
  const handleChange = (e) => {
    let { value, name, title } = e.target;

    let infoUpdate = { ...info };
    let errorUpdate = { ...infoError };
    infoUpdate[name] = value;
    //                          ----kiểm tra rỗng
    if (infoUpdate[name].trim() === "") {
      errorUpdate[name] = title + " đang bỏ trống!!!";
    } else {
      errorUpdate[name] = "";
    }
    //                          ----kiểm tra tất cả là số
    let regexNumber = /^[0-9]+$/;
    if (name === "soDt") {
      if (regexNumber.test(value)) {
        errorUpdate[name] = "";
      } else {
        errorUpdate[name] =
          title + " không hợp lệ!!!" + title + " phải là số!!!";
      }
    }
    //                          ----kiểm tra email
    let regexEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\ [[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (name === "email") {
      if (regexEmail.test(value)) {
        errorUpdate[name] = "";
      } else {
        errorUpdate[name] = title + " không hợp lệ!!!";
      }
    }
    setInfo(infoUpdate);
    setInfoError(errorUpdate);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let checkValue = true;
    let checkError = true;
    for (let key in info) {
      console.log(key, info[key]);
      if (info[key].trim() === "") {
        checkValue = false;
      }
    }
    for (let key in infoError) {
      if (infoError[key].trim() !== "") {
        checkError = false;
      }
    }

    if (checkValue !== true || checkError !== true) {
      return alert("Dữ liệu không hợp lệ!! Vui lòng thử lại");
    }

    dispatch(capNhatThongTinCaNhan(info));
  };
  //----------useEffect---------
  useEffect(() => {
    dispatch(setModalSubmit(handleSubmit));

    return () => {};
  }, [info]);

  return (
    <div>
      <form className="mt-5" onSubmit={handleSubmit}>
        <div className="relative z-0 mb-6 w-full group">
          <input
            onChange={() => {}}
            title="Tài khoản"
            type="text"
            name="taiKhoan"
            id="taiKhoan"
            className="cursor-no-drop block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={info?.taiKhoan}
            disabled
          />
          <label
            htmlFor="taiKhoan"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Tài khoản
          </label>
        </div>

        <div className="relative z-0 mb-6 w-full group">
          <input
            onChange={handleChange}
            type="email"
            name="email"
            title="Email"
            id="Email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={info?.email}
          />
          <label
            htmlFor="Email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email
          </label>
          <p className="mt-2 mb-0 text-xs text-red-500">{infoError.email}</p>
        </div>
        <div className="relative z-0 mb-6 w-full group">
          <input
            onChange={handleChange}
            type="text"
            name="hoTen"
            id="hoTen"
            title="Họ tên"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={info?.hoTen}
          />
          <label
            htmlFor="hoTen"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Họ Tên
          </label>
          <p className="mt-2 mb-0 text-xs text-red-500">{infoError.hoTen}</p>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 mb-6 w-full group">
            <input
              onChange={handleChange}
              type="tel"
              name="soDt"
              id="soDt"
              title="Số điện thoại"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={info?.soDt}
            />
            <label
              htmlFor="soDt"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Số điện thoại
            </label>
            <p className="mt-2 mb-0 text-xs text-red-500">{infoError.soDt}</p>
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <input
              disabled
              type="text"
              name="maLoaiNguoiDung"
              id="maLoaiNguoiDung"
              title="Loại người dùng"
              className=" cursor-no-drop block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={info?.maLoaiNguoiDung}
            />
            <label
              htmlFor="maLoaiNguoiDung"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Loại người dùng
            </label>
            <p className="mt-2 mb-0 text-xs text-red-500"></p>
          </div>
        </div>
        <div className="relative z-0 mb-6 w-full group">
          <input
            disabled
            type="text"
            name="maNhom"
            id="maNhom"
            title="Mã nhóm"
            className=" cursor-no-drop block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={info?.maNhom}
          />
          <label
            htmlFor="maNhom"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Mã nhóm
          </label>
        </div>
      </form>
    </div>
  );
}
