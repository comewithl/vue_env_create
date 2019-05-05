/**
 * Created by fuzl on 2017-11-2.
 */
const toString = Object.prototype.toString

const util = {
  isObject(obj){
    return obj && typeof obj === 'object' && toString.call(obj) === '[object Object]'
  },
  isFunction(fn){
    return typeof fn === 'function'
  },
  isEmptyArray(arr){
    return arr === null || arr === undefined || arr.length === 0
  },
  isDef(obj){
    return obj !== undefined
  },
  isUndef(obj){
    return obj === undefined
  },
  asserts: {
    /**
     * @description 在map中不存在propertyName
     * @param {String} propertyName
     * @param {Object} map
     * @return {Boolean}
     * */
    noExistPropertyInMap(propertyName, map){
      if (util.isDef(map[propertyName])) {
        throw new util.errors.DuplicateKeyError(propertyName, map)
      } else {
        return true
      }
    }
  },
  errors: {
    DuplicateKeyError(propertyName){
      this.message = `${propertyName}已存在，重复添加`
    }
  },

  /**
   * 验证电话号码
   * @param number
   * @returns {boolean}
   */
  validateTel(number){
    const reg = /(^(1[0-9]{10}$)|(^([0-9]{3,4}[-])?[0-9]{7,8}$))/
    return reg.test(number)
  },

  /**
   * 验证手机号
   * @param number
   * @returns {boolean}
   */
  validatePhone(number){
    const reg = /^1[0-9]{10}$/
    return reg.test(number)
  },

  /*
  * 拼接省市区
  * */
  getAll(){
    const province = window.xzqh_province_ex['000000']
    for (let i = 0; i < province.length; i++) {
      const citys = window.xzqh_city_ex[province[i].id]
      for (let j = 0; j < citys.length; j++) {
        citys[j].children = window.xzqh_county_ex[citys[j].id]
      }
      province[i].children = citys
    }
    return province
  },
  /**
   * 校验税号
   * */
  validateSh(sh){
    const reg = /(^[\w@]{6,25}$)/
    return reg.test(sh)
  },

  /*
  * 校验账号
  * */
  validateZh(zh){
    const reg = /(^[0-9|a-z|A-Z|-]{0,30}$)/
    return reg.test(zh)
  }
}

export default util
