<template>
    <li class="download-item">
        <button @click="remove">X</button>
        {{ item.name }}
    </li>
</template>

<script>
export default {
    name: 'DownloadItem',
    props: {
        item: {
            type: File, // TODO: change type
            default: {}
        },
    },
    methods: {
        remove() {
            this.$emit('remove', this.item);
        }
    },
}
</script>

<style lang="scss" scoped>
@import '@/styles/colors.scss';
@import '@/styles/variables.scss';

.download-item {
    border: 1px solid $gray-md;
    border-radius: $radius-sm;
    padding: 1rem;
    box-shadow: $item-shadow;
}
</style>