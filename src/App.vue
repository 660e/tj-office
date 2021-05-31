<template>
  <router-view></router-view>
</template>

<script>
export default {
  mounted() {
    document.addEventListener('plusready', () => {
      const plus = window.plus;
      const webview = plus.webview.currentWebview();
      let first = 0;
      plus.key.addEventListener('backbutton', () => {
        if (location.hash.indexOf('/login') === -1) {
          webview.back();
        } else {
          if (!first) {
            first = new Date().getTime();
            this.$toast({ position: 'bottom', message: '再按一次退出应用' });
            setTimeout(() => (first = 0), 2000);
          } else {
            if (new Date().getTime() - first < 2000) {
              plus.runtime.quit();
            }
          }
        }
      });
    });
  }
};
</script>
