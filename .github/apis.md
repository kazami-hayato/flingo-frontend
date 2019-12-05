### 登录相关

```javascript
export function login(data) {
  return request({
    url: '/apis/v1/auth/login',
    method: 'post',
    data:{username:string,password:string},
    response:{code:60204,data:string(message)}|{code:20000,data:string(token)}
  })
}

export function getInfo() {
  return request({
    url: '/apis/v1/auth/info',
    method: 'get',
    // params: { token },
    response:{code:50008,data:string(message)}|{ code: 20000,data:{user_id,user_name,user_password}}
  })
}

export function logout() {
  return request({
    url: '/apis/v1/auth/logout',
    method: 'post',
    response:{code:20000,data:string(message)}
  })
}

```

### 控制板

```javascript
export function getSchoolDash(data) {
  return request({
    url: '/apis/v1/dash',
    method: 'get',
    response:{code:40008,data:string(message)}|{code:20000,data:struct(
   {students_num:int,
    active_courses:int,
    subschool_num:int,
    sales:int,
    prev_sale:int[7],
    cur_sale:int[7],
    cur_ip:string,
    prev_ip:string,
    prev_time:Date(),
    user_type:string
    }
   )}
  })
}

```

### 学校配置

```javascript
export function fetchSchoolById(data) {
   return request({
    url:'/apis/v1/schools/'+data.school_id,
    method:'get',
    response:{code:40008,data:string(message)}|{code:20000,data:struct(
   {
     logo: string,
     school_id:int,
     school_name: string,
     h5_domain: string,
     hotline: string,
     qq: string,
     email: string,
     icp: string,
     description: string,
     address: string
   } 
   )}
  })
}
export function fetchSchool(data) {
   return request({
    url:'/apis/v1/schools/'+data.school_id,
    method:'get',
   //如果是system 返回schools 如果是其他的 返回单个学校信息
    response:{code:40008,data:string(message)}|{code:20000,data:array(struct(
   {
     logo: string,
     school_id:int,
     school_name: string,
     h5_domain: string,
     hotline: string,
     qq: string,
     email: string,
     icp: string,
     description: string,
     address: string
   } 
   ))}
  })
}

export function changeSchoolById(data) {
  return request({
    url:'/apis/v1/schools/'+query.school_id,
    method:'put',
    data: struct('与上面返回一致'),
    response:{code:40008,data:string(message)}|{code:20000,data:string(message)}
  })
}
```

### 通知

```javascript
export function getAllNotices(data) {

  return request({
    url:'/apis/v1/notices/',
    method:'post',
    data: {page:int,limit:int},
    response:{code:20000,data:struct({total:int,list:array(notice)})}
  })
}

export function removeNoticeById(data) {
  return request({
    url:'/apis/v1/notices/'+data.notice_id,
    method:'delete',
    response:{code:20000,data:string(message)}
  })
}
export function findNoticeById(data) {
  return request({
    url:'/apis/v1/notices/'+data.notice_id,
    method:'get',
    response:{code:20000,data:struct({notice_title:string,notice_content:string,notice_type:string})}
  })
}
export function EditNoticeById(data) {
  return request({
    url:'/apis/v1/notices/'+data.notice_id,
    method:'put',
    data:struct(notice),
    response:{code:20000,data:string(message)}
  })
}
```
### 学员

```javascript
export function fetchAllStudents(data) {
  return request({
    url: '/apis/v1/students',
    method: 'get',
    data: {limit:int,page:int},
    response:{code:20000,data:struct({total:int,list:array(student)})}
  })
}
export function getStudent(data) {
  return request({
    url: '/apis/v1/students/'+data.exam_id,
    method: 'get',
    response:{code:20000,data:struct(`学生详细信息，暂时未定`)}
  })
}
export function createStudent(data) {
  return request({
    url: '/apis/v1/students',
    method: 'post',
    data:struct(student),
    response:{code:20000,data:string(message)}
  })
}
export function modifyStudent(data) {
  return request({
    url: '/apis/v1/students/'+data.exam_id,
    method: 'put',
    data:struct(student),
    response:{code:20000,data:string(message)}
  })
}

export function removeStudent(data) {
  return request({
    url: '/apis/v1/students/'+data.exam_id,
    method: 'delete',
    response:{code:20000,data:string(message)}
  })
}



export function setStudentCourse(data) {
  console.log(data)
  return request({
    url: '/apis/v1/students/courses/'+data.exam_id,
    method: 'put',
    data:{courses:int[course_id]},
    response:{code:20000,data:string(message)}
  })
}

export function deleteStudentCourse(data) {
  return request({
    url: '/apis/v1/students/courses' + data.exam_id,
    method: 'delete',
    data:{courses:int[course_id]},
    response:{code:20000,data:string(message)}
  })
}

```

### 考期设置 暂无

### 课程管理（分校，主校）
```javascript
export function getAllCourses(data) {
  return request({
    url: '/apis/v1/courses',
    method: 'post',
    data: {limit:int,page:int},
    response:{code:20000,data:struct({total:int,list:array(course)})}
  })
}

export function selectCourse() {
  return request({
    url: '/apis/v1/courses',
    method: 'post',
    data:data,
    response:{code:20000,data:string(message)}
  })
}

export function unselectCourse(data) {
  return request({
    url: '/apis/v1/courses/' + data,
    method: 'delete',
    response:{code:20000,data:string(message)}
  })
}

export function updateCourse(data) {
  return request({
    url: '/apis/v1/courses/' + data.id,
    method: 'put',
    data:struct(course),
    response:{code:20000,data:string(message)}
  })
}
export function updateCourseCatalog(data) {
  return request({
    url: '/api/v1/courses/catalog/'+data.course_id,
    method:'put',
    data:string(course.catalog),
    response:{code:20000,data:string(message)}
  })
}
export function getCourseCatalog() {
  return request({
    url: '/api/v1/courses/catalog/'+exam_id,
    method:'get',
    response:{code:20000,data:string(course.catalog)}
  })
}
```



### 课程管理（系统）

```javascript
export function getAllShiftCourses(data) {
  return request({
    url: '/apis/v1/shift/courses',
    method: 'post',
    data: {limit:int,page:int},
    response:{code:20000,data:struct({total:int,list:array(course)})}
  })
}

export function createShiftCourse(data) {
  return request({
    url: '/apis/v1/shift/courses',
    method: 'post',
    data:data,
    response:{code:20000,data:string(message)}
  })
}

export function deleteShiftCourse(data) {
  return request({
    url: '/apis/v1/shift/courses/' + data,
    method: 'delete',
    response:{code:20000,data:string(message)}
  })
}

export function updateShiftCourse(data) {
  return request({
    url: '/apis/v1/shift/courses/' + data.id,
    method: 'put',
    data:struct(course),
    response:{code:20000,data:string(message)}
  })
}
export function updateShiftCourseCatalog(data) {
  return request({
    url: '/api/v1/shift/courses/catalog/'+data.course_id,
    method:'put',
    data:string(course.catalog),
    response:{code:20000,data:string(message)}
  })
}
export function getShiftCourseCatalog() {
  return request({
    url: '/api/v1/shift/courses/catalog/'+exam_id,
    method:'get',
    response:{code:20000,data:string(course.catalog)}
  })
}
```
### 静态资源相关

```javascript
export function uploadFile() {
  return request({
    url: '/api/v1/static',
    method:'post',
    content_type:'multipart/form',
    data:file,
    response:{code:20000,data:string(资源id)}
  })
}
```
