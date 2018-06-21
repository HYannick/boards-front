<template>
  <el-row class="previews container-wide">
    <div class="previews__background-image">
      <img class="rellax" data-rellax-speed="1" data-rellax-percentage="0.5" height="100%" src="/b__background.jpg"/>
    </div>
    <el-col :span="22" :offset="1" class="previews-col">
      <div class="previews__title" data-rellax-speed="0.5">
        <heading-title data-text="Cool! Some previews here?" color="white" align="left">Cool! Some previews here?</heading-title>
      </div>
      <div class="container">
        <el-col class="preview__form" :span="20" :offset="2">
          <back-arrow class="preview__form-btn preview__form-btn-prev" :reversed="true" @click.prevent="goBack"></back-arrow>
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
          <next-arrow class="preview__form-btn preview__form-btn-next" :reversed="true" @click.prevent="submitPreviews"></next-arrow>
        </el-col>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </div>
    </el-col>
  </el-row>
</template>
<script>
  import {mapState, mapMutations, mapActions} from 'vuex'
  import {snakeCase, findIndex} from 'lodash'
  import NextArrow from '~/components/NextArrow.vue'
  import BackArrow from '~/components/backArrow.vue'
  import HeadingTitle from '~/components/HeadingTitle.vue'
  export default {
    components: {
      NextArrow,
      BackArrow,
      HeadingTitle
    },
    data() {
      return {
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
        this.$emit('navigate', 'transitionYDown')
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
        this.$emit('navigate', 'transitionYUp')
        this.updateActiveStep('up')
      }
    }
  }
</script>
<style lang="scss">

  .preview__form {
    position: relative;
    .preview__form-btn {
      position: absolute;
      &-prev {
        top: 2rem;
        left: -6rem;
      }
      &-next {
        bottom: 2rem;
        right: -6rem;
      }
    }
  }
  .previews {
    position: relative;
    margin-top: 10rem;
    min-height: 100vh;
    display: flex;
    align-items: center;
    .container {
      position: relative;
    }

    &__background-image {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: -8.5rem;
      background-size: cover;
      background-repeat: no-repeat;
      overflow: hidden;
      -webkit-clip-path: url("#clip-bg-preview");
      clip-path: url("#clip-bg-preview");
      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        opacity: 0.95;
        z-index: 1;
        background: $color--brown;
      }

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
    z-index: 1;
    color: $color--light;
    padding: 2.5rem 5rem 2.5rem 3rem;
    max-width: 50rem;
    width: 100%;
    font-size: 3.5rem;
    letter-spacing: 0.3rem;
    font-family: $font-family--main;
  }
</style>