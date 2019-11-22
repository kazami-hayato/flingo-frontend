import Mock from 'mockjs'

const List = []
const count = 30

const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    'sub_school|1': ['a', 'b', 'c'],
    total_num: 222,
    create_date: +Mock.Random.date('T'),
  }))
}

export default [
  {
    url: '/apis/v1/groups',
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
    url: '/apis/v1/groups',
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
    url: '/apis/v1/groups/[0-9]*',
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
    url: '/apis/v1/groups/[0-9]*',
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

