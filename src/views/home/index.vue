<template>
  <div>
    <van-swipe :autoplay="5000" :height="160">
      <van-swipe-item><img src="../../assets/20191115182445095.jpg" /></van-swipe-item>
      <van-swipe-item><img src="../../assets/20191115182536775.jpg" /></van-swipe-item>
      <van-swipe-item><img src="../../assets/20191115182553688.jpg" /></van-swipe-item>
    </van-swipe>
    <van-cell title="公告信息"></van-cell>
    <van-list>
      <van-cell v-for="(e, i) in list" :key="i" :title="e.title" :value="e.value" icon="description"></van-cell>
    </van-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          title: 'Lorem, ipsum.',
          value: '2021-05-03'
        },
        {
          title: 'Perferendis, hic.',
          value: '2021-05-03'
        },
        {
          title: 'Id, pariatur.',
          value: '2021-05-03'
        },
        {
          title: 'Doloremque, sequi.',
          value: '2021-05-03'
        },
        {
          title: 'Illo, nostrum!',
          value: '2021-05-03'
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
img {
  display: block;
  width: 100%;
}
</style>
