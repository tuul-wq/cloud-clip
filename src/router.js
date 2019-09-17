import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        {
            path: '/',
            name: 'main',
            component: () => import('@/views/main/Main.vue')
        },
        {
            path: '/download',
            name: 'download',
            component: () => import('@/views/download/Download.vue')
        },
    ]
});

export default router;