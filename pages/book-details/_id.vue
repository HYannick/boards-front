<template>
  <div class="book-details">
    <div class="svg-sprite">
      <svg width="0" height="0">
        <clipPath id="clip-headlines-background" clipPathUnits="objectBoundingBox">
          <path d="M0 0l1 .049-.229.778L.001 1 0 0z" fill="#383434"/>
        </clipPath>
      </svg>
      <svg width="0" height="0">
        <clipPath id="clip-steps" clipPathUnits="objectBoundingBox">
          <path class="st0" d="M7.553.999L6.688.867 6.559.222l.994-.22v.997z" transform="translate(-6.556)"/>
          <path class="st0" d="M7.55.997V.003l-.988.219.129.645.859.13M7.556 1L6.685.867 6.556.221l1-.221v1z"
                transform="translate(-6.556)"/>
        </clipPath>
      </svg>
      <svg width="0" height="0">
        <clipPath id="clip-headlines-title" clipPathUnits="objectBoundingBox">
          <path d="M0 .205L1 0 .985 1H.05L0 .205z" fill="#fff"/>
        </clipPath>
      </svg>
      <svg width="0" height="0">
        <clipPath id="clip-upload-btn-1" clipPathUnits="objectBoundingBox">
          <path d="M0 0l.909.196L1 .88 0 1V0z" fill="#fff"/>
        </clipPath>
      </svg>
      <svg width="0" height="0">
        <clipPath id="clip-upload-btn-2" clipPathUnits="objectBoundingBox">
          <path d="M0 0h1L.799.756 0 1V0z" fill="#fff"/>
        </clipPath>
      </svg>
      <svg width="0" height="0">
        <clipPath id="clip-title-1" clipPathUnits="objectBoundingBox">
          <path d="M0 .142L1 0 .909 1 .056.869 0 .142z" fill="#383434"/>
        </clipPath>
      </svg>
      <svg width="0" height="0">
        <clipPath id="clip-title-2" clipPathUnits="objectBoundingBox">
          <path d="M0 .144L1 0 .868.911.155 1 0 .144z" fill="#383434"/>
        </clipPath>
      </svg>
      <svg width="0" height="0">
        <clipPath id="clip-bg-wide" clipPathUnits="objectBoundingBox">
          <path d="M0 .105L1 0v1L0 .807V.105z" fill="#383434"/>
        </clipPath>
      </svg>
      <svg width="0" height="0">
        <clipPath id="clip-next-btn" clipPathUnits="objectBoundingBox">
          <path d="M.084.823L.497 1 .911.823 1 0H0l.084.823z" fill="none"/>
        </clipPath>
      </svg>
      <svg width="0" height="0">
        <clipPath id="clip-prev-btn" clipPathUnits="objectBoundingBox">
          <path d="M.916.177L.503 0 .089.177.001 1h1L.916.177z" fill="none"/>
          <path d="M.502.105L.15.256.081.9h.838L.853.256.502.105m0-.105l.413.177L.999 1h-1L.087.177.502 0z"
                fill="#383434"/>
        </clipPath>
      </svg>
      <svg width="0" height="0">
        <clipPath id="clip-bg-2" clipPathUnits="objectBoundingBox">
          <path d="M.998.998L.134.853.002.002l.997.044v.952z" fill="#383434"/>
        </clipPath>
      </svg>
      <svg width="0" height="0">
        <clipPath id="clip-bg-alternate" clipPathUnits="objectBoundingBox">
          <path d="M0 .093L1 0v.888L0 1V.093z" fill="#383434"/>
        </clipPath>
      </svg>
      <svg width="0" height="0">
        <clipPath id="clip-bg-preview" clipPathUnits="objectBoundingBox">
          <path d="M0 0l1 .114V.87L0 1V0z" fill="#383434"/>
        </clipPath>
      </svg>
      <svg width="0" height="0">
        <clipPath id="clip-download-bg" clipPathUnits="objectBoundingBox">
          <path d="M.102.1L1 0v.974L0 1 .102.1z" fill="#383434"/>
        </clipPath>
      </svg>
      <svg width="0" height="0">
        <clipPath id="clip-create-btn" clipPathUnits="objectBoundingBox">
          <path d="M0 .085L1 0 .914 1 .06.836 0 .085z" fill="#f5d281"/>
        </clipPath>
      </svg>
    </div>
    <headline :headlines="headlines"></headline>
    <div class="rellax"></div>
  </div>
</template>
<script>
  import Rellax from 'rellax'
  import Headline from '~/components/book-details/Headline.vue'
  import config from '~/config'

  export default {
    middleware: 'authenticated',
    components: {
      Headline
    },
    transition: {
      name: 'fade',
    },

    async mounted() {
      try {
        const book = await this.$axios.$get(`http://localhost:5000/api/v1/book/${this.$route.params.id}/details`)
        this.book = book
      } catch (e) {
        console.log({error: e.message})
      }
      this.$nextTick(() => {
        this.rellax = new Rellax('.rellax')
        this.rellax.refresh()
      })
    },
    data() {
      return {
        book: {}
      }
    },
    computed: {
      headlines() {
        const {title, img_title, tome_title, description, cover, background_cover} = this.book
        return {
          title,
          vector: `${config.S3URL}/${img_title}`,
          tome_title,
          description,
          cover: `${config.S3URL}/${cover}`,
          background_cover:  `${config.S3URL}/${background_cover}`,
        }
      }
    },

    methods: {

    }
  }
</script>

<style lang="scss">
  .book-details {
    margin-top: $header-offset;
    .svg-sprite {
      position: absolute;
    }
  }
</style>