import request from '@/utils/request'

export function getSchoolDash(data) {
  return request({
    url: '/apis/v1/dash',
    method: 'get',
  })
}

