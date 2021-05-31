<template>
  <div class="qrcode">
    <canvas id="code"></canvas>
    <span>30分钟内有效</span>
  </div>
</template>

<script>
import { getInviteCode } from '@/api/workstation.js';
import QRCode from 'qrcode';
export default {
  mounted() {
    getInviteCode().then(response => QRCode.toCanvas(document.getElementById('code'), response.data));
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
