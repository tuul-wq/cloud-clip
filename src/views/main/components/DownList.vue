<template>
    <ul id="download-list">
        <DownloadItem v-for="(download, index) in downloads"
            :key="index"
            :item="download"
            @goToDownload="goToDownload"
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