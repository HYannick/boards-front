<template>
  <section class="container">
    <b-carousel></b-carousel>
    <div style="height: 300vh"></div>
  </section>
</template>

<script>
import BCarousel from '~/components/Carousel.vue'

export default {
  transition: {
    name: 'scale',
  },
  components: {
    BCarousel
  }
}
</script>
