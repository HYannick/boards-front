module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'boards-sheep',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: 'Indie comics for everyone'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Hind+Guntur|Lato|Noto+Sans|Oswald|Quicksand|Raleway|Special+Elite"
      }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: {color: '#3B8070'},
  /*
  ** Global CSS
  */
  css: [
    // SCSS file in the project
    'element-ui/lib/theme-chalk/index.css',
    '@/assets/scss/main.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui'
  ],
  modules: [
    // provide path to the file with resources
    'nuxt-sass-resources-loader',
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  sassResources: [
    '@/assets/scss/abstracts/_abstract.scss'
  ],
  /*
  ** Build configuration
  */
  build: {
    vendor:[ 'rellax' ],
    /*
    ** Run ESLint on save
    */
    extend(config, {isDev, isClient}) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },

  axios: {
    baseUrl: 'http://localhost:5000/api/v1',
    proxy: true,
    proxyHeaders: false,
    credentials: false
  },
  proxy: {
    '/api/v1/': 'http://localhost:5000'
  }
}
