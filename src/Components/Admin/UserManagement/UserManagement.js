import React, { useEffect, useRef, useTransition } from "react";
import { Button, Input, Table, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { layDanhSachNguoiDung } from "../../../Redux/Reducer/QuanLyNguoiDungReducer";
import { xoaNguoiDung } from "../../../Redux/Action/QuanLyNguoiDungAction";
import { setOpenDrawer } from "../../../Redux/Reducer/DrawerReducer";
import EditUserInfoANTD from "../../Drawer/EditUserInfoANTD";
export default function UserManagement() {
  //-----------redux----------
  const { danhSachNguoiDung } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );
  const dispatch = useDispatch();
  //---------useRef------------
  const searchRef = useRef(null);
  //---------useTransition---------
  const [isPending, startTransition] = useTransition();
  //-----------antd----------
  const { Search } = Input;
  const onSearch = (value) => {
    console.log(value);
    dispatch(layDanhSachNguoiDung(value));
  };

  const columns = [
    {
      title: "Tài khoản",
      dataIndex: "taiKhoan",
      sorter: (a, b) => {
        let taiKhoanA = a.taiKhoan.toLowerCase().trim();
        let taiKhoanB = b.taiKhoan.toLowerCase().trim();
        if (taiKhoanA > taiKhoanB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["descend"],
    },
    {
      title: "Mật khẩu",
      dataIndex: "matKhau",
    
     
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => {
        let taiKhoanA = a.email.toLowerCase().trim();
        let taiKhoanB = b.email.toLowerCase().trim();
        if (taiKhoanA > taiKhoanB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["descend"],
    },
    {
      title: "Họ tên",
      dataIndex: "hoTen",
      sorter: (a, b) => {
        let taiKhoanA = a.hoTen.toLowerCase().trim();
        let taiKhoanB = b.hoTen.toLowerCase().trim();
        if (taiKhoanA > taiKhoanB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["descend"],
    },
    {
      title: "Loại người dùng",
      dataIndex: "maLoaiNguoiDung",
      sorter: (a, b) => {
        let taiKhoanA = a.maLoaiNguoiDung.toLowerCase().trim();
        let taiKhoanB = b.maLoaiNguoiDung.toLowerCase().trim();
        if (taiKhoanA > taiKhoanB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["descend"],
    },
    {
      title: "Thao Tác",
      render: (text, record, index) => {
        return (
          <div key={index}>
            <Tooltip title="Chỉnh sửa ">
              <Button
                onClick={() => {
                  dispatch(
                    setOpenDrawer({
                      status: true,
                      content: (
                        <EditUserInfoANTD userInfo={text}></EditUserInfoANTD>
                      ),

                      title: "Edit User Information",
                    })
                  );
                }}
                className="text-green-500"
                icon={<EditOutlined></EditOutlined>}
              ></Button>
            </Tooltip>
            <Tooltip title="Xoá ">
              <Button
                onClick={() => {
                  dispatch(xoaNguoiDung(record.taiKhoan));
                }}
                className="text-red-500 ml-1"
                icon={<DeleteOutlined></DeleteOutlined>}
              ></Button>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const onChangeTable = (pagination, filters, sorter, extra) => {
   
  };
  //--------useEffect----------
  useEffect(() => {
    dispatch(layDanhSachNguoiDung());

    return () => {};
  }, []);

  return (
    <div>
      <div className="mb-5">
        {" "}
        <Search
          onChange={(e) => {
            if (searchRef.current) {
              clearTimeout(searchRef.current);
            }
            searchRef.current = setTimeout(() => {
              startTransition(() => {
                dispatch(layDanhSachNguoiDung(e.target.value));
              });
            }, 500);
          }}
          size="large"
          placeholder="taiKhoan"
          onSearch={onSearch}
          style={{
            width: "100%",
          }}
        />{" "}
      </div>
      {isPending ? (
        <p>...Loading</p>
      ) : (
        <Table
          rowKey={"taiKhoan"}
          columns={columns}
          dataSource={danhSachNguoiDung}
          onChange={onChangeTable}
        />
      )}
    </div>
  );
}
