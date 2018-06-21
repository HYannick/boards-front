<template>
  <el-row class="headlines container-wide">
    <el-form class="headlines__wrapper" :model="headline_form" :rules="rules" ref="headline_form" label-position="top">
      <div class="headlines__background">
        <el-upload
          class="headlines__background-uploader"
          :show-file-list="false"
          action=""
          :http-request="postBackground">
          <span>Edit Background</span>
        </el-upload>
        <div class="headlines__background-image rellax"
             :style="{backgroundImage: backgroundUrl ? `url(${backgroundUrl}`: 'none'}">
        </div>
      </div>
      <div class="headlines__cover">
        <div data-rellax-speed="2" class="headlines__cover-img rellax"
             :class="{'headlines__cover-img--empty': !coverUrl}">
          <div class="headlines__cover-wrapper" :class="{'headlines__cover-wrapper--error': noCover}">
            <el-upload
              class="headlines__cover-uploader"
              :show-file-list="false"
              action=""
              :http-request="postCover">
              <div class="headlines__cover-edit">
                <span>Edit Cover</span>
              </div>
              <i class="el-icon-plus avatar-uploader-icon" v-if="!coverUrl"></i>
              <img :src="coverUrl"/>
            </el-upload>
          </div>
        </div>
      </div>
      <div class="headlines__title">
        <h2>What's the headline?</h2>
      </div>
      <div class="headlines__form">
        {{coverUrl}}
        <el-form-item class="form__input" label="Vector Title">
          <el-upload
            class="headlines__form-uploader"
            :show-file-list="false"
            action=""
            :http-request="postVector">
            <img :src="vectorUrl"/>
            <i class="el-icon-plus avatar-uploader-icon" v-if="!vectorUrl"></i>
          </el-upload>
        </el-form-item>
        <el-form-item class="form__input" prop="title" label="Title">
          <el-input name="title" type="text" v-model="headline_form.title" placeholder="Type the book title"></el-input>
        </el-form-item>
        <el-form-item class="form__input" prop="tome_title" label="Tome Title">
          <el-input name="tome_title" type="text" v-model="headline_form.tome_title"
                    placeholder="Type the tome title"></el-input>
        </el-form-item>
      </div>
      <div class="headlines__next">
        <next-arrow @click.prevent="submitHeadlines"></next-arrow>
      </div>
    </el-form>
  </el-row>
</template>
<script>
  import {mapState, mapMutations, mapActions} from 'vuex'
  import {snakeCase, isEmpty} from 'lodash'
  import NextArrow from '~/components/NextArrow.vue'
  import BackArrow from '~/components/backArrow.vue'

  export default {
    components: {
      NextArrow,
      BackArrow
    },
    created() {
      this.$nextTick(() => {
        const {title, img_title, tome_title, cover, background_cover} = this.book_form
        const updatedData = {
          title,
          img_title,
          tome_title,
          cover,
          background_cover,
        }
//        console.log(cover.file)
//        this.coverUrl = cover ? URL.createObjectURL(cover.file) : ''
//        this.backgroundUrl = background_cover ? URL.createObjectURL(background_cover.file) : ''
//        this.vectorUrl = img_title ?  URL.createObjectURL(img_title.file) : ''

        Object.assign(this.headline_form, updatedData)
      })
    },
    computed: {
      ...mapState('book_create', ['book_form']),
    },
    data() {
      return {
        coverUrl: '',
        backgroundUrl: '',
        vectorUrl: '',
        noCover: false,
        headline_form: {
          title: '',
          img_title: {},
          tome_title: '',
          cover: {},
          background_cover: {},
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
    methods: {
      ...mapMutations('book_create', ['updateBookForm', 'updateActiveStep']),
      ...mapActions('book_create', ['createMediaUrls']),

      postBackground(data) {
        this.backgroundUrl = URL.createObjectURL(data.file);
        this.headline_form.background_cover = data.file
      },
      postCover(data) {
        console.log(data.file)
        this.coverUrl = URL.createObjectURL(data.file);
        this.headline_form.cover = data.file
        this.noCover = false
      },
      postVector(data) {
        this.vectorUrl = URL.createObjectURL(data.file);
        this.headline_form.img_title = data.file
      },
      submitHeadlines() {
        this.$refs['headline_form'].validate((valid) => {
          if (valid) {
            if (isEmpty(this.headline_form.cover)) {
              this.noCover = true
              this.$notify.error({
                title: 'Error',
                message: 'Please provide a cool cover :)'
              });
              return
            }
            this.noCover = false
            this.updateBookForm(this.headline_form)
            this.createMediaUrls({
              cover: this.headline_form.cover,
              background_cover: this.headline_form.background_cover,
              img_title: this.headline_form.img_title,
              slug: `${snakeCase(this.headline_form.title)}/${snakeCase(this.headline_form.tome_title)}`,
            })
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
  .headlines__wrapper {
    display: grid;
    grid-template-columns: 0.5fr 30rem 10rem 20rem 1fr 1fr 1fr 0.5fr;
    grid-template-rows: 6rem 10rem 5rem 10rem 25rem 5rem 30rem;
  }

  form {
    label {
      padding: 0;
      font-family: $font-family--main;
    }
  }

  .headlines__next {
    grid-column: 7;
    grid-row: 5;
    display: flex;
    align-items: flex-end;
    margin-left: 1rem;
  }
  .headlines__form {
    grid-column: 5 / span 2;
    grid-row: 4;
    &-uploader {
      border: 0.2rem solid $color--dark;
      height: 10rem;
      .el-upload {
        width: 100%;
        height: 100%;
        i {
          position: absolute;
          top: 50%;
          font-size: 3rem;
          left: 50%;
          transform: translate(-50%, -50%);
          color: $color--brown;
          transition: color 0.5s $cubic-ease;
        }
      }
      img {
        height: 100%;
      }
    }
  }

  .headlines__title {
    -webkit-clip-path: url("#clip-headlines-title");
    clip-path: url("#clip-headlines-title");
    background-color: $color--light;
    grid-column: 4 / span 2;
    grid-row: 2 / span 2;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    h2 {
      font-family: $font-family--main;
      font-size: 4rem;
      color: $color--dark;
      margin-top: 1rem;
      margin-left: 4rem;
      letter-spacing: 0.4rem;
    }
  }

  .headlines__cover {
    position: relative;
    grid-column: 2 / span 1;
    grid-row: 3 / span 4;
    &-img {
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      height: 100%;
      &--empty {
        background: transparentize($color--yellow, 0.5);
        i {
          position: absolute;
          top: 50%;
          font-size: 3rem;
          left: 50%;
          transform: translate(-50%, -50%);
          color: $color--light;
          transition: color 0.5s $cubic-ease;
        }
      }
    }
    &-wrapper {
      position: relative;
      border: 0.2rem solid $color--light;
      width: 100%;
      height: 100%;
      transition: border 0.5s $cubic-ease;
      &--error {
        border: 0.2rem solid $color--red-2;
        i {
          color: $color--red-2;
        }
        .headlines__cover-edit {
          background: $color--red-2;
        }
      }
      &:hover {
        border: 0.2rem solid $color--yellow;
        i {
          color: $color--yellow;
        }
      }
      img {
        width: 100%;
      }
    }
    &-edit {
      position: absolute;
      top: -0.2rem;
      left: -0.2rem;
      z-index: 10;
      width: 15rem;
      height: 5rem;
      background: white;
      display: flex;
      padding-left: 1rem;
      padding-top: 1rem;
      -webkit-clip-path: url("#clip-upload-btn-2");
      clip-path: url("#clip-upload-btn-2");
      span {
        font-size: 2rem;
        font-family: $font-family--main;
        transition: color 0.3s;
      }
      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        background: $color--yellow;
        width: 0;
        height: 100%;
        transition: width 0.5s $cubic-ease;
      }
    }
    &-uploader {
      width: 100%;
      height: 100%;
      overflow: hidden;
      img {
        transform: scale(1.2);
      }
      .el-upload {
        width: 100%;
        height: 100%;
      }
      &:hover {
        .headlines__cover-edit {
          color: $color--light;
          &:before {
            width: 100%;
          }
        }
      }
    }
  }

  .headlines__background {
    position: relative;
    -webkit-clip-path: url("#clip-headlines-background");
    clip-path: url("#clip-headlines-background");
    background-color: $color--brown;
    grid-column: 1 / span 4;
    grid-row: 1 / span 8;
    &:before {
      content: '';
      background: $color--brown;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      z-index: 1;
      opacity: 0.8;
      transition: opacity 0.3s;
    }
    &-image {
      width: 100%;
      height: 100%;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
    }
    &-uploader {
      position: absolute;
      top: 5rem;
      left: 0rem;
      z-index: 10;
      width: 20rem;
      height: 5rem;
      background: white;
      -webkit-clip-path: url("#clip-upload-btn-1");
      clip-path: url("#clip-upload-btn-1");
      display: flex;
      align-items: center;
      .el-upload {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      &:hover {
        span {
          color: $color--light;
        }
        &:before {
          width: 100%;
        }

      }
      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        background: $color--yellow;
        width: 0;
        height: 100%;
        transition: width 0.5s $cubic-ease;
      }
      span {
        font-size: 2rem;
        font-family: $font-family--main;
        transition: color 0.3s;
      }
    }
  }
</style>