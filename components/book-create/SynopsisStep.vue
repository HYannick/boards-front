<template>
  <el-row class="synopsis container">
    <el-col :span="16" :offset="4" class="synopsis-col">
      <div class="synopsis__title rellax" data-rellax-speed="0.5">
        <heading-title data-text="What about the story?" align="right">What about the story?</heading-title>
      </div>
      <el-form class="synopsis__form" :model="synopsis_form" :rules="rules" ref="synopsis_form" label-position="top">
        <back-arrow class="synopsis__form-btn synopsis__form-btn-prev" @click.prevent="goBack"></back-arrow>
        <el-form-item class="form__input" label="Short Description" prop="short_description">
          <el-input name="short_description" type="textarea" v-model="synopsis_form.short_description"
                    placeholder="A little description about your book"></el-input>
        </el-form-item>
        <el-form-item class="form__input" label="Synopsis" prop="description">
          <el-input name="description" type="textarea" :rows="6" v-model="synopsis_form.description"
                    placeholder="Type the story here"></el-input>
        </el-form-item>
        <next-arrow class="synopsis__form-btn synopsis__form-btn-next" @click.prevent="submitSynopsis"></next-arrow>
      </el-form>
    </el-col>
  </el-row>
</template>
<script>
  import {mapState, mapMutations} from 'vuex'
  import NextArrow from '~/components/NextArrow.vue'
  import BackArrow from '~/components/BackArrow.vue'
  import HeadingTitle from '~/components/HeadingTitle.vue'
  import rules from '~/assets/js/form-rules'

  export default {
    components: {
      NextArrow,
      BackArrow,
      HeadingTitle
    },
    created() {
      this.$nextTick(() => {
        const {short_description, description} = this.book_form
        const updatedData = {
          short_description,
          description
        }

        Object.assign(this.synopsis_form, updatedData)
      })
    },
    computed: {
      ...mapState('book_create', ['book_form']),
    },
    data() {
      return {
        synopsis_form: {
          short_description: '',
          description: '',
        },
        rules: {
          ...rules.bookRules()
        }
      }
    },
    methods: {
      ...mapMutations('book_create', ['updateBookForm', 'updateActiveStep']),
      goBack() {
        this.$emit('navigate', 'transitionYDown')
        this.updateActiveStep('down')
      },
      submitSynopsis() {
        this.$refs['synopsis_form'].validate((valid) => {
          if (valid) {
            this.updateBookForm(this.synopsis_form)
            this.$emit('navigate', 'transitionYUp')
            this.updateActiveStep('up')
          } else {
            return false
          }
        })
      }
    }
  }
</script>
<style lang="scss">
  .synopsis {
    height: 100vh;
    display: flex;
    align-items: center;
  }

  .synopsis-col {
    position: relative;
  }

  .synopsis__form {
    .synopsis__form-btn {
      position: absolute;
      &-prev {
        top: -2rem;
        left: -5rem;
      }
      &-next {
        bottom: -2rem;
        right: -5rem;
      }
    }
  }
  .synopsis__title {
    position: absolute;
    top: -10rem;
    right: 0;
    z-index: 1;
    max-width: 30rem;
    width: 100%;
  }
</style>