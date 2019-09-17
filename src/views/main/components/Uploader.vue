<template>
    <section id="uploader">
        <label class="add-file">
            <input type="file" ref="file" style="display: none" multiple @change="uploadFiles">
            <FaIcon :icon="['far', 'plus-square']"></FaIcon>
        </label>
        <span class="drag-text">Drag and drop files</span>
        <span class="info-text">or click to send up to 10MB</span>
        <span class="sign-in">Sign in to send up to 20MB</span>
    </section>
</template>

<script>

import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon as FaIcon } from '@fortawesome/vue-fontawesome';

library.add(faPlusSquare);

export default {
    name: 'Uploader',
    components: { FaIcon },
    methods: {
        uploadFiles(event) {
            this.$emit('register', [...event.target.files]);
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/styles/colors.scss';
@import '@/styles/variables.scss';

#uploader {
    display: grid;
    align-content: center;
    justify-items: center;
    position: relative;

    $border: 3px;
    background: white;
    background-clip: padding-box;
    border: $border solid transparent;
    border-radius: $radius-lg;

    &:before {
        transition: .1s;
        content: '';
        position: absolute;
        top: 0; right: 0; bottom: 0; left: 0;
        z-index: -1;
        margin: -$border;
        border-radius: inherit;
        background: linear-gradient(135deg, $green-dr, $green-lt);
    }

    &:hover:before { border: dashed white; }
}

.add-file {
    font-size: 32pt;
    padding: 0.75rem;
    color: $green;
}

.drag-text {
    font-size: 16pt;
    font-weight: 700;
    padding-bottom: 0.25rem;
}

.info-text {
    font-size: 13pt;
}

.sign-in {
    font-size: 12pt;
    font-weight: 300;
    margin-top: 3rem;
    color: gray;
    transition: .2s;

    &:hover { color: $green; }
}

.add-file, .sign-in { cursor: pointer; }

</style>