import Vuex from 'vuex'
import CookieParser from 'cookieparser'
import auth from './modules/auth'
import user from './modules/user'
const createStore = () => {
  return new Vuex.Store({
    actions: {
      async nuxtServerInit ({ commit }, { req }) {
        if (req.headers.cookie) {
          const parsed = CookieParser.parse(req.headers.cookie).authToken
          try {
            this.$axios.setToken(parsed, 'Bearer')
            const user = await this.$axios.$get('http://localhost:5000/api/v1/user')

            const userInfos = {
              username: user.username,
              email: user.email,
              admin: user.is_admin,
              verified: user.is_verified,
              bio: user.bio,
              profile_img: user.profile_img
            }
            commit('auth/updateAuthStatus', userInfos)
          } catch (e) {
            commit('auth/logout')
          }
        }

      }
    },
    modules: {
      auth,
      user
    }
  })
}

export default createStore