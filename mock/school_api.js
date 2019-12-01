export default [
  {
    url: '/apis/v1/schools/*',
    type: 'get',
    response: config => {
      const form = {
        logo: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        school_name: '',
        H5domain: '',
        hotline: '',
        qq: '',
        email: '',
        icp: '',
        description: '',
        address: ''
      }
      console.log(config.query)
      return {
        code: 20000,
        data: form
      }
    }
  }
]

