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
        <!-- TODO: when uploading <Uploading></Uploading> -->

        <DownList v-if="hasDownloadFiles"
            :downloads="downloads"
            @goToDownload="goToDownload"
            @copy="copy"
        ></DownList>
        <Banner v-else></Banner>
    </section>
</template>

<script>
import JSZip from 'jszip';
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
            uploads: [],
            downloads: [],
            user: {},
            isLoggedIn: false,
        }
    },

    // TODO: remove
    // TODO: get last uploads form local storage
    created () {
        this.signin();
    },

    methods: {
        registerFiles(files) {
            console.log("TCL: registerFiles -> files", files)
            this.uploads.push(...files);
        },

        unregisterFile(index) {
            this.uploads.splice(index, 1);
        },

        signin() {
            const e = 'vasya@gmail.com';
            const p = '123456';
            firebase.auth().signInWithEmailAndPassword(e, p).then(user => {
                this.user = user.user;
                this.isLoggedIn = true;
            });
        },

        logout() {
            firebase.auth().signOut().then(() => {
                this.user = {}
                this.isLoggedIn = false;
            });
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

        async uploadFiles(data) {
            // TODO: this.uploads.length > 1 => make an archive
            // uploads downloads expiration isProtected password
            const uploads = this.uploads.length > 1 ? await this._createZip() : this.uploads;
            // this._createDbRecords(data);
            this._uploadFilesInStorage([uploads]);

            // TODO: need to wait
            this.downloads.push(uploads);
            this.uploads = [];
        },

        _createDbRecords(data) {
            const records = this.uploads.map(d => ({
                fileName: d.name,
                downloads: 0,
                maxDownloads: data.downloads,
                expires: new Date(),
                password: '123'
            }));
            this._firestore.collection('users').doc(this.user.uid).update({
                files: firebase.firestore.FieldValue.arrayUnion(...records)
            })
            .then(() => console.log("Document successfully updated!"))
            .catch(error => console.log(error));
        },

        _uploadFilesInStorage(files) {
            files.forEach(file => {
                this._getStorage(file.name, this.user.uid).put(file)
                .then(snapshot => {
                    console.log("TCL: uploadFiles -> snapshot", snapshot)
                })
                .catch(error => {
                    console.log("TCL: uploadFiles -> snapshot", error)
                });
            });
            // in the end set storage data, set downloads
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
        _firestore() {
            return firebase.firestore();
        },
        _storage() {
            return firebase.storage();
        }
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
