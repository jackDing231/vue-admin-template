import request from '@/utils/request'

// 登录
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

// 获取用户信息
export function getInfo(token) {
  return request({
    url: '/sys/profile',
    method: 'get'
  })
}

// 修改密码
export function updatePassword(data) {
  return request({
    url: '/sys/updatePass',
    method: 'put',
    data
  })
}

