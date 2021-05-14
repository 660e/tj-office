<template>
  <div class="desks">
    <div></div>
    <van-pull-refresh v-model="loading" @refresh="onRefresh">
      <ul>
        <li v-for="d in desks" :key="d.id" :class="{ on: d.status === 101 }" @click="view(d.id)">
          <van-icon name="desktop-o" />
          <span>{{ d.name }}</span>
        </li>
      </ul>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getStationReservationList } from '@/api/workstation.js';
export default {
  data() {
    return {
      aid: this.$route.params.aid,
      loading: false,
      desks: []
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      getStationReservationList(this.aid).then(response => {
        this.desks = response.data;
        this.loading = false;
      });
    },
    onRefresh() {
      this.getData();
    },
    view(did) {
      this.$router.push({ name: 'control-details', params: { aid: this.aid, did } });
    }
  }
};
</script>

<style lang="less" scoped>
.desks {
  flex: 1;
  display: flex;
  flex-direction: column;
  .van-pull-refresh {
    flex: 1;
    ul {
      padding: 2vw;
      display: flex;
      flex-wrap: wrap;
      li {
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0 0 10px #ddd;
        margin: 2vw;
        width: 28vw;
        height: 40px;
        display: flex;
        align-items: center;
        i {
          font-size: 16px;
          margin: 0 7px 0 10px;
        }
        span {
          font-size: 14px;
        }
        &.on {
          color: #0e0;
        }
        &:active {
          background-color: rgba(25, 137, 250, 0.1);
        }
      }
    }
  }
}
</style>
