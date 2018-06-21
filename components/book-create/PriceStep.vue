<template>
  <el-row class="pricing container">
    <el-col :span="16" :offset="1" class="pricing__wrapper">
      <back-arrow class="pricing__form-btn pricing__form-btn-prev" @click.prevent="goBack"></back-arrow>
      <div class="pricing__title">
        <heading-title data-text="That's great! but...How much?" align="center">That's great!<br>but...How much?</heading-title>
      </div>
      <div class="pricing__slider">
        <el-slider v-model="pricing_form.min_max" range></el-slider>
        <div class="pricing__table">
          <div class="pricing_min">
            <h3>Min Price</h3>
            <p>{{pricing_form.min_max[0]}}€</p>
          </div>
          <div class="pricing_max">
            <h3>Max Price</h3>
            <p>{{pricing_form.min_max[1]}}€</p>
          </div>
        </div>
        <next-arrow class="pricing__form-btn pricing__form-btn-next" @click.prevent="submitPrices"></next-arrow>
      </div>

    </el-col>
  </el-row>
</template>
<script>
  import {mapState, mapMutations, mapActions} from 'vuex'
  import NextArrow from '~/components/NextArrow.vue'
  import BackArrow from '~/components/backArrow.vue'
  import HeadingTitle from '~/components/HeadingTitle.vue'

  export default {
    components: {
      NextArrow,
      BackArrow,
      HeadingTitle
    },
    data() {
      return {
        coverUrl: '',
        scrollOpts: {
          easing: [0.8, 0, 0.2, 1],
          offset: -100,
          cancelable: false,
          x: false,
          y: true
        },
        pricing_form: {
          min_max: [5,10]
        }
      }
    },
    methods: {
      ...mapMutations('book_create', ['updateActiveStep']),
      ...mapActions('book_create', ['fetchPricings']),
      goBack() {
        this.$emit('navigate', 'transitionYDown')
        this.updateActiveStep('down')
      },
      submitPrices() {
        this.fetchPricings(this.pricing_form)
        this.$emit('navigate', 'transitionYUp')
        this.updateActiveStep('up')
      }
    }
  }
</script>
<style lang="scss">
  .pricing {
    margin-top: 10rem;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .pricing__wrapper {
    position: relative;
    .pricing__form-btn {
      position: absolute;
      &-prev {
        top: 0rem;
        left: -6rem;
      }
      &-next {
        bottom: 0rem;
        right: -6rem;
      }
    }
  }
  .pricing__title {
    margin: 0 auto;
    display: flex;
    align-items: center;
    max-width: 50rem;
    width: 100%;
    text-align: center;
    justify-content: center;
  }
  .pricing__slider {
    max-width: 40rem;
    margin: 5rem auto 0;
  }
  .pricing__table {
    display: flex;
    align-items: center;
    justify-content: center;
    > div {
      margin: 1rem 2rem;
      font-family: $font-family--main;
      text-align: center;
      h3 {
        font-size: 1.5rem;
        opacity: 0.3;
      }
      p {
        font-size: 3rem;
      }
    }
  }
</style>