import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { dangKyAction } from "../../Redux/Action/QuanLyNguoiDungAction";
import { USERINFO } from "../../Util/systemSetting";

export default function SignUp(props) {
  const navigate = useNavigate();
  //-----------redux----------
  const dispatch = useDispatch();
  //----------UseRef--------------
  const signUpRef = useRef({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    maNhom: "GP00",
    hoTen: "",
  });
  //-----------UseState--------------
  const [signUpError, setSignUpError] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",

    hoTen: "",
  });
  //---------Function---------------
  const handleChange = (e) => {
    let { value, name, title } = e.target;

    signUpRef.current[name] = value;
    let errorUpdate = { ...signUpError };
    //                          ----kiểm tra rỗng
    if (signUpRef.current[name].trim() === "") {
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
    setSignUpError(errorUpdate);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let checkValue = true;
    let checkError = true;
    for (let key in signUpRef.current) {
      if (signUpRef.current[key].trim() === "") {
        checkValue = false;
      }
    }
    for (let key in signUpError) {
      if (signUpError[key].trim() !== "") {
        checkError = false;
      }
    }
    if (checkValue !== true || checkError !== true) {
      return alert("Dữ liệu không hợp lệ!! Vui lòng thử lại");
    }

    dispatch(dangKyAction(signUpRef.current));
  };
 
    return (
      <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
        <h2
          className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
              xl:text-bold"
        >
          Sign Up
        </h2>
        <div className="mt-12">
          <form onSubmit={handleSubmit}>
            <div className="relative z-0 mb-6 w-full group">
              <input
                onChange={handleChange}
                title="Tài khoản"
                type="text"
                name="taiKhoan"
                id="taiKhoan"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="taiKhoan"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Tài khoản
              </label>
              <p className="mt-2 mb-0 text-xs text-red-500">
                {signUpError.taiKhoan}
              </p>
            </div>

            <div className="relative z-0 mb-6 w-full group">
              <input
                onChange={handleChange}
                type="password"
                name="matKhau"
                title="Mật khẩu"
                id="matKhau"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="matKhau"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Mật khẩu
              </label>
              <p className="mt-2 mb-0 text-xs text-red-500">
                {signUpError.matKhau}
              </p>
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
                required
              />
              <label
                htmlFor="Email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email
              </label>
              <p className="mt-2 mb-0 text-xs text-red-500">
                {signUpError.email}
              </p>
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
                required
              />
              <label
                htmlFor="hoTen"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Họ Tên
              </label>
              <p className="mt-2 mb-0 text-xs text-red-500">
                {signUpError.hoTen}
              </p>
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
                  required
                />
                <label
                  htmlFor="soDt"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Số điện thoại
                </label>
                <p className="mt-2 mb-0 text-xs text-red-500">
                  {signUpError.soDt}
                </p>
              </div>
              <div className="relative z-0 mb-6 w-full group">
                <select
                  defaultValue="GP00"
                  onChange={handleChange}
                  id="maNhom"
                  name="maNhom"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                >
                  <option value="GP00">GP00</option>
                  <option value="GP01">GP01</option>
                  <option value="GP02">GP02</option>
                  <option value="GP03">GP03</option>
                  <option value="GP04">GP04</option>
                  <option value="GP05">GP05</option>
                  <option value="GP06">GP06</option>
                  <option value="GP07">GP07</option>
                  <option value="GP08">GP08</option>
                  <option value="GP09">GP09</option>
                  <option value="GP10">GP10</option>
                </select>
                <label
                  htmlFor="maNhom"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                ></label>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </form>
          <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
            Do you already have an account ?{" "}
            <a
              onClick={() => {
                navigate("/login");
              }}
              className="cursor-pointer text-indigo-600 hover:text-indigo-800"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    );
 
}
