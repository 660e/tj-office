<template>
  <div style="overflow-y: auto">
    <div class="van-cell-group__title"></div>
    <van-cell-group>
      <van-cell title="工位编号" :value="info.id" />
      <van-cell title="工位类型" :value="$filters.deskType(info.type)" />
      <van-cell title="所属区域" :value="info.areaName" />
      <van-cell title="使用情况" :value="$filters.deskStatus(info.status)" />
      <van-cell center title="工位开关">
        <template #right-icon>
          <van-switch
            :loading="loading"
            :model-value="info.status"
            :active-value="101"
            :inactive-value="102"
            @update:model-value="onUpdateDeskStatus"
            size="22"
          />
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group v-for="d in info.deviceList" :key="d.id" :title="d.name">
      <van-cell title="设备编码" :value="d.code" />
      <van-cell title="设备网卡" :value="d.mac" />
      <van-cell title="设备描述" :value="d.desc" />
      <van-cell title="创建时间" :value="d.createTime" />
      <van-cell title="更新时间" :value="d.updateTime" />
      <van-cell center title="设备开关">
        <template #right-icon>
          <van-switch
            :loading="loading"
            :model-value="d.status"
            active-value="1"
            inactive-value="0"
            @update:model-value="onUpdateDeviceStatus(d)"
            size="22"
          />
        </template>
      </van-cell>
    </van-cell-group>
    <div class="van-cell-group__title"></div>
  </div>
</template>

<script>
import { getStationInfo, controlStation, controlDevices } from '@/api/workstation.js';
export default {
  data() {
    return {
      did: this.$route.params.did,
      loading: false,
      info: {}
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      getStationInfo(this.did).then(response => {
        this.info = response.data;
        this.loading = false;
      });
    },
    onUpdateDeskStatus(newValue) {
      this.loading = true;
      const params = {
        command: newValue === 101 ? 'open' : 'close',
        isCheck: 0,
        stationId: this.info.id,
        userId: JSON.parse(sessionStorage.getItem('user')).id
      };
      controlStation(params).then(response => {
        if (response.httpCode === 200 && response.data.type === 'SUCCESS') {
          this.$toast.success('控制成功');
        } else {
          this.$toast.fail('控制失败');
        }
        this.getData();
      });
    },
    onUpdateDeviceStatus(device) {
      this.loading = true;
      const params = {
        deviceId: device.id,
        stationId: device.stationId,
        userId: JSON.parse(sessionStorage.getItem('user')).id
      };
      if (device.type === 'nameplate') {
        params.command = device.status === '0' ? 'login' : 'wait';
      } else {
        params.command = device.status === '0' ? 'open' : 'close';
      }
      controlDevices(params).then(response => {
        if (response.httpCode === 200 && response.data.type === 'SUCCESS') {
          this.$toast.success('控制成功');
        } else {
          this.$toast.fail('控制失败');
        }
        this.getData();
      });
    }
  }
};
</script>
