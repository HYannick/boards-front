<template>
  <header class="b-header">
    <svg width="0" height="0">
      <clipPath id="clip-header-avatar" clipPathUnits="objectBoundingBox">
        <path d="M0 1V0l.999.058-.228.929L0 1z" fill="#383434"/>
      </clipPath>
    </svg>
    <div class="b-header__wrapper container">
      <div class="b-header__burger" :class="{'b-header__burger--open': navOpen}" @click="onNavOpen">
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 51.677 61">
            <g data-name="Tracé 69" fill="none">
              <path d="M0 0h51.677v43.172L0 61z"/>
              <path d="M4 55.389L47.677 40.32V4H4v51.389M0 61V0h51.677v43.172L0 61z" fill="#383434"/>
            </g>
          </svg>
          <span class="nav-line"></span>
          <span class="nav-line"></span>
          <span class="nav-text">Menu</span>
        </button>
      </div>
      <nuxt-link to="/" class="b-header__logo">
        <span class="b-header__logo-main">Boards</span>
        <span class="b-header__logo-subtitle">Indie Comics for everyone!</span>
      </nuxt-link>
      <nav class="b-header__nav" :class="{'b-header__nav--open': navOpen}">
        <div class="b-header__nav-overlay" @click="navOpen = false"></div>
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
        <div class="b-header__avatar-wrapper">
          <nuxt-link to="/user" class="b-header__avatar" v-if="isLogged">
            <img :src="avatarUrl"/>
          </nuxt-link>
        </div>
      </transition>
    </div>
  </header>
</template>

<script>
  import {mapState, mapActions} from 'vuex'

  export default {
    data() {
      return {
        navOpen: false
      }
    },
    computed: {
      ...mapState('auth', ['isLogged', 'userInfos']),
      avatarUrl() {
        return `https://s3.eu-west-3.amazonaws.com/boards-bucket/${this.userInfos.profile_img}`
      },
    },

    methods: {
      ...mapActions('auth', ['logout']),
      onNavOpen() {
        this.navOpen = !this.navOpen
      },
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
    background: $color--light;
    z-index: 999;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 10rem;
    @include breakpoint($sm) {
      background: transparentize($color--light, 0.5);
    }
    &__burger {
      flex: 1;
      display: flex;
      @include breakpoint($sm) {
        display: none;
      }
      &.b-header__burger--open {
        .nav-line {
          transform-origin: 0.85rem;
          &:nth-child(2) {
            transform: translate(0.25rem, 0.5rem) rotate(45deg)
          }
          &:nth-child(3) {
            transform: translate(0.25rem, 0.5rem) rotate(-45deg)
          }
        }
        .nav-text {
          transform: translateY(100%);
          opacity: 0;
        }
      }
      button {
        position: relative;
        width: 5.5rem;
        height: 6rem;
        outline: $color--light;
        border: none;
        font-family: $font-family--main;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1.2rem 0 0;
        svg {
          position: absolute;
          top: 0;
          left: 0;
        }
        .nav-line {
          display: block;
          width: 3rem;
          height: 0.5rem;
          background: $color--brown;
          margin: 0 auto 0.4rem;
          transition: 0.5s $cubic-ease;
        }
        .nav-text {
          transition: 0.5s $cubic-ease;
        }
      }
    }
    &__logo {
      color: $color--font;
      line-height: 1;
      flex: 2;
      @include breakpoint($sm) {
        flex: none;
      }
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
    position: fixed;
    top: $header-offset;
    left: 0;
    height: calc(100vh - 10rem);
    width: 100%;
    @include breakpoint($sm) {
      position: relative;
      top: 0;
      flex: 1;
      height: auto;
      background: transparent;
    }
    &.b-header__nav--open {
      ul {
        transform: translateX(0);
      }
      .b-header__nav-overlay {
        opacity: 1;
        visibility: visible;
      }
    }
    .b-header__nav-overlay {
      position: fixed;
      top: $header-offset;
      left: 0;
      width: 100%;
      background: transparentize($color--light, 0.2);
      padding: 1rem;
      height: calc(100vh - 10rem);
      z-index: 1;
      opacity: 0;
      visibility: hidden;
      transition: 0.5s $cubic-ease;
      @include breakpoint($sm) {
        display: none;
      }
    }
    ul {
      width: 60%;
      height: 100%;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      list-style: none;
      position: relative;
      z-index: 2;
      background: $color--light;
      transform: translateX(-100%);
      transition: 0.5s $cubic-ease;
      @include breakpoint($sm) {
        width: 100%;
        height: auto;
        background: transparent;
        transform: none;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
      }
      li {
        margin: 1.5rem;
        @include breakpoint($sm) {
          margin: 0 1.5rem;
        }
        a {
          font-size: 2.5rem;
          font-family: $font-family--main;
          color: $color--font;
        }
      }
    }
  }

  .b-header__avatar-wrapper {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    @include breakpoint($sm) {
      display: block;
      flex: none;
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
