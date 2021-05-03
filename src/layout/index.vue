<template>
  <div class="layout-container">
    <van-nav-bar :title="$route.meta.title"></van-nav-bar>
    <router-view></router-view>
    <van-tabbar route>
      <van-tabbar-item icon="home-o" to="/home" replace>首页</van-tabbar-item>
      <van-tabbar-item icon="apps-o" to="/apps" replace>办公</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/user" replace>我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  mounted() {
    if (!sessionStorage.getItem('token')) {
      this.$router.push({ name: 'login' });
    }
  }
};
</script>
