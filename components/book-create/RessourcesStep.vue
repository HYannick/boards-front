<template>
  <el-row class="ressources container-wide">
    <div class="ressources__background-image"
         :style="{backgroundImage: `url('/b__background.jpg')`}">
    </div>
    <el-col :span="16" :offset="4" class="ressources-col container">
      <div class="ressources__title" data-rellax-speed="0.5">
        <h2>Alright. Put some ressources here!</h2>
      </div>
      <el-button class="prev-btn prev-btn--reversed" @click="goBack">
        <span>Previous</span>
      </el-button>
      <el-upload
        class="ressources__upload"
        ref="upload"
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple
        drag
        :http-request="uploadZip"
        :on-remove="handleRemove"
        :before-upload="checkFileExtension">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
        <div class="el-upload__tip" slot="tip">cbr files only!</div>
      </el-upload>
      <el-button class="next-btn next-btn--reversed" @click="submitUpload">
        <span>Finish!</span>
      </el-button>
    </el-col>
  </el-row>
</template>
<script>
  import {mapState, mapMutations, mapActions} from 'vuex'
  import {snakeCase, findIndex} from 'lodash'
  export default {
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
        this.$scrollTo('.pricing', 1000, this.scrollOpts)
        this.updateActiveStep('down')
      },
      checkFileExtension(file) {

      },
      uploadZip(data) {
        this.files.push(data.file)
      },
      async submitUpload() {
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
        console.log('finished!')
      }
    }
  }
</script>
<style lang="scss">
  .ressources {
    margin-top: 10rem;
    height: 100vh;
    display: flex;
    align-items: center;

    &__background-image {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: -8.5rem;
      background-size: cover;
      background-repeat: no-repeat;
      -webkit-clip-path: url("#clip-bg-wide");
      clip-path: url("#clip-bg-wide");
      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        opacity: 0.9;
        background: $color--brown;
      }

    }
    color: $color--light;

    label {
      color: $color--light;
    }
    .ressources__upload {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      .el-upload {
        max-width: 50rem;
        width: 100%;
      }
      .el-upload-dragger {
        width: 100%;
        height: 30rem;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        border: 1px solid $color--yellow;
        border-radius: 0;
        background: transparentize($color--yellow, 0.5);
        i {
          color: $color--light;
        }
      }
      .el-upload__text {
        color: $color--light;
        em {
          color: $color--yellow;
        }
      }
      .el-upload__tip {
        color: $color--light;
      }
      .el-upload-list {
        color: $color--light;
        max-width: 50rem;
        width: 100%;
      }
    }
  }

  .ressources-col {
    position: relative;
  }

  .ressources__title {
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