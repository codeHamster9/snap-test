import axios from "axios";
import * as API from "../common/consts/api";

const config = {
  baseURL: API.PREFIX,
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
      case 500:
        break;
      default:
        break;
    }
    return Promise.reject(response);
  },
];

const parseUrl = (url) => `${API.PREFIX}${url}`;
// request interceptors
instance.interceptors.request.use();

// response interceptors
instance.interceptors.response.use(...handleHttpErrors);

export const httpClient = {
  get: (url, params) => instance.get(parseUrl(url), { params }),
  post: (url, payload) => instance.post(parseUrl(url), payload),
  put: (url, payload) => instance.put(parseUrl(url), payload),
  patch: (url, payload) => instance.patch(parseUrl(url), payload),
  delete: (url, params) => instance.delete(parseUrl(url), { params }),
};
