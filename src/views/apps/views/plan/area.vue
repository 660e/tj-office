<template>
  <div class="desks">
    <template v-if="action === 'reserve'">
      <div class="van-cell-group__title"></div>
      <van-cell-group>
        <van-field v-model="date" @click="show = true" label="来访日期" is-link readonly></van-field>
      </van-cell-group>
      <van-calendar v-model:show="show" :default-date="[startTime, endTime]" :round="false" @confirm="onConfirm" type="range" allow-same-day />
    </template>
    <van-pull-refresh v-model="loading" @refresh="onRefresh">
      <ul :class="action">
        <li v-for="d in desks" :key="d.id" :class="{ on: d.status === 101, reserved: d.isReserved, selected: d._selected }" @click="handle(d)">
          <van-icon name="desktop-o" />
          <span>{{ d.name }}</span>
        </li>
      </ul>
    </van-pull-refresh>
    <template v-if="action === 'reserve'">
      <van-button :disabled="disabled" @click="submit" type="primary">预约（{{ desks.filter(d => d._selected).length }}/{{ limit }}）</van-button>
    </template>
  </div>
</template>

<script>
import { getStationReservationList, addOrderInfo } from '@/api/workstation.js';
import dayjs from 'dayjs';
export default {
  data() {
    return {
      aid: this.$route.params.aid,
      action: this.$route.query.action,
      date: `${dayjs().format('YYYY-MM-DD')}/${dayjs().format('YYYY-MM-DD')}`,
      startTime: new Date(),
      endTime: new Date(),
      desks: [],
      show: false,
      loading: false,
      disabled: true,
      limit: 2
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      const startDate = this.action === 'reserve' ? dayjs(this.startTime).format('YYYY-MM-DD') : null;
      const endDate = this.action === 'reserve' ? dayjs(this.endTime).format('YYYY-MM-DD') : null;
      this.loading = true;
      this.disabled = true;
      this.desks.forEach(d => (d._selected = false));
      getStationReservationList(this.aid, startDate, endDate).then(response => {
        this.desks = response.data;
        this.loading = false;
      });
    },
    onRefresh() {
      this.getData();
    },
    onConfirm(values) {
      [this.startTime, this.endTime] = values;
      this.date = `${dayjs(this.startTime).format('YYYY-MM-DD')}/${dayjs(this.endTime).format('YYYY-MM-DD')}`;
      this.show = false;
      this.getData();
    },
    handle(d) {
      if (!this.loading) {
        switch (this.action) {
          case 'reserve':
            d._selected = d.isReserved ? false : !d._selected;
            this.disabled = !(this.desks.filter(e => e._selected).length <= this.limit && this.desks.filter(e => e._selected).length > 0);
            return;
          case 'control':
            this.$router.push({ name: 'desk', params: { aid: this.aid, did: d.id } });
            return;
        }
      }
    },
    submit() {
      const desks = this.desks.filter(d => d._selected);
      const { buildingId, buildingName, floorId, floorName } = JSON.parse(this.$route.params.area);
      const params = {
        areaId: desks[0].areaId,
        areaName: desks[0].areaName,
        buildingId,
        buildingName,
        floorId,
        floorName,
        startTime: dayjs(this.startTime).format('YYYY-MM-DD'),
        endTime: dayjs(this.endTime).format('YYYY-MM-DD'),
        userMainId: JSON.parse(sessionStorage.getItem('user')).id,
        userMainName: JSON.parse(sessionStorage.getItem('user')).name,
        userSubId: '',
        userSubName: '',
        stationName: desks.map(d => d.name).join(','),
        reservationList: desks.map(d => ({ stationId: d.id, stationName: d.name }))
      };
      this.$dialog
        .confirm({
          message: `是否预约${desks.map(d => d.name).join('/')}`,
          beforeClose: action => {
            return new Promise(resolve => {
              if (action === 'confirm') {
                addOrderInfo(params).then(response => {
                  if (response.data === '预约成功') {
                    this.$toast.success(response.data);
                  } else {
                    this.$notify({ type: 'warning', message: response.data }); // TODO
                  }
                  resolve(true);
                });
              } else {
                resolve(true);
              }
            });
          }
        })
        .then(() => {
          this.getData();
        })
        .catch(() => {});
    }
  }
};
</script>

<style src="./area.less" lang="less" scoped></style>
