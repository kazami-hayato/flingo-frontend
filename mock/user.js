const tokens = {
  system: {
    token: 'system-token'
  },
  main_school: {
    token: 'main_school-token'
  },
  sub_school: {
    token: 'sub_school-token'
  }
}

const users = {
  'system-token': {
    roles: ['system'],
    introduction: 'I am a super systemistrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Admin'
  },
  'main_school-token': {
    roles: ['main_school'],
    introduction: 'I am a main_school',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Teacher'
  },
  'sub_school-token': {
    roles: ['sub_school'],
    introduction: 'I am a sub_school',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Fellow'
  }
}

export default [
  // user login
  {
    url: '/apis/v1/auth/login',
    type: 'post',
    response: config => {
      const {username} = config.body
      console.log(username)
      const token = tokens[username]
      console.log(token)

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 20000,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/apis/v1/auth/info\.*',
    type: 'get',
    response: config => {
      const {token} = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/apis/v1/auth/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
