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
    url:'/apis/v1/system/courses/'+data.course_id,
    method:'get',
  })

}
