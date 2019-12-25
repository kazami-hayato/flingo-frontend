import request from '@/utils/request'
//课程中心
export function getSystemCoursesByQuery(data) {
  return request({
    url: '/apis/v1/system/courses',
    method: 'get',
    params: data
  })
}
//包括目录树更新
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

export function getCoursesSale(data) {
  return request({
    url: '/apis/v1/system/sales',
    method: 'get',
    params: data
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

export function deleteSchools(data) {
  return request({
    url: '/apis/v1/system/schools/'+data.school_id,
    method: 'delete',
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


export function getAdminsSystem(data){
  return request({
    url: '/apis/v1/system/admins',
    method: 'get',
    params:data
  })
}

export function createAdminsSystem(data){
  return request({
    url: '/apis/v1/system/admins',
    method: 'post',
    data:data
  })
}
export function updateAdminsSystem(data){
  return request({
    url: '/apis/v1/system/admins',
    method: 'put',
    data:data
  })
}

export function getStudentsSystem(data) {
  return request({
    url: '/apis/v1/system/students',
    method: 'get',
    params:data
  })
}

export function getStudentsSystemByTag(data) {
  return request({
    url: '/apis/v1/system/students/tag',
    method: 'get',
    params:data
  })
}


export function createStudentSystem(data) {
  return request({
    url: '/apis/v1/system/students',
    method: 'post',
    data:data
  })
}
export function updateStudentSystem(data) {
  return request({
    url: '/apis/v1/system/students',
    method: 'put',
    data:data
  })
}


export function getPasswordSystem(data) {
  return request({
    url: '/apis/v1/system/students/password',
    method: 'get',
    params:data
  })
}

