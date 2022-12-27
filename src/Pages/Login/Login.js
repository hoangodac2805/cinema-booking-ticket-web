import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { dangNhapAction } from "../../Redux/Action/QuanLyNguoiDungAction";
import { USERINFO } from "../../Util/systemSetting";

export default function Login(props) {
  const navigate = useNavigate();
  //-----------redux----------
  const dispatch = useDispatch();
  //----------UseRef--------------
  const logInRef = useRef({
    taiKhoan: "",
    matKhau: "",
  });
  //-----------UseState--------------
  const [logInError, setLogInError] = useState({
    taiKhoan: "",
    matKhau: "",
  });
  //---------Function---------------
  const handleChange = (e) => {
    let { value, name, title } = e.target;

    logInRef.current[name] = value;
    let errorUpdate = { ...logInError };
    //                          ----kiểm tra rỗng
    if (logInRef.current[name].trim() === "") {
      errorUpdate[name] = title + " đang bỏ trống!!!";
    } else {
      errorUpdate[name] = "";
    }

    setLogInError(errorUpdate);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let checkValue = true;
    let checkError = true;
    for (let key in logInRef.current) {
      if (logInRef.current[key].trim() === "") {
        checkValue = false;
      }
    }
    for (let key in logInError) {
      if (logInError[key].trim() !== "") {
        checkError = false;
      }
    }
    if (checkValue !== true || checkError !== true) {
      return alert("Dữ liệu không hợp lệ!! Vui lòng thử lại");
    }

    dispatch(dangNhapAction(logInRef.current));
  };

  return (
    <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
      <h2
        className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
              xl:text-bold"
      >
        Log in
      </h2>
      <div className="mt-12">
        <form onSubmit={handleSubmit}>
          <div>
            <div className="text-sm font-bold text-gray-700 tracking-wide">
              Tài khoản
            </div>
            <input
              onChange={handleChange}
              name="taiKhoan"
              title="Tài khoản"
              className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
              type="text"
              placeholder="mike@gmail.com"
            />
            <p className="mb-0 mt-3 text-xs text-red-500">
              {logInError.taiKhoan}
            </p>
          </div>
          <div className="mt-8">
            <div className="flex justify-between items-center">
              <div className="text-sm font-bold text-gray-700 tracking-wide">
                Mật khẩu
              </div>
              <div>
                {/* <a
                  className="text-xs font-display font-semibold text-indigo-600 hover:text-indigo-800
                                  cursor-pointer"
                >
                  Forgot Password?
                </a> */}
              </div>
            </div>
            <input
              onChange={handleChange}
              name="matKhau"
              title="Mật khẩu"
              className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
              type="password"
              placeholder="Enter your password"
            />
            <p className="mb-0 mt-3 text-xs text-red-500">
              {logInError.matKhau}
            </p>
          </div>
          <div className="mt-10">
            <button
              onClick={handleSubmit}
              className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                          font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                          shadow-lg"
            >
              Log In
            </button>
          </div>
        </form>
        <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
          Don't have an account ?{" "}
          <a
            onClick={() => {
              navigate("/signup");
            }}
            className="cursor-pointer text-indigo-600 hover:text-indigo-800"
          >
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}
