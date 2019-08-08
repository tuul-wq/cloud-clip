import Vue from 'vue';
import App from './app.vue';

Vue.config.productionTip = false;

// const firebaseConfig = {
//     apiKey: 'AIzaSyBUf5XPnp9lKf4uOZamOB1YFHulkZDqOy0',
//     authDomain: 'vue-top.firebaseapp.com',
//     databaseURL: 'https://vue-top.firebaseio.com',
//     projectId: 'vue-top',
//     storageBucket: '',
//     messagingSenderId: '298595859208',
//     appId: '1:298595859208:web:e9033d8908430b65',
// };
// firebase.initializeApp(firebaseConfig);

new Vue({render: h => h(App),}).$mount('#app');
