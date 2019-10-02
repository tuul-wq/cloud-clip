<template>
  <input type="text" :value="value" @input="({target}) => $emit('input', target.value)">
</template>

<script>
export default {
  name: 'BaseInput',
  props: {
    value: {
      type: String,
      default: ''
    }
  }
};
</script>
<style lang="scss" scoped>
@import '@/assets/styles/colors.scss';
@import '@/assets/styles/variables.scss';

input {
  font-size: 13pt;
  border-radius: $radius-sm;
  border: 1px solid gray;
  padding: 0.1rem 0.5rem;
  background-color: $field;
}
</style>
