import request from '@/utils/request'

export function fetchAllGroups(query) {
  return request({
    url: '/apis/v1/groups',
    method: 'get',
    params: query
  })
}

export function createGroup(data) {
  return request({
    url: '/apis/v1/groups',
    method: 'post',
    data
  })
}

export function deleteGroup(data) {
  return request({
    url: '/apis/v1/groups/' + data,
    method: 'delete',
  })
}

export function updateGroup(data) {
  return request({
    url: '/apis/v1/groups/' + data.id,
    method: 'put',
    data
  })
}
