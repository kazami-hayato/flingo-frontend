import {login, logout, getInfo} from '@/api/apis'
import {getToken, setToken, removeToken} from '@/utils/auth'
import router, {resetRouter} from '@/router'
// import role from "@/views/permission/role";

const state = {
  token: getToken(),
  username: undefined,
  real_name: undefined,
  password: undefined,
  user_type: undefined,
  wechat_num:undefined,
  phone:undefined,
  main_school: undefined,
  sub_school: undefined,
  ip: undefined,
  prev_time: undefined,
  // name: undefined,
  avatar: undefined,
  // introduction: undefined,
  /*
  * 鉴权相关
  * */
  roles: undefined
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERNAME: (state, username) => {
    state.username = username
  },
  SET_REAL_NAME: (state, real_name) => {
    state.real_name = real_name
  },
  SET_PASSWORD: (state, password) => {
    state.password = password
  },
  SET_USER_TYPE: (state, user_type) => {
    state.user_type = user_type
  },
  SET_WECHAT_NUM: (state, wechat_num) => {
    state.wechat_num = wechat_num
  },
  SET_PHONE: (state, phone) => {
    state.phone = phone
  },
  SET_MAIN_SCHOOL: (state, main_school) => {
    state.main_school = main_school
  },
  SET_SUB_SCHOOL: (state, sub_school) => {
    state.sub_school = sub_school
  },
  SET_IP: (state, ip) => {
    state.ip = ip
  },
  SET_PREV_TIME: (state, prev_time) => {
    state.prev_time = prev_time
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({commit}, userInfo) {
    const {username, password} = userInfo
    return new Promise((resolve, reject) => {
      login({username: username.trim(), password: password}).then(response => {
        const {data} = response
        // commit('SET_TOKEN', data.token)
        // setToken(data.token)
        commit('SET_TOKEN', data)
        setToken(data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({commit, state}) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const {data} = response

        if (!data) {
          reject('认证失败，请重新登录.')
        }
        console.log(data)
        // const { roles, name, avatar, introduction } = data
        const {
          avatar,
          username,
          real_name,
          main_school,
          sub_school,
          password,
          user_type,
          wechat_num,
          phone,
          ip,
          prev_time
        } = data

        // roles.push(role)
        // roles must be a non-empty array
        console.log(typeof user_type)
        if (user_type === null) {
          reject('角色不为空')
        }
        let roles = []
        if (user_type === 1) {
          roles.push('system')
        } else if (user_type === 2) {
          roles.push('main_school')
        } else {
          roles.push('sub_school')
        }
        console.log(roles)
        commit('SET_ROLES', roles)
        commit('SET_USERNAME', username)
        commit('SET_REAL_NAME', real_name)
        commit('SET_PASSWORD', password)
        commit('SET_USER_TYPE', user_type)
        commit('SET_WECHAT_NUM', wechat_num)
        commit('SET_PHONE', phone)
        commit('SET_MAIN_SCHOOL', main_school)
        commit('SET_SUB_SCHOOL', sub_school)
        commit('SET_AVATAR', avatar)
        commit('SET_IP', ip)
        commit('SET_PREV_TIME', prev_time)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({commit, state, dispatch}) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, {root: true})

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({commit}) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  // changeRoles({commit, dispatch}, role) {
  //   return new Promise(async resolve => {
  //     const token = role + '-token'
  //
  //     commit('SET_TOKEN', token)
  //     setToken(token)
  //
  //     const {roles} = await dispatch('getInfo')
  //
  //     resetRouter()
  //
  //     // generate accessible routes map based on roles
  //     const accessRoutes = await dispatch('permission/generateRoutes', roles, {root: true})
  //
  //     // dynamically add accessible routes
  //     router.addRoutes(accessRoutes)
  //
  //     // reset visited views and cached views
  //     dispatch('tagsView/delAllViews', null, {root: true})
  //
  //     resolve()
  //   })
  // }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
