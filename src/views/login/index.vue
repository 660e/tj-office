<template>
  <div class="w">
    <div class="c">
      <h1>智慧工位</h1>
      <van-divider>v{{ version }}</van-divider>
      <div class="i">
        <van-icon name="user-o" />
        <input v-model="username" type="text" placeholder="用户名" />
      </div>
      <div class="i">
        <van-icon name="bag-o" />
        <input v-model="password" type="password" placeholder="密码" />
      </div>
      <div class="r">
        <van-icon name="scan" />
        <span @click="register">访客注册</span>
      </div>
      <van-button @click="login" type="primary" round>登录</van-button>
    </div>
  </div>
</template>

<script>
import PKG from '../../../package.json';
export default {
  data() {
    return {
      version: '',
      username: '',
      password: ''
    };
  },
  mounted() {
    this.version = PKG.version;
  },
  methods: {
    register() {
      console.log('register');
    },
    login() {
      console.log(this.username);
      console.log(this.password);
    }
  }
};
</script>

<style src="./index.less" lang="less" scoped></style>
