import axios from 'axios';
import qs from 'qs'
import utils from '../lib/utils'
// 数据接口地址
// const BASE_URL = BaseUrl

const baseConfig = {
  baseURL: BASE_URL,
  transformRequest: [
    data => qs.stringify({
      requestData: JSON.stringify(data)
    })
  ],
  paramsSerializer: params => qs.stringify(params),
  timeout: 10000
}

const exportConfig = {
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  }
};

const requestGet = (_url, obj) => axios(_url, {...exportConfig, params: obj})
const requestPost = (_url, obj) => axios.post(_url, obj, exportConfig)

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export {
  requestGet,
  requestPost,
}
