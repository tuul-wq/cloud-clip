import Vue from 'vue';
import App from './App.vue';
import firebase from 'firebase/app';
import BaseInput from '@/components/shared/BaseInput.vue';
import BaseDropDown from '@/components/shared/BaseDropDown.vue';

Vue.config.productionTip = false;

const firebaseConfig = {
    apiKey: "AIzaSyDb-LqfC0jBwdEoCfCQg5YITrzYUeDFjDI",
    authDomain: "the-cloud-clip.firebaseapp.com",
    databaseURL: "https://the-cloud-clip.firebaseio.com",
    projectId: "the-cloud-clip",
    storageBucket: "the-cloud-clip.appspot.com",
    messagingSenderId: "3947679510",
    appId: "1:3947679510:web:6543bc2bfba55bef"
};
firebase.initializeApp(firebaseConfig);

const components = {
    BaseInput,
    BaseDropDown,
};

Object.keys(components).forEach(key => {
    const name = components[key].name;
    if (name) {
        Vue.component(name, components[key]);
    } else {
        throw new Error('It seems you forgot go give your component a name...');
    }
});

new Vue({ render: h => h(App), }).$mount('#app');
