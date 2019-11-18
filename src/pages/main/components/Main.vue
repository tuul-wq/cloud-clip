<template>
  <section id="main">
    <User
      class="corner-right"
      :is-logged-in="isLoggedIn"
      :email="user.email"
      @signin="signin"
      @logout="logout"
      @goToSettings="goToSettings"
    />

    <UpList
      v-if="hasRegisteredFiles"
      :uploads="uploads"
      @upload="uploadFiles"
      @remove="unregisterFile"
      @register="registerFiles"
    />
    <Uploader v-else @register="registerFiles" />

    <ul id="download-list" v-if="hasDownloadFiles">
      <li v-for="(download, index) in downloads" :key="index">
        <DownloadItem :item="download" />
      </li>
    </ul>
    <Banner v-else />
  </section>
</template>

<script>
import JSZip from 'jszip';
import { mapGetters } from 'vuex';
import uuid from 'uuid/v1';

import Uploader from './Uploader';
import DownloadItem from './DownloadItem';
import DownList from './DownList';
import Banner from './Banner';
import User from '@/shared/components/User';

import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/auth';

export default {
  name: 'Main',

  components: {
    Uploader,
    UpList,
    Banner,
    DownList,
    User
  },

  data() {
    return {
      isUploading: false
    };
  },

  // TODO: remove
  // TODO: get last uploads form local storage
  created() {
    this.signin();

    // if (!this.isLoggedIn) {
    //   const storageItems = Object.keys(localStorage).map(key =>
    //     JSON.parse(localStorage.getItem(key))
    //   );
    //   this.$store.commit('addDownloads', storageItems);
    // }
  },

  methods: {
    registerFiles(files) {
      this.$store.commit('addUploads', files);
    },

    unregisterFile(index) {
      this.$store.commit('removeUpload', index);
    },

    removeDownload(index, id) {
      console.log('TCL: removeDownload -> id', id);
      // TODO: remove from storage and server
      localStorage.removeItem(id);
      this.$store.commit('removeDownload', index);
    },
    // removeDownload(args) {
    //     console.log('TCL: removeDownload -> args', args)
    //     console.log('TCL: removeDownload -> id', args.id)
    //     // TODO: remove from storage and server
    //     localStorage.removeItem(args.id);
    //     this.$store.commit('removeDownload', args.index);
    // },

    signin() {
      this.$store.dispatch('signin', {
        email: 'vasya@gmail.com',
        password: '123456'
      });
    },

    logout() {
      this.$store.dispatch('logout');
    },

    goToSettings() {
      this.$router.push('settings');
    },

    goToDownload(id) {
      // TODO: if no user?
      this.$router.push({
        name: 'download',
        params: { userId: this.user.uid, fileId: id }
      });
    },

    copy(link) {
      console.log('TCL: copy -> link', link);
      document.execCommand('copy', false, link);
    },

    async uploadFiles(params) {
      const file = this.uploads.length > 1 ? await this._createZip() : this.uploads[0];
      const uuidFile = new File([file], uuid(), { type: file.type });
      const record = this._getRecord(uuidFile, {
        ...params,
        displayName: file.name
      });
      const docId = uuid();

      this._uploadFileInStorage(uuidFile)
        .then(({metadata}) => {
          record.fileType = metadata.contentType;
          return this._getDownloadUrl(uuidFile);
        })
        .then(url => this._createDbRecord({...record, url}, docId))
        .then(() => {
          this.$store.commit('addDownloads', {...record, docId});
          this.$store.commit('clearUploads');
        });

      // this._writeToLocalStorage(record);
    },

    _getRecord(file, params) {
      const record = {
        size: file.size,
        storageName: file.name,
        displayName: params.displayName,
        dCurrent: 0,
        dLimit: params.dLimit,
        expires: params.expires,
        // password: params.password
      };
      if (this.uploads.length > 1) {
        record.subFiles = this.uploads.map(upload => ({
          name: upload.name,
          size: upload.size
        }));
      }
      return record;
    },

    _uploadFileInStorage(file) {
      return this._getStorage(file.name, this.user.uid).put(file)
        .catch(error => console.log(error));
    },

    _getDownloadUrl(file) {
      return this._getStorage(file.name, this.user.uid).getDownloadURL()
        .catch(error => console.log(error));
    },

    _createDbRecord(record, docId) {
      return this._firestore
        .collection('users').doc(this.user.uid)
        .collection('files').doc(docId).set(record)
        .catch(error => console.log(error));
    },

    _writeToLocalStorage(record) {
      localStorage.setItem(record.storageName, JSON.stringify(record));
    },

    _getStorage(fileName, folder = '') {
      return this._storage.ref().child(folder + '/' + fileName);
    },

    _createZip() {
      const zip = new JSZip();
      this.uploads.forEach(upload => zip.file(upload.name, upload));
      return zip.generateAsync({ type: 'blob' }).then(
        file => new File([file], 'Archive.zip', { type: 'application/zip' })
      );
    }
  },
  computed: {
    hasRegisteredFiles() {
      return this.uploads.length > 0;
    },

    hasDownloadFiles() {
      return this.downloads.length > 0;
    },

    isLoggedIn() {
      return !!this.user.uid;
    },

    _firestore() {
      return firebase.firestore();
    },

    _storage() {
      return firebase.storage();
    },

    ...mapGetters(['uploads', 'downloads', 'user'])
  }
};
</script>

<style scoped lang='scss'>
#main {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 3rem;
  row-gap: 3rem;
  height: 100%;
  position: relative;

  .corner-right {
    right: -33px;
    top: -33px;
    position: absolute;
  }
}

@media (max-width: 580px) {
  #main {
    grid-template-columns: auto;
    grid-auto-flow: row;
  }
}

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
