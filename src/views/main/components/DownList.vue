<template>
    <ul id="download-list">
        <DownloadItem v-for="(download, index) in downloads"
            :key="index"
            :item="download"
            @goToDownload="goToDownload"
            @remove="remove"
            @copy="copy"
        ></DownloadItem>
    </ul>
</template>

<script>
import DownloadItem from './DownloadItem.vue';

export default {
    name: 'DownList',
    components: { DownloadItem },
    props: {
        downloads: {
            type: Array,
            default: []
        },
    },
    methods: {
        goToDownload() {
            this.$emit('goToDownload');
        },

        copy(link) {
            this.$emit('copy', link);
        },

        remove(file) {
            const index = this.downloads.findIndex(f =>
                f.storageName === file.storageName && f.size === file.size
            );
            this.$emit('remove', index, storageName);
        }
    },
}
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