<template>
  <van-list v-model:loading="loading" :finished="finished" @load="onLoad" finished-text="没有更多记录了">
    <van-cell
      v-for="item in list"
      :key="item.id"
      :title="item.userName"
      :value="stateFormatter(item.state)"
      :label="item.loginName"
      :to="{ name: 'visitor-details', params: { id: item.id } }"
      is-link
      center
    />
  </van-list>
</template>

<script>
import { getVisitorInfoList } from '@/api/workstation.js';
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
      getVisitorInfoList(this.current + 1).then(response => {
        this.list = this.list.concat(response.data);
        this.current = response.current;
        this.loading = false;
        if (this.list.length >= response.total) {
          this.finished = true;
        }
      });
    },
    stateFormatter(state) {
      return state === '0' ? '未启用' : '';
    }
  }
};
</script>

<style lang="less" scoped>
.van-list {
  flex: 1;
  overflow-y: auto;
  .van-cell::v-deep(.van-cell__value) {
    line-height: 1;
    padding-top: 1px;
  }
  .van-cell::v-deep(.van-icon) {
    height: auto;
    line-height: 1;
  }
}
</style>
