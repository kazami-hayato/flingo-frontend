import request from '@/utils/request'

export function fetchAllStudents(query) {
  return request({
    url: '/apis/v1/students',
    method: 'get',
    params: query
  })
}

export function createStudent(data) {
  console.log(data)
  return request({
    url: '/apis/v1/students',
    method: 'post',
    data
  })
}

export function setStudentCourse(data) {
  console.log(data)
  return request({
    url: '/apis/v1/students',
    method: 'put',
    data
  })
}

export function deleteStudent(data) {
  return request({
    url: '/apis/v1/students/' + data,
    method: 'delete',
  })
}


export function updateStudent(data) {
  console.log(data)
  return request({
    url: '/apis/v1/students/' + data.id,
    method: 'put',
    data
  })
}
