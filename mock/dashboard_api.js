export default [
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
      return {
        code: 20000,
        data: {
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
        // data: List,
        // total:List.length
      }
    }
  }
]
