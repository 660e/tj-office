<template>
  <van-form @submit="onSubmit">
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
    <div class="tips">8~16个字符，至少包含1个大写字母、1个小写字母、1个数字</div>
    <van-button type="primary" native-type="submit">注册</van-button>
  </van-form>
</template>

<script>
import { regUserInfo } from '@/api/workstation.js';
export default {
  data() {
    return {
      inviteUserName: '',
      inviteCode: '',
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
          inviteCode: this.inviteCode,
          userInfo: this.userInfo
        };
        params.userInfo.loginName = this.userInfo.phoneNum;
        regUserInfo(params).then(response => {
          // TODO
          console.log(response);
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
.van-button {
  width: 70vw;
  margin: 15vw;
}
</style>
