import { getIdentity } from '@/common/storage/StorageUtil';
import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { Modal } from 'antd';
import { history } from 'umi';

// 创建 Apollo Client 实例
const createApolloClient = (uri: string, method: string = 'POST') => {
  const httpLink = createHttpLink({
    uri,
    fetchOptions: {
      method, // 设置 fetchOptions 中的 method 参数
    },
  });

  const authLink = setContext((_, { headers }) => {
    // 添加请求头，如果需要的话
    // const token = useAuth();
    const identity = getIdentity();

    return {
      headers: {
        ...headers,
        'Content-Type': 'application/json',
        Authorization:
          identity && identity.token ? `Bearer ${identity.token}` : '',
        // 添加其他自定义的请求头
      },
    };
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) =>
        console.error(`GraphQL Error: ${message}`),
      );
    }

    if (networkError) {
      console.error(`Network Error: ${networkError}`);
    }
  });

  const requestInterceptor = new ApolloLink((operation, forward) => {
    // 在发送请求之前触发的行为
    // userID加密
    
    // 继续发送请求
    return forward(operation);
  });

  const client = new ApolloClient({
    link: errorLink.concat(
      requestInterceptor.concat(authLink.concat(httpLink)),
    ),
    cache: new InMemoryCache(),
  });

  return client;
};

/** 员工信息相关的gql的url */
const employUrl = '/gqlapi/employInfo';

/** 用户信息相关的gql的url */
const userUrl = '/gqlapi/userInfo';

/** 员工信息相关的gql的url(AI) */
const employUrl_AI = '/gqlapi/employInfoByAI';

// 发送 GraphQL 请求 （员工情报）
export const sendGQLRequest_employee = async (
  query: any,
  variables: any,
  getResult?: (data: any) => any,
  options?: { [key: string]: any },
) => {
  const result = await sendGQLRequest(
    employUrl,
    query,
    variables,
    getResult,
    options,
  );
  return result;
};

// 发送 GraphQL 请求 （用户情报）
export const sendGQLRequest_user = async (
  query: any,
  variables: any,
  getResult?: (data: any) => any,
  options?: { [key: string]: any },
) => {
  const result = await sendGQLRequest(
    userUrl,
    query,
    variables,
    getResult,
    options,
  );
  return result;
};

// 发送 GraphQL 请求 （员工情报_AI）
export const sendGQLRequest_employee_ai = async (
  query: any,
  variables: any,
  getResult?: (data: any) => any,
  options?: { [key: string]: any },
) => {
  const result = await sendGQLRequest(
    employUrl_AI,
    query,
    variables,
    getResult,
    options,
  );
  return result;
};

// 发送 GraphQL 请求
export const sendGQLRequest = async (
  url: string,
  query: any,
  condition: any,
  getResult?: (data: any) => any,
  options?: { [key: string]: any },
) => {
  const client = createApolloClient(url);

  const variables = {
    condition,
  };

  try {
    const response = await client.query({
      query,
      variables,
    });

    if (getResult) {
      return getResult(response.data);
    } else {
      return response.data;
    }
  } catch (error: any) {
    if (error!.networkError) {
      const networkError = error.networkError;
      if (
        networkError.statusCode == '401' &&
        networkError.result &&
        networkError.result.errorCode == '5'
      ) {
        // 权限验证失败，返回登录页面
        showErrorModal(options);
        return;
      }
    }
    throw error;
  }
};

// 认证错误的处理
const showErrorModal = (options?: { [key: string]: any }) => {
  Modal.error({
    title: '发生错误',
    content: '登录已过期，请重新登录',
    onOk: () => {
      history.push('/login');
    },
  });
};
