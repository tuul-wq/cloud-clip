<template>
    <main id="main">
        <Uploader></Uploader>
        <UploadList v-if="hasUploads"></UploadList>
        <Banner v-else></Banner>
    </main>
</template>

<script>
import Uploader from '@/components/Uploader.vue';
import UploadList from '@/components/layout/UploadList.vue';
import Banner from '@/components/Banner.vue';

export default {
    name: 'Main',
    components: { Uploader, UploadList, Banner },

    data() {
        return {
            hasUploads: false
        }
    },
}
</script>

<style scoped lang="scss">
#main {
    display: grid;
    grid-template-columns: repeat(2, minmax(auto, 100%));
    // grid-template-columns: repeat(auto-fit, minmax(auto, 28rem));
    column-gap: 3rem;
    row-gap: 3rem;
    // height: 38rem;
}

@media (max-width: 576px) {
  #main {
    grid-template-columns: auto;
    grid-auto-flow: row;
  }
}
</style>
