<template>
  <select class="dropdown-list">
    <option
      v-for="(option, index) in options"
      :key="index"
      :value="option.value"
      @click="$emit('select', index)"
    >
      {{ option.text }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'BaseDropDown',

  props: {
    options: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/colors.scss';
@import '@/assets/styles/variables.scss';

.dropdown-list {
  font-size: 13pt;
  border-radius: $radius-sm;
  border: 1px solid gray;
  -webkit-appearance: none;
  -moz-appearance: none;
  background: url('~@/assets/icons/arrow-down.png') 94% / 0.8rem no-repeat
    $field;
  padding: 0.1rem 2rem 0.1rem 0.1rem;
}
</style>>
