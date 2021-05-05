<template>
  <div>
    <div class="banner"></div>
    <div class="apps">
      <div>
        <van-icon name="completed" />
        <span>预约工位</span>
      </div>
      <div @click="to('history')">
        <van-icon name="todo-list-o" />
        <span>我的预约</span>
      </div>
      <div>
        <van-icon name="desktop-o" />
        <span>工位管理</span>
      </div>
      <div @click="to('records', 'admin')">
        <van-icon name="records" />
        <span>预约记录</span>
      </div>
      <div @click="to('visitor')">
        <van-icon name="notes-o" />
        <span>访客授权</span>
      </div>
      <div @click="to('invite')">
        <van-icon name="qr" />
        <span>邀请码</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    to(name, role) {
      this.$router.push({ name, query: { role } });
    }
  }
};
</script>

<style lang="less" scoped>
.banner {
  background: url(../../assets/banner.png) no-repeat center center / cover;
  height: 160px;
}
.apps {
  padding: 2vw;
  display: flex;
  flex-wrap: wrap;
  & > div {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px #ddd;
    margin: 2vw;
    width: 44vw;
    height: 70px;
    display: flex;
    align-items: center;
    i {
      font-size: 35px;
      margin: 0 10px 0 15px;
    }
    span {
      font-size: 16px;
    }
    &:active {
      background-color: rgba(25, 137, 250, 0.1);
    }
  }
}
</style>
