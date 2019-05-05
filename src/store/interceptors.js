/**
 * Created by fuzl on 2017-11-1.
 */
import Vue from 'vue'
import axios from 'axios'

const requestDebug = true

// 发送请求之前，对参数操作，添加header
axios.interceptors.request.use(function(config){
  config.headers['X-Requested-With'] = 'XMLHttpRequest' // 防止请求接口，判断单点登录时接口返回302重定向
  config.headers['Content-Type'] = 'application/json;charset=UTF-8' // 设置charset，防止中文传给后端乱码
  return config
})

// response interceptor
axios.interceptors.response.use(function(response){
  const config = response.config
  const data = response.data
  if (data.success) {
    // keepOriginResponse === true 返回后端原始对象
    return config.keepOriginResponse ? data : data.data
  }
  if (response.data.messageCode === 'api.auth.unlogon') {
    try {
      if (typeof cef !== 'undefined') {
        cef.loginsso()
      } else if (typeof window.external !== 'undefined' && window.external.loginsso) {
        window.external.loginsso()
      } else {
        throw new Error({ message: '重登陆失败' })
      }
    } catch (e) {
      notify('error', '请在工作台中登录', this)
    }
  } else if (response.data.message) {
    notify('error', response.data.message, this)
  }
  return Promise.reject(normalizeErrorMessage(data))
}, function(response){
  return Promise.reject(wrapperHttpException(response))
})

/**
 * 封装httpError，非200状态请求，返回统一的数据格式
 * */
function wrapperHttpException(/* response */){
  return {
    message: '服务繁忙，请稍后再试',
    messageCode: 'NETWORK_FAILED'
  }
}

/**
 * @description 根据messageCode统一提示信息
 * @param {object} data
 * @return {object}
 */
function normalizeErrorMessage(data){
  // 可以格式化错误信息
  return data
}

function getVueInstance(){
  if (getVueInstance.instance) {
    return getVueInstance.instance
  }
  const instance = new Vue()
  getVueInstance.instance = instance
  return instance
}


function notify(type, msg, instance){
  instance = instance || getVueInstance()
  requestDebug && instance.$message({
    message: msg,
    type
  })
}
export default axios
