<template>
  <Result v-if="isExpired" type="expired" />
  <Result v-else-if="isComplete" type="success" />
  <div v-else-if="!isComplete && !isExpired" id="download">
    <h1 class="header">Download files</h1>
    <span class="info">
      This file was shared via Cloud clip with end-to-end
      encryption and<br>a link that automatically expires
    </span>
    <DownloadItem class="item" :item="file" />
    <button class="btn" @click="download">Download</button>
  </div>
</template>

<script>
import Result from './Result';
import DownloadItem from './DownloadItem';

import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';

export default {
  name: 'Download',

  components: { DownloadItem, Result },

  data() {
    return {
      file: {},
      isComplete: false
    }
  },

  beforeRouteEnter(to, from, next) {
    const userId = to.params.userId;
    const fileId = to.params.fileId;
    firebase.firestore()
      .collection('users').doc(userId)
      .collection('files').doc(fileId).get()
      .then(file => next(vm => vm.file = file.data()));
  },

  methods: {
    download() {
      fetch(this.downloadUrl)
        .then(res => res.blob())
        .then(blob => this._showDownloadMenu(blob))
        .then(() => this._updateDbRecord())
        .then(() => this.isComplete = true);
    },

    _showDownloadMenu(blob) {
      return new Promise(resolve => {
        const url = window.URL.createObjectURL(new Blob([blob], { type: this.file.fileType }));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', this.file.displayName);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        resolve();
      });
    },

    _updateDbRecord() {
      return firebase.firestore()
        .collection('users').doc(this.$route.params.userId)
        .collection('files').doc(this.$route.params.fileId).update({
          dCurrent: this.file.dCurrent + 1
        });
    }
  },

  computed: {
    isExpired() {
      return this.file.dLimit === this.file.dCurrent ||
        (new Date) >= new Date(this.file.expires) || false;
    }
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/buttons.scss';

#download {
  display: grid;
  align-content: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  max-width: 40rem;
  margin: 0 auto;

  .info {
    color: $gray;
    text-align: center;
  }

  .header, .info {
    text-align: center;
  }

  .item {
    margin: 1rem 0;
  }
}
</style>
