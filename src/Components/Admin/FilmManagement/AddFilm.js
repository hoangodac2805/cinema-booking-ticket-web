import React, { useRef, useState } from "react";
import { GROUP } from "../../../Util/systemSetting";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Switch,
} from "antd";
import { themPhimUploadHinh } from "../../../Redux/Reducer/QuanLyPhimReducer";
import { useDispatch } from "react-redux";
import moment from "moment";

export default function AddFilm(props) {
  //------redux--------
  const dispatch = useDispatch();
  //------------useRef--------
  const dataRef = useRef({
    tenPhim: "",
    trailer: "",
    moTa: "",
    ngayKhoiChieu: "",
    dangChieu: false,
    sapChieu: false,
    hot: false,
    danhGia: 0,
    hinhAnh: {},
    maNhom: GROUP,
  });
  const [addFilmError, setAddFilmError] = useState({
    tenPhim: "",
    trailer: "",
    moTa: "",
    ngayKhoiChieu: "",
  });
  const [hinhAnh, setHinhAnh] = useState("");
  //-----------ANTD---------
  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  //---------Function---------------
  const handleChange = (e) => {
    let { value, name, title } = e.target;

    dataRef.current[name] = value;

    let errorUpdate = { ...addFilmError };
    //                          ----kiểm tra rỗng
    if (dataRef.current[name].trim() === "") {
      errorUpdate[name] = title + " đang bỏ trống!!!";
    } else {
      errorUpdate[name] = "";
    }
    setAddFilmError(errorUpdate);
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
    for (let key in addFilmError) {
      if (addFilmError[key].trim() !== "") {
        checkError = false;
      }
    }

    if (checkValue !== true || checkError !== true) {
      return alert("Dữ liệu không hợp lệ!! Vui lòng thử lại");
    } else {
      let formData = new FormData();
      for (let key in dataRef.current) {
        if (key === "hinhAnh") {
          formData.append(
            "File",
            dataRef.current.hinhAnh,
            dataRef.current.hinhAnh.name
          );
        } else {
          formData.append(key, dataRef.current[key]);
        }
      }
      dispatch(themPhimUploadHinh(formData));
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
          <Input name="tenPhim" title="Tên phim" onChange={handleChange} />
          <span className="text-xs text-red-500">{addFilmError.tenPhim}</span>
        </Form.Item>
        <Form.Item label="Trailer">
          <Input name="trailer" title="Trailer" onChange={handleChange} />
          <span className="text-xs text-red-500">{addFilmError.trailer}</span>
        </Form.Item>
        <Form.Item label="Mô tả">
          <Input name="moTa" title="Mô tả" onChange={handleChange} />
          <span className="text-xs text-red-500">{addFilmError.moTa}</span>
        </Form.Item>
        <Form.Item label="Ngày khởi chiếu">
          <DatePicker
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
            type={"number"}
            min={0}
            max={10}
            required
            onChange={handleChangeField("danhGia")}
          />
        </Form.Item>
        <Form.Item label="Đang chiếu" valuePropName="checked">
          <Switch onChange={handleChangeField("dangChieu")} />
        </Form.Item>
        <Form.Item label="Sắp chiếu" valuePropName="checked">
          <Switch onChange={handleChangeField("sapChieu")} />
        </Form.Item>
        <Form.Item label="Hot" valuePropName="checked">
          <Switch onChange={handleChangeField("hot")} />
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
