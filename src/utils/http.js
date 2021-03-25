import axios from 'axios'
import {
  isLogin,
  getToken
} from '@/utils'
import qs from 'qs'

axios.defaults.timeout = 30000; //响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'; //配置请求头
axios.defaults.baseURL = process.env.NODE_ENV === "production" ? "/BigScreenWebApi/api/" : "/api"; //配置接口地址
//POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
  //在发送请求之前做某件事
  // if (config.method === 'post') {
  //     config.data = qs.stringify(config.data);
  // }
  //
  // if(isLogin()){
  //     config.headers.common["token"] = getToken();
  // }
  if (config.method === "post") {
    config.data = JSON.stringify(config.data);
  }
  return config;
}, (error) => {

  return Promise.reject(error);
});
//返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) => {

  //对响应数据做些事
  if (!res.data.success) {
    return Promise.resolve(res);
  }
  return res;
}, (error) => {
  return Promise.reject(error);
});

export function request(method, url, data) {
  return new Promise((resolve, reject) => {
    let params = {
      method,
      url
    }
    switch (method) {
      case "get":
        params.params = data
        break;
      case "get":
        params.data = data
        break;
      default:
        break;
    }
    axios(params).then(response => {
        resolve(response);
      }, err => {
        reject(err);
      })
      .catch((error) => {
        reject(error)
      })
  })

}
//返回一个Promise(发送post请求)
export function fetchPost(url, data, params) {
  return new Promise((resolve, reject) => {
    axios({
        url,
        method: "POST",
        data,
        params
      }).then(response => {
        resolve(response);
      }, err => {
        reject(err);
      })
      .catch((error) => {
        reject(error)
      })

  })
}
////返回一个Promise(发送get请求)
export function fetchGet(url, param) {

  return new Promise((resolve, reject) => {
    axios.get(url, {
        params: param
      })
      .then(response => {
        resolve(response)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
