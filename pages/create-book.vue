<template>
  <div class="section">
    <div class="container-form">
      <h1>Create a book!</h1>
      <form class="book-creation__form" @submit.prevent="submitBook">
        <div class="form__input">
          <input
            v-validate="'required|min:3'"
            :class="{'has-error': errors.has('title')}"
            name="title"
            type="text"
            placeholder="Book Title"
            v-model="book_form.title"/>
          <span v-show="errors.has('title')">{{ errors.first('title') }}</span>
        </div>
        <div class="form__input">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <div class="form__input">
          <input
            v-validate="'required|min:3'"
            :class="{'has-error': errors.has('tome_title')}"
            name="tome_title"
            type="text"
            placeholder="Tome Title"
            v-model="book_form.tome_title"/>
          <span v-show="errors.has('tome_title')">{{ errors.first('tome_title') }}</span>
        </div>
        <div class="form__input">
            <textarea
              name="short_description"
              type="text"
              placeholder="Short Description"
              v-model="book_form.short_description"></textarea>
        </div>
        <div class="form__input">
            <textarea
              name="description"
              type="text"
              placeholder="Description"
              v-model="book_form.description"></textarea>
        </div>
        <div class="form__input">
          <input
            v-validate="'required'"
            :class="{'has-error': errors.has('min_price')}"
            name="min_price"
            type="number"
            placeholder="Min"
            v-model="book_form.min_price"/>
          <span v-show="errors.has('min_price')">{{ errors.first('min_price') }}</span>
        </div>
        <div class="form__input">
          <input
            v-validate="'required'"
            :class="{'has-error': errors.has('max_price')}"
            name="max_price"
            type="number"
            placeholder="Max"
            v-model="book_form.max_price"/>
          <span v-show="errors.has('max_price')">{{ errors.first('max_price') }}</span>
        </div>
        <div class="form__input">
          <button type="submit" class="b-btn">Register</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
  export default {
    middleware: 'authenticated',
    transition: {
      name: 'scale',
    },
    data() {
      return {
        imageUrl: '',
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
        }
      }
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
//        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$notify('Avatar picture must be JPG format!');
        }
//        if (!isLt2M) {
//          this.$notify('Avatar picture size can not exceed 2MB!');
//        }
//        return isJPG && isLt2M;
        return isJPG;
      },
      async submitBook() {
        console.log(this.book_form)
        const isValid = await this.$validator.validateAll()
        if (isValid) {
//          this.register(this.register_form).then(message => {
//            this.$notify(message)
//          })
        }
      },
    }
  }
</script>
<style lang="scss">
  .section {
    margin-top: 10rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .container-form {
    padding: 0 2rem;
    max-width: 60rem;
    width: 100%;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>