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
  }
]
