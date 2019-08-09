<template>
  <div id="app">
      <Main></Main>
      <!-- <Settings></Settings> -->
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
body {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 5rem; // TODO: temp value
    font-family: 'Museo Sans', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}

* { box-sizing: border-box; }
</style>

<style lang="scss" scoped>
#app {
    border: 1px solid #ececec;
    border-radius: 1rem;
    box-shadow: 0 0 10px 2px rgba(47, 145, 41, 0.35);
    padding: 2rem;
    width: 100%;
    max-width: 60rem;
}
</style>

