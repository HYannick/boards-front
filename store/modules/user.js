import Cookie from 'js-cookie'

const state = {
  userInfos: {},
  isLogged: false,
}

const mutations = {
  updateUser(state, data) {
    state.userInfos = data
  }
}

const actions = {
  async updateUserInfos({commit}, payload) {
    const {username, email, bio} = payload
    const userData = {
      username,
      email,
      bio
    }
    try {
      this.$axios.setToken(Cookie.get('authToken'), 'Bearer')
      await this.$axios.$put('http://localhost:5000/api/v1/user', userData)
      commit('auth/updateUser', userData, {root: true})
      // this.app.router.push('/')
      return {
        title: `Successfully updated ${userData.username}`,
        message: `Profile updated!`,
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
  async uploadAvatar({commit}, payload) {
    this.$axios.setToken(Cookie.get('authToken'), 'Bearer')
    const uploadConfig = await this.$axios.$get('http://localhost:5000/api/v1/upload?folder=' + payload.folderType)
    await this.$axios.$post('http://localhost:5000/api/v1/user/updateMedias', {
      [(payload.folderType === 'avatar') ? 'avatarUrl' : 'backgroundUrl']: uploadConfig.key
    })

    console.log(uploadConfig)
    try {
      const config = {
        headers: {'Content-Type': payload.file.type}
      }
      this.$axios.setToken(false)
      await this.$axios.$put(uploadConfig.signedUrl, payload.file, config)
      commit('auth/updateUser', payload.folderType === 'avatar' ? {profile_img: uploadConfig.key} : {background_img: uploadConfig.key}, {root: true})
      return {
        title: 'Image uploaded!',
        message: ``,
        type: 'success'
      }
    } catch (e) {
      console.log(e)
      return {
        title: 'An error occured while uploading!',
        message: e.message,
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