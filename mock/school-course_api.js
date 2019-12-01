import Mock from 'mockjs'

const List = []
const count = 30

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    course_id: '@increment',
    course_name: '高等数学' + i,
    course_brief: '简介',
    update_time: +Mock.Random.date('T'),
    material_name: '教材名',
    norm_duration: '@Integer(10, 20)',
    norm_num: '@Integer(10, 36)',
    'course_state|1': ['已上架', '未上架'],
  }))
}

export default [
  {
    url: '/apis/v1/shift/courses',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: List,
        total: List.length
      }
    }
  }
]
