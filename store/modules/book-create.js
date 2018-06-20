import Cookie from 'js-cookie'
import helpers from '~/assets/js/helpers'
import {isArray, isEmpty} from 'lodash'
const state = {
  activeStep: 0,
  book_form: {
    title: `What's the headline?`,
    img_title: '',
    tome_title: '',
    cover: '',
    background_cover: '',
    short_description: '',
    description: '',
    previews: [],
    ressources: [],
    min_price: 0.00,
    max_price: 0.00,
    languages: [],
    rating: 0
  }
}


async function pushtoS3(items, axios) {
  const config = (file) => ({
    headers: {'Content-Type': file.type}
  })
  if (isArray(items)) {
    await helpers.asyncForEach(items, async item => {
      if (item) {
        try {
          await axios.$put(item.signedUrl, item.file, config(item.file))
        } catch (e) {
          console.log(e.message)
          return {error: e.message}
        }
      }
    })
    return
  }

  try {
    await axios.$put(items.signedUrl, items.file, config(items.file))
  } catch (e) {
    console.log(e.message)
    return {error: e.message}
  }

}

const mutations = {
  updateBookForm(state, data) {
    Object.assign(state.book_form, data)
    console.log(state.book_form)
  },
  updateActiveStep(state, direction) {
    state.activeStep += (direction === 'up') ? 1 : -1
  }
}

const actions = {
  fetchPricings({commit}, payload) {
    const min_price = payload.min_max[0]
    const max_price = payload.min_max[1]
    commit('updateBookForm', {min_price, max_price})
  },

  async createMediaUrls({commit}, payload) {
    const {cover, background_cover, img_title, slug} = payload
    this.$axios.setToken(Cookie.get('authToken'), 'Bearer')

    const getUrl = async (value) => {
      if(!isEmpty(value)) {
        return await this.$axios.$get(`http://localhost:5000/api/v1/upload?folder=book&slug=${slug}`)
      }
    }

    const cover_url = await getUrl(cover)
    const background_cover_url = await getUrl(background_cover)
    const img_title_url = await getUrl(img_title)

    commit('updateBookForm', {
      cover: {file: cover, ...cover_url},
      background_cover: {file: background_cover, ...background_cover_url},
      img_title: {file: img_title, ...img_title_url}
    })
  },

  async createMultipleMediaUrls({commit}, payload) {
    const temp = []
    this.$axios.setToken(Cookie.get('authToken'), 'Bearer')
    await helpers.asyncForEach(payload.data, async item => {
      const url = await this.$axios.$get(`http://localhost:5000/api/v1/upload?folder=book/${payload.name}&slug=${payload.slug}`)
      temp.push({file: item, ...url})
    })
    commit('updateBookForm', {[payload.name]: temp})
  },

  async createBook({commit, state}) {
    const {cover, background_cover, img_title, previews, ressources} = state.book_form
    try {

      await pushtoS3([cover, background_cover, img_title], this.$axios)
      await helpers.asyncForEach(previews, async preview => await pushtoS3(preview, this.$axios))
      await helpers.asyncForEach(ressources, async ressource => await pushtoS3(ressource, this.$axios))

      const newData = {
        img_title: img_title.key || '',
        cover: cover.key || '',
        background_cover: background_cover.key || '',
        previews: previews.map(preview => preview.key),
        ressources: ressources.map(ressource => ressource.key)
      }

      commit('updateBookForm', newData)

      this.$axios.setToken(Cookie.get('authToken'), 'Bearer')
      await this.$axios.$post('http://localhost:5000/api/v1/book/create', {...state.book_form})
      return {
        title: 'Book Created!!',
        message: ``,
        type: 'success'
      }
    } catch (e) {
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