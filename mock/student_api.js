import Mock from 'mockjs'

const List = []
const count = 30

const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    exam_id: '@integer(1000000,2000000)',
    student_name: 'any' + '@integer(100,200)',
    'sub_school|1': ['a', 'b', 'c'],
    'main_school|1':['e','f','g'],
    'gender|1': ['男', '女'],
    phone: '@integer(13765717681,15671640897)',
    register_date: +Mock.Random.date('T'),
    courses: [10, 12]
  }))
}

export default [
  {
    url: '/apis/v1/students',
    type: 'get',
    response: config => {
      const {limit, page, searchOn, searchText} = config.query
      console.log(config.query)
      let mockList = List.filter(item => {
        return true
      })

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return {
        code: 20000,
        data: {
          stFilterOptions: ['a', 'b', 'c'],
          total: mockList.length,
          items: pageList
        }
      }
    }
  },

  {
    url: '/apis/v1/students',
    type: 'post',
    response: config => {
      const stu = config.query
      const id = 21323123
      console.log(stu)
      return {
        code: 20000,
        data: id
      }
    }
  },
  {
    url: '/apis/v1/students/[0-9]*',
    type: 'put',
    response: config => {
      const stu = config.query
      const id = 21323123
      console.log(stu)
      return {
        code: 20000,
        data: id
      }
    }
  },

  {
    url: '/apis/v1/students/[0-9]*',
    type: 'delete',
    response: config => {
      const stu = config.query
      const id = 21323123
      console.log(stu)
      return {
        code: 20000,
        data: id
      }
    }
  },
]

