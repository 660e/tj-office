<template>
  <van-form @submit="onSubmit">
    <div class="van-cell-group__title"></div>
    <van-cell-group>
      <van-field v-model="inviteUserName" name="inviteUserName" label="邀请人" readonly></van-field>
      <van-field v-model="userInfo.userName" name="userName" label="用户姓名" placeholder="用户姓名" :rules="[rules.required]" clearable></van-field>
      <van-field v-model="userInfo.remark" name="remark" label="所属公司" placeholder="所属公司" :rules="[rules.required]" clearable></van-field>
      <van-field
        v-model="userInfo.phoneNum"
        name="phoneNum"
        label="联系方式"
        placeholder="联系方式"
        :rules="[rules.required, rules.phone]"
        clearable
      ></van-field>
      <van-field
        v-model="userInfo.email"
        name="email"
        label="电子邮箱"
        placeholder="电子邮箱"
        :rules="[rules.required, rules.email]"
        clearable
      ></van-field>
      <van-field
        v-model="userInfo.password"
        name="password"
        label="密码"
        placeholder="密码"
        type="password"
        :rules="[rules.required, rules.password]"
        clearable
      ></van-field>
      <van-field
        v-model="confirmPassword"
        name="confirmPassword"
        label="确认密码"
        placeholder="确认密码"
        type="password"
        :rules="[rules.required]"
        clearable
      ></van-field>
    </van-cell-group>
    <div class="tips">8~16个字符，至少包含1个大写字母、1个小写字母、1个数字</div>
    <van-button type="primary" native-type="submit">注册</van-button>
  </van-form>
</template>

<script>
import { regUserInfo } from '@/api/workstation.js';
export default {
  data() {
    return {
      inviteUserName: this.$route.query.inviteUserName,
      userInfo: {
        userName: '',
        remark: '',
        phoneNum: '',
        email: '',
        password: '',
        state: '1',
        tag: 'VISITOR'
      },
      confirmPassword: '',
      rules: {
        required: { required: true, message: '必填' },
        phone: { pattern: /^1[3|4|5|7|8][0-9]{9}$/, message: '不合法' },
        email: { pattern: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/, message: '不合法' },
        password: { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/, message: '不合法' }
      }
    };
  },
  methods: {
    onSubmit() {
      if (this.confirmPassword === this.userInfo.password) {
        const params = {
          inviteCode: this.$route.query.code,
          userInfo: this.userInfo
        };
        params.userInfo.loginName = this.userInfo.phoneNum;
        regUserInfo(params).then(response => {
          if (response.httpCode === 200) {
            this.$toast.success({
              message: '注册成功',
              onClose: () => this.$router.push({ name: 'login' })
            });
          } else {
            this.$toast.fail('注册失败');
          }
        });
      } else {
        this.$notify({ type: 'warning', message: '请再次确认密码' });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.tips {
  padding: 10px 10px 0;
  text-align: center;
}
.van-form {
  flex: 1;
  overflow-y: auto;
  .van-button {
    width: 70vw;
    margin: 15vw;
  }
}
</style>
