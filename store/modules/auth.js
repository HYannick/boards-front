import Cookie from 'js-cookie'

const state = {
  userInfos: {},
  isLogged: false,
  messages: ''
}

const mutations = {
  updateAuthStatus(state, data) {
    state.isLogged = true
    state.userInfos = data.userInfos
  },

  logout(state) {
    state.isLogged = false
  }
}

const actions = {
  async register({commit}, payload) {
    try {
      await this.$axios.$post('http://localhost:5000/api/v1/register', payload)
      this.app.router.push('/')
      return {
        title: `Welcome ${payload.username}`,
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
          admin: user.is_admin
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
      console.log('lol')
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