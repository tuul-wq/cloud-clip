<template>
    <li class="upload-item">
        <img class="icon" src="@/assets/images/file.png" alt="file icon">
        <span>{{ item.name }}</span>
        <span class="size">{{ size }}</span>
        <FaIcon class="btn-remove" :icon="['fas', 'times']" @click="remove"></FaIcon>
    </li>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as FaIcon } from '@fortawesome/vue-fontawesome';
import { shortFileSize } from '@/shared/functions/utils.js';

library.add(faTimes);

export default {
    name: 'UploadItem',
    components: { FaIcon },
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
            return shortFileSize(this.item.size);
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/styles/colors.scss';
@import '@/styles/variables.scss';

.upload-item {
    display: grid;
    align-items: center;
    column-gap: 0.5rem;
    grid-template-columns: 3rem auto 1.5rem;
	font-size: 12pt;
	font-weight: 500;
	background-color: white;
	border-radius: $radius-sm;
	padding: 0.75rem 1.25rem;
	box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.1);

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

    .btn-remove {
        grid-row: 1 / 3;
        grid-column: 3 / 4;
        cursor: pointer;
        font-size: 15pt;
        color: gray;
        justify-self: center;

        &:hover { color: $dark-default; }
    }
}
</style>