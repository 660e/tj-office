<template>
  <div class="areas">
    <div class="van-cell-group__title"></div>
    <van-cell-group>
      <van-field v-model="field" @click="show = true" label="楼层" placeholder="请选择楼层" is-link readonly></van-field>
    </van-cell-group>
    <div class="plan">
      <div>
        <img v-if="planId" :src="require(`../../../../assets/plans/${planId}.png`)" />
        <span v-for="a in areas" :key="a.id" :style="areaStyle(a.appLocation)" @click="selectArea(a)">{{ a.name }}</span>
      </div>
    </div>
    <van-popup v-model:show="show" position="bottom">
      <van-cascader
        title="请选择楼层"
        v-model="cascaderValue"
        :options="options"
        :field-names="{ text: 'name', value: 'id' }"
        @close="show = false"
        @change="onChange"
        @finish="onFinish"
      ></van-cascader>
    </van-popup>
  </div>
</template>

<script>
import { getBuildingInfoList, getFloorInfoList, getAreaInfoList } from '@/api/workstation.js';
export default {
  data() {
    return {
      field: '',
      cascaderValue: '',
      show: false,
      options: [],
      planId: '',
      areas: []
    };
  },
  mounted() {
    getBuildingInfoList().then(response => {
      this.options = response.data.map(e => {
        e.children = [];
        return e;
      });
    });
  },
  methods: {
    onChange({ value }) {
      const c = this.options.find(e => e.id === value);
      if (c) {
        getFloorInfoList(value).then(response => (c.children = response.data));
      }
    },
    onFinish({ selectedOptions }) {
      this.$toast.loading({ duration: 0, message: '加载中...' });
      getAreaInfoList(selectedOptions[0].id, selectedOptions[1].id).then(response => {
        this.planId = `${selectedOptions[0].id}-${selectedOptions[1].id}`;
        this.field = selectedOptions.map(e => e.name).join('/');
        this.areas = response.data;
        this.show = false;
        this.$toast.clear();
      });
    },
    selectArea(a) {
      this.$router.push({
        name: 'area',
        params: {
          aid: a.id,
          area: JSON.stringify(a)
        },
        query: {
          action: this.$route.query.action
        }
      });
    },
    areaStyle(appLocation) {
      const [width, height, left, top] = appLocation.split(',');
      return { width, height, left, top };
    }
  }
};
</script>

<style src="./index.less" lang="less" scoped></style>
