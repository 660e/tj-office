<template>
  <div class="layout-container">
    <van-nav-bar :title="$route.meta.title" @click-left="$router.back()" left-text="返回" left-arrow></van-nav-bar>
    <router-view></router-view>
  </div>
</template>
