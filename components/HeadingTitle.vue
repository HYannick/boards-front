<template>
  <h2 class="heading" :class="alignClasses" :style="{color: color || '#383434'}">
    <slot></slot>
  </h2>
</template>
<script>
  export default {
    props: ['align', 'color'],
    computed: {
      alignClasses() {
        return {
          'heading--left': this.align === 'left',
          'heading--center': this.align === 'center',
          'heading--right': this.align === 'right'
        }
      }
    },
  }
</script>
<style lang="scss">
  .heading {
    font-size: 4.5rem;
    letter-spacing: 0.3rem;
    font-family: $font-family--main;
    position: relative;
    z-index: 1;
    &.heading--left {
      &:before {
        left: 50%;
        transform: scale(1.8);
      }
    }
    &.heading--center {
      &:before {
        left: 50%;
        transform: translateX(-50%) scale(1.8);
      }
    }
    &.heading--right {
      &:before {
        right: 50%;
        transform: scale(1.8);
      }
    }
    &:before{
      content: attr(data-text);
      position: absolute;
      top: -5rem;
      left: 1rem;
      width: 100%;
      opacity: 0.2;
      z-index: -1;
      color: $color--yellow;
    }
  }
</style>