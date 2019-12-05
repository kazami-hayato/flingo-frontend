import request from '@/utils/request'

export function fetchSchool() {
  // console.log(query.school_id)
  return request({
    url: '/apis/v1/schools/',
    method: 'get',

    // params: query
  })
}

export function fetchSchoolById(query) {
  console.log(query.school_id)
  return request({
    url: '/apis/v1/schools/' + query.school_id,
    method: 'get',
    // params: query
  })
}

export function changeSchoolById(query) {
  console.log(query.school_id)
  return request({
    url: '/apis/v1/schools/' + query.school_id,
    method: 'put',
    data: query.data
    // params: query
  })
}
export function uploadLogo(file) {
  // console.log(query.school_id)
  console.log(file)
  return request({
    url: '/apis/v1/static/',
    method: 'post',
    headers:{
      'Content-Type': 'multipart/form-data'
    },
    data:file
    // params: query
  })
}
