import Vue from 'vue'
import axios from "axios"
import store from '../store'
import router from '../router'
import baseconfig from "../../static/baseconfig.js"
import { Message } from "element-ui"
let cancel, promiseArr = {}
const CancelToken = axios.CancelToken
const source = CancelToken.source()

Vue.prototype.baseconfig = baseconfig
//请求拦截器
axios.interceptors.request.use(
  config => {
    config.cancelToken = source.token // 全局添加cancelToken

    //发起请求时，取消掉当前正在进行的相同请求
    if (promiseArr[config.url]) {
      promiseArr[config.url]("操作取消")
      promiseArr[config.url] = cancel
    } else {
      promiseArr[config.url] = cancel
    }
    // alert(baseconfig.baseUrl);
    // 拼接域名
    config.url = baseconfig.baseUrl + config.url
    let  { token, ID } = store.state.user.user.info

    config.headers = {
      'Content-Type': 'application/json',
      'x-token': token,
      'x-user-id': ID
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

//响应拦截器即异常处理
axios.interceptors.response.use(

  response => {
    let { code, msg } = response.data
    // if (code !== 0) {
    //   Message.error(msg)
    // }

    // // token验证失败，重新登录
    // if(code === 7) {
    //   setTimeout(() => {
    //     document.getElementsByTagName("html")[0].removeAttribute('class') // 移除暗黑主题
    //     store.dispatch('user/setLoginStatus', false)
    //     router.replace('/login')
    //     this.$router.go(0)
    //   }, 1500)
    // }

    if (response) {
      return response
    }
  },
  err => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = "Incorrect request."
          break
        case 401:
          err.message = "Unauthorized. Please log in again."
          break
        case 403:
          err.message = "Access denied."
          break
        case 404:
          err.message = "Request failed. Could not find the resources."
          break
        case 405:
          err.message = "Request method is not allowed."
          break
        case 408:
          err.message = "Request timeout."
          break
        case 500:
          err.message = "There is an error on the server side."
          break
        case 501:
          err.message = "Not implemented."
          break
        case 502:
          err.message = "Network error."
          break
        case 503:
          err.message = "Service is not available."
          break
        case 504:
          err.message = "Network timeout."
          break
        case 505:
          err.message = "HTTP protocol doesn’t support this request."
          break
        default:
          err.message = `Connection error${err.response.status}`
      }
    } else {
      err.message = "Failed to connect to the server."
    }

    if (err && err.response) {
      //Message.error(err.message)
    }

    return Promise.reject(err)
  }
)

axios.defaults.timeout = 100000

//get请求方式
function get(config) {
  return new Promise((resolve, reject) => {
    axios({
      url: config.url,
      method: "get",
      params: config.data
    })
    .then(res => {
      resolve(res.data)
    })
    .catch(err => {
      reject(err)
    })
  })
}

//post请求方式
function post(config) {
  return new Promise((resolve, reject) => {
    axios({
      url: config.url,
      method: "post",
      data: config.data
    })
    .then(res => {

      resolve(res.data)
    })
    .catch(err => {
      reject(err)
    })
  })
}

function downloadPost(config) {
  return new Promise((resolve, reject) => {
    axios({
        url: config.url,
        method: "post",
        data: config.data,
        responseType: "blob"
      })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

//put请求方式
function put(config) {
  return new Promise((resolve, reject) => {
    axios({
        url: config.url,
        method: "put",
        data: config.data
      })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

//deleteh请求方式
function deleted(config) {
  return new Promise((resolve, reject) => {
    axios({
        url: config.url,
        method: "delete",
        params: config.data
      })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export default {
  get,
  post,
  downloadPost,
  put,
  deleted
}
