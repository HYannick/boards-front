<template>
  <div class="profile">
    <el-col :span="16">
      <el-form :model="user_form" :rules="rules" ref="user_form">
        <h2 class="profile__title">Main Infos</h2>
        <el-form-item class="form__input" prop="username">
          <el-input v-model="user_form.username" placeholder="Enter your username"></el-input>
        </el-form-item>
        <el-form-item class="form__input" prop="email">
          <el-input v-model="user_form.email" placeholder="Enter your email"></el-input>
        </el-form-item>
        <el-form-item class="form__input" prop="bio">
          <el-input type="textarea" placeholder="Tell us more about yourself!" v-model="user_form.bio">
            {{userInfos.bio || ''}}
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="b-btn" @click="updateProfile()">Update Profile</el-button>
        </el-form-item>
      </el-form>

      <el-form :model="password_form" :rules="rules" ref="password_form">
        <h2 class="profile__title">Reset Password</h2>
        <el-form-item class="form__input" prop="password">
          <el-input v-model="password_form.pasword" type="password" placeholder="Enter your new password"></el-input>
        </el-form-item>
        <el-form-item class="form__input" prop="password_confirmation">
          <el-input v-model="password_form.password" placeholder="Enter your new password again :p"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="b-btn" @click="updateProfile()">Reset Password</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <el-col :span="8"  data-rellax-speed="1" class="rellax">
      <h2 class="profile__title">Change Avatar</h2>
      <svg width="0" height="0">
        <clipPath id="clip-new-avatar" clipPathUnits="objectBoundingBox">
          <path d="M.897.767L.196 1 0 0l1 .057-.103.71z"/>
        </clipPath>
      </svg>
      <el-upload
        class="avatar-uploader"
        :style="{backgroundImage: `url(${avatarUrl})`}"
        :show-file-list="false"
        action=""
        :http-request="postAvatar">
        <i class="el-icon-plus avatar-uploader-icon" v-if="!imageUrl"></i>
      </el-upload>
    </el-col>
  </div>
</template>
<script>
  import {mapState, mapActions} from 'vuex'
  import formRules from '~/assets/js/form-rules'

  export default {
    mounted() {
      Object.assign(this.user_form, this.userInfos)
    },
    data() {
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please input the password'));
        } else {
          if (this.password_form.password_confirmation !== '') {
            this.$refs.register_form.validateField('password_confirmation');
          }
          callback();
        }
      };
      const validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please input the password again'));
        } else if (value !== this.password_form.password) {
          callback(new Error('Two inputs don\'t match!'));
        } else {
          callback();
        }
      };
      return {
        imageUrl: '',
        user_form: {
          username: '',
          email: '',
          bio: ''
        },

        password_form: {
          password: '',
          password_confirmation: ''
        },

        rules: {
          ...formRules.authRules(),
          bio: [
            {min: 20, message: 'Length should be at lease 20', trigger: 'blur'}
          ]
        }
      }
    },
    computed: {
      ...mapState('auth', ['userInfos']),
      avatarUrl() {
        return `https://s3.eu-west-3.amazonaws.com/boards-bucket/${this.userInfos.profile_img}`
      }
    },

    methods: {
      ...mapActions('user', ['updateUserInfos', 'uploadAvatar']),
      postAvatar(target) {
        const {file} = target
        this.uploadAvatar(file).then((message) => {
          this.updatePreview(file)
          this.$notify(message)
        }).catch(message => {
          this.$notify(message)
        })

      },

      updatePreview(file) {
        this.imageUrl = URL.createObjectURL(file);
      },

      updateProfile() {
        this.$refs['user_form'].validate((valid) => {
          if (valid) {
            this.updateUserInfos(this.user_form).then(message => {
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