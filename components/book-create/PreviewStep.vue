<template>
  <el-row class="previews container-wide">
    <div class="previews__background-image"
         :style="{backgroundImage: `url('/b__background.jpg')`}">
    </div>
    <el-col :span="22" :offset="1" class="previews-col">
      <div class="previews__title" data-rellax-speed="0.5">
        <h2>Cool! Some previews here?</h2>
      </div>
      <div class="container">
        <el-button class="prev-btn prev-btn--reversed" @click="goBack">
          <span>Previous</span>
        </el-button>
        <el-upload
          class="previews-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :limit="10"
          multiple
          :on-exceed="handleExceed"
          :on-preview="handlePictureCardPreview"
          :http-request="uploadPreviews"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        <el-button class="next-btn prev-btn--reversed" @click="submitPreviews">
          <span>Next</span>
        </el-button>
      </div>
    </el-col>
  </el-row>
</template>
<script>
  import {mapState, mapMutations, mapActions} from 'vuex'
  import {snakeCase, findIndex} from 'lodash'

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
        dialogImageUrl: '',
        dialogVisible: false,
        previews: []
      }
    },
    computed: {
      ...mapState('book_create', ['book_form']),
    },
    methods: {
      ...mapMutations('book_create', ['updateBookForm', 'updateActiveStep']),
      ...mapActions('book_create', ['createMultipleMediaUrls']),
      handleExceed(files, fileList) {
        this.$message.warning(`The limit is 6, you selected ${files.length} files this time, add up to ${files.length + fileList.length} totally`);
      },
      goBack() {
        this.$scrollTo('.synopsis', 1000, this.scrollOpts)
        this.updateActiveStep('down')
      },
      handleRemove(file, fileList) {
        const index = findIndex(this.previews, {'uid': file.uid})
        if (index > -1) {
          this.previews.splice(index, 1)
        }
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      uploadPreviews(data) {
        this.previews.push(data.file)
        console.log('uploading...')
      },
      submitPreviews() {
        this.updateBookForm({previews:this.previews})
        this.createMultipleMediaUrls({
          name: 'previews',
          data: this.previews,
          slug: `${snakeCase(this.book_form.title)}/${snakeCase(this.book_form.tome_title)}`,
        })
        this.updateActiveStep('up')
        this.$scrollTo('.pricing', 1000, this.scrollOpts)
      }
    }
  }
</script>
<style lang="scss">


  .previews {
    position: relative;
    margin-top: 10rem;
    min-height: 100vh;
    display: flex;
    align-items: center;
    .container {
      position: relative;
    }
    .previews__background-image {

    }
    .prev-btn {
      position: absolute;
      top: -10rem;
      left: 50%;
      transform: translateX(-50%);
    }
    &__background-image {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: -8.5rem;
      background-size: cover;
      background-repeat: no-repeat;
      -webkit-clip-path: url("#clip-bg-alternate");
      clip-path: url("#clip-bg-alternate");
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
    &-uploader {
      margin-top: 10rem;
    }
    .el-upload-list--picture-card {
      .el-upload-list__item-thumbnail {
        height: 100%;
        width: auto;
        transform: scale(1.2);
      }
      .el-upload-list__item {
        width: 15rem;
        height: 20rem;
        align-items: center;
        justify-content: center;
        border: 0.1rem solid $color--yellow;
        border-radius: 0;
      }
    }
    .el-upload--picture-card {
      width: 15rem;
      height: 20rem;
      background-color: transparentize($color--yellow, 0.7);
      border: 0.1rem solid $color--yellow;
      border-radius: 0;
      position: relative;
      > i {
        color: $color--yellow;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
  .previews-col {
    position: relative;
  }
  .previews__title {
    position: absolute;
    top: -10rem;
    z-index: 1;
    -webkit-clip-path: url("#clip-title-1");
    clip-path: url("#clip-title-1");
    background: $color--yellow;
    color: $color--brown;
    padding: 2.5rem 5rem 2.5rem 3rem;
    max-width: 40rem;
    width: 100%;
    font-size: 2.5rem;
    letter-spacing: 0.3rem;
    font-family: $font-family--main;
  }
</style>