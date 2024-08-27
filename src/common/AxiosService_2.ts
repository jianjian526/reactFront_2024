// import { request, useRequest } from 'umi';
import axios from 'axios';
import { request } from '../app';

// export const request: RequestConfig = {
//   timeout: 1000,
//   // other axios options you want
//   errorConfig: {
//     errorHandler(){
//     },
//     errorThrower(){
//     }
//   },
//   requestInterceptors: [
//     (url, options) => {
//       console.log("==================requestInterceptors is here");
//       // 在请求发送前的处理逻辑
//       // 可以在这里设置请求头、添加token等
//       const token = 'your_token_here';
//       options.headers = {
//         ...options.headers,
//         Authorization: `Bearer ${token}`,
//       };

//       return {
//         url,
//         options,
//       };
//     },
//   ],

//   // 设置响应拦截器
//   responseInterceptors: [
//     async (response) => {
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
//     },
//   ],
// };

const graphqlQuery = `
  query {
    queryEmployeeList(condition: {}) {
      success
      errorCode
      data {
        list {
          id
          name
          nickName
          gender
        }
      }
    }
  }
`;

const fetchData = async () => {
  try {
    const result = await axios.post(
      '/gqlapi/employInfo',
      { query: graphqlQuery },
      request,
    );
    return result;
  } catch (error) {
    // 处理错误
  }
};

// // 发送GraphQL请求
// const fetchData = async () => {
//   try {
//     var querybody = {};
//     const response = await request('/gqlapi/employInfo', {
//       method: 'POST',
//       // data: {
//       //   query: `
//       //       query {
//       //         list: queryEmployeeList(condition: {}) {
//       //           id
//       //           name
//       //           nickName
//       //           gender
//       //         }
//       //       }
//       //     `,
//       // },
//       data: {
//         query: `
//             query {
//               success
//               errorCode
//               data {
//                 list {
//                   id
//                   name
//                   nickName
//                   gender
//                 }
//               }
//             }
//             }
//           `,
//       },
//     });

//     console.log("++++++++++++++++++++++++++++++++++++");
//     console.log(JSON.stringify(response.data));

//     // return Object.assign({ success: true, errorCode: 0 }, response);
//     return response.data;

//   } catch (error) {
//     console.error(error);
//     return {
//       success: false,
//       errorCode: 1
//     }
//   }
// };

// fetchData(request).then((result) => {
//   console.log(result);
// });

export default fetchData;
