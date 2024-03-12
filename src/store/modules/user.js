import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getInfo } from '@/api/user'

const state = {
  token: getToken(), // 从缓存中读取初始值
  userInfo: {} // 存储用户基本信息
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
    // 同步到缓存
    setToken(token)
  },
  REMOVE_TOKEN: (state) => {
    // 删除Vuex的token
    state.token = null
    removeToken()
  },
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
  }

}

const actions = {
  // 登录
  async login(context, data) {
    // context上下文
    // data传入参数
    // 调用登录接口
    const token = await login(data) // res是一个promise对象
    context.commit('SET_TOKEN', token) // 提交mutation
  },
  async getUserInfo(context) {
    const result = await getInfo()
    context.commit('SET_USERINFO', result)
  },
  logout(context) { // 退出登录
    context.commit('REMOVE_TOKEN') // 删除token
    context.commit('SET_USERINFO', {}) // 删除用户信息
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
