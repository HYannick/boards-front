<template>
  <div class="previews-carousel">
    <div class="previews-carousel__head">
      <heading-title data-text="Previews" align="left">Previews</heading-title>
    </div>
    <!-- You can find this swiper instance object in current component by the "mySwiper"  -->
    <div class="previews-carousel__swiper" v-swiper:mySwiper="swiperOption">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="preview in previews" :key="preview.id">
          <div class="swiper-inner">
            <img width="100%" :src="preview.url"/>
          </div>
        </div>
      </div>
      <div class="swiper-pagination swiper-pagination-bullets"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </div>
  </div>
</template>

<script>
  import HeadingTitle from "./HeadingTitle";

  export default {
    components: {HeadingTitle},
    props: ['previews'],
    data() {
      return {
        swiperOption: {
          loop: true,
          speed: 700,
          grabCursor: true,
          watchSlidesProgress: true,
          slidesPerView: 6,
          initialSlide: 2,
          init: false,
          centeredSlides: true,
          spaceBetween: 15,
          pagination: {
            el: '.swiper-pagination',
            dynamicBullets: true
          },
          on: {
            progress() {
              const swiper = this;
              const interleaveOffset = 0.5;
              Array.from(swiper.slides).forEach(slide => {
                const slideProgress = slide.progress;
                const innerOffset = (swiper.width / swiper.slides.length) * interleaveOffset;
                const innerTranslate = slideProgress * innerOffset;
                slide.querySelector("img").style.transform =
                  "translate3d(" + innerTranslate + "px, 0, 0)  scale(1.5)";
              })
            },
            touchStart() {
              const swiper = this;
              Array.from(swiper.slides).forEach(slide => {
                slide.style.transition = "";
              })
            },
            setTransition(speed) {
              const swiper = this;
              Array.from(swiper.slides).forEach(slide => {
                slide.style.transition = speed + "ms";
                slide.style.transitionTimingFunction = 'cubic-bezier(0.8, 0, 0.2, 1)'
                slide.querySelector("img").style.transition = speed + "ms";
                slide.querySelector("img").style.transitionTimingFunction = 'cubic-bezier(0.8, 0, 0.2, 1)'
              })
            }
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        }
      }
    },
    mounted() {
      console.log('This is current swiper instance object', this.mySwiper)
    },
    updated() {
      console.log('updated')
      this.mySwiper.init()
    }
  }
</script>


<style lang="scss" scoped>
  .previews-carousel__head {
    margin: 10rem 0 2rem;
    padding: 0 15rem;
  }

  .swiper-wrapper {
    transition-timing-function: $cubic-ease;
  }
  .previews-carousel__swiper {
    height: 35rem;
    width: 100%;
    .swiper-slide {
      text-align: center;
      opacity: 0.2;
      font-size: 38px;
      font-weight: 700;
      background-color: #eee;
      display: flex;
      justify-content: center;
      align-items: center;

      transition: opacity 0.3s;
      .swiper-inner {
        overflow: hidden;
        width: 100%;
        height: 100%;
        img {
          transform: scale(1.4);
        }
      }

      &.swiper-slide-active, &.swiper-slide-prev, &.swiper-slide-next {
        opacity: 1;
      }
    }
    .swiper-pagination {
      > .swiper-pagination-bullet {
        background-color: red;
      }
    }
  }
</style>