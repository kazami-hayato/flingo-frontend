import request from '@/utils/request'

export function get(data) {
  return request({
    url: '/apis/v1/auth/login',
    method: 'post',
    data: data
  })
}
