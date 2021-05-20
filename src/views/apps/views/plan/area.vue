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
    <van-button v-if="action === 'reserve'" :disabled="disabled" @click="submit" type="primary">预约</van-button>
  </div>
</template>

<script>
import { getStationReservationList } from '@/api/workstation.js';
import dayjs from 'dayjs';
export default {
  data() {
    return {
      aid: this.$route.params.aid,
      action: this.$route.query.action,
      date: `${dayjs().format('YYYY-MM-DD')}/${dayjs().format('YYYY-MM-DD')}`,
      startTime: new Date(),
      endTime: new Date(),
      show: false,
      loading: false,
      disabled: true,
      desks: []
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      const startDate = this.action === 'reserve' ? dayjs(this.startTime).format('YYYY-MM-DD') : null;
      const endDate = this.action === 'reserve' ? dayjs(this.endTime).format('YYYY-MM-DD') : null;
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
      this.getData();
      this.show = false;
    },
    handle(d) {
      switch (this.action) {
        case 'reserve':
          d._selected = d.isReserved ? false : !d._selected;
          this.disabled = !this.desks.some(e => e._selected);
          return;
        case 'control':
          this.$router.push({ name: 'desk', params: { aid: this.aid, did: d.id } });
          return;
      }
    },
    submit() {
      console.log(this.desks);
    }
  }
};
</script>

<style src="./area.less" lang="less" scoped></style>
