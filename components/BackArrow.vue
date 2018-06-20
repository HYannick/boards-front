<template>
  <button class="prev-btn" @click="handleClick">
          <span class="prev-btn__arrow">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 55 130" v-if="!reversed">
              <g data-name="Groupe 82">
                <path
                  data-name="Union 7"
                  d="M23.759 130.009V7.209l-1.713-1.71 5.493-5.49L55 27.455l-5.492 5.49-17.982-17.972v115.036z"
                  fill="#383434"/>
                <path data-name="Tracé 159" d="M5.492 32.944l-5.49-5.49L27.461.008l5.49 5.49z"
                      fill="#fcd281"/>
              </g>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 55 130" v-else><g data-name="Groupe 83"><path data-name="Union 8" d="M23.759 130.009V7.209l-1.713-1.711L27.539.009 55 27.455l-5.492 5.489-17.982-17.972v115.037z" fill="#fff"/><path data-name="Tracé 161" d="M5.492 32.944l-5.49-5.49L27.461.008l5.49 5.49z" fill="#fcd281"/></g></svg>
          </span>
    <span class="prev-btn__text">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 81">
              <text transform="rotate(-90 54.5 26.5)"
                    fill="#fcd281" font-size="30"
                    font-family="SFComicScriptExtended,SF Comic Script Extended"><tspan
                x="0" y="0">Back</tspan></text>
            </svg>
          </span>
  </button>
</template>
<style lang="scss">
  .prev-btn {
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
  .prev-btn__text {
    bottom: 0;
    left: 0;
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