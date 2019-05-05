/**
 * Created by fuzl on 2017-10-30.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import requester from './request'
import { Mutations } from '../constants'
// 配合vuex，剔除第一个store参数
const wrapRequester = {}
Object.keys(requester).forEach((i) => {
  wrapRequester[i] = function(...args){
    const argum = Array.prototype.slice.call(args, 1)
    return requester[i].apply(null, argum)
  }
})
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    version: '1.0',
    currentUser: {},
    currentUserPromise: null
  },
  mutations: {
    [Mutations.SetCurrentUser](state, data){
      state.currentUser = data
    },
    [Mutations.SetCurrentUserPromise](state, data){
      state.currentUserPromise = data
    }
  },
  /**
   * 将api方法作为action
   * */
  actions: Object.assign({}, wrapRequester),
  getters: {
    currentUserInfo(state){
      return state.currentUser
    },
    currentPromise(state){
      return state.currentUserPromise
    },
    fzgsdm(state){
      return state.currentUser.fzgs_Dm
    },
    operatorId(state){
      return state.currentUser.trueId
    }
  }
})
