<template>
  <div class="layout-container">
    <div class="c">
      <h1><img src="../../assets/logo.png" />智慧工位</h1>
      <van-divider>v{{ version }}</van-divider>
      <div class="i" :class="{ disabled: loading }">
        <van-icon name="user-o" />
        <input :disabled="loading" v-model="username" type="text" placeholder="用户名" />
      </div>
      <div class="i" :class="{ disabled: loading }">
        <van-icon name="bag-o" />
        <input :disabled="loading" v-model="password" type="password" placeholder="密码" />
      </div>
      <div class="r">
        <van-icon name="scan" />
        <span @click="register">访客注册</span>
      </div>
      <van-button :loading="loading" @click="login" type="primary" loading-text="正在验证..." round>登录</van-button>
    </div>
  </div>
</template>

<script>
import PKG from '../../../package.json';
import axios from 'axios';
import { queryByLoginname } from '@/api/system.js';

const params = {
  client_id: 'tdfuivue',
  client_secret: 'swagger',
  grant_type: 'password'
};

export default {
  data() {
    return {
      version: '',
      username: '',
      password: '',
      loading: false
    };
  },
  mounted() {
    this.version = PKG.version;
  },
  methods: {
    register() {
      this.$router.push({ name: 'register' });
    },
    login() {
      this.loading = true;

      params.username = encodeURIComponent(this.username);
      params.password = encodeURIComponent(this.password);
      const query = Object.keys(params).map(k => `${k}=${params[k]}`);

      axios
        .post(`http://123.124.222.65:8086/oauth/token?${query.join('&')}`)
        .then(response => {
          sessionStorage.setItem('token', response.data.access_token);

          const p0 = queryByLoginname(this.username);

          Promise.all([p0]).then(allResponse => {
            const user = {
              id: allResponse[0].data.id
            };
            sessionStorage.setItem('user', JSON.stringify(user));
            this.$router.push({ name: 'home' });
            this.loading = false;
          });
        })
        .catch(error => {
          this.$toast.fail(error.response.status);
          this.password = '';
          this.loading = false;
        });
    }
  }
};
</script>

<style src="./index.less" lang="less" scoped></style>
