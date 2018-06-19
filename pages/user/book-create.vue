<template>
  <div class="profile">
    <el-form :model="book_form" :rules="rules" ref="book_form">
      <h2 class="profile__title">Post a Book</h2>
      <el-col :span="8">
        <el-upload
          class="avatar-uploader"
          :style="{backgroundImage: `url(${avatarUrl})`}"
          :show-file-list="false"
          action=""
          :http-request="postAvatar">
          <i class="el-icon-plus avatar-uploader-icon" v-if="!coverUrl"></i>
        </el-upload>
      </el-col>
      <el-col :span="16">
        <el-form-item class="form__input" prop="title">
          <el-input name="title" type="text" v-model="book_form.title" placeholder="Book Title"></el-input>
        </el-form-item>
        <el-form-item class="form__input" prop="tome_title">
          <el-input name="tome_title" type="text" v-model="book_form.tome_title" placeholder="Tome Title"></el-input>
        </el-form-item>
        <el-form-item class="form__input" prop="short_description">
          <el-input name="short_description" type="textarea" v-model="book_form.short_description"
                    placeholder="Short Description"></el-input>
        </el-form-item>
        <el-form-item class="form__input" prop="description">
          <el-input name="description" type="textarea" v-model="book_form.description"
                    placeholder="Description"></el-input>
        </el-form-item>

        <el-form-item class="form__input" prop="min_price">
          <el-input name="min_price" type="number" v-model="book_form.min_price" placeholder="Min price"></el-input>
        </el-form-item>
        <el-form-item class="form__input" prop="max_price">
          <el-input name="max_price" type="number" v-model="book_form.max_price" placeholder="Max price"></el-input>
        </el-form-item>

        <div class="form__input">
          <button type="submit" class="b-btn">Register</button>
        </div>
        <el-form-item>
          <el-button class="b-btn" @click="createBook()">Create the book</el-button>
        </el-form-item>
      </el-col>
    </el-form>
  </div>
</template>
<script>
  import {mapState, mapActions} from 'vuex'
  import formRules from '~/assets/js/form-rules'

  export default {
    mounted() {

    },
    data() {
      return {
        coverUrl: '',
        book_form: {
          title: '',
          img_title: null,
          tome_title: '',
          short_description: '',
          description: '',
          cover: '',
          background_cover: '',
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
    },

    methods: {
      ...mapActions('user', ['updateUserInfos', 'uploadAvatar']),
//      postAvatar(target) {
//        const {file} = target
//        this.uploadAvatar(file).then((message) => {
//          this.updatePreview(file)
//          this.$notify(message)
//        }).catch(message => {
//          this.$notify(message)
//        })
//
//      },

      updatePreview(file) {
        this.coverUrl = URL.createObjectURL(file);
      },

      createBook() {
        this.$refs['book_form'].validate((valid) => {
          if (valid) {
            this.updateUserInfos(this.book_form).then(message => {
              this.$notify(message)
            })
          } else {
            return false
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  .profile {
    svg {
      position: absolute;
    }
    .avatar-uploader {
      max-width: 25rem;
      width: 100%;
      -webkit-clip-path: url("#clip-new-avatar");
      clip-path: url("#clip-new-avatar");
      position: relative;
      overflow: hidden;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      background-color: $color--yellow;
      transition: border 0.3s, opacity 0.3s;
      &:hover {
        border-color: $color--yellow;
        opacity: 0.8;
      }
    }
    .avatar-uploader .el-upload {
      cursor: pointer;
      position: relative;
      overflow: hidden;
      width: 100%;
      min-height: 35rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .avatar-uploader-icon {
      font-size: 28px;
      color: $color--dark;
      text-align: center;
    }

    .avatar {
      width: 100%;
      display: block;
    }
  }
</style>