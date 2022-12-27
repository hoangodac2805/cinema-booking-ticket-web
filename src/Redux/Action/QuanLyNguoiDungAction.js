import { useNavigate } from "react-router-dom";
import { history } from "../../App";
import { quanLyNguoiDungService } from "../../Services/QuanLyNguoiDungService";
import { openNotificationWithIcon } from "../../Util/notification";
import { TOKEN, USERINFO } from "../../Util/systemSetting";
import { setOpenDrawer } from "../Reducer/DrawerReducer";
import { setLoadingAction } from "../Reducer/LoadingReducer";
import { setModalClose } from "../Reducer/ModalReducer";
import {
  layDanhSachNguoiDung,
  setCurrentUserInfo,
  setThongTinTaiKhoan,
} from "../Reducer/QuanLyNguoiDungReducer";
export const dangNhapAction = (model) => {
  return async (dispatch) => {
    await dispatch(setLoadingAction(true));
    try {
      let { data, status } = await quanLyNguoiDungService.dangNhap(model);
      if (status === 200) {
        await localStorage.setItem(TOKEN, data.content.accessToken);
        dispatch(layThongTinTaiKhoan());

        localStorage.setItem(USERINFO, JSON.stringify(data.content));
        dispatch(setCurrentUserInfo(data.content));
        dispatch(layDanhSachNguoiDung(model.taiKhoan));
        history.push("home");
        // eslint-disable-next-line no-restricted-globals
        location.reload();
      }
    } catch (error) {
      openNotificationWithIcon(
        "error",
        "Đăng nhập không  thành công!",
        error.response.data.content
      );
    }
    await dispatch(setLoadingAction(false));
  };
};
export const dangKyAction = (model) => {
  return async (dispatch) => {
    await dispatch(setLoadingAction(true));
    try {
      let { data, status } = await quanLyNguoiDungService.dangKy(model);
      if (status === 200) {
        openNotificationWithIcon(
          "success",
          "Đăng ký tài khoản thành công!",
          <div>
            <p>Tài khoảng: {data.content.taiKhoan} </p>
            <p>Tài khoản: {data.content.matKhau} </p>
          </div>
        );
        if (
          window.confirm(
            `Bạn có muốn đăng nhập bằng tài khoản ${data.content.taiKhoan} không?`
          )
        ) {
          let loginInfo = {
            taiKhoan: data.content.taiKhoan,
            matKhau: data.content.matKhau,
          };
          dispatch(dangNhapAction(loginInfo));
        } else {
          history.push("/login");
        }
      }
    } catch (error) {
      openNotificationWithIcon(
        "error",
        "Đăng ký tài khoản không  thành công!",
        error.response.data.content
      );
    }
    await dispatch(setLoadingAction(false));
  };
};
export const layThongTinTaiKhoan = () => {
  return async (dispatch) => {
    await dispatch(setLoadingAction(true));
    try {
      let { data, status } = await quanLyNguoiDungService.layThongTinTaiKhoan();

      if (status === 200) {
        dispatch(setThongTinTaiKhoan(data.content));
      }
    } catch (error) {}
    await dispatch(setLoadingAction(false));
  };
};
export const themNguoiDung = (model) => {
  return async (dispatch) => {
    await dispatch(setLoadingAction(true));
    try {
      const { data, status } = await quanLyNguoiDungService.themNguoiDung(
        model
      );
      if (status === 200) {
        openNotificationWithIcon("success", "Thêm người dùng thành công!", "");
        dispatch(layDanhSachNguoiDung());
        history.push("/admin/userManagement");
      }
    } catch (error) {
      openNotificationWithIcon(
        "error",
        "Thêm người dùng không  thành công!",
        error.response.data.content
      );
    }
    await dispatch(setLoadingAction(false));
  };
};
export const xoaNguoiDung = (taiKhoan) => {
  return async (dispatch) => {
    await dispatch(setLoadingAction(true));
    try {
      const { data, status } = await quanLyNguoiDungService.xoaNguoiDung(
        taiKhoan
      );
      if (status === 200) {
        openNotificationWithIcon("success", "Xoá người dùng thành công!", "");

        dispatch(layDanhSachNguoiDung());
      }
    } catch (error) {
      openNotificationWithIcon(
        "error",
        "Xoá người dùng không  thành công!",
        error.response.data.content
      );
    }
    await dispatch(setLoadingAction(false));
  };
};
export const capNhatThongTinNguoiDung = (model) => {
  return async (dispatch) => {
    await dispatch(setLoadingAction(true));
    try {
      const { data, status } =
        await quanLyNguoiDungService.capNhatThongTinNguoiDung(model);
      if (status === 200) {
        openNotificationWithIcon(
          "success",
          "Cập nhật thông tin  thành công!",
          ""
        );

        await dispatch(layDanhSachNguoiDung());
        dispatch(
          setOpenDrawer({
            status: false,
            content: <p>Mặc định</p>,
            title: "Mặt định",
          })
        );
      }
    } catch (error) {
      openNotificationWithIcon(
        "error",
        "Cập nhật thông tin không thành công!",
        error.response.data.content
      );
    }
    await dispatch(setLoadingAction(false));
  };
};
export const capNhatThongTinCaNhan = (model) => {
  return async (dispatch) => {
    await dispatch(setLoadingAction(true));
    try {
      const { data, status } =
        await quanLyNguoiDungService.capNhatThongTinCaNhan(model);
      if (status === 200) {
        // eslint-disable-next-line no-restricted-globals
        location.reload();
        openNotificationWithIcon(
          "success",
          "Cập nhật thông tin  thành công!",
          ""
        );
        dispatch(layThongTinTaiKhoan());
      }
    } catch (error) {
      console.log(error);
      openNotificationWithIcon(
        "error",
        "Cập nhật thông tin không thành công!",
        error.response.data.content
      );
    }
    await dispatch(setLoadingAction(false));
  };
};
export const doiMatKhau = (model) => {
  return async (dispatch) => {
    await dispatch(setLoadingAction(true));
    try {
      const { data, status } = await quanLyNguoiDungService.doiMatKhau(model);
      if (status === 200) {
        await dispatch(setModalClose());
        openNotificationWithIcon("success", "Đổi mật khẩu  thành công!", "");
        localStorage.clear();
        alert("Yêu cầu đăng nhập lại");
        history.push("login");
      }
    } catch (error) {
      console.log(error);
      openNotificationWithIcon(
        "error",
        "Đổi mật khẩu không thành công!",
        error.response.data.content
      );
    }
    await dispatch(setLoadingAction(false));
  };
};
