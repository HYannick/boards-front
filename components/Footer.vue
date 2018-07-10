<template>
  <footer class="b-footer">
    <svg width="0" height="0">
      <clipPath id="clip-footer" clipPathUnits="objectBoundingBox">
        <path d="M0 .2L1 0v1H0V.2z" fill="#383434"/>
      </clipPath>
    </svg>
    <div class="b-footer__wrapper container">
      <nuxt-link to="/" class="b-footer__logo">
        <span class="b-footer__logo-main">Boards</span>
        <span class="b-footer__logo-subtitle">Indie Comics for everyone!</span>
      </nuxt-link>
      <div class="b-footer__nav">
        <nav>
          <h3>About</h3>
          <ul>
            <li class="b-footer__nav-item">
              <nuxt-link to="/about">What's boards anyways?</nuxt-link>
            </li>
            <li class="b-footer__nav-item">
              <nuxt-link to="/how-to">How To</nuxt-link>
            </li>
            <li class="b-footer__nav-item">
              <nuxt-link to="/blog">Blog</nuxt-link>
            </li>
            <li class="b-footer__nav-item">
              <nuxt-link to="/contact">Contact</nuxt-link>
            </li>
          </ul>
        </nav>
        <nav>
          <h3>Legal</h3>
          <ul>
            <li class="b-footer__nav-item">
              <nuxt-link to="/terms">Terms and Service</nuxt-link>
            </li>
            <li class="b-footer__nav-item">
              <nuxt-link to="/copyright">Copyright Policy</nuxt-link>
            </li>
            <li class="b-footer__nav-item">
              <nuxt-link to="/privacy">Privacy Polocy</nuxt-link>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <p class="b-footer__copyright">Made by Ayho Society © 2018 | All rights reserved</p>
  </footer>
</template>

<script>
  import {mapState, mapActions} from 'vuex'

  export default {
    data() {
      return {}
    },
    computed: {
      ...mapState('auth', ['isLogged', 'userInfos']),
      avatarUrl() {
        return `https://s3.eu-west-3.amazonaws.com/boards-bucket/${this.userInfos.profile_img}`
      }
    },
    mounted() {
    },
    methods: {
      ...mapActions('auth', ['logout']),
      quit() {
        this.logout().then(() => {
          this.$router.push('/')
        })
      }
    }
  }
</script>

<style lang="scss">
  .b-footer {
    -webkit-clip-path: url("#clip-footer");
    clip-path: url("#clip-footer");
    background: $color--brown;
    height: 40rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    &__wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &__logo {
      flex: 1;
      color: $color--yellow;
      line-height: 1;
      span {
        display: block;
      }
      &-main {
        font-family: $font-family--heading;
        font-size: 6rem;
        margin-bottom: 1.5rem;
      }
      &-subtitle {
        font-family: $font-family--main;
        font-size: 1rem;
      }
    }
  }

  .b-footer__wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .b-footer__nav {
    flex: 1;
    display: flex;
    justify-content: center;
    h3 {
      font-family: $font-family--main-outlined;
      color: $color--light;
      font-size: 3rem;
      margin-bottom: 2rem;
    }
    nav {
      margin: 0 2rem;
    }
    ul {
      list-style: none;
      padding: 0;
      li {
        margin-bottom: 1rem;
        a {
          font-size: 1.5rem;
          font-family: $font-family--main;
          color: $color--light;
        }
      }
    }
  }
  .b-footer__copyright {
    color: $color--light;
    text-align: center;
    padding: 1rem;
  }
</style>
