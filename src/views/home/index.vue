<template>
  <h1>home</h1>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    if (!sessionStorage.getItem('token')) {
      this.$router.push({ name: 'login' });
    }
  }
};
</script>
