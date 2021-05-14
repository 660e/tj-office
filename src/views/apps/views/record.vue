<template>
  <van-list v-model:loading="loading" :finished="finished" @load="onLoad" finished-text="没有更多记录了">
    <ul class="r" v-for="r in records" :key="r.id">
      <li><span>工位名称</span>{{ r.stationName }}</li>
      <li><span>预约人</span>{{ r.userMainName }}</li>
      <li><span>创建时间</span>{{ r.createTime }}</li>
      <li><span>预约开始使用时间</span>{{ r.startTime }}</li>
      <li><span>预约结束使用时间</span>{{ r.endTime }}</li>
    </ul>
  </van-list>
</template>

<script>
import { getOrderInfoList } from '@/api/workstation.js';
export default {
  data() {
    return {
      records: [],
      loading: false,
      finished: false,
      current: 0
    };
  },
  methods: {
    onLoad() {
      getOrderInfoList(this.current + 1, this.$route.query.role === 'admin').then(response => {
        this.records = this.records.concat(response.data);
        this.current = response.current;
        this.loading = false;
        if (this.records.length >= response.total) {
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
  .r {
    background-color: #fff;
    margin-top: 5px;
    padding: 10px;
    li {
      font-size: 14px;
      padding-bottom: 10px;
      line-height: 1;
      display: flex;
      justify-content: space-between;
      &:last-child {
        padding: 0;
      }
      span {
        color: #999;
      }
    }
  }
}
</style>
