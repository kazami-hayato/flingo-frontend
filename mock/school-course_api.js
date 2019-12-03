import Mock from 'mockjs'

const List = []
const count = 30
const mainList = []
for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    course_id: '@increment',
    course_name: '高等数学' + i,
    course_brief: '简介',
    update_time: +Mock.Random.date('T'),
    material_name: '教材名',
    norm_duration: '@Integer(10, 20)',
    norm_num: '@Integer(10, 36)',
    'course_state|1': [0, 1],
  }))
}

for (let i = 0; i < count; i++) {
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
    sales:'@Integer(100,229)',
    'course_state|1': [0, 1],
  }))
}
const catalogs = [{
  id: 1, // 目录的id，唯一
  label: '第一章，毛泽东思想及其历史地位', // 目录名称
  isTitle:true, // 是否是大章节标题
  children: [{ // 子目录
    id: 4,
    label: '第一节 毛泽东思想的形成及其历史地位',
    status:false,
  },{
    id:5,
    label:'第二节 毛泽东思想的主要内容和活的灵魂',
    status:false,
  },{
    id:6,
    label:'第三节 毛泽东思想的历史地位',
    status:false,
  }]
}, {
  id: 2,
  label: '第二章 新民主主义革命理论 ',
  isTitle:true,
  children: [{
    id: 7,
    label: '第一节 新民主主义革命理论形成的依据',
    status:true,
  }, {
    id: 8,
    label: '第二节 新民主主义革命的总路线和基本纲领',
    status:true,
  }]
}];
export default [
  {
    url: '/apis/v1/shift/courses',
    type: 'get',
    response: config => {
      console.log(config.query)
      if (config.query.req_table == 'main_course_table')
        return {
          code: 20000,
          data: mainList,
          total: mainList.length
        }
      else
        return {
          code: 20000,
          data: List,
          total: List.length
        }
    }
  },
  // 获取目录
  {
    url: '/api/v1/shift/courses/catalog',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: {'catalog':catalogs},
        total: List.length
      }
    }
  },
  // 上传新目录
  {
    url:'/api/v1/shift/courses/catalog',
    type: 'post',
    response: config => {
      return {
        code: 20000,
        data: List,
        total: List.length
      }
    }
  },
  {
    url:'/api/v1/shift/courses/video',
    type: 'post',
    response: config => {
      return {
        code: 20000,
        data: []
      }
    }
  }
]
