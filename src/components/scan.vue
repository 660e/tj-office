<template>
  <div class="scan" id="bc"></div>
</template>

<script>
import { processQRCode } from '@/api/workstation.js';
const plus = window.plus;
export default {
  data() {
    return {
      bc: null
    };
  },
  mounted() {
    this.init();
  },
  beforeUnmount() {
    this.close();
  },
  methods: {
    init() {
      if (plus) {
        this.bc = new plus.barcode.Barcode('bc');
        this.bc.onmarked = this.onmarked;
        this.start();
      }
    },
    start() {
      if (plus) {
        this.bc.start();
      }
    },
    cancel() {
      if (plus) {
        this.bc.cancel();
      }
    },
    close() {
      if (plus) {
        this.bc.close();
      }
    },
    onmarked(type, code) {
      this.cancel();
      this.$toast.loading({ duration: 0, message: '识别中...' });
      if (type === plus.barcode.QR) {
        processQRCode(code).then(response => {
          this.$toast.clear();
          if (response.httpCode === 200) {
            switch (response.data.type) {
              case 'COMMAND':
                this.to(response.data, code);
                break;
              case 'ERROR':
                this.$notify({ type: 'warning', message: response.data.msg, onClose: () => this.start() });
                break;
            }
          }
        });
      }
    },
    to(data, code) {
      switch (data.command) {
        case 'REG_USER':
          this.$router.push({
            name: this.$route.query.redirect,
            query: { code, inviteUserName: data.result.inviteUserName }
          });
          break;
        case 'USE_STATION':
          this.$router.push({
            name: this.$route.query.redirect,
            params: {
              aid: data.result.areaId,
              did: data.result.id
            }
          });
          break;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.scan {
  background-color: #ccc;
  flex: 1;
}
</style>
