import { current } from "@reduxjs/toolkit";
import { Button } from "antd";
import { update } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { doiMatKhau } from "../../Redux/Action/QuanLyNguoiDungAction";
import { setIsModalLoading, setModalSubmit } from "../../Redux/Reducer/ModalReducer";
import { openNotificationWithIcon } from "../../Util/notification";

export default function ChangePassword({ userInfo }) {
  //-------redux------
  const { isModalLoading } = useSelector((state) => state.ModalReducer);
  const dispatch = useDispatch();
  //-------useRef--------

  //------useState-------
  const [currentPass, setCurrentPass] = useState("");
  const [checkPass, setCheckPass] = useState(false);
  const [password, setPassWord] = useState({
    newPass: "",
    newPassConfirm: "",
  });

  const [newPassError, setNewPassError] = useState({
    newPass: "",
    newPassConfirm: "",
  });
  //------functions--------
  const handleChange = (e) => {
    const { value, name, title } = e.target;
    let updatePass = { ...password };
    let updateError = { ...newPassError };
    updatePass[name] = value;
    if (updatePass[name].trim() === "") {
      updateError[name] = title + " đang bỏ trống!!!";
    } else {
      updateError[name] = "";
    }

    setPassWord(updatePass);
    setNewPassError(updateError);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let checkPass = true;
    let checkError = true;
    let confirmPass = false;
    let passCuKhacPassMoi = false;
    for (let key in password) {
      if (password[key].trim() === "") {
        checkPass = false;
      }
    }
    for (let key in newPassError) {
      if (newPassError[key].trim() !== "") {
        checkError = false;
      }
    }
    console.log(password.newPass, password.newPassConfirm);
    if (password.newPass === password.newPassConfirm) {
      confirmPass = true;
    }
    if (password.newPass !== userInfo?.matKhau) {
      passCuKhacPassMoi = true;
    }
    if (checkPass && checkError && confirmPass && passCuKhacPassMoi) {
      let model = {
        taiKhoan: userInfo?.taiKhoan,
        matKhau: password.newPass,
        email: userInfo?.matKhau,
        soDt: userInfo?.soDT,
        maNhom: userInfo?.maNhom,
        maLoaiNguoiDung:
          userInfo?.loaiNguoiDung === "KhachHang" ? "KhachHang" : "QuanTri",
        hoTen: userInfo?.hoTen,
      };
      return dispatch(doiMatKhau(model));
    } else {
      if (!checkPass || !checkError) {
        openNotificationWithIcon(
          "warning",
          "Vui lòng điền đủ thông tin!!!",
          ""
        );
      }
      if (!passCuKhacPassMoi) {
        openNotificationWithIcon(
          "warning",
          "Không được đặt trùng mật khẩu cũ",
          ""
        );
      } else {
        openNotificationWithIcon(
          "warning",
          "Mật khẩu không trùng!!! Vui lòng thử lại",
          ""
        );
      }
      return;
    }
  };

  //--------useEffect---------
  useEffect(() => {
    dispatch(setModalSubmit(handleSubmit))
    return () => {};
  }, [password.newPass, password.newPassConfirm]);
  if (!isModalLoading) {
    setCurrentPass("");
    setCheckPass(false);
    setPassWord({
      newPass: "",
      newPassConfirm: "",
    });
    setNewPassError({
      newPass: "",
      newPassConfirm: "",
    });
    dispatch(setIsModalLoading(true));
  }
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          if (currentPass === userInfo?.matKhau) {
            setCheckPass(true);
          } else {
            openNotificationWithIcon("error", "Mật khẩu không đúng!");
          }
        }}
      >
        <label
          htmlFor="checkPass"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
        >
          Nhập mật khẩu hiện tại
        </label>
        <div className="mb-6 flex">
          <input
            onChange={(e) => {
              setCurrentPass(e.target.value);
            }}
            value={currentPass}
            type="text"
            id="checkPass"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <button
            className="transition-all duration-300 hover:text-black 
            hover:bg-blue-700 cursor-pointer ml-5 p-2.5 bg-blue-500 text-white rounded-lg"
            type="submit"
          >
            Ok
          </button>
        </div>
      </form>
      {checkPass ? (
        <>
          <hr></hr>
          <form className="mt-5" onSubmit={handleSubmit}>
            <div className="mb-2">
              <label
                htmlFor="newPass"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Nhập mật khẩu mới
              </label>
              <input
                onChange={handleChange}
                value={password.newPass}
                name="newPass"
                title="Mật khẩu"
                type="password"
                id="newPass"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <span className="text-red-500 text-xs mr-3">
                {newPassError.newPass}
              </span>
            </div>
            <div className="mb-6">
              <label
                htmlFor="checkNewPass"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Nhập lại mật khẩu
              </label>
              <input
                onChange={handleChange}
                value={password.newPassConfirm}
                name="newPassConfirm"
                title="Xác nhận mật khẩu"
                type="password"
                id="checkNewPass"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <span className="text-red-500 text-xs mr-3">
                {newPassError.newPassConfirm}
              </span>
            </div>
       
          </form>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
