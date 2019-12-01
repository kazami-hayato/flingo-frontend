import Mock from 'mockjs'

const List = []
const count = 30

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    pub_date: +Mock.Random.date('T'),
    notice_title: '标题'+i,
    'notice_type|1': ['通知', '法律法规', '新闻'],
    notice_author: 'admin',
  }))
}

export default [
  {
    url: '/apis/v1/notices',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: List,
        total:List.length
      }
    }
  }
]
