import { notification } from "antd";
export const openNotificationWithIcon = (type, mess, des) => {
  notification[type]({
    message: mess,
    description: des,
  });
};
