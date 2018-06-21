<template>
  <div class="book-create">
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
    <div class="book-create__steps">
      <el-steps direction="vertical" finish-status="success" :active="activeStep">
        <el-step title="Headlines"></el-step>
        <el-step title="Synopsis"></el-step>
        <el-step title="Previews"></el-step>
        <el-step title="Pricing"></el-step>
        <el-step title="Download"></el-step>
      </el-steps>
    </div>
    <div ref="book_form">
      <transition tag="div" :name="transition_name" mode="out-in">
        <component :is="view" @navigate="changeTransitionName"></component>
      </transition>
    </div>
  </div>
</template>
<script>
  import Rellax from 'rellax'
  import {mapState, mapActions} from 'vuex'
  import formRules from '~/assets/js/form-rules'
  import HeadlineStep from '~/components/book-create/HeadlineStep.vue'
  import SynopsisStep from '~/components/book-create/SynopsisStep.vue'
  import PreviewStep from '~/components/book-create/PreviewStep.vue'
  import PriceStep from '~/components/book-create/PriceStep.vue'
  import RessourcesStep from '~/components/book-create/RessourcesStep.vue'

  export default {
    middleware: 'authenticated',
    components: {
      HeadlineStep,
      SynopsisStep,
      PreviewStep,
      PriceStep,
      RessourcesStep
    },
    transition: {
      name: 'scale',
    },
    mounted() {
      this.$nextTick(() => {
        this.rellax = new Rellax('.rellax')
        this.rellax.refresh()
      })
    },
    data() {
      return {
        coverUrl: '',
        dialogImageUrl: '',
        dialogVisible: false,
        active: 0,
        rellax: null,
        transition_name: 'transitionYUp',
        book_form: {
          title: `What's the headline?`,
          img_title: null,
          tome_title: '',
          short_description: '',
          description: '',
          cover: null,
          background_cover: null,
          min_price: 0.00,
          max_price: 0.00,
          languages: [],
          previews: [],
          rating: 0
        },
        rules: {
          title: [
            {required: true, message: 'Please enter a title :)', trigger: 'blur'}
          ],
          tome_title: [
            {required: true, message: 'Please enter a tome title :)', trigger: 'blur'}
          ]
        }
      }
    },
    computed: {
      ...mapState('auth', ['userInfos']),
      ...mapState('book_create', ['activeStep']),
      view() {
        switch(this.activeStep) {
          case 0 : return 'headline-step'
          case 1 : return 'synopsis-step'
          case 2 : return 'preview-step'
          case 3 : return 'price-step'
          case 4 : return 'ressources-step'
          default: return 'headline-step'
        }
      }
    },

    methods: {
      ...mapActions('book_create', ['updateStepStatus']),
      changeTransitionName(transition) {
        this.transition_name = transition
      },
      scrollOpts($el) {
        return {
          el: $el,
          duration: 1000,
          easing: [0.8, 0, 0.2, 1],
          offset: -100,
          cancelable: false,
          x: false,
          y: true
        }
      }
    }
  }
</script>

<style lang="scss">
  .book-create {
    margin-top: $header-offset;
    form {
      label {
        padding: 0;
        font-family: $font-family--main;
      }
    }

    .svg-sprite {
      position: absolute;
    }

    .book-create__steps {
      -webkit-clip-path: url("#clip-steps");
      clip-path: url("#clip-steps");
      position: fixed;
      z-index: 10;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      width: 11rem;
      height: 50rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background: $color--yellow;
      .el-step__head {
        width: 1.5rem;
        &.is-success {
          .el-step__icon.is-text {
            border: 2px solid $color--green-1;
          }
        }
      }
      .el-step__line {
        top: 2.5rem;
        left: 50%;
        background: $color--dark;
        transform: translateX(-50%);
      }
      .el-step__icon {
        width: 1.5rem;
        height: 1.5rem;
        font-size: 0.8rem;
        font-weight: bold;
        &.is-text {
          border: 2px solid $color--dark;
        }
      }
      div.el-step__icon-inner {
        display: none;
      }
      .el-step__title {
        font-family: $font-family--main;
        font-size: 1.2rem;
        &.is-process {

        }
        &.is-wait {
          color: transparentize($color--dark, 0.5);
        }
      }
      .el-steps--vertical {
        height: 50%;
        margin-top: 5rem
      }
    }

  }
</style>