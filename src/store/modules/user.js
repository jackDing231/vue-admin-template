import { getToken, setToken, removeToken } from '@/utils/auth'
import { NULL } from 'sass'

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
    const { username, password } = data
    console.log(username, password)
    // todo: 调用登录接口
    // eslint-disable-next-line no-undef
    const token = await login(data)
    // 返回一个token 123456
    context.commit('SET_TOKEN', token) // 将token存入vuex
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}