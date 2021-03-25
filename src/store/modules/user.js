import {
  login,
  getUserInfo
} from '@/api/user'
import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'
import {
  resetRouter
} from '@/router'
import {
  set
} from 'nprogress'

const getDefaultState = () => {
  return {
    // token: getToken(),

    username: '',
    avatar: '',
    dptname: '',
    userid: "",
    usersht: ""
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, username) => {
    state.username = username
  },
  SET_DPT: (state, name) => {
    state.dptname = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USERID: (state, id) => {
    state.userid = id
  },
  SET_USERSHT: (state, sht) => {
    state.usersht = sht
  }
}

const actions = {
  // user login
  login({
    commit,
    dispatch
  }, userInfo) {
    const {
      username,
      password
    } = userInfo
    return new Promise((resolve, reject) => {
      login({
        usr: username,
        pwd: password
      }).then(response => {
        if (response.data != "-1000" && response.data != "-1001") {
          // getInfo(response.data)
          commit("SET_USERSHT", response.data)
          sessionStorage.setItem("loginInfo", response.data)
          dispatch("getInfo", {
            psnsht: response.data
          })

        }
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({
    commit,
    state
  }, data) {
    return new Promise((resolve, reject) => {
      getUserInfo(data).then(response => {
        
        if (response.data.length > 0) {
          
          commit("SET_NAME", response.data[0].psnname)
          commit("SET_DPT", response.data[0].deptname)
          commit("SET_USERID", response.data[0].psnid)

        }
        resolve(response)
      }).catch(error => {
        reject(error)
      })


    })
  },

  // user logout
  logout({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      commit("RESET_STATE")
      resolve()
    })
  },

  // remove token
  resetToken({
    commit
  }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
