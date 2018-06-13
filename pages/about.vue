<template>
  <div>
    Secret page
  </div>
</template>
<script>
  export default {
    middleware: 'authenticated',
    transition: {
      name: 'scale',
    }
  }
</script>