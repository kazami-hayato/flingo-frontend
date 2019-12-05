export default [
  {
    url: '/apis/v1/schools/',
    type: 'get',
    response: config => {
      console.log(config.headers.cookie)
      const form = {
        logo: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        school_name: '鄂州大学',
        school_id:123602,
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
        data: form
      }
    }
  },
  {
    url: '/apis/v1/schools/[0-9]*',
    type: 'put',
    response: config => {
      return {
        code: 20000,
        data: '更新成功'
      }
    }
  }
]

