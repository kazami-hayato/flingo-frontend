import Mock from 'mockjs'

// 登录api 常量
const tokens = {
  system: {
    token: 'system-token'
  },
  main_school: {
    token: 'main_school-token'
  },
  sub_school: {
    token: 'sub_school-token'
  }
}

const users = {
  'system-token': {
    roles: ['system'],
    introduction: 'I am a super systemistrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Admin'
  },
  'main_school-token': {
    roles: ['main_school'],
    introduction: 'I am a main_school',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Teacher'
  },
  'sub_school-token': {
    roles: ['sub_school'],
    introduction: 'I am a sub_school',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Fellow'
  }
}

//通知api 常量
const notices = []
const notice_count = 30
for (let i = 0; i < notice_count; i++) {
  notices.push(Mock.mock({
    id: '@increment',
    notice_id: '@Integer(10028,20026)',
    pub_date: +Mock.Random.date('T'),
    notice_title: '标题' + i,
    'notice_type|1': ['通知', '法律法规', '新闻'],
    notice_author: 'admin',
  }))
}

// 学生api 常量

const students = []
const student_count = 300
for (let i = 0; i < student_count; i++) {
  students.push(Mock.mock({
    id: '@increment',
    exam_id: '@integer(1000000,2000000)',
    student_name: 'any' + '@integer(100,200)',
    'sub_school|1': ['鄂州职业学院', '黄石职业学院', '孝感职业学院'],
    'main_school|1': ['鄂州职业学院', '黄石职业学院', '孝感职业学院'],
    tag: '190906',
    phone: '@integer(13765717681,15671640897)',
    register_date: +Mock.Random.date('T'),
    // courses: [10, 12]
  }))
}

//学生成绩 api
const stu_courses = []
const st_count = 5
for (let i = 0; i < st_count; i++) {
  stu_courses.push(Mock.mock({
    course_id: '@Integer(10005,20005)',
    'course_name|1': ['高等数学', '大学物理', '计算机基础'],
    watch_time: '@Integer(10,200)',
    test1: '@Integer(10,100)',
    test2: '@Integer(10,100)',
    test3: '@Integer(10,100)',
    test4: '@Integer(10,100)',
    main_test: '@Integer(10,100)',
  }))
}

//课程相关
const courseList = []
const courseCount = 50
const mainList = []
for (let i = 0; i < courseCount; i++) {
  courseList.push(Mock.mock({
    course_id: '@increment',
    course_name: '高等数学' + i,
    course_brief: '简介',
    update_time: +Mock.Random.date('T'),
    material_name: '教材名',
    norm_duration: '@Integer(10, 20)',
    norm_num: '@Integer(10, 36)',
    // 'course_state|1': [0, 1],
  }))
}

for (let i = 0; i < courseCount; i++) {
  mainList.push(Mock.mock({
    course_id: '@increment',
    course_name: '高等数学' + i,
    course_brief: '简介',
    update_time: +Mock.Random.date('T'),
    material_name: '教材名',
    norm_duration: '@Integer(10, 20)',
    norm_num: '@Integer(10, 36)',
    norm_price: '@Integer(100, 799)',
    cross_price: '@Integer(100, 299)',
    sales: '@Integer(100,229)',
    'is_valid|1': [0, 1],
  }))
}
const catalogs = [{
  id: 1, // 目录的id，唯一
  label: '第一章，毛泽东思想及其历史地位', // 目录名称
  isTitle: true, // 是否是大章节标题
  children: [{ // 子目录
    id: 4,
    label: '第一节 毛泽东思想的形成及其历史地位',
    status: false,
  }, {
    id: 5,
    label: '第二节 毛泽东思想的主要内容和活的灵魂',
    status: false,
  }, {
    id: 6,
    label: '第三节 毛泽东思想的历史地位',
    status: false,
  }]
}, {
  id: 2,
  label: '第二章 新民主主义革命理论 ',
  isTitle: true,
  children: [{
    id: 7,
    label: '第一节 新民主主义革命理论形成的依据',
    status: true,
  }, {
    id: 8,
    label: '第二节 新民主主义革命的总路线和基本纲领',
    status: true,
  }]
}];
export default [
  // 登录
  {
    url: '/apis/v1/auth/login',
    type: 'post',
    response: config => {
      const {username} = config.body
      console.log(username)
      const token = tokens[username]
      console.log(token)

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 20000,
        data: token
      }
    }
  },
  // 获取用户信息
  {
    url: '/apis/v1/auth/info\.*',
    type: 'get',
    response: config => {
      const cookies = config.headers.cookie.split(';')
      console.log(cookies)
      const token_cookie = cookies.find(item => {
        return item.trim().startsWith('Admin-Token=')
      })
      let info = ''
      if (token_cookie) {
        const token = token_cookie.trim().replace('Admin-Token=', '').trim()
        // console.log(token)
        // const {token} = config.query
        info = users[token]
      }
      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },
  // 退出
  {
    url: '/apis/v1/auth/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  //dashData
  {
    url: '/apis/v1/dash',
    type: 'get',
    response: config => {
      const cookies = config.headers.cookie.split(';')
      const token_cookie = cookies.find(item => {
        return item.trim().startsWith('Admin-Token=')
      })
      const token = token_cookie.trim().replace('Admin-Token=', '').trim()
      console.log(token)
      const dashData = {
        students: 3200,
        courses: 100,
        school_nums: 12,
        sales: 4300,
        cur_ip: '172.168.1.2',
        prev_ip: '172.168.2.3',
        prev_time: '2019-12-2 16:44:22',
        admin_type: '主校管理员',
        prev_sale: [22, 23, 22, 11, 33, 22, 12],
        cur_sale: [12, 33, 122, 111]
      }
      return {
        code: 20000,
        data: dashData
      }
    }
  },
  //学校配置
  {
    url: '/apis/v1/school/',
    type: 'get',
    response: config => {
      console.log(config.headers.cookie)
      const school_info = {
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
      return {
        code: 20000,
        data: school_info
      }
    }
  },
  {
    url: '/apis/v1/school/',
    type: 'post',
    response: config => {
      console.log(config.body)
      return {
        code: 20000,
        data: '更新成功'
      }
    }
  },
  //通知
  {
    url: '/apis/v1/notices/[0-9]+',
    type: 'get',
    response: config => {
      console.log(config.path)
      return {
        code: 20000,
        data: {
          notice_title: 'test',
          notice_content: config.path,
          notice_type: '通知'
        },
      }
    }
  },
  {
    url: '/apis/v1/notices',
    type: 'get',
    response: config => {
      console.log(config.query)
      return {
        code: 20000,
        data: notices,
        total: notices.length
      }
    }
  },
  {
    url: '/apis/v1/notices',
    type: 'post',
    response: config => {
      console.log(config.body)
      return {
        code: 20000,
        data: notices,
        total: notices.length
      }
    }
  },
  {
    url: '/apis/v1/notices/[0-9]+',
    type: 'put',
    response: config => {
      console.log(config.body)
      return {
        code: 20000,
        data: '更新成功'
      }
    }
  },
  {
    url: '/apis/v1/notices/[0-9]+',
    type: 'delete',
    response: config => {
      console.log(config.path)
      return {
        code: 20000,
        data: '删除成功'
      }
    }
  },
  //学员相关
  {
    url: '/apis/v1/students/[0-9]+',
    type: 'get',
    response: config => {
      console.log(config.path)
      return {
        code: 20000,
        data: stu_courses
      }
    }
  },
  {
    url: '/apis/v1/students',
    type: 'get',
    response: config => {
      const {limit, page, searchText} = config.query
      let mockList = students.filter(item => {
        return true
      })

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return {
        code: 20000,
        data: pageList,
        schoolOptions: ['鄂州职业学院', '黄石职业学院', '孝感职业学院'],
        total: mockList.length,
      }
    }
  },
  {
    url: '/apis/v1/students/[0-9]+',
    type: 'put',
    response: config => {
      const stu = config.body
      const exam_id = config.path
      console.log(exam_id)
      console.log(stu)
      return {
        code: 20000,
        data: exam_id
      }
    }
  },
  {
    url: '/apis/v1/students/[0-9]*',
    type: 'delete',
    response: config => {

      console.log(config.path)
      return {
        code: 20000,
        data: 'SUCCESS'
      }
    }
  },
  {
    url: '/apis/v1/students',
    type: 'post',
    response: config => {
      const stu = config.body
      console.log(stu)
      return {
        code: 20000,
        data: stu.exam_id
      }
    }
  },
  //课程相关

  {
    url: '/apis/v1/shift/courses/[0-9]+',
    type: 'get',
    response: config => {
      // console.log(config.query)
      if (Math.random() >= 0.5) {
        return {
          code: 20000,
          // data:''
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
          },
        }
      } else {
        return {
          code: 20000,
          data: ''
        }
      }
    }
  },
  {
    url: '/apis/v1/shift/courses/[0-9]+',
    type: 'delete',
    response: config => {
      console.log(config.query)
      return {
        code: 20000,
        data: ''
      }
    }
  },
  {
    url: '/apis/v1/shift/courses',
    type: 'post',
    response: config => {
      console.log(config.body)
      return {
        code: 20000,
        data: ''
      }
    }
  },
  {
    url: '/apis/v1/shift/courses',
    type: 'get',
    response: config => {
      const {limit, page, searchText} = config.query
      let mockList = mainList.filter(item => {
        return true
      })
      console.log(config.path)
      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      // console.log(limit)
      // console.log(page)

      return {
        code: 20000,
        data: pageList,
        total: mainList.length
      }
    }
  },

  {
    url: '/apis/v1/repository/courses',
    type: 'get',
    response: config => {
      const {limit, page, searchText} = config.query
      let mockList = courseList.filter(item => {
        return true
      })
      console.log(config.query)
      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return {
        code: 20000,
        data: pageList,
        total: courseList.length
      }
    }
  },
  {
    url: '/apis/v1/students/[0-9]+/courses/[0-9]+',
    type: 'post',
    response: config => {
      const {status} = config.body
      console.log(status)
      console.log(config.path)
      return {
        code: 20000,
        data: '成功',
      }
    }
  },


]



