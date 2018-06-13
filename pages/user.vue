<template>
  <div class="user-profile container">
    <el-row class="user-profile__header">
      <el-col :span="24">
        <div class="user-profile__cover">
          <svg class="bg-svg" width="0" height="0">
            <clipPath id="clip-cover" clipPathUnits="objectBoundingBox">
              <path d="M0 .039L.924 0 1 1 .032.826 0 .039z" fill="#383434"/>
            </clipPath>
          </svg>
          <div class="cover__img">
            <img class="rellax" src="/img5.png"/>
          </div>
        </div>
        <div class="user-profile__avatar">
          <svg class="avatar-svg" width="0" height="0">
            <clipPath id="clip-avatar" clipPathUnits="objectBoundingBox">
              <path d="M0 .825L.875.681.63.883 0 1V.825zM0 0l1 .092-.108.541L0 .771V0z" fill="#f5d281"/>
            </clipPath>
          </svg>
          <div data-rellax-speed="1" class="avatar__img rellax">
            <img src="/avatar__mock.jpg"/>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row  :gutter="20" class="user-profile__body">
      <el-col :span="4" class="user-profile__nav">
        <ul>
          <li><nuxt-link to="/user/overview">Overview</nuxt-link></li>
          <li><nuxt-link to="/user/profile">Profile</nuxt-link></li>
          <li><nuxt-link to="/user/books-list">My Books</nuxt-link></li>
          <li><nuxt-link to="/user/orders">My Orders</nuxt-link></li>
          <li><nuxt-link to="/user/wishlist">Whislist</nuxt-link></li>
          <li><nuxt-link to="/user/published-books">Published Books</nuxt-link></li>
          <li><nuxt-link to="/user/comics-creator">Comics Creator</nuxt-link></li>
        </ul>
      </el-col>
      <el-col :span="20" class="user-profile__content">
        <nuxt-child :key="$route.params.id"></nuxt-child>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import Rellax from 'rellax'
  export default {
    mounted() {
      this.$nextTick(() => {
        const rellax = new Rellax('.rellax')
        rellax.refresh()
      })
    },
    methods: {
      svgScale(w, h) {
        return `scale(${1 / w} ${1 / h})`
      }
    }
  }
</script>
<style lang="scss">
  .user-profile {
    margin-top: $header-offset;
  }

  .user-profile__header {
    position: relative;
  }
  .user-profile__body {
    margin-top: 10rem;
  }

  .user-profile__nav {
    ul {
      padding: 0 2rem 0 0;
      list-style: none;
      min-height: 100vh;
      position: relative;
      &:after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        width: 0.1rem;
        height: 100%;
        background: $color--dark;
      }
      li {
        display: block;
        font-family: $font-family--main-outlined;
        text-align: right;
        a {
          display: block;
          padding: 0.5rem 1rem;
          font-size: 2rem;
          color: $color--dark;
        }
      }
    }
  }

  .user-profile__cover {
    .cover__img {
      -webkit-clip-path: url("#clip-cover");
      clip-path: url("#clip-cover");
      position: relative;
      height: 35rem;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      &:before {
        content: '';
        background: $color--dark;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 1;
        opacity: 0.8;
      }
      img {
        width: 100%;
      }
    }
  }

  .user-profile__avatar {
    position: absolute;
    bottom: -5rem;
    left: 0;
    cursor: pointer;
    .avatar__img {
      -webkit-clip-path: url("#clip-avatar");
      clip-path: url("#clip-avatar");
      position: relative;
      width: 15rem;
      height: 25rem;
      &:hover {
        &:before {
          opacity: 0.5;
        }
      }
      &:before {
        content: '';
        background: $color--yellow;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 1;
        opacity: 0;
        transition: opacity 0.3s;
      }
      img {
        width: 25rem;
        position: absolute;
      }
    }
  }
</style>