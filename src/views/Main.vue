<template>
    <main id="main">
        <User class="corner-right"
            :isLoggedIn="isLoggedIn"
            :email="user.email"
            @signin="signin"
            @logout="logout"
        ></User>

        <UpList v-if="hasRegisteredFiles"
            :uploads="uploads"
            @upload="uploadFiles"
            @remove="unregisterFile"
            @register="registerFiles"
        ></UpList>
        <Uploader v-else @register="registerFiles"></Uploader>
        <!-- TODO: when uploading <Uploading></Uploading> -->

        <DownList v-if="hasDownloadFiles" :downloads="downloads"></DownList>
        <Banner v-else></Banner>
    </main>
</template>

<script>
import Uploader from '@/components/upload/Uploader.vue';
import User from '@/components/shared/User.vue';
import UpList from '@/components/upload/UpList.vue';
import DownList from '@/components/download/DownList.vue';
import Banner from '@/components/download/Banner.vue';
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
            this.uploads.push(...files);
            this.downloads.push(...files);
        },

        unregisterFile(index) {
            this.uploads.splice(index, 1);
        },

        uploadFiles(data) {
            // TODO: this.uploads.length > 1 => make an archive
            // uploads downloads expiration isProtected password
            if (this.uploads.length > 1) {
                this._createZip(this.uploads);
            } else {
                // this._createDbRecord(data);
                this._uploadFiles(this.uploads);

                // TODO: need to wait
                this.downloads.push(...this.uploads);
                this.uploads = [];
            }
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

        _createDbRecord(data) {
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

        _uploadFiles(files) {
            files.forEach(file => {
                this._getStorage(file.name, this.user.uid).put(file)
                .then(snapshot => {
                    console.log("TCL: uploadFiles -> snapshot", snapshot)
                })
                .catch(error => {
                    console.log("TCL: uploadFiles -> snapshot", error)
                });
            });
        },

        _getStorage(fileName, folder = '') {
            return this._storage.ref().child(folder + '/' + fileName);
        },

        _createZip() {

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
