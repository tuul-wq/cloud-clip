<template>
    <!-- <div class="download-item">
        <button @click="remove">X</button>
        {{ item.name }}
    </div> -->
    <div>download item</div>
</template>

<script>
export default {
    name: 'DownloadItem',
    // props: {
    //     item: { type: File, default: {} },
    // },
    methods: {
        remove() {
            // this.$emit('remove', this.item);
        }
    },
}
</script>

<style lang="scss" scoped>
.download-item {
    font-size: 15pt;
}
</style>