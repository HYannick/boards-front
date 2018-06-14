<template>
  <div class="b-carousel">
    <div class="b-carousel__title"><h2>Featured</h2></div>
    <div class="b-carousel__controls">
        <button class="b-carousel__controls-item--prev">Prev</button>
      <button class="b-carousel__controls-item--next">Next</button>
    </div>
    <div class="b-carousel__item" v-for="(item, index) in data" :key="index">
      <div class="b-carousel__item-background">
        <svg class="bg-svg" viewBox="0 0 1 1">
          <clipPath id="clip-polygon" clipPathUnits="objectBoundingBox">
            <path d="M.443.839L.63.209 1 .102V1L.443.839zM0 .085L.668 0 .401.844 0 .921V.085z" fill="#383434"/>
          </clipPath>
        </svg>
        <div class="b-carousel__item-background-img">
          <img data-rellax-speed="-4" class="rellax" :src="item.background_cover"/>
        </div>
      </div>
      <div class="b-carousel__item-content">
        <h1 class="b-carousel__item-title">{{item.title}}</h1>
        <!--<img class="b-carousel__item-title-img" :src="item.img_title" v-else/>-->
        <h3 class="b-carousel__item-description">{{item.short_description}}</h3>
      </div>
      <div class="b-carousel__item-pricings">
        <div class="price__range">
          <div class="price__range-min">
            <span class="price">{{item.min_price}}€</span>
            <span class="label">Min</span>
          </div>
          <div class="price__range-max">
            <span class="price">{{item.max_price}}€</span>
            <span class="label">Max</span>
          </div>
        </div>
        <el-button class="b-carousel__item-discover-btn">Discover</el-button>
      </div>
      <div class="b-carousel__item-cover">
        <div class="b-carousel__item-cover-wrapper">
          <img :src="item.cover"/>
        </div>
      </div>
      <div class="b-carousel__indicator">Indicator</div>
    </div>
  </div>
</template>
<script>
  import _ from 'lodash'
  import Rellax from 'rellax'
  import ImagesLoaded from 'imagesloaded'
  import Slider from '~/assets/js/slider/Slider.js'

  export default {
    data() {
      return {
        DOM: {el: null},
        data: [
          {
            title: 'Les Naufragés d\'YthaQ',
            img_title: '/mock/mock_logo.svg',
            short_description: 'Un homme, deux femmes : trois naufragés sur une planète pleine de dangers !',
            cover: '/mock/916hF0GKoSL.jpg',
            background_cover: '/mock/916hF0GKoSL.jpg',
            min_price: 5.00,
            max_price: 10.50,
          },
          {
            title: 'Ekhö: Monde Mirroir',
            img_title: '/mock/mock_logo.svg',
            short_description: 'On peut faire du cinéma sans électricité ! C’est ce que découvrent Fourmille Gratule et Yuri, de passage à Hollywood pour signer dans leur agence l’immense star Norma-Jean.',
            cover: '/mock/ekho.jpg',
            background_cover: '/mock/barbucci-couverture-3kj0.jpg',
            min_price: 2.00,
            max_price: 7.50,
          },
          {
            title: 'THORGAL',
            img_title: '/mock/mock_logo.svg',
            short_description: 'Thorgal and his family have left Arachnea\'s island to continue seeking a place to live in peace.',
            cover: '/mock/574333._SX1280_QL80_TTD_.jpg',
            background_cover: '/mock/455780.jpg',
            min_price: 8.00,
            max_price: 12,
          },
          {
            title: 'Sillage',
            img_title: '/mock/mock_logo.svg',
            short_description: 'On peut faire du cinéma sans électricité ! C’est ce que découvrent Fourmille Gratule et Yuri, de passage à Hollywood pour signer dans leur agence l’immense star Norma-Jean.',
            cover: '/mock/sillage08C1.jpg',
            background_cover: '/mock/sillage-comics_00428044.jpg',
            min_price: 3.00,
            max_price: 10.50,
          }
        ]
      }
    },

    mounted() {
      this.$nextTick(() => {
        ImagesLoaded(document.querySelector('body'), (instance) => {
          const rellax = new Rellax('.rellax')
          rellax.refresh()
          document.body.classList.add('loaded')
          this.DOM.el = document.querySelector('.b-carousel')
          this.DOM.el.querySelectorAll('.b-carousel__item')[0].classList.add('b-carousel__item--current')
          const carousel = new Slider(this.DOM.el)
          carousel.init()
          this.DOM.currentEl = this.DOM.el.querySelector('.b-carousel__item--current .b-carousel__item-background-img > img')

        })
      })
    },

    methods: {
    }
  }
</script>
<style lang="scss">
  $carousel--font-color: $color--light;
  $carousel--background-color: $color--brown;
  .b-carousel {
    width: 100%;
    height: 60rem;
    overflow: hidden;
    display: grid;
    grid-template-columns: 10% 5% 10% 45% 2% 25%;
    grid-template-rows: 15% 5% 10% 40% 10% auto;
  }

  .b-carousel__item {
    display: grid;
    width: 100%;
    height: 100%;
    grid-area: 1/1/8/8;
    grid-template-columns: 10% 5% 10% 45% 2% 25%;
    grid-template-rows: 15% 5% 10% 40% 6% auto;
    pointer-events: none;
    &.b-carousel__item--current {
      pointer-events: auto;
    }
    div {
      position: relative;
    }

    &:not(.b-carousel__item--current) {
      .b-carousel__item-background,
      .b-carousel__item-content h3,
      .b-carousel__item-content h1,
      .b-carousel__item-pricings,
      .b-carousel__item-cover-wrapper,
      .b-carousel__indicator {
        opacity: 0;
      }
    }
  }

  .b-carousel__title {
    grid-column: 4 / span 2;
    grid-row: 3;
    position: relative;
    display: flex;
    font-size: 3rem;
    font-family: $font-family--main;
    color: $color--font;
  }

  .b-carousel__item-title {
    &-img {
      width: 100%;
    }
  }

  .b-carousel__controls {
    position: relative;
    z-index: 1;
    grid-column: 6;
    grid-row: 2;
  }

  .b-carousel__item-background {
    grid-column: 1 / span 9;
    grid-row: 1 / span 9;

    .bg-svg {
      width: 0;
      height: 0;
    }
    &-img {
      position: relative;
      height: 60rem;
      display: flex;
      align-items: center;
      justify-content: center;
      -webkit-clip-path: url("#clip-polygon");
      clip-path: url("#clip-polygon");
      background: $carousel--background-color;
      img {
        opacity: 0.3;
        z-index: 0;
        width: 100%;
      }
    }
  }

  .b-carousel__item-pricings {
    grid-column: 2 / span 3;
    grid-row: 4;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    padding: 1rem;
  }

  .price__range {
    display: flex;
    align-items: center;
    position: relative;
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 50%;
      width: 0.2rem;
      height: 100%;
      background: transparentize($carousel--font-color, 0.5);
      transform: translateX(-50%);
    }
    & > div {
      font-family: $font-family--main;
      margin: 0 2rem;
      span {
        display: block;
        text-align: center;
      }
      .price {
        font-size: 3rem;
        color: $carousel--font-color;
      }
      .label {
        font-size: 2rem;
        color: transparentize($color--light, 0.4);
      }
    }
  }

  .b-carousel__item-content {
    grid-column: 2 / span 3;
    grid-row: 3 / span 2;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    text-align: right;
    margin-right: 2rem;
    h1 {
      font-size: 12rem;
      line-height: 10rem;
      color: $color--yellow;
      font-weight: lighter;
      font-family: $font-family--main;
     // overflow: hidden;
      span {
        margin: 0;
        display: inline-block;
        font-size: 6.5rem;
        font-weight: bold;
      }
    }
    h3 {
      margin: 2rem 0;
      display: block;
      max-width: 60rem;
      font-weight: lighter;
      font-family: $font-family--main;
      font-size: 3rem;
      color: $carousel--font-color;
    }
  }

  .b-carousel__item-cover {
    grid-column: 6;
    grid-row: 3 / span 2;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    overflow: hidden;
    position: relative;
    padding: 1rem;
    &-wrapper {
      z-index: 1;
      &:after {
        content: '';
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAOklEQVQoU43MSwoAMAgD0eT+h7ZYaOlHo7N+DNHL2HAGgBWcyGcKbqTghTL4oQiG6IUpOqFEC5bI4QD8PAoKd9j4XwAAAABJRU5ErkJggg==);
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
        transform: translate(-1rem, -1rem);
      }
    }
    img {
      width: 100%;
      position: relative;
      z-index: 1;
      //border: 0.5rem solid $color--light;
    }
  }

  .b-carousel__indicator {
    grid-column: 7;
    grid-row: 5;
  }
</style>