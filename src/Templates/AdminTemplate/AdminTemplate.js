import React, { useState, useRef } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  UserOutlined,
  UserAddOutlined,
  ProfileOutlined,
  FileAddOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Navigate, Outlet } from "react-router-dom";
import { history } from "../../App";
import { USERINFO } from "../../Util/systemSetting";

const { Header, Content, Footer, Sider } = Layout;

export default function AdminTemplate() {
  //------------CheckMobile--------
  const isMobile = navigator.userAgentData.mobile;

  ///--------
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  const items = [
    getItem("User", "user", <UserOutlined />, [
      getItem("User", "admin/userManagement", <UserOutlined />),
      getItem("Add User", "admin/addUser", <UserAddOutlined></UserAddOutlined>),
    ]),
    getItem("Film", "film", <FileOutlined />, [
      getItem("Film", "admin/filmManagement", <ProfileOutlined />),
      getItem("Add Film", "admin/addFilm", <FileAddOutlined />),
    ]),
    getItem("Home", "home", <DesktopOutlined />),
  ];
  const [collapsed, setCollapsed] = useState(false);
  //------------
  if (
    JSON.parse(localStorage.getItem(USERINFO))?.maLoaiNguoiDung !== "QuanTri"
  ) {
    alert("Bạn không đủ quyền để truy cập!!");
    return <Navigate to="/home"></Navigate>;
  }
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="logo flex justify-center">
          <img
            src={require("../../Assets/img/logo-gif.gif")}
            style={{ width: "75px" }}
          ></img>
        </div>
        <Menu
          onClick={(e) => {
            
            history.push(`/${e.key}`);
          }}
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        />
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet></Outlet>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Web đặt vé xem phim ©2022 Created by Ngô Đắc Hoà
        </Footer>
      </Layout>
    </Layout>
  );
}
