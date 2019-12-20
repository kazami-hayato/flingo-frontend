import request from '@/utils/request'

export function getSystemCoursesByQuery(data) {
  return request({
    url: '/apis/v1/system/courses',
    method: 'get',
    params: data
  })
}

export function modifySystemCourseById(data) {
  return request({
    url: '/apis/v1/system/courses',
    method: 'put',
    data: data
  })
}

export function createSystemCourse(data) {
  return request({
    url: '/apis/v1/system/courses',
    method: 'post',
    data: data
  })
}

export function getCatalogTreeById(data) {

  return request({
    url: '/apis/v1/system/courses/' + data.course_id,
    method: 'get',
  })

}

export function createTag(data) {
  return request({
    url: '/apis/v1/system/tags',
    method: 'post',
    data: data
  })
}

export function modifyTag(data) {
  return request({
    url: '/apis/v1/system/tags',
    method: 'put',
    data: data
  })
}

export function deleteTag(data) {
  return request({
    url: '/apis/v1/system/tags/' + data.tag_id,
    method: 'delete'
  })
}

export function getSchools(data) {
  return request({
    url: '/apis/v1/system/schools',
    method: 'get',
    params: data
  })
}

export function createSchool(data) {
  return request({
    url: '/apis/v1/system/schools',
    method: 'post',
    data: data
  })
}

export function modifySchools(data) {
  return request({
    url: '/apis/v1/system/schools',
    method: 'put',
    data: data
  })

}

export function getTests(data) {
  return request({
    url: '/apis/v1/system/tests',
    method: 'get',
    params: data
  })

}
export function createTest(data) {
  return request({
    url: '/apis/v1/system/tests',
    method: 'post',
    data: data
  })

}
export function modifyTest(data) {
  return request({
    url: '/apis/v1/system/tests',
    method: 'put',
    data: data
  })

}

export function deleteTest(data) {
  return request({
    url: '/apis/v1/system/tests/'+data.test_id,
    method: 'delete',
  })

}
