<template>
  <div class="book-details__headline">
    <div class="book-details__background">
      <div class="book-details__background-image rellax">
        <img :src="headlines.background_cover"/>
      </div>
    </div>
    <div class="book-details__cover">
      <div data-rellax-speed="2" class="headlines__cover-img rellax">
        <div class="headlines__cover-wrapper">
          <img width="100%" :src="headlines.cover"/>
        </div>
      </div>
    </div>
    <div class="book-details__title">
      <h2 v-if="!headlines.vector">{{headlines.title}}</h2>
      <img :src="headlines.vector" v-else/>
    </div>
    <div class="book-details__synopsis">
      <heading-title data-text="Synopsis" align="left">Synopsis</heading-title>
      <p>{{headlines.description}}</p>
    </div>
  </div>
</template>
<script>
  import HeadingTitle from '~/components/HeadingTitle.vue'
  export default {
    props: ['headlines'],
    components: {
      HeadingTitle
    }
  }
</script>
<style lang="scss">
  .book-details__headline {
    display: grid;
    grid-template-columns: 0.5fr 30rem 10rem 20rem 1fr 1fr 1fr 0.5fr;
    grid-template-rows: 6rem 10rem 5rem 10rem 25rem 5rem 30rem;
  }

  .book-details__synopsis {
    grid-column: 5 / span 3;
    grid-row: 5;
    padding-top: 4rem;
    p{
      margin: 1rem 0;
      font-family: $font-family--main;
      letter-spacing: 0.1rem;
      line-height: 1.3;
      font-size: 1.6rem;
    }
  }

  .book-details__title {
    -webkit-clip-path: url("#clip-headlines-title");
    clip-path: url("#clip-headlines-title");
    background-color: $color--light;
    grid-column: 5 / span 3;
    grid-row: 2 / span 3;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    h2 {
      font-family: $font-family--main;
      font-size: 6rem;
      color: $color--dark;
      margin-top: 1rem;
      margin-left: 4rem;
      letter-spacing: 0.4rem;
    }
    img {
      width: 100%;
    }
  }

  .book-details__cover {
    position: relative;
    grid-column: 2 / span 1;
    grid-row: 3 / span 4;
    &-img {
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      height: 100%;
      &--empty {
        background: transparentize($color--yellow, 0.5);
        i {
          position: absolute;
          top: 50%;
          font-size: 3rem;
          left: 50%;
          transform: translate(-50%, -50%);
          color: $color--light;
          transition: color 0.5s $cubic-ease;
        }
      }
    }
    &-wrapper {
      position: relative;
      border: 0.2rem solid $color--light;
      width: 100%;
      height: 100%;
      transition: border 0.5s $cubic-ease;
      &--error {
        border: 0.2rem solid $color--red-2;
        i {
          color: $color--red-2;
        }
        .headlines__cover-edit {
          background: $color--red-2;
        }
      }
      &:hover {
        border: 0.2rem solid $color--yellow;
        i {
          color: $color--yellow;
        }
      }
      img {
        width: 100%;
      }
    }
    &-edit {
      position: absolute;
      top: -0.2rem;
      left: -0.2rem;
      z-index: 10;
      width: 15rem;
      height: 5rem;
      background: white;
      display: flex;
      padding-left: 1rem;
      padding-top: 1rem;
      -webkit-clip-path: url("#clip-upload-btn-2");
      clip-path: url("#clip-upload-btn-2");
      span {
        font-size: 2rem;
        font-family: $font-family--main;
        transition: color 0.3s;
      }
      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        background: $color--yellow;
        width: 0;
        height: 100%;
        transition: width 0.5s $cubic-ease;
      }
    }
    &-uploader {
      width: 100%;
      height: 100%;
      overflow: hidden;
      img {
        transform: scale(1.2);
      }
      .el-upload {
        width: 100%;
        height: 100%;
      }
      &:hover {
        .headlines__cover-edit {
          color: $color--light;
          &:before {
            width: 100%;
          }
        }
      }
    }
  }

  .book-details__background {
    position: relative;
    -webkit-clip-path: url("#clip-headlines-background");
    clip-path: url("#clip-headlines-background");
    background-color: $color--brown;
    grid-column: 1 / span 4;
    grid-row: 1 / span 8;
    display: flex;
    align-items: center;
    justify-content: center;
    &:before {
      content: '';
      background: $color--brown;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      z-index: 1;
      opacity: 0.8;
      transition: opacity 0.3s;
    }
    &-image {
      height: 100%;
    }
    &-uploader {
      position: absolute;
      top: 5rem;
      left: 0rem;
      z-index: 10;
      width: 20rem;
      height: 5rem;
      background: white;
      -webkit-clip-path: url("#clip-upload-btn-1");
      clip-path: url("#clip-upload-btn-1");
      display: flex;
      align-items: center;
      .el-upload {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      &:hover {
        span {
          color: $color--light;
        }
        &:before {
          width: 100%;
        }

      }
      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        background: $color--yellow;
        width: 0;
        height: 100%;
        transition: width 0.5s $cubic-ease;
      }
      span {
        font-size: 2rem;
        font-family: $font-family--main;
        transition: color 0.3s;
      }
    }
  }
</style>