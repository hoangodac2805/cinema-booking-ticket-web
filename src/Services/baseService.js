import axios from "axios";
import { DOMAIN, TOKEN } from "../Util/systemSetting";

export class baseService {
  constructor() {}
  get = (url, model) => {
    return axios({
      url: `${DOMAIN}${url}`,
      method: "GET",
      data: model,
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  };
  post = (url, model) => {
    return axios({
      url: `${DOMAIN}${url}`,
      method: "POST",
      data: model,
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  };
  put = (url, model) => {
    return axios({
      url: `${DOMAIN}${url}`,
      method: "PUT",
      data: model,
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  };
  delete = (url, model) => {
    return axios({
      url: `${DOMAIN}${url}`,
      method: "DELETE",
      data: model,
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  };
}
