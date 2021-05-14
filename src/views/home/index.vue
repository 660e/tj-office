<template>
  <div>
    <van-swipe :autoplay="5000" :height="160">
      <van-swipe-item><img src="../../assets/20191115182445095.jpg" /></van-swipe-item>
      <van-swipe-item><img src="../../assets/20191115182536775.jpg" /></van-swipe-item>
      <van-swipe-item><img src="../../assets/20191115182553688.jpg" /></van-swipe-item>
    </van-swipe>
    <van-cell title="公告信息"></van-cell>
    <van-list>
      <van-cell v-for="(n, i) in notices" :key="i" :title="n.title" :value="n.value" icon="description"></van-cell>
    </van-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      notices: [
        {
          title: '就餐通告',
          value: '2021-05-03'
        },
        {
          title: '停车收费通告',
          value: '2021-05-03'
        },
        {
          title: '外来访客管理办法',
          value: '2021-05-03'
        },
        {
          title: '园区外来车辆管控通告',
          value: '2021-05-03'
        },
        {
          title: '节假日值班人员及电话',
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
