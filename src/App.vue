<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>
import Main from '@/views/Main.vue';
// import Settings from '@/views/Settings.vue';

export default {
    name: 'App',
    components: { Main }
}
</script>

<style lang="scss">
@import '@/styles/colors.scss';

body {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 5rem; // TODO: temp value
    font-family: 'Museo Sans', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: $dark-default;
}

// * { box-sizing: border-box; }
</style>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

#app {
    border: 1px solid #ececec;
    border-radius: $radius-lg;
    box-shadow: 0 0 10px 2px rgba(47, 145, 41, 0.35);
    padding: 2rem;
    font-weight: 500;
    width: 100%;
    max-width: 60rem;
    height: 35rem;
}

// @media (max-width: 580px) {
//   #app {
//       height: auto;
//   }
// }
</style>

