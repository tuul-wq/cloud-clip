<template>
    <ul id="download-list">
        <DownloadItem v-for="(download, index) in downloads"
            :key="index"
            :item="download"
        ></DownloadItem>
    </ul>
</template>

<script>
import DownloadItem from '@/components/download/DownloadItem.vue';

export default {
    name: 'DownList',
    components: { DownloadItem },
    props: {
        downloads: {
            type: Array,
            default: []
        },
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
    padding: 0;
    margin: 0;
}
</style>