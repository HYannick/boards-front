<template>
  <div class="author-card container">
    <div class="svg-sprite">
      <svg width="0" height="0">
        <clipPath id="clip-avatar-author" clipPathUnits="objectBoundingBox">
          <path d="M.2.1L1 0 .9.9 0 1 .2.1z" fill="#383434"/>
        </clipPath>
      </svg>
      <svg width="0" height="0">
        <clipPath id="clip-bg-author" clipPathUnits="objectBoundingBox">
          <path d="M0 0l.8.1.2.8L0 1V0z" fill="#383434"/>
        </clipPath>
      </svg>
    </div>
    <div class="author-card__media">
      <div class="author-card__background">
        <div class="rellax" data-rellax-speed="-0.5" data-rellax-percentage="0.1">
          <img width="100%" :src="author.background_img"/>
        </div>
      </div>
      <div class="author-card__content rellax" data-rellax-speed="0.7">
        <h2>{{author.username}}</h2>
        <div class="author-card__avatar">
          <img :src="author.profile_img"/>
        </div>
      </div>
    </div>
    <div class="author-card__desc">
      <heading-title data-text="The Author" align="right" style="text-align: right">Who wrote this?</heading-title>
      <p>{{author.bio}}</p>
    </div>
  </div>
</template>

<script>
  import HeadingTitle from "./HeadingTitle";

  export default {
    components: {HeadingTitle},
    props: ['author']
  }
</script>


<style lang="scss">
  .author-card {
    margin-top: 20rem;
    display: flex;
    align-items: flex-start;
    justify-content: center;
  }

  .author-card__media {
    flex: 1;
    height: 60rem;
    position: relative;
    margin-right: 4rem;
    .author-card__background {
      -webkit-clip-path: url("#clip-bg-author");
      clip-path: url("#clip-bg-author");
      width: 100%;
      height: 100%;
      background: $color--brown;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
        background: $color--brown;
        opacity: 0.8;
      }
      img {
        transform: scale(2);
      }
    }
    .author-card__name {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 1;
    }
    .author-card__content {
      position: absolute;
      top: 50%;
      right: 0;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      transform: translateY(-50%);
      h2 {
        flex: 1;
        font-size: 6rem;
        font-family: $font-family--main;
        color: $color--yellow;
        text-align: right;
        margin-right: 1rem;
      }
    }
    .author-card__avatar {
      flex: 1;
      width: 25rem;
      height: 30rem;
      -webkit-clip-path: url("#clip-avatar-author");
      clip-path: url("#clip-avatar-author");
      img {
        width: 100%;
      }
    }
  }

  .author-card__avatar {
    width: 20rem;
    height: 20rem;
    -webkit-clip-path: url("#clip-avatar-author");
    clip-path: url("#clip-avatar-author");
    img {
      width: 100%;
    }
  }

  .author-card__desc {
    flex: 1;
    min-height: 60rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>