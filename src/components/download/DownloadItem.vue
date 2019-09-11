<template>
    <li class="download-item">
        <!-- TODO: change to file icon with arrow down -->
        <img class="icon" src="@/assets/images/download.png" alt="file icon">
        <span>{{ item.name }}</span>
        <span class="size">{{ size }}</span>
        <FaIcon class="btn-remove" :icon="['fas', 'times']" @click="remove"></FaIcon>
        <!-- <span>expires ...</span>
        <details>
            <summary>2 files</summary>
            <ul>
                <li>1 file</li>
                <li>2 file</li>
            </ul>
        </details> -->
        <div class="actions">
            <button>
                <FaIcon class="btn-remove" :icon="['far', 'file-archive']" @click="download"></FaIcon>
                Download
            </button>
            <button>
                <FaIcon class="btn-remove" :icon="['fas', 'times']" @click="copyLink"></FaIcon>
                Copy link
            </button>
        </div>
    </li>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faFileArchive } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon as FaIcon } from '@fortawesome/vue-fontawesome';
import FileSize from '@/mixins/FileSize.js';

library.add(faTimes, faFileArchive);

export default {
    name: 'DownloadItem',
    components: { FaIcon },
    mixins: [ FileSize ],
    props: {
        item: {
            type: File, // TODO: change type
            default: {}
        },
    },
    methods: {
        remove() {
            this.$emit('remove', this.item);
        },

        download() {
            this.$emit('download');
            // routeTo ...
        },

        copyLink() {
            this.$emit('download');
        },
    },
    computed: {
        size() {
            return this.shortFileSize(this.item.size);
        }
    },
}
</script>

<style lang="scss" scoped>
@import '@/styles/colors.scss';
@import '@/styles/variables.scss';

.download-item {
    display: grid;
    align-items: center;
    column-gap: 0.5rem;
    grid-template-columns: 3rem auto 1.5rem;
	font-size: 12pt;
	font-weight: 500;
	background-color: white;
	border-radius: $radius-sm;
    border: 1px solid $gray-md;
	padding: 0.75rem 1.25rem;
    box-shadow: $item-shadow;

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