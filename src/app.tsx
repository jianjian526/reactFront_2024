// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate

import iconImage from '@/assets/icons/tis.png';
import '@/styles.css';
import type { RequestConfig } from 'umi';
import { history } from 'umi';
import { getIdentity } from './common/storage/StorageUtil';
import Header from './components/Header';

// 拦截器。但对于apollo当然是不起效
export const request: RequestConfig = {
  timeout: 1000,
  // other axios options you want
  errorConfig: {
    errorHandler() {},
    errorThrower() {},
  },
  requestInterceptors: [],
  responseInterceptors: [],
};

// // 错误处理方案： 错误类型
// enum ErrorShowType {
//   SILENT = 0,
//   WARN_MESSAGE = 1,
//   ERROR_MESSAGE = 2,
//   NOTIFICATION = 3,
//   REDIRECT = 9,
// }
// // 与后端约定的响应数据格式
// interface ResponseStructure {
//   success: boolean;
//   data: any;
//   errorCode?: number;
//   errorMessage?: string;
//   showType?: ErrorShowType;
// }

// export const request: RequestConfig = {
//   // 统一的请求设定
//   timeout: 1000,
//   headers: { 'X-Requested-With': 'XMLHttpRequest' },

//   // 错误处理： umi@3 的错误处理方案。
//   errorConfig: {
//     // 错误抛出
//     errorThrower: (res: ResponseStructure) => {
//       const { success, data, errorCode, errorMessage, showType } = res;
//       if (!success) {
//         const error: any = new Error(errorMessage);
//         error.name = 'BizError';
//         error.info = { errorCode, errorMessage, showType, data };
//         throw error; // 抛出自制的错误
//       }
//     },
//     // 错误接收及处理
//     errorHandler: (error: any, opts: any) => {
//       if (opts?.skipErrorHandler) throw error;
//       // 我们的 errorThrower 抛出的错误。
//       if (error.name === 'BizError') {
//         const errorInfo: ResponseStructure | undefined = error.info;
//         if (errorInfo) {
//           const { errorMessage, errorCode } = errorInfo;
//           switch (errorInfo.showType) {
//             case ErrorShowType.SILENT:
//               // do nothing
//               break;
//             case ErrorShowType.WARN_MESSAGE:
//               message.warning(errorMessage);
//               break;
//             case ErrorShowType.ERROR_MESSAGE:
//               message.error(errorMessage);
//               break;
//             case ErrorShowType.NOTIFICATION:
//               // notification.open({
//               //   description: errorMessage,
//               //   message: errorCode,
//               // });
//               break;
//             case ErrorShowType.REDIRECT:
//               // TODO: redirect
//               break;
//             default:
//               message.error(errorMessage);
//           }
//         }
//       } else if (error.response) {
//         // Axios 的错误
//         // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
//         message.error(`Response status:${error.response.status}`);
//       } else if (error.request) {
//         // 请求已经成功发起，但没有收到响应
//         // \`error.request\` 在浏览器中是 XMLHttpRequest 的实例，
//         // 而在node.js中是 http.ClientRequest 的实例
//         message.error('None response! Please retry.');
//       } else {
//         // 发送请求时出了点问题
//         message.error('Request error, please retry.');
//       }
//     },

//   },

//   // 请求拦截器
//   requestInterceptors: [
//     (config: any) => {
//       console.log("==================requestInterceptors is here");
//       const token = 'testToken11';

//       // config.headers = {
//       //   ...config.headers,
//       //   Authorization: `Bearer ${token}`,
//       // };

//       if (token) {
//         config.headers['token'] = token; // tokenを追加する
//       }
//       return config;
//     }
//   ],

//   // 响应拦截器
//   responseInterceptors: [
//     (response) => {
//       console.log("==================responseInterceptors is here");
//       console.log(JSON.stringify(response));
//       // 在接收到响应后的处理逻辑
//       // 可以在这里处理返回的数据、错误处理等
//       if (response.status >= 200 && response.status < 300) {
//         // 请求成功
//         return response;
//       } else {
//         // 请求失败
//         console.error('Request failed:', response);
//         return response; // 返回错误的响应，可以根据需要进行处理
//       }
//     }
//   ]
// };

export async function getInitialState(): Promise<{ name: string }> {
  return { name: '@umijs/max' };
}

export const layout = () => {
  return {
    // logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    logo: iconImage,
    menu: {
      locale: false,
    },
    // 自定义 403 页面
    unAccessible: <Header />,
    // 自定义 404 页面
    noFound: <div> 'noFound' </div>,

    rightContentRender: () => <></>, // 你的右侧内容组件
    footerRender: () => (
      <div style={{ paddingLeft: '30px', paddingTop: '60px' }}>
        tis-employeeManagerSystem-v1.0
      </div>
    ),
    // menuHeaderRender: () => <div>显示菜单头部</div>,
  };
};

export function onRouteChange({
  location,
  clientRoutes,
  routes,
  action,
  basename,
  isFirst,
}: any) {
  if (location.pathname == '/login') {
    return;
  }

  const identityInfo = getIdentity();

  // 未登录
  if (!identityInfo || !identityInfo.token) {
    history.push('/login');
  }
}
