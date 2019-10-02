<template>
  <div v-if="type === 'expired'" id="success">
    <template v-if="type === 'expired'">
      <h1 class="header">Link has expired</h1>
      <img class="image" src="@/assets/images/expired.png" alt="expired image">
    </template>
    <template v-else>
      <h1 class="header">Download Complete</h1>
      <img class="image" src="@/assets/images/success.png" alt="success image">
    </template>
    <button class="btn" @click="goBack">Go back</button>
  </div>
</template>

<script>
export default {
  name: 'Result',

  props: {
    type: {
      type: String,
      default: 'expired'
    }
  },

  methods: {
    goBack() {
      this.$router.push('/');
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/buttons.scss';

#success {
  display: grid;
  align-content: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  max-width: 40rem;
  margin: 0 auto;

  .header {
    text-align: center;
  }

  .success {
    margin: 2rem 0;
    height: 18rem;
  }
}
</style>
