<template>
  <section class="container-wide">
    <b-carousel></b-carousel>
    <div style="height: 300vh"></div>
  </section>
</template>

<script>
  import BCarousel from '~/components/Carousel.vue'

  export default {
    transition: {
      name: 'fade',
    },
    components: {
      BCarousel
    }
  }
</script>
