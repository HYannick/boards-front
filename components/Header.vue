<template>
  <header class="b-header">
    <svg width="0" height="0">
      <clipPath id="clip-header-avatar" clipPathUnits="objectBoundingBox">
        <path d="M0 1V0l.999.058-.228.929L0 1z" fill="#383434"/>
      </clipPath>
    </svg>
    <div class="b-header__wrapper container">
      <nuxt-link to="/" class="b-header__logo">
        <span class="b-header__logo-main">Boards</span>
        <span class="b-header__logo-subtitle">Indie Comics for everyone!</span>
      </nuxt-link>
      <nav class="b-header__nav">
        <ul>
          <li class="b-header__nav-item">
            <nuxt-link to="/">Home</nuxt-link>
          </li>
          <li class="b-header__nav-item">
            <nuxt-link to="/about">About</nuxt-link>
          </li>
          <li class="b-header__nav-item">
            <nuxt-link to="/comic-list">Comics List</nuxt-link>
          </li>
          <li class="b-header__nav-item">
            <nuxt-link to="/reader">Reader</nuxt-link>
          </li>
          <transition name="fade" mode="out-in">
            <li class="b-header__nav-item" v-if="isLogged">
              <nuxt-link to="/book-create">Create a Book</nuxt-link>
            </li>
          </transition>
          <li class="b-header__nav-item">
            <nuxt-link to="/checkout">Cart</nuxt-link>
          </li>
          <transition name="fade" mode="out-in">
            <li class="b-header__nav-item" v-if="!isLogged" key="login">
              <nuxt-link to="/auth#register">Login/Signup</nuxt-link>
            </li>
            <li class="b-header__nav-item" v-else key="logout">
              <a href="/" @click.prevent="quit">Logout</a>
            </li>
          </transition>
        </ul>
      </nav>
      <transition name="fade" mode="out-in">
        <nuxt-link to="/user" class="b-header__avatar" v-if="isLogged">
          <img :src="avatarUrl"/>
        </nuxt-link>
      </transition>
    </div>
  </header>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import Cookie from 'js-cookie'

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
  .b-header {
    position: fixed;
    background: transparentize($color--light, 0.5);
    z-index: 999;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 10rem;
    &__logo {
      color: $color--font;
      line-height: 1;
      span {
        display: block;
      }
      &-main {
        font-family: $font-family--heading;
        font-size: 4rem;
        margin-bottom: 1.5rem;
      }
      &-subtitle {
        font-family: $font-family--main;
        font-size: 1rem;
      }
    }
  }

  .b-header__wrapper {
    display: flex;
    align-items: center;
    height: 100%;
  }

  .b-header__nav {
    flex: 1;
    ul {
      display: flex;
      align-items: center;
      list-style: none;
      padding: 0;
      justify-content: flex-end;
      li {
        margin: 0 1.5rem;
        a {
          font-size: 2.5rem;
          font-family: $font-family--main;
          color: $color--font;
        }
      }
    }
  }

  .b-header__avatar {
    width: 6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    -webkit-clip-path: url("#clip-header-avatar");
    clip-path: url("#clip-header-avatar");
    img {
      width: 100%;
    }
  }
</style>
