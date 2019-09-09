<template>
    <main id="main">
        <UpList v-if="hasRegisteredFiles"
            :uploads="uploads"
            @upload="uploadFiles"
            @remove="unregisterFile"
            @register="registerFiles"
        ></UpList>
        <Uploader v-else @register="registerFiles"></Uploader>

        <DownList v-if="hasDownloadFiles"></DownList>
        <Banner v-else></Banner>
    </main>
</template>

<script>
import Uploader from '@/components/upload/Uploader.vue';
import UpList from '@/components/upload/UpList.vue';
import DownList from '@/components/download/DownList.vue';
import Banner from '@/components/download/Banner.vue';
import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/auth';

export default {
    name: 'Main',
    components: { Uploader, UpList, Banner, DownList },

    data() {
        return {
            uploads: [],
            user: null,
        }
    },
    created() {
        this._loginTEST();
    },
    methods: {
        registerFiles(files) {
            this.uploads.push(...files);
        },
        unregisterFile(index) {
            this.uploads.splice(index, 1);
        },
        // uploadFiles(files) {
        uploadFiles(data) {
            // uploads
            // downloads
            // expiration
            // isProtected
            this._createDbRecord(data);
            // this._uploadFile(file);
        },

        _createDbRecord(data) {
            const records = data.uploads.map(d => ({
                fileName: d.name,
                downloads: 0,
                maxDownloads: data.downloads,
                expires: new Date(),
                password: '123'
            }));
            // console.log("TCL: _createDbRecord -> records", records)
            this._firestore.collection('users').doc(this.user.uid).update({
                files: firebase.firestore.FieldValue.arrayUnion(...records)
            })
            .then(() => console.log("Document successfully updated!"))
            .catch(error => console.log(error));
        },

        _uploadFile(file) {
            this._getStorage(file.name, this.user.uid).put(file)
            .then(snapshot => {
                console.log("TCL: uploadFiles -> snapshot", snapshot)
            })
            .catch(error => {
                console.log("TCL: uploadFiles -> snapshot", error)
            });
        },

        _getStorage(fileName, folder = '') {
            return this._storage.ref().child(folder + '/' + fileName);
        },

        _loginTEST() {
            const e = 'vasya@gmail.com';
            const p = '123456';
            firebase.auth().signInWithEmailAndPassword(e, p).then(user => {
                this.user = user.user;
            });
        }
    },
    computed: {
        hasRegisteredFiles() {
            return this.uploads.length > 0;
        },
        hasDownloadFiles() {
            return false; // TODO:
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
}

@media (max-width: 580px) {
  #main {
    grid-template-columns: auto;
    grid-auto-flow: row;
  }
}
</style>
