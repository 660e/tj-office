<template>
  <div>
    <div class="user">
      <img src="../../assets/default.png" />
      <span>{{ name }}</span>
    </div>
    <van-cell-group>
      <van-cell title="修改密码" :to="{ name: 'password' }" is-link />
    </van-cell-group>
    <van-button @click="logout" type="danger">注销</van-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: JSON.parse(sessionStorage.getItem('user')).name
    };
  },
  methods: {
    logout() {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      this.$router.push({ name: 'login' });
    }
  }
};
</script>

<style lang="less" scoped>
.user {
  background-color: #1989fa;
  height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    border-radius: 50%;
    height: 60px;
    width: 60px;
  }
  span {
    color: #fff;
    font-size: 16px;
    margin-top: 10px;
  }
}
.van-button {
  width: 70vw;
  margin: 15vw;
}
</style>
