import Vue from 'vue';
import App from './App.vue';
import firebase from 'firebase/app';

Vue.config.productionTip = false;

const firebaseConfig = {
    apiKey: "AIzaSyDb-LqfC0jBwdEoCfCQg5YITrzYUeDFjDI",
    authDomain: "the-cloud-clip.firebaseapp.com",
    databaseURL: "https://the-cloud-clip.firebaseio.com",
    projectId: "the-cloud-clip",
    storageBucket: "",
    messagingSenderId: "3947679510",
    appId: "1:3947679510:web:6543bc2bfba55bef"
};
firebase.initializeApp(firebaseConfig);

new Vue({ render: h => h(App), }).$mount('#app');
