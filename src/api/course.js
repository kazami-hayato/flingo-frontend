import request from '@/utils/request'

export function fetchAllCourses(query) {
  return request({
    url: '/apis/v1/courses',
    method: 'get',
    params: query
  })
}

export function createCourse(data) {
  return request({
    url: '/apis/v1/courses',
    method: 'post',
    data
  })
}

export function deleteCourse(data) {
  return request({
    url: '/apis/v1/courses/' + data,
    method: 'delete',
  })
}

export function updateCourse(data) {
  return request({
    url: '/apis/v1/courses/' + data.id,
    method: 'put',
    data
  })
}
