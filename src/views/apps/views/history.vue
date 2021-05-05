<template>
  <van-list v-model:loading="loading" :finished="finished" @load="onLoad" finished-text="没有更多记录了">
    <ul class="item" v-for="item in list" :key="item.id">
      <li><span>工位名称</span>{{ item.stationName }}</li>
      <li><span>预约人</span>{{ item.userMainName }}</li>
      <li><span>创建时间</span>{{ item.createTime }}</li>
      <li><span>预约开始使用时间</span>{{ item.startTime }}</li>
      <li><span>预约结束使用时间</span>{{ item.endTime }}</li>
    </ul>
  </van-list>
</template>

<script>
import { getOrderInfoList } from '@/api/workstation.js';
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      current: 0
    };
  },
  methods: {
    onLoad() {
      getOrderInfoList(this.current + 1, this.$route.query.role === 'admin').then(response => {
        this.list = this.list.concat(response.data);
        this.current = response.current;
        this.loading = false;
        if (this.list.length >= response.total) {
          this.finished = true;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.van-list {
  flex: 1;
  overflow-y: auto;
  .item {
    background-color: #fff;
    border: 1px #ebedf0 solid;
    border-radius: 2px;
    margin: 5px 5px 0;
    padding: 5px 10px 0;
    li {
      font-size: 14px;
      padding-bottom: 5px;
      display: flex;
      justify-content: space-between;
      span {
        color: #999;
      }
    }
  }
}
</style>
