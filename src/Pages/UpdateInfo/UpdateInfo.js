import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { capNhatThongTinCaNhan } from "../../Redux/Action/QuanLyNguoiDungAction";
import {
  layDanhSachLoaiNguoiDung,
  layDanhSachNguoiDung,
  setIsDataLoading,
} from "../../Redux/Reducer/QuanLyNguoiDungReducer";
import HeaderHome from "../../Templates/HomeTemplate/HomeTemplateComponent/HeaderHome";
import { GROUP, USERINFO } from "../../Util/systemSetting";

export default function UpdateInfo() {
  const userInfo = JSON.parse(localStorage.getItem(USERINFO));

  const navigate = useNavigate();
  //---------redux-------
  const { danhSachLoaiNguoiDung, danhSachNguoiDung, isDataLoading } =
    useSelector((state) => state.QuanLyNguoiDungReducer);
  console.log(danhSachNguoiDung);
  const dispatch = useDispatch();
  //------------Ref-------
  const editUserRef = useRef({
    taiKhoan: userInfo?.taiKhoan,
    matKhau: "",
    email: userInfo?.email,
    soDt: userInfo?.soDT,
    maNhom: GROUP,
    maLoaiNguoiDung: userInfo?.maLoaiNguoiDung,
    hoTen: userInfo?.hoTen,
  });
  //-----------UseState--------------
  const [editUserError, setEditUserError] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    hoTen: "",
  });
  //---------Function---------------
  const handleChange = (e) => {
    let { value, name, title } = e.target;

    editUserRef.current[name] = value;
    let errorUpdate = { ...editUserError };
    //                          ----kiểm tra rỗng
    if (editUserRef.current[name].trim() === "") {
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
    console.log(editUserRef.current);
    setEditUserError(errorUpdate);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let checkValue = true;
    let checkError = true;
    for (let key in editUserRef.current) {
      console.log(key, editUserRef.current[key]);
      if (editUserRef.current[key].trim() === "") {
        checkValue = false;
      }
    }
    for (let key in editUserError) {
      if (editUserError[key].trim() !== "") {
        checkError = false;
      }
    }

    if (checkValue !== true || checkError !== true) {
      return alert("Dữ liệu không hợp lệ!! Vui lòng thử lại");
    }

    dispatch(capNhatThongTinCaNhan(editUserRef.current));
  };
  //---------useEffect----------
  useEffect(() => {
    dispatch(layDanhSachLoaiNguoiDung());
    dispatch(layDanhSachNguoiDung(userInfo?.taiKhoan));

    return () => {};
  }, []);

  //-----------------
  if (isDataLoading === false) {
    editUserRef.current.matKhau = danhSachNguoiDung[0]?.matKhau;

    dispatch(setIsDataLoading(true));
  }
  if (!localStorage.getItem(USERINFO)) {
    alert("Cần đăng nhập trước khi vào trang này!!!");
    return <Navigate to="/login"></Navigate>;
  }
  return (
    <section className="h-screen">
      <HeaderHome></HeaderHome>
      <div className="px-6 h-full text-gray-800">
        <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
          <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="w-full"
              alt="Sample image"
            />
          </div>
          <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0 ">
            <form onSubmit={handleSubmit}>
              <div className="relative z-0 mb-6 w-full group">
                <input
                  onChange={handleChange}
                  title="Tài khoản"
                  type="text"
                  name="taiKhoan"
                  id="taiKhoan"
                  className="cursor-no-drop block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  defaultValue={userInfo?.taiKhoan}
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
                  type="text"
                  name="matKhau"
                  title="Mật khẩu"
                  id="matKhau"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  defaultValue={danhSachNguoiDung[0]?.matKhau}
                />
                <label
                  htmlFor="matKhau"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Mật khẩu
                </label>
                <p className="mt-2 mb-0 text-xs text-red-500">
                  {editUserError.matKhau}
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
                  defaultValue={userInfo?.email}
                />
                <label
                  htmlFor="Email"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Email
                </label>
                <p className="mt-2 mb-0 text-xs text-red-500">
                  {editUserError.email}
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
                  defaultValue={userInfo?.hoTen}
                />
                <label
                  htmlFor="hoTen"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Họ Tên
                </label>
                <p className="mt-2 mb-0 text-xs text-red-500">
                  {editUserError.hoTen}
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
                    defaultValue={userInfo?.soDT}
                  />
                  <label
                    htmlFor="soDt"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Số điện thoại
                  </label>
                  <p className="mt-2 mb-0 text-xs text-red-500">
                    {editUserError.soDt}
                  </p>
                </div>
                <div className="relative z-0 mb-6 w-full group">
                  <select
                    onChange={handleChange}
                    id="maLoaiNguoiDung"
                    name="maLoaiNguoiDung"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  >
                    {danhSachLoaiNguoiDung?.map((item, index) => {
                      if (item.maLoaiNguoiDung === userInfo?.maLoaiNguoiDung) {
                        return (
                          <option
                            selected
                            key={index}
                            value={item.maLoaiNguoiDung}
                          >
                            {item.tenLoai}
                          </option>
                        );
                      }
                      return (
                        <option key={index} value={item.maLoaiNguoiDung}>
                          {item.tenLoai}
                        </option>
                      );
                    })}
                  </select>
                  <label
                    htmlFor="maLoaiNguoiDung"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  ></label>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Thay đổi
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
