<template>
  <div class="layout-container">
    <van-nav-bar :title="$route.meta.title" @click-left="onClickLeft" left-text="返回" left-arrow></van-nav-bar>
    <div class="qrcode">
      <canvas id="code"></canvas>
      <span>30分钟内有效</span>
    </div>
  </div>
</template>

<script>
import { getInviteCode } from '@/api/workstation.js';
import QRCode from 'qrcode';
export default {
  mounted() {
    getInviteCode().then(response => QRCode.toCanvas(document.getElementById('code'), response));
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    }
  }
};
</script>

<style lang="less" scoped>
.qrcode {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  span {
    padding-top: 10px;
  }
}
</style>
