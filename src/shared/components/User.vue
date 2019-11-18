<template>
  <div class="bordered">
    <FontAwesomeIcon class="settings" :icon="['fas', 'cogs']" @click="$emit('goToSettings')" />
    <div class="user">
      <div v-if="isLoggedIn" class="info" @click="$emit('logout')">
        <FontAwesomeIcon :icon="['fas', 'user-astronaut']" />
        <span class="name">{{ userName }}</span>
        <FontAwesomeIcon :icon="['fas', 'sign-out-alt']" />
      </div>
      <span v-else @click="$emit('signin')">Sign In</span>
    </div>
  </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserAstronaut, faSignOutAlt, faCogs } from '@fortawesome/free-solid-svg-icons';

library.add(faUserAstronaut, faSignOutAlt, faCogs);

export default {
  name: 'User',

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

  computed: {
    userName() {
      return this.email.split('@')[0];
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/colors.scss';
@import '@/assets/styles/variables.scss';

.bordered {
  cursor: pointer;
  display: flex;

  .settings {
    font-size: 14pt;
    align-self: center;
    margin-right: 0.4rem;
    color: #0b4d00;
    transition: 0.1s;
    &:hover {
      font-size: 13pt;
    }
  }

  .user {
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
}
</style>
