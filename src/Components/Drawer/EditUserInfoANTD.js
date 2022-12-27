import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Input, InputNumber, Radio, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { layDanhSachLoaiNguoiDung } from "../../Redux/Reducer/QuanLyNguoiDungReducer";
import { GROUP } from "../../Util/systemSetting";
import { capNhatThongTinNguoiDung } from "../../Redux/Action/QuanLyNguoiDungAction";

export default function EditUserInfoANTD(props) {
  const { userInfo } = props;
  
  //-----------ANTD-------

  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  //---------redux-------
  const { danhSachLoaiNguoiDung } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );
  const dispatch = useDispatch();
  //------------Ref-------
  const editUserRef = useRef({
    taiKhoan: userInfo?.taiKhoan,
    matKhau: userInfo?.matKhau,
    email: userInfo?.email,
    soDt: userInfo?.soDt,
    maNhom: "GP00",
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
      if (typeof editUserRef.current[key] === "string") {
        if (editUserRef.current[key].trim() === "") {
          checkValue = false;
        }
      }
    }
    for (let key in editUserError) {
      if (editUserError[key].trim() !== "") {
        checkError = false;
      }
    }
    console.log(editUserRef, editUserError);
    console.log(editUserRef.current);
    if (checkValue !== true || checkError !== true) {
      return alert("Dữ liệu không hợp lệ!! Vui lòng thử lại");
    }

    dispatch(capNhatThongTinNguoiDung(editUserRef.current));
  };
  //---------useEffect----------
  useEffect(() => {
    dispatch(layDanhSachLoaiNguoiDung());
    return () => {};
  }, []);

  return (
    <Form
      onSubmitCapture={handleSubmit}
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      initialValues={{
        size: componentSize,
      }}
      onValuesChange={onFormLayoutChange}
      size={componentSize}
    >
      <Form.Item label="Kích cỡ form" name="size">
        <Radio.Group>
          <Radio.Button value="small">Nhỏ</Radio.Button>
          <Radio.Button value="default">Mặc định</Radio.Button>
          <Radio.Button value="large">Lớn</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Tài khoản">
        <Input
          disabled
          name="taiKhoan"
          title="Tài khoản"
          value={userInfo?.taiKhoan}
        />
      </Form.Item>
      <Form.Item label="Mật khẩu">
        <Input
          onChange={handleChange}
          name="matKhau"
          title="Mật khẩu"
          defaultValue={userInfo?.matKhau}
        />
        <span className="text-xs text-red-500">{editUserError.matKhau}</span>
      </Form.Item>
      <Form.Item label="Email">
        <Input
          onChange={handleChange}
          name="email"
          title="Email"
          defaultValue={userInfo?.email}
        />
        <span className="text-xs text-red-500">{editUserError.email}</span>
      </Form.Item>
      <Form.Item label="Họ tên">
        <Input
          onChange={handleChange}
          name="hoTen"
          title="Họ tên"
          defaultValue={userInfo?.hoTen}
        />
        <span className="text-xs text-red-500">{editUserError.hoTen}</span>
      </Form.Item>
      <Form.Item label="Số điện thoại">
        <Input
          onChange={handleChange}
          name="soDt"
          title="số điện thoại"
          defaultValue={userInfo?.soDt}
        />
        <span className="text-xs text-red-500">{editUserError.soDt}</span>
      </Form.Item>
      <Form.Item label="Mã nhóm">
        <Input disabled value={GROUP} />
      </Form.Item>
      <Form.Item label="Loại người dùng">
        <Select
          defaultValue={userInfo.maLoaiNguoiDung}
          onSelect={(value) => {
            editUserRef.current.maLoaiNguoiDung = value;
          }}
        >
          {danhSachLoaiNguoiDung?.map((item, index) => {
            return (
              <Select.Option key={index} value={item.maLoaiNguoiDung}>
                {item.tenLoai}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item label="Action">
        <Button htmlType="submit" onClick={handleSubmit}>
          Update
        </Button>
      </Form.Item>
    </Form>
  );
}
