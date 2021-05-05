<template>
  <div>
    <van-cell title="用户姓名" :value="info.userName"></van-cell>
    <van-cell title="所属公司" :value="info.remark"></van-cell>
    <van-cell title="联系方式" :value="info.phoneNum"></van-cell>
    <van-cell title="电子邮箱" :value="info.email"></van-cell>
    <van-cell title="预约开始使用时间" :value="info.startTime"></van-cell>
    <van-cell title="预约结束使用时间" :value="info.endTime"></van-cell>
    <van-cell center title="状态">
      <template #right-icon>
        <van-switch :loading="loading" :model-value="state" @update:model-value="onUpdateValue" size="22" />
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getVisitorInfo, updateUserState } from '@/api/workstation.js';
export default {
  data() {
    return {
      loading: false,
      info: {},
      state: false
    };
  },
  mounted() {
    getVisitorInfo(this.$route.params.id).then(response => {
      this.info = response.data;
      this.state = response.data.state === '1';
    });
  },
  methods: {
    onUpdateValue(newValue) {
      this.loading = true;
      updateUserState(this.info.id, newValue ? '1' : '0').then(response => {
        if (response.httpCode === 200) {
          this.$toast.success('更新成功');
          this.loading = false;
          this.state = newValue;
        } else {
          this.$toast.fail('更新失败');
          this.loading = false;
        }
      });
    }
  }
};
</script>
