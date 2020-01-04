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
    url: '/apis/v1/system/schools/' + data.school_id,
    method: 'delete',
  })

}


export function getExams(data) {
  return request({
    url: '/apis/v1/system/exams',
    method: 'get',
    params: data
  })
}

export function getExamById(data) {
  return request({
    url: '/apis/v1/system/exams/' + data.examination_id,
    method: 'get',
    // params: data
  })
}

export function createExam(data) {
  return request({
    url: '/apis/v1/system/exams',
    method: 'post',
    data: data
  })

}

export function modifyExam(data) {
  return request({
    url: '/apis/v1/system/exams',
    method: 'put',
    data: data
  })

}

export function deleteExam(data) {
  return request({
    url: '/apis/v1/system/exams/' + data.examination_id,
    method: 'delete',
  })

}


export function getAdminsSystem(data) {
  return request({
    url: '/apis/v1/system/admins',
    method: 'get',
    params: data
  })
}

export function createAdminsSystem(data) {
  return request({
    url: '/apis/v1/system/admins',
    method: 'post',
    data: data
  })
}

export function updateAdminsSystem(data) {
  return request({
    url: '/apis/v1/system/admins',
    method: 'put',
    data: data
  })
}

export function getStudentsSystem(data) {
  return request({
    url: '/apis/v1/system/students',
    method: 'get',
    params: data
  })
}

export function getStudentsSystemByTag(data) {
  return request({
    url: '/apis/v1/system/students/tag',
    method: 'get',
    params: data
  })
}


export function createStudentSystem(data) {
  return request({
    url: '/apis/v1/system/students',
    method: 'post',
    data: data
  })
}

export function updateStudentSystem(data) {
  return request({
    url: '/apis/v1/system/students',
    method: 'put',
    data: data
  })
}


export function getPasswordSystem(data) {
  return request({
    url: '/apis/v1/system/students/password',
    method: 'get',
    params: data
  })
}

export function getStudyCatch(data) {
  return request({
    url:'apis/v1/system/students/catch',
    params:data
  })
}
export function getStuExamByParams(data) {
  return request({
    url:'apis/v1/system/students/examination',
    params:data
  })
}
