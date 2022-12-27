
import React, { useEffect, useRef, useState } from "react";
import {  useDispatch, useSelector } from "react-redux";
import { themNguoiDung } from "../../../Redux/Action/QuanLyNguoiDungAction";
import {
  layDanhSachLoaiNguoiDung,
  setIsDataLoading,
} from "../../../Redux/Reducer/QuanLyNguoiDungReducer";

export default function AddUser(props) {
  //---------redux--------
  const { danhSachLoaiNguoiDung, isDataLoading } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );

  const dispatch = useDispatch();

  //-----------useRef--------
  const addUserRef = useRef({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    maNhom: "GP00",
    maLoaiNguoiDung: "",
    hoTen: "",
  });

  //-----------UseState--------------
  const [addUserError, setAddUserError] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    hoTen: "",
  });
  //---------Function---------------
  const handleChange = (e) => {
    let { value, name, title } = e.target;
 
    addUserRef.current[name] = value;
    let errorUpdate = { ...addUserError };
    //                          ----kiểm tra rỗng
    if (addUserRef.current[name].trim() === "") {
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
    setAddUserError(errorUpdate);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let checkValue = true;
    let checkError = true;
    for (let key in addUserRef.current) {
      if (addUserRef.current[key].trim() === "") {
        checkValue = false;
      }
    }
    for (let key in addUserError) {
      if (addUserError[key].trim() !== "") {
        checkError = false;
      }
    }
   
    if (checkValue !== true || checkError !== true) {
      return alert("Dữ liệu không hợp lệ!! Vui lòng thử lại");
    }

    dispatch(themNguoiDung(addUserRef.current));
  };

  //---------useEffect--------
  useEffect(() => {
    (async function () {
      await dispatch(layDanhSachLoaiNguoiDung());
    })();

    return () => {};
  }, []);
  if (isDataLoading === false) {
    addUserRef.current.maLoaiNguoiDung =
      danhSachLoaiNguoiDung[0]?.maLoaiNguoiDung;
    dispatch(setIsDataLoading(true));
  }
  return (
    <div>
      <h3 className="text-center font-sans text-2xl">Thêm người dùng</h3>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="taiKhoan"
              className="block mb-2 text-sm font-medium text-white-900"
            >
              Tài khoản
            </label>
            <input
              onChange={handleChange}
              name="taiKhoan"
              title="Tài khoản"
              type="text"
              id="taiKhoan"
              className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="taikhoan123"
              required
            />
            <p className="mt-2 mb-0 ml-2 text-red-500 text-xs">
              {addUserError.taiKhoan}
            </p>
          </div>
          <div>
            <label
              htmlFor="matKhau"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Mật khẩu
            </label>
            <input
              onChange={handleChange}
              name="matKhau"
              title="Mật khẩu"
              type="password"
              id="matKhau"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="********"
              required
            />
            <p className="mt-2 mb-0 ml-2 text-red-500 text-xs">
              {addUserError.matKhau}
            </p>
          </div>
          <div>
            <label
              htmlFor="hoTen"
              className="block mb-2 text-sm font-medium text-gray-900  "
            >
              Họ tên
            </label>

            <input
              onChange={handleChange}
              name="hoTen"
              title="Họ tên"
              type="text"
              id="hoTen"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Nguyen Van A"
              required
            />
            <p className="mt-2 mb-0 ml-2 text-red-500 text-xs">
              {addUserError.hoTen}
            </p>
          </div>
          <div>
            <label
              htmlFor="soDt"
              className="block mb-2 text-sm font-medium text-gray-900  "
            >
              Số điện thoại
            </label>
            <input
              onChange={handleChange}
              name="soDt"
              title="Số điện thoại"
              type="tel"
              id="soDt"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="123-45-678"
              required
            />
            <p className="mt-2 mb-0 ml-2 text-red-500 text-xs">
              {addUserError.soDt}
            </p>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900  "
            >
              Email
            </label>
            <input
              onChange={handleChange}
              name="email"
              title="Email"
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="cyber@gmail.com"
              required
            />
            <p className="mt-2 mb-0 ml-2 text-red-500 text-xs">
              {addUserError.email}
            </p>
          </div>
          <div>
            <label
              htmlFor="maNhom"
              className="block mb-2 text-sm font-medium text-gray-900  "
            >
              Mã nhóm
            </label>
            <select
              name="maNhom"
              id="maNhom"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder
              disabled
            >
              <option>GP00</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="loaiNguoiDung"
              className="block mb-2 text-sm font-medium text-gray-900  "
            >
              Loại người dùng
            </label>
            <select
              onChange={handleChange}
              name="maLoaiNguoiDung"
              id="loaiNguoiDung"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder
            >
              {danhSachLoaiNguoiDung?.map((item, index) => {
                return (
                  <option key={index} value={item.maLoaiNguoiDung}>
                    {item.tenLoai}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Thêm mới
        </button>
      </form>
    </div>
  );
}
