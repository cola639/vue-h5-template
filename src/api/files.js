import request from '@/utils/request'

// files set Content-Type
export function login(data) {
  return request({
    url: '/vue-template/user/login',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    timeout: 3 * 60 * 1000,
    data
  })
}
