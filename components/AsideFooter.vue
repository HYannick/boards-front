<template>
  <div class="b-aside-footer">
    <ul class="b-aside-footer__nav">
      <li class="b-aside-footer__nav-item">Copyright Made by Ayho.Society</li>
      <li class="b-aside-footer__nav-item"><a href="/">Facebook</a></li>
      <li class="b-aside-footer__nav-item"><a href="/">Pinterest</a></li>
      <li class="b-aside-footer__nav-item"><a href="/comic-list">Twitter</a></li>
      <li class="b-aside-footer__nav-item"><a href="/reader">Patreon</a></li>
    </ul>
  </div>
</template>

<style lang="scss">
  .b-aside-footer {
    position: fixed;
    z-index: 999;
    bottom: 0;
    left: 0;
    transform: rotate(-90deg);
    transform-origin: 1rem 0 0;
  }

  .b-aside-footer__nav {
    display: flex;
    align-items: center;
    list-style: none;
    padding: 0;
    justify-content: flex-end;
    li {
      margin: 0 1.5rem;
      font-size: 1rem;
      a {
        font-family: $font-family--main;
        color:$color--font;
      }
    }
  }
</style>
