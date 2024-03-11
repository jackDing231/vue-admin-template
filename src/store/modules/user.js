import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/user'

const state = {
  token: getToken() // 从缓存中读取初始值
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
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
