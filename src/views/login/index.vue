<template>
  <div class="c">
    <div class="l">
      <h1>智慧工位</h1>
      <input v-model="username" type="text" placeholder="用户名" />
      <input v-model="password" type="password" placeholder="密码" />
      <button @click="login">登录</button>
    </div>
    <div class="v">v{{ version }}</div>
  </div>
</template>

<script>
import PKG from '../../../package.json';
export default {
  data() {
    return {
      username: '',
      password: '',
      version: ''
    };
  },
  mounted() {
    this.version = PKG.version;
  },
  methods: {
    login() {
      console.log(this.username);
      console.log(this.password);
    }
  }
};
</script>

<style lang="less" scoped>
.c {
  background: url(../../assets/login.jpg) no-repeat 0 0 / cover;
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  .l {
    width: 70vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    h1 {
      color: #fff;
      line-height: 1;
      font-size: 0.3rem;
      padding-bottom: 0.2rem;
    }
    input {
      background-color: rgba(255, 255, 255, 0.75);
      border: 1px #ccc solid;
      box-sizing: border-box;
      border-radius: 0.25rem;
      font-size: 0.18rem;
      height: 0.5rem;
      padding: 0 0.2rem;
      text-align: center;
      margin-bottom: 0.2rem;
      width: 100%;
    }
    button {
      background-color: #1989fa;
      border: 0;
      border-radius: 0.25rem;
      color: #fff;
      font-size: 0.18rem;
      height: 0.5rem;
      text-align: center;
      width: 100%;
    }
  }
  .v {
    color: #ccc;
    position: absolute;
    right: 0.1rem;
    bottom: 0.1rem;
  }
}
</style>
