<template>
    <div class="bordered">
        <div class="info" v-if="isLoggedIn" @click="logout">
            <FaIcon :icon="['fas', 'user-astronaut']"></FaIcon>
            <span class="name">{{ userName }}</span>
            <FaIcon :icon="['fas', 'sign-out-alt']"></FaIcon>
        </div>
        <span v-else @click="signin">Sign In</span>
    </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserAstronaut, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as FaIcon } from '@fortawesome/vue-fontawesome';

library.add(faUserAstronaut, faSignOutAlt);

export default {
    name: 'User',
    components: { FaIcon },
    props: {
        isLoggedIn: {
            type: Boolean,
            default: false
        },
        email: {
            type: String,
            default: ''
        }
    },
    methods: {
        logout() {
            this.$emit('logout');
        },

        signin() {
            this.$emit('signin');
        }
    },
    computed: {
        userName() {
            return this.email.split('@')[0];
        }
    },
}
</script>

<style lang="scss" scoped>
@import '@/styles/colors.scss';
@import '@/styles/variables.scss';

.bordered {
    cursor: pointer;
    background-color: #acf0b3;
    border: 2px solid $green;
    border-top-right-radius: $radius-lg;
    border-bottom-left-radius: $radius-lg;
    padding: 0.25rem 0.5rem 0.25rem 0.75rem;
    box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.2);
}

.info {
    display: grid;
    grid-template-columns: repeat(3, auto);
    align-items: center;
    &:hover {
        color: black;
    }

    .fa-user-astronaut {
        font-size: 14pt;
    }

    .name {
        font-size: 14pt;
        line-height: 1;
        padding: 0 1rem 0 0.5rem;
    }
}
</style>
