<template>
  <el-row class="pricing container">
    <el-col :span="16" :offset="1" class="pricing__wrapper">
      <el-button class="prev-btn" @click="goBack">
        <span>Previous</span>
      </el-button>
      <div class="pricing__title">
        <h2>That's great!<br>but...How much?</h2>
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
        <el-button class="next-btn" @click="submitPrices">
          <span>Next</span>
        </el-button>
      </div>
    </el-col>
  </el-row>
</template>
<script>
  import {mapState, mapMutations, mapActions} from 'vuex'

  export default {
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
        this.$scrollTo('.previews', 1000, this.scrollOpts)
        this.updateActiveStep('down')
      },
      submitPrices() {
        this.fetchPricings(this.pricing_form)
        this.updateActiveStep('up')
        this.$scrollTo('.ressources', 1000, this.scrollOpts)
      }
    }
  }
</script>
<style lang="scss">
  .pricing {
    margin-top: 10rem;
    min-height: 50vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .pricing__title {
    -webkit-clip-path: url("#clip-title-2");
    clip-path: url("#clip-title-2");
    background-color: $color--brown;
    margin: 0 auto;
    display: flex;
    align-items: center;
    max-width: 50rem;
    width: 100%;
    padding: 2rem 4rem;
    h2 {
      font-family: $font-family--main;
      font-size: 4rem;
      color: $color--light;
      margin-top: 1rem;
      margin-left: 4rem;
      letter-spacing: 0.4rem;
    }
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