<template>
  <section id="upload-list">
    <ul class="items">
      <li v-for="(up, index) in uploads" :key="index">
        <UploadItem :item="up" @remove="remove" />
      </li>
    </ul>
    <div class="misc">
      <label class="add-file">
        <input type="file" class="none" multiple @change="({target}) => $emit('register', target.files)">
        <FontAwesomeIcon :icon="['far', 'plus-square']" />
        <span>Add more files</span>
      </label>
      <span class="size">{{ uploadSize }}</span>
    </div>
    <div class="configure">
      <div class="expire">
        <span>Expiration after</span>
        <BaseDropDown class="drop" :options="downloadsProp" @select="selectDownloads" />
        <span>or</span>
        <BaseDropDown class="drop" :options="expirationProp" @select="selectExpiration" />
      </div>
      <div class="protect">
        <label for="protect">
          Protect with password
          <input id="protect" v-model="isProtected" type="checkbox" @change="password = ''">
          <!-- class="none" -->
          <!-- <span class="checkmark"></span> -->
        </label>
        <BaseInput v-if="isProtected" v-model="password" class="password" />
      </div>
      <button class="btn" @click="upload">Upload</button>
    </div>
  </section>
</template>

<script>
import moment from 'moment';

import UploadItem from './UploadItem';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { fileSize } from '@/shared/utils/fileSize';

library.add(faPlusSquare);

export default {
  name: 'UpList',

  components: { UploadItem },

  props: {
    uploads: {
      type: Array,
      default() {
        return [];
      }
    }
  },

  data() {
    return {
      dLimitIndex: 0,
      expiresIndex: 0,
      isProtected: false,
      password: ''
    };
  },

  methods: {
    remove(file) {
      const index = this.uploads.findIndex(
        f => f.name === file.name && f.size === file.size
      );
      this.$emit('remove', index);
    },

    upload() {
      this.$emit('upload', {
        dLimit: this.downloadsProp[this.dLimitIndex].value,
        expires: this.expirationProp[this.expiresIndex].value(),
        isProtected: !!this.password,
        ...(this.password && { password: this.password })
      });
    },

    selectDownloads(index) {
      this.dLimitIndex = index;
    },

    selectExpiration(index) {
      this.expiresIndex = index;
    }
  },

  computed: {
    downloadsProp() {
      const values = [1, 5, 10, 25];
      return values.map(el => ({ text: el + ' downloads', value: el }));
    },

    expirationProp() {
      return [
        { text: '5 minutes', value: () => +moment().add(5, 'm') },
        { text: '1 hour', value: () => +moment().add(1, 'h') },
        { text: '1 day', value: () => +moment().add(1, 'd') },
        { text: '1 week ', value: () => +moment().add(1, 'w') }
      ];
    },

    uploadSize() {
      const totalSize = this.uploads.reduce((sub, upload) => sub += upload.size, 0);
      return fileSize(totalSize);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/colors.scss';
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/buttons.scss';

#upload-list {
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  overflow: hidden;

  .items {
    display: grid;
    row-gap: 1rem;
    padding: 1rem;
    margin: 0;
    border-radius: $radius-sm;
    background-color: $gray-lt;
    overflow-y: auto;
    max-height: 50%;
    height: 100%;
    grid-auto-rows: min-content;
    list-style: none;

    &:after {
      content: "";
      height: 1px;
    }
  }

  .misc {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid gray;
    padding-top: 0.75rem;

    .add-file {
      cursor: pointer;
      display: flex;
      align-items: center;

      .fa-plus-square {
        font-size: 23pt;
        margin-right: 0.5rem;
        color: $green;
      }
    }

    .size {
      font-size: 12pt;
      color: gray;
    }
  }

  .configure {
    display: grid;
    row-gap: 0.5rem;

    .expire {
      .drop {
        margin: 0 0.5rem;
      }
    }

    .protect {
      display: flex;
      align-items: center;
      height: 1.75rem;

      .password {
        margin-left: 2rem;
      }
    }
  }

  // .checkmark {
  //     cursor: pointer;
  //     position: relative;
  //     width: 25px;
  //     height: 25px;
  //     border-radius: 50%;
  //     border: 1px solid gray;
  //     box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
  //     // transition: .5s;

  //     &:before {
  //         left: 8px;
  //         top: 3px;
  //         width: 7px;
  //         height: 12px;
  //         position: absolute;
  //         border: solid white;
  //         border-width: 0 3px 3px 0;
  //         transform: rotate(45deg);
  //     }
  // }

  .none {
    display: none;
  }
}
</style>
