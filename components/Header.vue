<template>
  <header class="b-header">
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
          <li class="b-header__nav-item">
            <nuxt-link to="/checkout">Cart</nuxt-link>
          </li>
          <li class="b-header__nav-item"  v-if="!isLogged">
            <nuxt-link to="/auth#register">Login/Signup</nuxt-link>
          </li>
          <li class="b-header__nav-item" v-else>
            <a href="/" @click.prevent="quit">Logout</a>
          </li>
        </ul>
      </nav>
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
      ...mapState('auth', ['isLogged'])
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
</style>
