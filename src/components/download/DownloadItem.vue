<template>
    <li class="download-item">
        <div class="info">
            <img class="icon" src="@/assets/images/download.png" alt="file icon">
            <span>{{ item.name }}</span>
            <span class="size">{{ size }}</span>
            <FaIcon class="icon-remove" :icon="['fas', 'times']" @click="remove"></FaIcon>
        </div>
        <span class="expire-info">Expires after 1 download or 5h 23m</span>
        <details class="archive-info" v-if="isArchive">
            <summary>{{ fileCount }} files</summary>
            <ul>
                <li>1 file</li>
                <li>2 file</li>
                <li>3 file</li>
            </ul>
        </details>
        <hr class="divider">
        <div class="actions">
            <button class="btn-link" @click="download">
                <FaIcon :icon="['fas', 'download']"></FaIcon>
                Download
            </button>
            <button class="btn-link" @click="copyLink">
                <FaIcon :icon="['far', 'copy']"></FaIcon>
                Copy link
            </button>
        </div>
    </li>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes, faDownload } from '@fortawesome/free-solid-svg-icons';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon as FaIcon } from '@fortawesome/vue-fontawesome';
import FileSize from '@/mixins/FileSize.js';

library.add(faTimes, faCopy, faDownload);

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
            this.$emit('goToDownload');
        },

        copyLink() {
            this.$emit('copy', 'www.google.com');
        },
    },
    computed: {
        size() {
            return this.shortFileSize(this.item.size);
        },
        isArchive() {
            return true;
        },
        fileCount() {
            return 3;
        }
    },
}
</script>

<style lang="scss" scoped>
@import '@/styles/colors.scss';
@import '@/styles/variables.scss';

$link: #58a232;

.download-item {
    border-radius: $radius-sm;
    border: 1px solid $gray-md;
    padding: 0.75rem 1.25rem;
    box-shadow: $item-shadow;
    user-select: none;

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

    .expire-info {
        display: block;
        padding: 0.5rem 0;
        font-size: 11pt;
        font-weight: 300;
        color: $gray;
    }

    .archive-info {
        font-size: 12pt;

        summary {
            cursor: pointer;
        }

        ul {
            margin-top: 0.25rem;
            li {
                font-size: 11pt;
                &:not(:last-of-type) {
                    padding: 0.15rem 0;
                }
            }
        }
    }

    .divider {
        margin: 1rem 0;
        color: $gray-md;
    }

    .actions {
        display: flex;
        justify-content: space-between;

        .btn-link {
            cursor: pointer;
            font-size: 11pt;
            color: $link;
            background-color: transparent;
            border: none;
            padding: 0 0.5rem;

            &:hover {
                color: lighten($color: $link, $amount: 10%);
            }
        }
    }
}
</style>