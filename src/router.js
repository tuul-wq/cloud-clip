import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import('@/pages/main/components/Main.vue')
    },
    {
      path: '/download/:userId/:fileId',
      name: 'download',
      component: () => import('@/pages/download/components/Download.vue')
    },
  ]
});

export default router;
