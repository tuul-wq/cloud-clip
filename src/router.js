import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        {
            path: '/',
            name: 'main',
            component: () => import('@/views/Main.vue')
        },
        {
            path: '/download',
            name: 'download',
            component: () => import('@/views/Download.vue')
        },
        {
            path: '/settings',
            name: 'settings',
            component: () => import('@/views/Settings.vue')
        },
    ]
});

export default router;