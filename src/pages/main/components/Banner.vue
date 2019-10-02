<template>
  <section id="banner">
    <h1 class="header">Simple, private file sharing</h1>
    <span class="info">
      This service lets you share files with everyone
      and gives a link that automatically expires.
      So you can keep what you share private and make
      sure your stuff doesn’t stay online forever.
    </span>
    <img src="@/assets/images/banner.png" alt="banner clouds">
  </section>
</template>

<script>
export default {
  name: 'Banner'
};
</script>

<style lang="scss" scoped>
#banner {
  display: flex;
  flex-direction: column;
  // align-items: center;

  .header {
    font-size: 20pt;
    font-weight: 700;
    text-align: center;
  }

  .info {
    font-size: 14pt;
    font-weight: 400;
    line-height: 1.5;
  }

  img {
    max-width: 100%;
    margin-top: 10%;
  }
}
</style>
