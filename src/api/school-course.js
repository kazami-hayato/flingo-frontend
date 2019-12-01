import request from '@/utils/request'

export function getCoursesByQuery(query) {
  return request({
    url: '/apis/v1/shift/courses',
    method: 'get',
    params: query
  })
}

export function createCourse(data) {
  return request({
    url: '/apis/v1/shift/courses',
    method: 'post',
    data
  })
}

export function deleteCourseById(data) {
  return request({
    url: '/apis/v1/shift/courses/' + data,
    method: 'delete',
  })
}

export function updateCourse(data) {
  return request({
    url: '/apis/v1/shift/courses/' + data.id,
    method: 'put',
    data
  })
}
