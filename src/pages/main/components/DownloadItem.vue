<template>
  <div class="download-item">
    <div class="info">
      <img class="icon" src="@/assets/images/download.png" alt="file icon">
      <span>{{ item.displayName }}</span>
      <span class="size">{{ size }}</span>
      <FontAwesomeIcon class="icon-remove" :icon="['fas', 'times']" @click="$emit('remove', item)" />
    </div>
    <span class="expire-info">Expires after {{ downloadsLimit }} or {{ timeLeft }}</span>
    <details v-if="isArchive" class="archive-info">
      <summary>{{ fileCount }} files</summary>
      <ul>
        <li v-for="(subFile, index) in item.subFiles" :key="index">
          <span>{{ subFile.name }}</span>
          <span class="size sm">{{ fileSize(subFile.size) }}</span>
        </li>
      </ul>
    </details>
    <hr class="divider">
    <div class="actions">
      <button class="btn-link" @click="$emit('route-to', item.docId)">
        <FontAwesomeIcon :icon="['fas', 'download']" />Download
      </button>
      <button class="btn-link" @click="copyLink">
        <FontAwesomeIcon :icon="['far', 'copy']" />Copy link
      </button>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes, faDownload } from '@fortawesome/free-solid-svg-icons';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { fileSize } from '@/shared/utils/fileSize';

library.add(faTimes, faCopy, faDownload);

export default {
  name: 'DownloadItem',

  props: {
    item: {
      type: Object,
      default() {
        return {};
      }
    }
  },

  methods: {
    copyLink() {
      this.$emit('copy', 'www.google.com');
    }
  },

  computed: {
    size() {
      return fileSize(this.item.size);
    },

    isArchive() {
      return this.item.subFiles;
    },

    fileCount() {
      return this.item.subFiles.length;
    },

    downloadsLimit() {
      const limit = this.item.dLimit - this.item.dCurrent;
      return limit + ' download' + (limit > 1 ? 's' : '');
    },

    timeLeft() {
      return moment(this.item.expires).endOf('seconds').fromNow();
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/colors.scss';
@import '@/assets/styles/variables.scss';

$link: #58a232;

.download-item {
  border-radius: $radius-sm;
  border: 1px solid $gray-md;
  padding: 0.75rem 1.25rem;
  box-shadow: $item-shadow;
  user-select: none;

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

    .icon-remove {
      grid-row: 1 / 3;
      grid-column: 3 / 4;
      cursor: pointer;
      font-size: 15pt;
      color: gray;
      justify-self: center;
      align-self: start;

      &:hover {
        color: $dark-default;
      }
    }
  }

  .expire-info {
    display: block;
    padding: 0.5rem 0;
    font-size: 11pt;
    font-weight: 300;
    color: $gray;
  }

  .archive-info {
    font-size: 12pt;

    summary {
      cursor: pointer;
    }

    ul {
      margin-top: 0.25rem;
      padding: 0 1.5rem;
      li {
        font-size: 11pt;
        &:not(:last-of-type) {
          padding: 0.15rem 0;
        }
      }
    }
  }

  .divider {
    margin: 1rem 0;
    color: $gray-md;
  }

  .actions {
    display: flex;
    justify-content: space-between;

    .btn-link {
      cursor: pointer;
      font-size: 11pt;
      color: $link;
      background-color: transparent;
      border: none;
      padding: 0 0.5rem;

      svg {
        margin-right: 0.3rem;
      }

      &:hover {
        color: lighten($color: $link, $amount: 10%);
      }
    }
  }

  .size {
    padding-top: 0.3rem;
    font-size: 11pt;
    color: $gray;

    &.sm {
      font-size: 9pt;
      float: right;
    }
  }
}
</style>
