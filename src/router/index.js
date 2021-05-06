import { createRouter, createWebHashHistory } from 'vue-router';
import Layout from '@/layout';
import Details from '@/layout/details.vue';

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
    component: Details,
    children: [
      {
        path: '/register',
        name: 'register',
        meta: {
          title: '访客注册'
        },
        component: () => import('@/views/login/views/register.vue')
      },
      {
        path: '/apps/history',
        name: 'history',
        meta: {
          title: '我的预约'
        },
        component: () => import('@/views/apps/views/history.vue')
      },
      {
        path: '/apps/records',
        name: 'records',
        meta: {
          title: '预约记录'
        },
        component: () => import('@/views/apps/views/history.vue')
      },
      {
        path: '/apps/visitor',
        name: 'visitor',
        meta: {
          title: '访客授权'
        },
        component: () => import('@/views/apps/views/visitor.vue')
      },
      {
        path: '/apps/visitor/:id',
        name: 'visitor-details',
        meta: {
          title: '访客信息'
        },
        component: () => import('@/views/apps/views/visitor-details.vue')
      },
      {
        path: '/apps/invite',
        name: 'invite',
        meta: {
          title: '邀请码'
        },
        component: () => import('@/views/apps/views/invite.vue')
      },
      {
        path: '/user/password',
        name: 'password',
        meta: {
          title: '修改密码'
        },
        component: () => import('@/views/user/views/password.vue')
      }
    ]
  }
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ x: 0, y: 0 })
});
