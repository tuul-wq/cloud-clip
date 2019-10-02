import Vue from 'vue';
import Vuex from 'vuex';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    uploads: [],
    downloads: [],
    user: {}
  },
  mutations: {
    clearUploads(state) {
      state.uploads = [];
    },

    addUploads(state, files) {
      state.uploads.push(...files);
    },

    removeUpload(state, index) {
      state.uploads.splice(index, 1);
    },

    addDownloads(state, file) {
      state.downloads.push(file);
    },

    removeDownload(state, index) {
      // TODO: remove from server
      state.downloads.splice(index, 1);
    },

    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    signin({ commit }, { email, password }) {
      return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(({ user }) => commit('setUser', user));
    },

    logout({ commit }) {
      return firebase.auth().signOut()
        .then(() => commit('setUser', {}));
    }
  },
  getters: {
    uploads: state => state.uploads,
    downloads: state => state.downloads,
    user: state => state.user,
  }
});

export default store;
