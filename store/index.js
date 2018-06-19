import Vuex from 'vuex'
import CookieParser from 'cookieparser'
import auth from './modules/auth'
import user from './modules/user'
import book_create from './modules/book-create'
const createStore = () => {
  return new Vuex.Store({
    actions: {
      async nuxtServerInit ({ commit }, { req }) {
        if (req.headers.cookie) {
          const parsed = CookieParser.parse(req.headers.cookie).authToken
          try {
            this.$axios.setToken(parsed, 'Bearer')
            const user = await this.$axios.$get('http://localhost:5000/api/v1/user')
            console.log(parsed)
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
      user,
      book_create
    }
  })
}

export default createStore