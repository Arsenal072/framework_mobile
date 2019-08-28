import axios from 'axios';
import qs from 'qs'
import utils from '../lib/utils'

// 数据接口地址
const BASE_URL = rootUrl

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

// const openIdConfig = {
//   baseURL: BASE_URL,
//   headers: {
//     "Authorization": "openid"
//   },
//   transformRequest: [
//     data => qs.stringify({
//       requestData: JSON.stringify(data)
//     })
//   ],
//   paramsSerializer: params => qs.stringify(params),
//   timeout: 10000
// }

const exportConfig = {
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  }
};

const requestGet = (_url, obj) => axios(_url, {...baseConfig, params: obj})
const requestPost = (_url, obj) => axios.post(_url, obj, exportConfig)
// const put = (_url, obj) => axios.put(_url, obj, exportConfig)
// const deleteRequire = (_url, obj)=> axios.delete(_url, exportConfig)
// const uploadpost = (_url, obj) => axios.post(_url, obj, exportConfig);

// 请求前拦截处理
axios.interceptors.request.use(config => {
  let requestUrl = config.url;
  let requestModel = '';
  let randomStr = Math.random().toString(36).substr(2);
  let timestamp = new Date().getTime();

  requestModel = utils.parseQueryString(decodeURIComponent(requestUrl).replace(/\+/g, ' '));
  requestModel['noticeStr'] = randomStr;
  requestModel['timestamp'] = timestamp;
  let signStr = utils.createSignature(requestModel)
  config.headers['noticeStr'] = randomStr;
  config.headers['timestamp'] = timestamp;
  config.headers['sign'] = signStr;
  return config;
}, error => {
  return Promise.reject(error);
});

// 响应拦截错误处理
axios.interceptors.response.use(res => {
  return res;
}, function (error) {
  if (error === undefined || error.code === 'ECONNABORTED') {
    utils.toast('服务请求超时')
    return Promise.reject(error);
  }
  let response = error.response
  if (response.status == 403) {
    utils.toast(response.data)
    return Promise.reject(error);
  }
  utils.toast(response.data)
  return error;
});

export {
  requestGet,
  requestPost,
}
// // 添加请求拦截器
// axios.interceptors.request.use(function (config) {
//     // 在发送请求之前做些什么
//     return config;
//   }, function (error) {
//     // 对请求错误做些什么
//     return Promise.reject(error);
//   });

// // 添加响应拦截器
// axios.interceptors.response.use(function (response) {
//     // 对响应数据做点什么
//     return response;
//   }, function (error) {
//     // 对响应错误做点什么
//     return Promise.reject(error);
// });
