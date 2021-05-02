import { createRouter, createWebHashHistory } from 'vue-router';

// import Layout from '@/layout';

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home')
  }
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ x: 0, y: 0 })
});
