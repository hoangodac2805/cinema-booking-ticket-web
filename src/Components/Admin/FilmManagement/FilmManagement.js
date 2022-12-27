import React, { useEffect, useRef, useTransition } from "react";
import { Button, DatePicker, Form, Input, Table, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  layDanhSachPhim,
  layDanhSachPhimTheoNgay,
  xoaPhim,
} from "../../../Redux/Reducer/QuanLyPhimReducer";
import moment from "moment";
import {
  EditOutlined,
  DeleteOutlined,
  DesktopOutlined,
} from "@ant-design/icons";
import { setOpenDrawer } from "../../../Redux/Reducer/DrawerReducer";
import EditFilmInfoANTD from "../../Drawer/EditFilmInfoANTD";
import TaoLichChieuANTD from "../../Drawer/TaoLichChieuANTD";
export default function FilmManagement() {
  //-------redux--------
  const { listFilm } = useSelector((state) => state.QuanLyPhimReducer);
  const dispatch = useDispatch();
  //---------useRef--------
  const searchRef = useRef(null);
  //---------useTransition--------
  const [isPending, startTransition] = useTransition();
  //------search-------
  const { Search } = Input;
  const onSearch = (value) => {
    dispatch(layDanhSachPhim(value));
  };
  //------rangePicker-------
  const { RangePicker } = DatePicker;
  const rangeConfig = {
    rules: [
      {
        type: "array",
        required: true,
        message: "Please select time!",
      },
    ],
  };
  const onFinish = (fieldsValue) => {
    const rangeValue = fieldsValue["rangePicker"];

    const values = {
      ...fieldsValue,

      rangePicker: [
        rangeValue[0].format("DD-MM-YYYY"),
        rangeValue[1].format("DD-MM-YYYY"),
      ],
    };
    const { rangePicker } = values;

    dispatch(layDanhSachPhimTheoNgay(rangePicker[0], rangePicker[1]));
    // console.log("Received values of form: ", rangePicker);
    // console.log("Received values of form: ", values);
  };
  //-------table---------
  const columns = [
    {
      title: "Mã phim",
      dataIndex: "maPhim",
      sorter: {
        compare: (a, b) => a.maPhim - b.maPhim,
      },
      sortDirections: ["descend"],
    },
    {
      title: "Tên phim",
      dataIndex: "tenPhim",
      sorter: (a, b) => {
        let phimA = a.tenPhim.toLowerCase().trim();
        let phimB = b.tenPhim.toLowerCase().trim();
        if (phimA > phimB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["descend"],
    },
    {
      title: "Ngày khởi chiếu",

      render: (text, record, index) => {
        return moment(text.ngayKhoiChieu).format("DD-MM-YYYY");
      },
      sorter: (a, b) => {
        let phimA = a.ngayKhoiChieu.toLowerCase().trim();
        let phimB = b.ngayKhoiChieu.toLowerCase().trim();
        if (phimA > phimB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["descend"],
    },
    {
      title: "Hình ảnh",

      render: (text, record, index) => {
        return (
          <img key={index} src={text.hinhAnh} style={{ width: "75px" }}></img>
        );
      },
    },
    {
      title: "Action",

      render: (text, record, index) => {
        return (
          <div key={index}>
            <Tooltip title="Tạo lịch chiếu ">
              <Button
                onClick={() => {
                  dispatch(
                    setOpenDrawer({
                      status: true,
                      content: (
                        <TaoLichChieuANTD filmInfo={text}></TaoLichChieuANTD>
                      ),
                      title: `Tạo lịch chiếu phim ${text.tenPhim}`,
                    })
                  );
                }}
                icon={<DesktopOutlined></DesktopOutlined>}
                className="text-yellow-500"
                title="Chỉnh sửa"
              ></Button>
            </Tooltip>
            <Tooltip title="Chỉnh sửa ">
              <Button
                onClick={() => {
                  dispatch(
                    setOpenDrawer({
                      status: true,
                      content: (
                        <EditFilmInfoANTD filmInfo={text}></EditFilmInfoANTD>
                      ),
                      title: `Chỉnh sửa thông tin film ${text.maPhim}`,
                    })
                  );
                }}
                icon={<EditOutlined></EditOutlined>}
                className="text-green-500"
                title="Chỉnh sửa"
              ></Button>
            </Tooltip>
            <Tooltip title="Xoá ">
              <Button
                onClick={() => {
                  dispatch(xoaPhim(text.maPhim));
                }}
                icon={<DeleteOutlined></DeleteOutlined>}
                className="text-red-500"
              ></Button>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
   
  };
  //---------useEffect-----------
  useEffect(() => {
    dispatch(layDanhSachPhim());

    return () => {};
  }, []);

  return (
    <div>
      <div className="grid grid-cols-2 mb-10">
        <Search
          onChange={(e) => {
            if (searchRef.current) {
              clearTimeout(searchRef.current);
            }
            searchRef.current = setTimeout(() => {
              startTransition(() => {
                dispatch(layDanhSachPhim(e.target.value));
              });
            }, 500);
          }}
          placeholder="Tên phim"
          allowClear
          enterButton="Tìm kiếm"
          onSearch={onSearch}
        />
        <Form className="flex" onFinish={onFinish}>
          <Form.Item
            name="rangePicker"
            label="Tìm bằng thời gian"
            {...rangeConfig}
          >
            <RangePicker />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Chọn
          </Button>
        </Form>
      </div>
      {isPending ? (
        <p>Loading....</p>
      ) : (
        <Table
          rowKey="maPhim"
          columns={columns}
          dataSource={listFilm}
          onChange={onChange}
        />
      )}
    </div>
  );
}
