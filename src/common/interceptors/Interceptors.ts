import { AxiosResponse } from 'axios';

// ------------------------- Requestについてinterface定義 -------------------------
// request
export const requestInterceptors: Array<{
  Order: number;
  Function: (config: any) => any;
}> = [];
// request reject
export const requestEeject = (error: any) => {
  // Errorの場合
  return Promise.reject(error);
};

// ------------------------- Responseについてinterface定義 -------------------------
// response
export const responseInterceptors: Array<{
  Order: number;
  Function: (config: AxiosResponse<any, any>) => Promise<any>;
}> = [];
// response reject
export const responseEeject = (error: any) => {
  // Errorの場合
  if (error.response) {
    if (error.response.status === 401) {
      console.log('error status is 401');
    }
    return Promise.reject(error);
  } else {
    return Promise.reject('請求はタイムアウトしました。');
  }
};

// ------------------------- 以下は、Interceptorsを追加する部分 -------------------------

/**
 * requestのInterceptorsを追加する
 * ・ 認証Tokenをつける
 */
requestInterceptors.push({
  Order: 1, // 1～Ｎの順で、優先度を低くなります
  Function: (config) => {
    var token = 'testToken11';
    if (token) {
      config.headers['token'] = token; // tokenを追加する
    }
    return config;
  },
});

/**
 * responseのInterceptorsを追加する
 */
responseInterceptors.push({
  Order: 1, // 1～Ｎの順で、優先度を低くなります
  Function: (response) => {
    if (response.status === 200) {
      return Promise.resolve(response.data);
    } else {
      return Promise.reject(response.data.msg);
    }
  },
});
