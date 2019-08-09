<template>
    <div class="upload-list">
        upload list
        <!-- <UploadItem v-for="(upload, index) in uploads" :key="index">
            {{ upload }}
        </UploadItem> -->
        <UploadItem></UploadItem>
    </div>
</template>

<script>
import UploadItem from '@/components/UploadItem.vue';

export default {
    name: 'UploadList',
    components: { UploadItem }
}
</script>

<style lang="scss" scoped>
.upload-list {
    font-size: 15pt;
}
</style>