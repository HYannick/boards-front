import Cookie from 'js-cookie'

const state = {
  userInfos: {},
  isLogged: false,
  messages: ''
}

const mutations = {
  updateUser(state, data) {
    Object.assign(state.userInfos, data)
  },
  updateAuthStatus(state, data) {
    state.isLogged = true
    state.userInfos = data
  },

  logout(state) {
    state.isLogged = false
  }
}

const actions = {
  async register({commit}, payload) {
    const {username, email, pass} = payload
    const userData = {
      username,
      email,
      password: pass
    }
    try {
      await this.$axios.$post('http://localhost:5000/api/v1/register', userData)
      this.app.router.push('/')
      return {
        title: `Welcome ${userData.username}`,
        message: `We sent you an email confirmation. Please check it :)`,
        type: 'success'
      }
    } catch (e) {
      return {
        title: 'Something went wrong',
        message: `Error: ${e}`,
        type: 'error'
      }
    }
  },
  async login({commit}, payload) {
    try {
      const login = await this.$axios.$post('http://localhost:5000/api/v1/login', payload)
      this.$axios.setToken(login.token, 'Bearer')
      const user = await this.$axios.$get('http://localhost:5000/api/v1/user')
      if (user.is_verified) {
        const userInfos = {
          username: user.username,
          email: user.email,
          profile_img: user.profile_img,
          background_img: user.background_img
        }
        commit('updateAuthStatus', userInfos)
        Cookie.set('authToken', login.token)
        this.app.router.push('/')
        return {
          title: 'You are in!',
          message: `Welcome, ${user.username}! :)`,
          type: 'success'
        }
      } else {
        return {
          title: 'Failed on email check',
          message: `Did you verified your account?`,
          type: 'error'
        }
      }
    } catch (e) {
      return {
        title: 'Error',
        message: `Username or password incorrect.`,
        type: 'error'
      }
    }
  },
  async logout({commit}) {
    try {
      Cookie.remove('authToken')
      commit('logout')
    } catch (e) {
      return {
        title: 'Something went wrong',
        message: `Error: ${e}`,
        type: 'error'
      }
    }
  }
}


export default {
  namespaced: true,
  state,
  actions,
  mutations
}