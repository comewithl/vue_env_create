/**
 * Created by fuzl on 2017-11-1.
 */
import axios from 'axios'
import qs from 'querystring'
import util from '../util'
import urlConfig from './urlConfig'
import './interceptors'
// 全局参数
const globalParams = {}
const DEFAULT_REQUEST_TYPE = 'post'

/**
 * @description 根据传入的配置参数，返回一个请求方法
 * @param {Object} config - 请求配置参数
 * @return {Function} - 返回请求方法，与传入的参数绑定
 * */
function createRequest(config){
  const url = config.url
  const type = config.type.toLowerCase()
  const isPost = type === 'post'
  const headers = formatHeader(config.headers)
  const contentType = headers['Content-Type'] || ''
  const isJSONType = contentType.indexOf('application/json') >= 0
  /**
   * @description 请求函数
   * @param {Object} params - 请求参数
   * @param {Object} [option] - 特殊的请求配置
   * @param {Object} [previousResponse] - 上一个请求返回的数据
   * @return {Promise}
   * */
  return function(params, option, previousResponse){
    params = Object.assign({}, config.params, globalParams, params)
    option = option || {}
    if (util.isFunction(config.data)) {
      params = config.data(params, previousResponse) || params
    }
    const promise = axios({
      method: type,
      url: util.isFunction(url) ? url(params) : url,
      data: isPost ? (isJSONType ? JSON.stringify(params) : qs.stringify(params)) : '',
      // 避免缓存get请求，加入时间戳
      params: isPost ? {} : Object.assign({ _t: (new Date()).getTime() }, params),
      headers: Object.assign(headers, option.headers),
      keepOriginResponse: config.keepOriginResponse
    })
    // 如果有下一步的请求
    if (config.next) {
      const nextRequest = createRequest(config.next)
      return promise.then((data) => {
        if (util.isFunction(config.shouldNext)) {
          if (config.shouldNext(data, params, option)) {
            return nextRequest(params, option, data)
          }
          return data
        }
        return nextRequest(params, option, data)
      })
    }
    return promise
  }
}

function normalizeUrlConfig(url, urlMap){
  let config = {}
  if (typeof url === 'object') {
    config = Object.assign({
      headers: {},
      params: {}
    }, url, {
      type: (url.type || DEFAULT_REQUEST_TYPE).toLowerCase()
    })
    if (config.next) {
      const next = config.next
      if (util.isObject(next)) {
        config.next = normalizeUrlConfig(next)
      } else if (util.isDef(urlMap[next])) {
        config.next = normalizeUrlConfig(urlMap[next])
      } else {
        throw new Error({
          message: `无法处理next: ${config.next}`
        })
      }
    }
  } else {
    config.type = DEFAULT_REQUEST_TYPE
    config.url = url
    config.headers = {}
    config.params = {}
  }
  return config
}

function formatHeader(headers){
  const fHeaders = {}
  const nameMapping = {
    contentType: 'Content-Type',
    'content-type': 'Content-Type'
  }
  for (const name in headers) {
    if (nameMapping[name]) {
      fHeaders[nameMapping[name]] = headers[name]
    } else {
      fHeaders[name] = headers[name]
    }
  }
  return fHeaders
}

// 遍历urlConfig，构造请求函数
const output = {}
Object.keys(urlConfig).forEach((urlName) => {
  const config = normalizeUrlConfig(urlConfig[urlName], urlConfig)
  output[urlName] = createRequest(config)
})

export default output
