<template>
  <div class="book-details__headline">
    <div class="book-details__background">
      <div class="book-details__background-image rellax">
        <img :src="headlines.background_cover"/>
      </div>
    </div>
    <div class="book-details__cover">
      <div class="book-details__cover-img">
        <div class="headlines__cover-wrapper">
          <div class="stack__deco"><img width="100%" :src="headlines.cover"/></div>
          <div class="stack__deco"><img width="100%" :src="headlines.cover"/></div>
          <div class="stack__deco"><img width="100%" :src="headlines.cover"/></div>
          <div class="stack__deco"><img width="100%" :src="headlines.cover"/></div>
          <div class="stack__deco"><img width="100%" :src="headlines.cover"/></div>
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
      <div class="book-details__checkout">
        <el-slider v-model="price"
                   :min="headlines.min_price"
                   :max="headlines.max_price"
                   show-input></el-slider>
        <!--<el-slider :value="earnings"-->
                   <!--:min="headlines.min_price - earns"-->
                   <!--:max="headlines.max_price"-->
                   <!--show-input-->
                   <!--:show-input-controls="false"-->
                   <!--disabled></el-slider>-->
      </div>
    </div>
  </div>
</template>
<script>
  import HeadingTitle from '~/components/HeadingTitle.vue'

  export default {
    props: ['headlines'],
    components: {
      HeadingTitle
    },
    mounted() {
      this.$nextTick(() => {
        const stackList = Array.from(document.querySelectorAll('.stack__deco'))
        stackList.forEach((stack, i) => {
          stack.style.transform = `translate(${1 * i * 5}px, ${1 * i * 5}px)`
        })
      })
    },
    data() {
      return {
        price: this.headlines.min_price || 0,
        earns: 0.45
      }
    },
    computed: {
      earnings() {
        return this.price - this.earns
      }
    }
  }
</script>
<style lang="scss">
  .book-details {
    .el-slider.el-slider--with-input {
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
      justify-content: center;
      & > div {
        float: none;
      }
    }
    .el-slider__button-wrapper {
      top: 50%;
      transform: translate(-50%, -50%);
    }
    .el-slider__button {
      width: 1.2rem;
      height: 100%;
      border: 0.3rem solid $color--yellow;
      background-color: $color--light;
      border-radius: 0.2rem;
    }
    .el-slider__bar {
      height: 2.5rem;
      background-color: $color--yellow;
    }
    .el-slider__runway {
      height: 2.5rem;
      margin: 0 2rem 0 0;
      background-color: $color--brown;
      flex: 1;
    }
  }
  .book-details__headline {
    display: grid;
    grid-template-columns: 0.5fr 30rem 10rem 20rem 1fr 1fr 1fr 0.5fr;
    grid-template-rows: 6rem 10rem 5rem 10rem 25rem 5rem 30rem;
  }

  .book-details__synopsis {
    grid-column: 5 / span 3;
    grid-row: 5;
    padding-top: 4rem;
    p {
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
      .stack__deco {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transform-origin: 50% 100%;
      }

      .stack__deco:first-child {
        opacity: 0.2;
      }

      .stack__deco:nth-child(2) {
        opacity: 0.4;
      }

      .stack__deco:nth-child(3) {
        opacity: 0.6;
      }

      .stack__deco:nth-child(4) {
        opacity: 0.8;
      }

      .stack__deco:nth-child(5) {
        opacity: 1;
      }
    }
    &-wrapper {
      position: relative;
      border: 0.2rem solid $color--light;
      width: 100%;
      height: 100%;
      transition: border 0.5s $cubic-ease;

      img {
        width: 100%;
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
    img {
      transform: scale(1.4);
    }
  }
</style>