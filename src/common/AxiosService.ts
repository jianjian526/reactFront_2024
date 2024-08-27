import axios from 'axios';
import _ from 'lodash';
import {
  requestEeject,
  requestInterceptors,
  responseEeject,
  responseInterceptors,
} from './interceptors/Interceptors';

// axiosのインストールを作成する
// ディフォルト配置を設定する
const axiosInstance = axios.create({
  timeout: 10000,
  // baseURL: Config.API_BASE_URL
});

// 汎用のHeader
axiosInstance.defaults.headers.post['Content-Type'] = 'application/json';

// uploadのHeader
// instance.defaults.headers.post['Content-Type'] = 'multipart/form-data';

/** axiosのインストールに、requestのinterceptorを追加する  **/
const sortedIcr_req = _.orderBy(requestInterceptors, (item: any) => {
  return -item.Order;
});
sortedIcr_req.forEach((item: any) =>
  axiosInstance.interceptors.request.use(item.Function),
);
axiosInstance.interceptors.request.use((config) => config, requestEeject);

/** axiosのインストールに、responseのinterceptorを追加する  **/
const sortedIcr_res = _.orderBy(responseInterceptors, (item: any) => {
  return item.Order;
});
sortedIcr_res.forEach((item: any) =>
  axiosInstance.interceptors.response.use(item.Function),
);
axiosInstance.interceptors.response.use(
  (response) => Promise.resolve(response),
  responseEeject,
);

/** GETのカブセル **/
export const get = async (url: string, data: object, config = {}) => {
  // const result = await axiosInstance.post('/gqlapi/employInfo', { query: graphqlQuery });

  return new Promise((resolve, reject): any => {
    axiosInstance({
      method: 'get',
      url,
      data,
      ...config,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/** POSTのカブセル **/
export const post = (url: string, data: object, config = {}) => {
  return new Promise((resolve, reject) => {
    axiosInstance({
      method: 'post',
      url,
      data,
      ...config,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
