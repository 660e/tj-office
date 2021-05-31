<template>
  <div class="layout-container">
    <div class="c">
      <h1><img src="../../assets/logo.png" />智慧工位</h1>
      <van-divider>-</van-divider>
      <div class="i" :class="{ disabled: loading }">
        <van-icon name="user-o" />
        <input :disabled="loading" v-model="username" type="text" placeholder="用户名" />
      </div>
      <div class="i" :class="{ disabled: loading }">
        <van-icon name="bag-o" />
        <input :disabled="loading" v-model="password" type="password" placeholder="密码" />
      </div>
      <van-button :loading="loading" @click="login" type="primary" loading-text="正在验证..." round>登录</van-button>
      <div class="r">
        <van-icon name="scan" />
        <span @click="register">访客注册</span>
      </div>
    </div>
    <div class="v">v{{ version }}</div>
  </div>
</template>

<script>
import PKG from '../../../package.json';
import axios from 'axios';
import { queryByLoginname } from '@/api/system.js';
import { $GLOBAL } from '@/global.js';

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
      this.$router.push({ name: 'scan', query: { redirect: 'register' } });
    },
    login() {
      this.loading = true;

      params.username = encodeURIComponent(this.username);
      params.password = encodeURIComponent(this.password);
      const query = Object.keys(params).map(k => `${k}=${params[k]}`);

      axios
        .post(`${$GLOBAL.url.oauth}?${query.join('&')}`)
        .then(response => {
          sessionStorage.setItem('token', response.data.access_token);

          queryByLoginname(this.username).then(userResponse => {
            const user = {
              id: userResponse.data.id,
              rid: userResponse.data.roles[0].id,
              name: userResponse.data.userName
            };
            switch (userResponse.data.permission) {
              case 'admin':
                user.clearance = 3;
                break;
              case 'inner':
                user.clearance = 2;
                break;
              default:
                user.clearance = 1;
                break;
            }
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
