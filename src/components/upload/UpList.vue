<template>
    <section id="upload-list">
        <ul class="items">
            <UploadItem v-for="(upload, index) in uploads"
                :key="index"
                :item="upload"
                @remove="remove"
            ></UploadItem>
        </ul>
        <div class="misc">
            <label class="add-file">
                <input type="file" ref="file" class="none" multiple @change="uploadMoreFiles">
                <FaIcon :icon="['far', 'plus-square']"></FaIcon>
                <span>Add more files</span>
            </label>
            <span class="size">{{uploadSize}}</span>
        </div>
        <div class="configure">
            <div class="expire">
                <span>Expiration after</span>
                <DropDown class="drop" :options="downloadsProp" @select="selectDownloads"></DropDown>
                <span>or</span>
                <DropDown class="drop" :options="expirationProp" @select="selectExpiration"></DropDown>
            </div>
            <label for="protect">Protect with password
                <input type="checkbox" id="protect" v-model="isProtected">
                <!-- class="none" -->
                <!-- <span class="checkmark"></span> -->
            </label>
            <button class="btn-upload" @click="upload">Upload</button>
        </div>
    </section>
</template>

<script>
import UploadItem from '@/components/upload/UploadItem.vue';
import DropDown from '@/components/shared/DropDown.vue';
import { shortFileSize } from '@/shared/functions/utils.js';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon as FaIcon } from '@fortawesome/vue-fontawesome';

library.add(faPlusSquare);

export default {
    name: 'UpList',
    components: { UploadItem, DropDown, FaIcon },
    props: {
        uploads: { type: Array, default:[] },
    },
    data() {
        return {
            downloads: 1,
            expiration: 1,
            isProtected: false
        }
    },
    methods: {
        remove(file) {
            const index = this.uploads.findIndex(f => f.name === file.name);
            this.$emit('remove', index);
        },
        upload() {
            this.$emit('upload', {
                // TODO: use array
                uploads: this.uploads,
                downloads: this.downloads,
                expiration: this.expiration,
                isProtected: this.isProtected
            });
        },
        uploadMoreFiles(event) {
            this.$emit('register', [...event.target.files]);
        },
        selectDownloads(value) {
            this.downloads = value;
        },
        selectExpiration(value) {
            this.expiration = value;
        }
    },
    computed: {
        downloadsProp() {
            const values = [1, 5, 10, 25];
            return values.map(el => ({ text: el + ' downloads', value: el }));
        },
        expirationProp() {
            return [
                { text: '5 minutes', value: 1 },
                { text: '1 hour', value: 2 },
                { text: '1 day', value: 2 },
                { text: '1 week ', value: 2 },
            ];
        },
        uploadSize() {
            const totalSize = this.uploads.reduce((sub, upload) => sub += upload.size, 0);
            return shortFileSize(totalSize);
        }
    },
}
</script>

<style lang="scss" scoped>
@import '@/styles/colors.scss';
@import '@/styles/variables.scss';

#upload-list {
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    overflow: hidden;

    .items {
        display: grid;
        row-gap: 1rem;
        padding: 1rem;
        border-radius: $radius-sm;
        background-color: $gray-lt;
        overflow-y: auto;
        max-height: 50%;
        height: 100%;
        grid-auto-rows: min-content;

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
            .drop { margin: 0 0.5rem; }
        }

        .btn-upload {
            cursor: pointer;
            color: $dark-default;
            padding: 0.75rem;
            background-color: $green-lt;
            font-size: 15pt;
            border-radius: $radius-sm;
            border: none;
            box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
            margin-top: 1rem;

            &:hover {
                background-color: darken($green-lt, 8%);
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

    .none { display: none; }
}

</style>