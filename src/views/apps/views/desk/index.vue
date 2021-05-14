<template>
  <div class="areas">
    <van-field v-model="fieldValue" @click="show = true" label="楼层" placeholder="请选择楼层" is-link readonly></van-field>
    <div class="plan">
      <div>
        <img v-if="planId" :src="require(`../../../../assets/plans/${planId}.png`)" />
        <span v-for="a in areas" :key="a.id" :style="areaStyle(a.appLocation)" @click="selectArea(a.id)">{{ a.name }}</span>
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
      fieldValue: '',
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
      this.$toast.loading({ duration: 0, message: '加载地图' });
      getAreaInfoList(selectedOptions[0].id, selectedOptions[1].id).then(response => {
        this.planId = `${selectedOptions[0].id}-${selectedOptions[1].id}`;
        this.fieldValue = selectedOptions.map(e => e.name).join('/');
        this.areas = response.data;
        this.show = false;
        this.$toast.clear();
      });
    },
    selectArea(aid) {
      this.$router.push({ name: 'control-area', params: { aid } });
    },
    areaStyle(appLocation) {
      const [width, height, left, top] = appLocation.split(',');
      return { width, height, left, top };
    }
  }
};
</script>

<style lang="less" scoped>
.areas {
  flex: 1;
  display: flex;
  flex-direction: column;
  .plan {
    background-color: #fff;
    flex: 1;
    overflow-x: auto;
    display: flex;
    align-items: center;
    & > div {
      position: relative;
      img {
        display: block;
        height: 80vh;
      }
      span {
        background-color: rgba(255, 0, 0, 0.5);
        color: #fff;
        font-size: 20px;
        overflow: hidden;
        position: absolute;
        z-index: 2;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
