<template>
  <div class="ressources container-wide">
    <el-col :span="16" :offset="6">
      <div class="ressources__container">
        <div class="ressources__title" data-rellax-speed="0.5">
          <h2>Alright. Put some ressources here!</h2>
        </div>

        <button class="ressources__btn-create" @click.prevent="submitUpload">
          <span>Create!</span>
        </button>
        <back-arrow class="ressources__form-btn ressources__form-btn-prev" @click.prevent="goBack"></back-arrow>
        <el-upload
          class="ressources__upload"
          ref="upload"
          action=""
          multiple
          drag
          :http-request="uploadZip"
          :on-remove="handleRemove"
          :before-upload="checkFileExtension">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
          <div class="el-upload__text"><em>.CBR Only!</em></div>
          <div class="el-upload__tip" slot="tip">cbr files only!</div>
        </el-upload>
      </div>
    </el-col>
  </div>
</template>
<script>
  import {mapState, mapMutations, mapActions} from 'vuex'
  import {snakeCase, findIndex} from 'lodash'
  import BackArrow from '~/components/BackArrow.vue'

  export default {
    components: {
      BackArrow
    },
    data() {
      return {
        files: [],
        scrollOpts: {
          easing: [0.8, 0, 0.2, 1],
          offset: -100,
          cancelable: false,
          x: false,
          y: true
        },
      }
    },
    computed: {
      ...mapState('book_create', ['book_form']),
    },
    methods: {
      ...mapMutations('book_create', ['updateBookForm', 'updateActiveStep']),
      ...mapActions('book_create', ['createMultipleMediaUrls', 'createBook']),
      handleRemove(file, fileList) {
        const index = findIndex(this.files, {'uid': file.uid})
        if (index > -1) {
          this.files.splice(index, 1)
        }
      },
      goBack() {
        this.$emit('navigate', 'transitionYDown')
        this.updateActiveStep('down')
      },
      checkFileExtension(file) {

      },
      uploadZip(data) {
        this.files.push(data.file)
      },
      async submitUpload() {

        if (!this.files.length) {
          this.$notify.error({
            title: 'No ressources provided.',
            message: 'Please provide a some ressources.'
          });
          return
        }
        await this.createMultipleMediaUrls({
          name: 'ressources',
          data: this.files,
          slug: `${snakeCase(this.book_form.title)}/${snakeCase(this.book_form.tome_title)}`,
        })
        this.createBook().then(message => {
          this.$notify(message)
        }).catch(message => {
          this.$notify(message)
        })

      }
    }
  }
</script>
<style lang="scss">
  .ressources {
    margin-top: 10rem;
    height: 100vh;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    flex-direction: column;
    position: relative;
    &__form-btn {
      position: absolute;
      &-prev {
        top: 15rem;
        left: -5rem;
      }
    }
    label {
      color: $color--light;
    }
    .ressources__btn-create {
      -webkit-clip-path: url("#clip-create-btn");
      clip-path: url("#clip-create-btn");
      background: $color--yellow;
      border: none;
      padding: 1rem 2rem;
      width: 20rem;
      height: 10rem;
      font-size: 3rem;
      font-family: $font-family--main;
      cursor: pointer;
      position: absolute;
      bottom: 10rem;
      left: -30rem;
      z-index: 1;
      transition: color 0.7s $cubic-ease;
      &:hover{
        &:before {
          width: 100%;
        }
        color: $color--yellow;
      }
      &:before {
        content: '';
        width: 0;
        height: 100%;
        background: $color--brown;
        position: absolute;
        top: 0;
        left: 0;
        transition: width 0.7s $cubic-ease;
        z-index: -1;
      }
    }
    .ressources__container {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
    .ressources__upload {
      width: 100%;
      height: 65rem;
      .el-upload {
        width: 100%;
        height: 100%;
      }
      .el-upload-dragger {
        width: 100%;
        height: 100%;
        -webkit-clip-path: url("#clip-download-bg");
        clip-path: url("#clip-download-bg");
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        border: 1px solid $color--yellow;
        border-radius: 0;
        background: $color--brown;
        i {
          color: $color--light;
        }
      }
      .el-upload__text {
        color: $color--light;
        font-family: $font-family--main;
        em {
          color: $color--yellow;
        }
      }
      .el-upload__tip {
        color: $color--light;
      }
      .el-upload-list {
        position: absolute;
        bottom: 35px;
        left: 50%;
        transform: translateX(-50%);
        overflow-y: scroll;
        height: 20rem;
        padding: 1rem;
        li {
          border-radius: 0;
        }
        a {
          border-radius: 0;
          color: $color--yellow;
          &:hover {
            color: $color--brown;
          }
        }
      }
    }
  }

  .ressources__title {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    margin: 0 auto;
    -webkit-clip-path: url("#clip-title-1");
    clip-path: url("#clip-title-1");
    background: $color--yellow;
    color: $color--brown;
    padding: 2.5rem 5rem 2.5rem 3rem;
    max-width: 50rem;
    width: 100%;
    font-size: 2.5rem;
    letter-spacing: 0.3rem;
    font-family: $font-family--main;
  }
</style>