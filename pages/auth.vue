<template>
  <div class="b-auth" ref="auth-container">
    <div class="b-auth__wrapper">
      <div class="b-auth-forms">
        <nav class="b-auth__nav">
          <ul>
            <li class="b-auth__nav-indicator" ref="nav-indicator"></li>
            <li class="b-auth__nav-item" :class="{'b-auth__nav-item--active': currentTab==='login'}">
              <a href="#login" @click="switchTab('login', $event)">Login</a>
            </li>
            <li class="b-auth__nav-item" :class="{'b-auth__nav-item--active': currentTab==='register'}">
              <a href="#register" @click="switchTab('register', $event)">Register</a>
            </li>
          </ul>
        </nav>
        <div class="b-auth-tab">
          <div class="b-auth-tab__wrapper">
            <transition name="fade">
              <div class="b-auth-tab__item" v-if="currentTab === 'login'" key="loginKey">
                <el-form :model="login_form" :rules="rules" ref="login_form" class="b-auth-tab__form">
                  <el-form-item class="form__input" prop="email">
                    <el-input
                      type="email"
                      placeholder="Your email"
                      v-model="login_form.email"></el-input>
                  </el-form-item>
                  <el-form-item class="form__input" prop="password">
                    <el-input
                      type="password"
                      placeholder="Your password"
                      v-model="login_form.password"></el-input>
                  </el-form-item>
                  <div class="form__input">
                    <button type="submit" @click.prevent="submitLogin()" class="b-btn">Login</button>
                  </div>
                </el-form>
              </div>
              <div class="b-auth-tab__item" v-else key="registerKey">
                <el-form class="b-auth-tab__form" :model="register_form" :rules="rules" ref="register_form">
                  <el-form-item class="form__input" prop="username">
                    <el-input
                      type="text"
                      placeholder="Your username"
                      v-model="register_form.username"></el-input>
                  </el-form-item>
                  <el-form-item class="form__input" prop="email">
                    <el-input
                      type="email"
                      placeholder="Your email"
                      v-model="register_form.email"></el-input>
                  </el-form-item>
                  <el-form-item class="form__input" prop="pass">
                    <el-input
                      type="password"
                      placeholder="Your password"
                      v-model="register_form.pass"></el-input>
                  </el-form-item>
                  <el-form-item class="form__input" prop="pass_confirmation">
                    <el-input
                      type="password"
                      placeholder="Password, Again"
                      v-model="register_form.pass_confirmation"></el-input>
                  </el-form-item>
                  <div class="form__input">
                    <button type="submit" class="b-btn" @click.prevent="submitRegister()">Register</button>
                  </div>
                </el-form>
              </div>
            </transition>
          </div>
        </div>
      </div>
      <div class="b-auth-background">
        <transition name="scale" mode="out-in">
          <div class="b-auth-background__wrapper" v-if="this.currentTab === 'login'" key="log">
            <div class="b-auth-background__content">
              <h3>Welcome back!</h3>
              <p>Signup and let's read!</p>
            </div>
            <img src="/login.jpg">
          </div>
          <div class="b-auth-background__wrapper" v-else key="reg">
            <div class="b-auth-background__content">
              <h3>Welcome!</h3>
              <p>Register and get full access to great library of indie comics created by passionated artists</p>
            </div>
            <img src="/register.jpg">
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapMutations, mapActions} from 'vuex'
  import MouseMove from '@/assets/js/MouseMove'

  export default {
    middleware: 'notAuthenticated',
    transition: {
      name: 'scale',
    },
    data() {
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please input the password'));
        } else {
          if (this.register_form.pass_confirmation !== '') {
            this.$refs.register_form.validateField('pass_confirmation');
          }
          callback();
        }
      };
      const validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please input the password again'));
        } else if (value !== this.register_form.pass) {
          callback(new Error('Two inputs don\'t match!'));
        } else {
          callback();
        }
      };
      return {
        currentTab: '',
        login_form: {
          email: '',
          password: ''
        },
        register_form: {
          username: '',
          email: '',
          pass: '',
          pass_confirmation: ''
        },
        rules: {
          username: [
            {required: true, message: 'Please input your username', trigger: 'blur'},
            {min: 3, message: 'Length should be at lease 3', trigger: 'blur'}
          ],
          email: [
            {required: true, message: 'Please input your email', trigger: 'blur'},
            {min: 3, message: 'Length should be at lease 3', trigger: 'blur'}
          ],
          password: [
            {required: true, message: 'Please input your password', trigger: 'change'},
            {min: 3, message: 'Length should be at lease 3', trigger: 'blur'},

          ],
          pass: [
            {validator: validatePass, trigger: 'blur'}
          ],
          pass_confirmation: [
            {validator: validatePass2, trigger: 'blur'}
          ],
        },
        DOM: {},
        mouseMove: null
      }
    },

    mounted() {
      this.currentTab = this.$route.hash.slice(1) || 'login'
      this.$nextTick(function () {
        // DOM updated
        this.mouseMove = new MouseMove(this.$refs['auth-container'])
        this.DOM.navIndicator = this.$refs["nav-indicator"]
      })
    },

    methods: {
      ...mapActions('auth', ['register', 'login']),
      switchTab(tab, e) {
        this.currentTab = tab
        this.DOM.navIndicator.style.width = e.target.offsetWidth + 'px'
        this.DOM.navIndicator.style.transform = `translateX(${ e.target.offsetLeft}px)`
      },

      async submitRegister() {
        this.$refs['register_form'].validate((valid) => {
          if (valid) {
            this.register(this.register_form).then(message => {
              this.$notify(message)
            })
          } else {
            return false
          }
        })
      },

      async submitLogin() {
        this.$refs['login_form'].validate((valid) => {
          if (valid) {
            this.login(this.login_form)
              .then(message => {
                this.$notify(message)
              })
              .catch((e) => {
                this.$notify({
                  title: 'Something went wrong',
                  message: `Error: ${e}`,
                  type: 'error'
                })
              })
          } else {
            return false
          }
        });
      }
    }
  }
</script>
<style lang="scss">
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s $cubic-ease, transform 0.5s $cubic-ease;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .scale-enter-active, .scale-leave-active {
    transition: opacity 0.5s $cubic-ease, transform 0.5s $cubic-ease;
  }

  .scale-enter {
    opacity: 0;
    transform: scale(1.05)
  }

  .scale-leave-to {
    opacity: 0;
    transform: scale(0.9)
  }

  .b-auth {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100vh;
    &__wrapper {
      max-width: 85rem;
      width: 100%;
      margin-top: 5rem;
      height: 50rem;
      display: flex;
      position: relative;
    }
  }

  .b-auth-forms {
    display: flex;
    flex-direction: column;
    flex: 0.5;
    height: 100%;
    padding: 1rem;
    position: relative;
    z-index: 2;
    &:before {
      content: '';
      position: absolute;
      background: $color--light;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 110%;
      box-shadow: 0 0 0 0.5rem $color--dark;
      transform: scale(1.05) skew(-5deg, -5deg)
    }
  }

  .b-auth-background {
    flex: 1;
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    box-shadow: 0.5rem 0.5rem 2.5rem 0 rgba(46, 61, 73, .2);
    transform: skew(5deg, 5deg);
    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      z-index: -1;
      background: transparentize($color--blue-2, 0.2);
    }
    &__wrapper {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      background: $color--blue-2;
    }
    &__content {
      transform: skew(-5deg, -5deg);
      position: relative;
      z-index: 9;
      color: $color--light;
      text-align: center;
      max-width: 30rem;
      width: 100%;
      transition: 0.3s;
      h3 {
        color: $color--yellow;
        font-size: 4rem;
        font-family: $font-family--main;
      }
      p {
        font-size: 2rem;
      }
    }
    img {
      position: absolute;
      z-index: 0;
      bottom: 0;
      right: 0;
      opacity: 0.2;
      transform: scale(1.05) skew(-5deg, -5deg);
    }
  }

  .b-auth__nav {
    margin-top: 1rem;
    ul {
      list-style: none;
      padding: 0;
      display: flex;
      align-items: center;
      position: relative;
    }
    &-indicator {
      position: absolute;
      z-index: 99;
      bottom: 0;
      height: 0.5rem;
      background: $color--dark;
      transition: transform 0.5s $cubic-ease, width 0.5s $cubic-ease;
    }
    &-item {
      opacity: 0.5;
      transition: opacity 0.3s $cubic-ease;
      margin-right: 1rem;
      padding: 1rem 2rem;
      a {
        display: block;
        position: relative;
        font-size: 2rem;
        font-family: $font-family--main;
        color: $color--font;
      }
      &.b-auth__nav-item--active {
        opacity: 1;
      }
    }
  }

  .b-auth-tab {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    &__wrapper {
      display: flex;
      position: relative;
      z-index: 1;
      padding: 2rem;
      //background: $color--light;
      width: 100%;
      height: 100%;
    }

    &__item {
      width: 100%;
      position: absolute;
    }
  }

  .b-auth-tab__form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2rem;
  }
</style>