<template>
  <div>
    <b-header></b-header>
    <b-aside-footer></b-aside-footer>
    <nuxt/>
    <b-footer></b-footer>
  </div>
</template>
<script>
  import bHeader from '~/components/Header.vue'
  import bFooter from '~/components/Footer.vue'
  import bAsideFooter from '~/components/AsideFooter.vue'
  export default {
    components: {
      bHeader,
      bAsideFooter,
      bFooter
    }
  }
</script>
<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
