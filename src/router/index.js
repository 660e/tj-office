import { createRouter, createWebHashHistory } from 'vue-router';
import Layout from '@/layout';

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
    component: Layout,
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          title: '首页'
        },
        component: () => import('@/views/home')
      },
      {
        path: '/apps',
        name: 'apps',
        meta: {
          title: '办公'
        },
        component: () => import('@/views/apps')
      },
      {
        path: '/user',
        name: 'user',
        meta: {
          title: '我的'
        },
        component: () => import('@/views/user')
      }
    ]
  },
  {
    path: '/apps/invite',
    name: 'invite',
    meta: {
      title: '邀请码'
    },
    component: () => import('@/views/apps/views/invite.vue')
  }
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ x: 0, y: 0 })
});
