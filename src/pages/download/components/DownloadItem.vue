<template>
  <div class="upload-item">
    <div class="info">
      <img class="icon" src="@/assets/images/download.png" alt="file icon">
      <span>{{ item.displayName }}</span>
      <span class="size">{{ size }}</span>
      <FontAwesomeIcon class="icon-check" :icon="['fas', 'check']" />
    </div>
  </div>
</template>

<script>
import { fileSize } from '@/shared/utils/fileSize';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

library.add(faCheck);

export default {
  name: 'DownloadItem',

  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    }
  },

  computed: {
    size() {
      return fileSize(this.item.size);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/colors.scss';
@import '@/assets/styles/variables.scss';

.upload-item {
  background-color: white;
  border-radius: $radius-sm;
  border: 1px solid $gray-md;
  padding: 0.75rem 1.25rem;

  .info {
    display: grid;
    align-items: center;
    column-gap: 0.5rem;
    grid-template-columns: 3rem auto 1.5rem;
    font-size: 12pt;
    font-weight: 500;

    .icon {
      grid-row: 1 / 3;
      width: 2.5rem;
      justify-self: center;
    }

    .size {
      padding-top: 0.3rem;
      font-size: 11pt;
      color: $gray;
    }

    .icon-check {
      grid-row: 1 / 3;
      grid-column: 3 / 4;
      color: green;
    }
  }
}
</style>
