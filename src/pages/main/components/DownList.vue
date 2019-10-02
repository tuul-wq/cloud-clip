<template>
  <ul id="download-list">
    <li v-for="(download, index) in downloads" :key="index">
      <DownloadItem
        :item="download"
        @route-to="storageName => $emit('route-to', storageName)"
        @remove="remove"
        @copy="link => $emit('copy', link)"
      />
    </li>
  </ul>
</template>

<script>
import DownloadItem from './DownloadItem';

export default {
  name: 'DownList',

  components: { DownloadItem },

  props: {
    downloads: {
      type: Array,
      default() {
        return [];
      }
    }
  },

  methods: {
    remove(file) {
      const index = this.downloads.findIndex(
        f => f.storageName === file.storageName && f.size === file.size
      );
      this.$emit('remove', index);
    }
  }
};
</script>

<style lang="scss" scoped>
#download-list {
  display: grid;
  grid-auto-rows: min-content;
  row-gap: 1rem;
  overflow-y: auto;
  list-style: none;
  padding: 0 1rem 0 0;
  margin: 0;
}
</style>
