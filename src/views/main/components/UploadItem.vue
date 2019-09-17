<template>
    <li class="upload-item">
        <div class="info">
            <img class="icon" src="@/assets/images/upload.png" alt="file icon">
            <span>{{ item.name }}</span>
            <span class="size">{{ size }}</span>
            <FaIcon class="icon-remove" :icon="['fas', 'times']" @click="remove"></FaIcon>
        </div>
    </li>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as FaIcon } from '@fortawesome/vue-fontawesome';
import FileSize from '@/mixins/FileSize.js';

library.add(faTimes);

export default {
    name: 'UploadItem',
    components: { FaIcon },
    mixins: [ FileSize ],
    props: {
        item: { type: File, default: {} },
    },
    methods: {
        remove() {
            this.$emit('remove', this.item);
        }
    },
    computed: {
        size() {
            return this.shortFileSize(this.item.size);
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/styles/colors.scss';
@import '@/styles/variables.scss';

.upload-item {
    background-color: white;
    border-radius: $radius-sm;
    border: 1px solid $gray-md;
    padding: 0.75rem 1.25rem;
    box-shadow: $item-shadow;

    .info {
        display: grid;
        align-items: center;
        column-gap: 0.5rem;
        grid-template-columns: 3rem auto 1.5rem;
        font-size: 12pt;
        font-weight: 500;

        .icon {
            grid-row: 1 / 3;
            width: 2.5rem;
            justify-self: center;
        }

        .size {
            padding-top: 0.3rem;
            font-size: 11pt;
            color: $gray;
        }

        .icon-remove {
            grid-row: 1 / 3;
            grid-column: 3 / 4;
            cursor: pointer;
            font-size: 15pt;
            color: gray;
            justify-self: center;
            align-self: start;

            &:hover { color: $dark-default; }
        }
    }
}
</style>