import request from '@/utils/request'

/*
* 登录相关
* */
export function login(data) {
  return request({
    url: '/apis/v1/auth/login',
    method: 'post',
    data: data
  })
}

export function getInfo() {
  return request({
    url: '/apis/v1/auth/info',
    method: 'get',

  })
  /*  const response = {
      code: 20000,
      data: {
        user_id: int,
        roles: ['sub_school'],
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        username: 'sub_school',
        email: '',
        phone: '',
        wechat: '',
        main_school: '',
        sub_school: '',
        admin_type: '主校管理员|分校管理员'
      }
    }*/
}

export function logout() {
  return request({
    url: '/apis/v1/auth/logout',
    method: 'post'
  })
  /* const response = {
     code: int,
     data: '退出成功'
   }*/
}

/*
* dashboard
* */
export function getDashData() {
  return request({
    url: '/apis/v1/dash',
    method: 'get',
  })
  /*  const response = {
      code: int,
      data: {
        student_nums: 3200,
        course_nums: 100,
        school_nums: 12,
        sales: 4300,
        cur_ip: '172.168.1.2',
        prev_ip: '172.168.2.3',
        prev_time: '2019-12-2 16:44:22',
        admin_type: '主校管理员|分校管理员|系统管理员',
        prev_sales: [22, 23, 22, 11, 33, 22, 12],
        cur_sales: [12, 33, 122, 111]
      }
    }*/
}

/*
* 学校配置
* */

export function getSchool() {
  return request({
    url: '/apis/v1/school/',
    method: 'get',
  })
  const response = {
    code: int,
    data: {
      logo: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      school_name: '鄂州大学',
      school_id: 123602,
      h5_domain: '',
      hotline: '021-1234565',
      qq: '',
      email: '',
      icp: '',
      description: '鄂州大学描述',
      address: ''
    }
  }
}

export function modifySchool(data) {
  /*  data={
      logo: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      school_name: '鄂州大学',
      school_id: 123602,
      h5_domain: '',
      hotline: '021-1234565',
      qq: '',
      email: '',
      icp: '',
      description: '鄂州大学描述',
      address: ''
    }*/
  return request({
    url: '/apis/v1/school/',
    method: 'put',
    data: data
  })
  /*  const response = {
      code: 20000,
      data: '更新成功'
    }*/
}

export function uploadFile(file) {
  // console.log(query.school_id)
  console.log(file)
  return request({
    url: '/apis/v1/static/',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: file
    // params: query
  })
}

/*
* 通知相关
* */

//通知分页 get?limit=?page=?sub_school=?main_school=?
export function getNotices(data) {
  /*  data={
      sub_school:'鄂州职校',
      main_school:'',
      page:1,
      limit:20
    }*/
  return request({
    url: '/apis/v1/notices',
    method: 'get',
    params: data
  })
  const response = {
    code: 20000,
    data: [{
      id: 0,
      notice_id: 3254,
      pub_date: '2019-11-12 16:65:44',
      notice_title: '标题',
      notice_type: '通知|法律法规|新闻',
      notice_author: 'xxx',
    }],
    total: 1
  }
}

export function createNotice(data) {
  /*   data={
       notice_type: '通知|法律法规|新闻',
       notice_title: '标题',
       notice_content:'wqe',
       notice_author: 'xxx',
     },*/
  return request({
    url: '/apis/v1/notices',
    method: 'post',
    data: data
  })
  const response = {
    code: 20000,
    data: '新建通知成功'
  }
}

export function removeNoticeById(data) {
  return request({
    url: '/apis/v1/notices/' + data.notice_id,
    method: 'delete',
  })
  const response = {
    code: 20000,
    data: '删除成功'
  }
}

export function getNoticeById(data) {
  return request({
    url: '/apis/v1/notices/' + data.notice_id,
    method: 'get',
  })
  const response = {
    code: 20000,
    data: {
      notice_id: 3254,
      pub_date: '2019-11-12 16:65:44',
      notice_title: '标题',
      notice_type: '通知|法律法规|新闻',
      notice_author: 'xxx',
    }
  }
}

export function modifyNoticeById(data) {
  /*   data={
      notice_type: '通知|法律法规|新闻',
      notice_title: '标题',
      notice_content:'wqe',
      notice_author: 'xxx',
    },*/
  return request({
    url: '/apis/v1/notices/' + data.notice_id,
    method: 'put',
    data: data
  })
  const response = {
    code: 20000,
    data: '更新成功'
  }
}

/*
* 学生相关
* */

//学生分页 get ?limit=?page=?sub_school=?
export function getStudentsBySchool(data) {
  //searchText 可以是exam_id,student_name,phone like查询可以缓一缓 为空则不过滤
  /*  data = {
      limit: 20,
      page: 1,
      searchText: ''
    }*/
  return request({
    url: '/apis/v1/students/getBySchool',
    method: 'get',
    params: data
  })
  /*  const response = {
      code: 20000,
      data: [{
        id: 1,
        exam_id: 195445,
        student_name: 'aav',
        sub_school: '鄂州职业学院|黄石职业学院|孝感职业学院',
        main_school: '鄂州职业学院|黄石职业学院|孝感职业学院',
        tag: '190906',
        phone: 12548547584,
        register_date: '2019-11-12 16:32:22',
      }],
      schoolOptions: '鄂州职业学院|黄石职业学院|孝感职业学院',
      total: 1
    }*/
}

export function getStudentsBySystem(data) {
  //searchText 可以是exam_id,student_name,phone like查询可以缓一缓 为空则不过滤
  /*  data = {
      limit: 20,
      page: 1,
      searchText: ''
    }*/
  return request({
    url: '/apis/v1/students/system',
    method: 'get',
    params: data
  })
  /*  const response = {
      code: 20000,
      data: [{
        id: 1,
        exam_id: 195445,
        student_name: 'aav',
        sub_school: '鄂州职业学院|黄石职业学院|孝感职业学院',
        main_school: '鄂州职业学院|黄石职业学院|孝感职业学院',
        tag: '190906',
        phone: 12548547584,
        register_date: '2019-11-12 16:32:22',
      }],
      schoolOptions: '鄂州职业学院|黄石职业学院|孝感职业学院',
      total: 1
    }*/
}

export function getStudentsBySearch(data) {
  //searchText 可以是exam_id,student_name,phone like查询可以缓一缓 为空则不过滤
  /*  data = {
      limit: 20,
      page: 1,
      searchText: ''
    }*/
  return request({
    url: '/apis/v1/students/Search',
    method: 'get',
    params: data
  })
  /*  const response = {
      code: 20000,
      data: [{
        id: 1,
        exam_id: 195445,
        student_name: 'aav',
        sub_school: '鄂州职业学院|黄石职业学院|孝感职业学院',
        main_school: '鄂州职业学院|黄石职业学院|孝感职业学院',
        tag: '190906',
        phone: 12548547584,
        register_date: '2019-11-12 16:32:22',
      }],
      schoolOptions: '鄂州职业学院|黄石职业学院|孝感职业学院',
      total: 1
    }*/
}

export function createStudent(data) {
  /*  data = {
      student_name: 'aav',
      sub_school: '鄂州职业学院|黄石职业学院|孝感职业学院',
      main_school: '鄂州职业学院|黄石职业学院|孝感职业学院',
      tag: '190906',
      wechat:'',
      phone: 12548547584,
    }*/
  return request({
    url: '/apis/v1/students',
    method: 'post',
    data: data
  })
  /*  const response = {
      code: 20000,
      data: '新增学生成功，考号是xxx'
    }*/
}

export function getStudentDetail(data) {
  /*  data = {
      exam_id:1112
    }*/
  return request({
    url: '/apis/v1/StuCourse/getByStuId/' + data.exam_id,
    method: 'get',
  })
  /*  const response = {
      code: 20000,
      data: [{
        course_id: 11,
        course_name: '数学',
        watch_time: 122,
        test1: 11,
        test2: 22,
        test3: 33,
        test4: 44,
        main_test: 55,
      }],
    }*/
}

export function deleteStudent(data) {
  /* data = {
     exam_id: 121
   }*/
  return request({
    url: '/apis/v1/students/' + data.exam_id,
    method: 'delete',
  })
  /*  const response = {
      code: 20000,
      data: '删除学生成功'
    }*/
}

export function updateStudent(data) {
  /*  data = {
      exam_id:1112
      student_name: 'aav',
      sub_school: '鄂州职业学院|黄石职业学院|孝感职业学院',
      main_school: '鄂州职业学院|黄石职业学院|孝感职业学院',
      tag: '190906',
      wechat:'',
      phone: 12548547584,
    }*/
  return request({
    url: '/apis/v1/students/' + data.exam_id,
    method: 'put',
    data: data
  })
  const response = {
    code: 20000,
    data: '更新学生成功'
  }
}

//选课唯一接口
export function setStudentCourse(data) {
  /*  data = {
      exam_id: int,
      course_id: int,
      status: 0 | 1
    }*/
  return request({
    url: '/apis/v1/students/' + data.exam_id + '/courses/' + data.course_id,
    method: 'post',
    data:data,
  })

}

//查看抓拍
export function getStudentCaptures(data) {
  /*  data = {
      exam_id:1112
    }*/
  return request({
    url: '/apis/v1/captures/' + data.id,
    method: 'get',
  })
  const response = {
    code: 20000,
    data: 'captures json'
  }
  const captures_json = {
    learn_captures: ['url1', 'url2'],
    test_captures: ['url1', 'url2'],
    main_captures: ['url1', 'url2']
  }
}

//网校课程相关 获取该校仓库所有课程
//课程分页 get ?limit=?page=?searchText=?sub_school=?
export function getCourses(data) {
  /*  data = {
      limit: 20,
      page: 1,
      searchText: '课程名|课程id',
      sub_school: '鄂州大学'
    }*/
  return request({
    url: '/apis/v1/repository/courses',
    method: 'get',
    params: data
  })
  // const response = {
  //   code: 20000,
  //   data: [{
  //     id: 1,
  //     course_id: 121,
  //     course_name: '高等数学',
  //     course_brief: '简介',
  //     update_time: '2019-11-12 12:22:11',
  //     material_name: '教材名',
  //     norm_duration: 22,
  //     norm_num: 33,
  //     // course_state: 0 | 1,
  //   }],
  //   total: 1
  // }
}

//网校课程相关 获取该校仓库所有课程
//课程分页 get ?limit=?page=?searchText=?sub_school=?
export function getMainCourseBySearch(data) {
  return request({
    url: '/apis/v1/repository/courses/searchMainCourse',
    method: 'get',
    params: data
  })
}


//获取该校上架的所有课程
//课程分页 get ?limit=?page=?searchText=?sub_school=?main_school=
export function getShiftCourses(data) {
  return request({
    url: '/apis/v1/shift/courses',
    method: 'get',
    params: data
  })
}

export function getShiftCourseById(data) {
  /*  data = {
    course_id:121
    }*/
  return request({
    url: '/apis/v1/shift/courses/' + data.course_id,
    method: 'get',
  })
  const response = {
    code: 20000,
    data: {
      id: 1,
      course_id: '121',
      course_name: '高等数学',
      course_brief: '简介',
      update_time: '2019-12-11 16:44:55',
      material_name: '教材名',
      norm_duration: 12,
      norm_num: 22,
      norm_price: 799,
      cross_price: 199,
      sales: 12,
      is_valid: 0 | 1,
    }
  }
}


export function shiftCourse(data) {
  /*  data = {
      course_id: 121,
      norm_price: 799,
      cross_price: 199,
      sub_school: '鄂州大学'
    }*/
  return request({
    url: '/apis/v1/shift/courses',
    method: 'post',
    data: data
  })
  const response = {
    code: 20000,
    data: '上架成功'
  }
}

export function unshiftCourse(data) {
  /*  data = {
      course_id: 121
    }*/
  return request({
    url: '/apis/v1/shift/courses/' + data.course_id,
    method: 'delete',
  })
  const response = {
    code: 20000,
    data: '下架成功'
  }
}

export function updateShiftCourse(data) {
  return request({
    url: '/apis/v1/sales/update',
    method: 'put',
    data: data
  })
}

export function getCourseCatalog(data) {
  return request({
    url: '/api/v1/courses/catalog/' + data.course_id,
    method: 'get',
  })
}

/*
* ip管理
* */

//分页查询 get ?limit=?page=?
export function getIPS(data) {
  return request({
    url: '/apis/v1/ips/school',
    method: 'get',
    params: data
  })

}

export function addIP(data) {
  /*  data = {
      ip:'192.168.1.1',
      add_date:'2019-11-12 15:33:11',
      operator:'xxx'
    }*/
  return request({
    url: '/apis/v1/ips',
    method: 'post',
    data: data
  })
}

export function removeIP(data) {
  /*  data = {
      ip_id:11,
      ip:'192.166.12.11'
    }*/
  return request({
    url: '/apis/v1/ips/' + data.ip_id,
    method: 'delete',
  })
  const response = {
    code: 20000,
    data: '添加成功'
  }
}

/*
* 管理员管理
* */

//分页 get?limit=?page=?main_school=?sub_school=
export function getAdmins(data) {

  return request({
    url: '/apis/v1/admins',
    method: 'get',
    params: data
  })
}

export function addAdmin(data) {
  return request({
    url: '/apis/v1/admins',
    method: 'post',
    data: data
  })
}


export function deleteAdmin(data) {
  return request({
    url: '/apis/v1/admins/' + data.user_id,
    method: 'delete',
  })
}

export function updateAdmin(data) {
  return request({
    url: '/apis/v1/admins',
    method: 'put',
    data: data
  })
}

//新增
//删除
//根据用户名查询密码
//考期管理

export function getTags(data) {
  return request({
    url: '/apis/v1/tags/getTags',
    method: 'get',
    params: data
  })
}

export function getStudentsByTag(data) {
  return request({
    url: '/apis/v1/students/getStuByTag',
    method: 'get',
    params: data
  })

}

export function getPasswordByParams(data) {
  return request({
    url: '/apis/v1/students/password',
    method: 'get',
    params: data
  })
}

export function getMainCourseSale(data) {
  return request({
    url: '/apis/v1/sales',
    method: 'get',
    params: data
  })
}

// export function getMainTags() {
//   return request({
//     url: '/apis/v1/main/tags',
//     method: 'get',
//     params: data
//   })
// }
//
// export function addMainTags() {
//   return request({
//     url: '/apis/v1/main/tags',
//     method: 'get',
//     params: data
//   })
// }
