<template>
  <button class="next-btn" @click="handleClick">
    <span class="next-btn__arrow">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 55 130" v-if="!reversed">
        <g data-name="Groupe 81">
          <path data-name="Union 6"
                d="M0 102.547l5.492-5.488 17.982 17.97V0h7.768v122.791l1.712 1.711-5.493 5.489z" fill="#383434"/>
          <path data-name="Tracé 157" d="M49.51 97.057l5.49 5.49-27.46 27.443-5.492-5.487z" fill="#fcd281"/>
        </g>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 55 130" v-else><g data-name="Groupe 84"><path data-name="Union 9" d="M0 102.554l5.492-5.49 17.982 17.972V0h7.767v122.8l1.712 1.711L27.461 130z" fill="#fff"/><path data-name="Tracé 163" d="M49.507 97.065l5.49 5.49-27.46 27.447-5.49-5.49z" fill="#fcd281"/></g></svg>
    </span>
    <span class="next-btn__text">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 79">
        <text transform="rotate(90 2 2)" fill="#fcd281" font-size="30"
              font-family="SFComicScriptExtended,SF Comic Script Extended">
          <tspan x="0" y="0">Next</tspan>
        </text>
      </svg>
    </span>
  </button>
</template>
<style lang="scss">
  .next-btn {
    width: 5rem;
    height: 10rem;
    border: none;
    display: flex;
    align-items: flex-start;
    position: relative;
    cursor: pointer;
    outline: $color--yellow;
    background: transparent;
    &__arrow {
      svg {
        width: 4rem;
        height: 10rem;
      }
    }
    &__text {
      position: absolute;
      svg {
        width: 2rem;
        height: 5rem;
      }
    }
  }
  .next-btn__text {
    top: 0;
    right: 0;
  }
</style>

<script>
  export default {
    props: ['reversed'],
    methods: {
      handleClick(evt) {
        this.$emit('click', evt);
      }
    }
  }
</script>