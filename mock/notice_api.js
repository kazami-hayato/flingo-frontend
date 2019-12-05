import Mock from 'mockjs'

const List = []
const count = 30

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    notice_id: '@Integer(10028,20026)',
    pub_date: +Mock.Random.date('T'),
    notice_title: '标题' + i,
    'notice_type|1': ['通知', '法律法规', '新闻'],
    notice_author: 'admin',
  }))
}

export default [
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
  }
  ,
  {
    url: '/apis/v1/notices',
    type: 'get',
    response: config => {
      // console.log(config.path)
      return {
        code: 20000,
        data: List,
        total: List.length
      }
    }
  },
]
