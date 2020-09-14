import axios from "axios";
import { isDebug } from "@/utils/helpers";
import * as API from "../../common/consts/api";

const config = {
  baseURL: isDebug ? "https://local.fbx.im:5443/api/" : "/api/",
};

const instance = axios.create(config);

const handleHttpErrors = [
  (response) => response,
  ({ response }) => {
    const { status } = response;
    switch (status) {
      case 401:
        break;
      case 403:
        break;
      case 500: {
        break;
      }
    }
    return Promise.reject(response);
  },
];

// request interceptors
instance.interceptors.request.use();

// response interceptors
instance.interceptors.response.use(...handleHttpErrors);

const httpClient = {
  get: (url, params) => instance.get(url, { params }),
  post: (url, payload) => instance.post(url, payload),
  put: (url, payload) => instance.put(url, payload),
  patch: (url, payload) => instance.patch(url, payload),
  delete: (url, params) => instance.delete(url, { params }),
};

export default httpClient;
