import React, { useRef, useState } from "react";
import dayjs from "dayjs";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Switch,
} from "antd";

import { useDispatch } from "react-redux";
import moment from "moment";
import { GROUP } from "../../Util/systemSetting";
import { capNhatPhimUpload } from "../../Redux/Reducer/QuanLyPhimReducer";

export default function EditFilmInfoANTD(props) {
  const dayjs = require("dayjs");
  const { filmInfo } = props;
  console.log(filmInfo);
  //------redux--------
  const dispatch = useDispatch();
  //------------useRef--------
  const dataRef = useRef({
    maPhim: filmInfo?.maPhim,
    tenPhim: filmInfo?.tenPhim,
    trailer: filmInfo?.trailer,
    moTa: filmInfo?.moTa,
    ngayKhoiChieu: moment(filmInfo?.ngayKhoiChieu).format("DD/MM/YYYY"),
    dangChieu: filmInfo?.dangChieu,
    sapChieu: filmInfo?.sapChieu,
    hot: filmInfo?.hot,
    danhGia: filmInfo?.danhGia,
    hinhAnh: null,
    maNhom: GROUP,
  });
  const [editFilmError, setEditFilmError] = useState({
    tenPhim: "",
    trailer: "",
    moTa: "",
    ngayKhoiChieu: "",
  });
  const [hinhAnh, setHinhAnh] = useState(filmInfo?.hinhAnh);
  //-----------ANTD---------
  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  //---------Function---------------
  const handleChange = (e) => {
    let { value, name, title } = e.target;

    dataRef.current[name] = value;

    let errorUpdate = { ...editFilmError };
    //----kiểm tra rỗng
    if (dataRef.current[name].trim() === "") {
      errorUpdate[name] = title + " đang bỏ trống!!!";
    } else {
      errorUpdate[name] = "";
    }
    setEditFilmError(errorUpdate);
  };
  const handleChangeField = (name) => {
    return (value) => {
      dataRef.current[name] = value;
    };
  };
  const handleChangeFile = (e) => {
    let file = e.target.files[0];

    if (
      file.type === "image/jpeg" ||
      file.type === "image/gif" ||
      file.type === "image/png" ||
      file.type === "image/jpg"
    ) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        // console.log(e.target.result);
        setHinhAnh(e.target.result);
      };
      dataRef.current.hinhAnh = file;
      // formik.setFieldValue("hinhAnh", file);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let checkValue = true;
    let checkError = true;
    for (let key in dataRef.current) {
      if (typeof dataRef.current[key] === "string") {
        if (dataRef.current[key].trim() === "") {
          checkValue = false;
        }
      }
    }
    for (let key in editFilmError) {
      if (editFilmError[key].trim() !== "") {
        checkError = false;
      }
    }
    console.log(dataRef.current);
    if (checkValue !== true || checkError !== true) {
      return alert("Dữ liệu không hợp lệ!! Vui lòng thử lại");
    } else {
      let formData = new FormData();
      for (let key in dataRef.current) {
        if (key === "hinhAnh") {
          if (dataRef.current.hinhAnh !== null) {
            formData.append(
              "File",
              dataRef.current.hinhAnh,
              dataRef.current.hinhAnh.name
            );
          }
        } else {
          formData.append(key, dataRef.current[key]);
        }
      }

      dispatch(capNhatPhimUpload(formData));
    }
  };
  return (
    <div>
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
        <Form.Item label="Kích thước form" name="size">
          <Radio.Group>
            <Radio.Button value="small">Nhỏ</Radio.Button>
            <Radio.Button value="default">Mặc định</Radio.Button>
            <Radio.Button value="large">Lớn</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Tên phim">
          <Input
            defaultValue={filmInfo?.tenPhim}
            name="tenPhim"
            title="Tên phim"
            onChange={handleChange}
          />
          <span className="text-xs text-red-500">{editFilmError.tenPhim}</span>
        </Form.Item>
        <Form.Item label="Trailer">
          <Input
            defaultValue={filmInfo?.trailer}
            name="trailer"
            title="Trailer"
            onChange={handleChange}
          />
          <span className="text-xs text-red-500">{editFilmError.trailer}</span>
        </Form.Item>
        <Form.Item label="Mô tả">
          <Input
            defaultValue={filmInfo?.moTa}
            name="moTa"
            title="Mô tả"
            onChange={handleChange}
          />
          <span className="text-xs text-red-500">{editFilmError.moTa}</span>
        </Form.Item>
        <Form.Item label="Ngày khởi chiếu">
          <DatePicker
            defaultValue={dayjs(filmInfo?.ngayKhoiChieu)}
            onChange={(value, dayString) => {
              // console.log("value", value);
              console.log("dayString", moment(dayString).format("DD/MM/YYYY"));
              dataRef.current.ngayKhoiChieu =
                moment(dayString).format("DD/MM/YYYY");
            }}
          />
        </Form.Item>
        <Form.Item label="Đánh giá">
          <InputNumber
            defaultValue={filmInfo?.danhGia}
            type={"number"}
            min={0}
            max={10}
            required
            onChange={handleChangeField("danhGia")}
          />
        </Form.Item>
        <Form.Item label="Đang chiếu" valuePropName="checked">
          <Switch
            defaultChecked={filmInfo?.dangChieu}
            onChange={handleChangeField("dangChieu")}
          />
        </Form.Item>
        <Form.Item label="Sắp chiếu" valuePropName="checked">
          <Switch
            defaultChecked={filmInfo?.sapChieu}
            onChange={handleChangeField("sapChieu")}
          />
        </Form.Item>
        <Form.Item label="Hot" valuePropName="checked">
          <Switch
            defaultChecked={filmInfo?.hot}
            onChange={handleChangeField("hot")}
          />
        </Form.Item>
        <Form.Item label="Hình ảnh">
          <input
            onChange={handleChangeFile}
            type="file"
            accept="image/png, image/jpeg,image/gif"
          ></input>
          <hr></hr>
          <img
            src={hinhAnh}
            style={{ width: 150, height: 150, border: "1px solid #333" }}
          ></img>
        </Form.Item>
        <Form.Item label="Action">
          <Button htmlType="submit" onClick={handleSubmit}>
            Button
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
