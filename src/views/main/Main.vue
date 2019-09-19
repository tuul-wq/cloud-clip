<template>
    <section id="main">
        <User class="corner-right"
            :isLoggedIn="isLoggedIn"
            :email="user.email"
            @signin="signin"
            @logout="logout"
            @goToSettings="goToSettings"
        ></User>

        <UpList v-if="hasRegisteredFiles"
            :uploads="uploads"
            @upload="uploadFiles"
            @remove="unregisterFile"
            @register="registerFiles"
        ></UpList>
        <Uploader v-else @register="registerFiles"></Uploader>

        <DownList v-if="hasDownloadFiles"
            :downloads="downloads"
            @goToDownload="goToDownload"
            @remove="removeDownload"
            @copy="copy"
        ></DownList>
        <Banner v-else></Banner>
    </section>
</template>

<script>
import JSZip from 'jszip';
import { mapGetters } from 'vuex';
import uuid from 'uuid/v1';

import Uploader from './components/Uploader.vue';
import UpList from './components/UpList.vue';
import DownList from './components/DownList.vue';
import Banner from './components/Banner.vue';
import User from '@/components/User.vue';

import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/auth';

export default {
    name: 'Main',
    components: { Uploader, UpList, Banner, DownList, User },

    data() {
        return {
            isUploading: false,
        }
    },

    // TODO: remove
    // TODO: get last uploads form local storage
    created () {
        this.signin();

        if (!this.isLoggedIn) {
            const storageItems = Object.keys(localStorage).map(key => JSON.parse(localStorage.getItem(key)));
            this.$store.commit('addDownloads', storageItems);
            console.log(this.downloads);
        }
    },

    methods: {
        registerFiles(files) {
            this.$store.commit('addUploads', files);
        },

        unregisterFile(index) {
            this.$store.commit('removeUpload', index);
        },

        removeDownload(index, id) {
            console.log("TCL: removeDownload -> id", id)
            // TODO: remove from storage and server
            localStorage.removeItem(id);
            this.$store.commit('removeDownload', index);
        },
        // removeDownload(args) {
        //     console.log("TCL: removeDownload -> args", args)
        //     console.log("TCL: removeDownload -> id", args.id)
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

        goToDownload() {
            this.$router.push('download');
        },

        copy(link) {
            console.log("TCL: copy -> link", link)
            document.execCommand('copy', false, link);
        },

        async uploadFiles(params) {
            const file = this.uploads.length > 1 ? await this._createZip() : this.uploads[0];
            const uuidFile = new File([file], uuid(), {type: file.type});
            const record = this._getRecord(uuidFile, {...params, displayName: file.name});
            console.log("TCL: uploadFiles -> record", record)

            try {
                await this._uploadFileInStorage(uuidFile);
                await this._createDbRecord(record);
                this.$store.commit('addDownloads', [record]);
                this.$store.commit('clearUploads');
                this._writeToLocalStorage(record);
            } catch (err) { console.log('Error - ', err) }
        },

        _getRecord(file, params) {
            const record = {
                size: file.size,
                storageName: file.name,
                displayName: params.displayName,
                downloadsCurrent: 0,
                downloadsLimit: params.downloadsLimit,
                expiration: params.expiration,
                password: '123'
                // password: params.password
            };
            if (this.uploads.length > 1) {
                record.subFiles = this.uploads.map(upload => ({ name: upload.name, size: upload.size }));
            }
            return record;
        },

        _uploadFileInStorage(file) {
            return this._getStorage(file.name, this.user.uid).put(file)
                .catch(error => console.log(error));
        },

        _createDbRecord(record) {
            return this._firestore.collection('users').doc(this.user.uid).update({
                files: firebase.firestore.FieldValue.arrayUnion(record)
            }).catch(error => console.log(error));
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
            return zip.generateAsync({type: 'blob'}).then(file =>
                new File([file], 'Archive.zip', {type: 'application/zip'})
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
    },
}
</script>

<style scoped lang="scss">
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
</style>
