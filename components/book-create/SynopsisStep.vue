<template>
  <el-row class="synopsis container">
    <el-col :span="16" :offset="4" class="synopsis-col">
      <div class="synopsis__title rellax" data-rellax-speed="0.5">
        <h2>What about the story?</h2>
      </div>
      <el-button class="prev-btn" @click="goBack">
        <span>Previous</span>
      </el-button>
      <el-form :model="synopsis_form" :rules="rules" ref="synopsis_form" label-position="top">
        <el-form-item class="form__input" label="Short Description" prop="short_description">
          <el-input name="short_description" type="textarea" v-model="synopsis_form.short_description"
                    placeholder="A little description about your book"></el-input>
        </el-form-item>
        <el-form-item class="form__input" label="Synopsis" prop="description">
          <el-input name="description" type="textarea" :rows="6" v-model="synopsis_form.description"
                    placeholder="Type the story here"></el-input>
        </el-form-item>
        <el-button class="next-btn" @click="submitSynopsis">
          <span>Next</span>
        </el-button>
      </el-form>
    </el-col>
  </el-row>
</template>
<script>
  import {mapState, mapMutations} from 'vuex'
  export default {
    data() {
      return {
        scrollOpts: {
          easing: [0.8, 0, 0.2, 1],
          offset: -100,
          cancelable: false,
          x: false,
          y: true
        },
        synopsis_form: {
          short_description: '',
          description: '',
        },
        rules: {
          short_description: [
            {required: true, message: 'Please enter a short description :)', trigger: 'blur'}
          ],
          description: [
            {required: true, message: 'Please enter a synopsis', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      ...mapMutations('book_create', ['updateBookForm', 'updateActiveStep']),
      goBack() {
        this.$scrollTo('.headlines', 1000, this.scrollOpts)
        this.updateActiveStep('down')
      },
      submitSynopsis() {
        this.$refs['synopsis_form'].validate((valid) => {
          if (valid) {
            this.updateBookForm(this.synopsis_form)
            this.updateActiveStep('up')
            this.$scrollTo('.previews', 1000, this.scrollOpts)
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
    margin-top: 10rem;
    height: 100vh;
    display: flex;
    align-items: center;
    /*-webkit-clip-path: url("#clip-bg-2");*/
    /*clip-path: url("#clip-bg-2");*/
    //background: $color--brown;
   // color: $color--light;

    label {
      //color: $color--light;
    }
  }

  .synopsis-col {
    position: relative;
  }

  .synopsis__title {
    position: absolute;
    top: -10rem;
    right: -10rem;
    z-index: 1;
    -webkit-clip-path: url("#clip-title-1");
    clip-path: url("#clip-title-1");
    background: $color--yellow;
    color: $color--brown;
    padding: 2.5rem 5rem 2.5rem 3rem;
    max-width: 30rem;
    width: 100%;
    font-size: 2.5rem;
    letter-spacing: 0.3rem;
    font-family: $font-family--main;
  }
</style>