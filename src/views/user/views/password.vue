<template>
  <van-form @submit="onSubmit">
    <van-field
      v-model="oldPassword"
      name="oldPassword"
      label="旧密码"
      placeholder="旧密码"
      type="password"
      :rules="[rules.required]"
      clearable
    ></van-field>
    <van-field
      v-model="newPassword"
      name="newPassword"
      label="新密码"
      placeholder="新密码"
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
    <van-button type="primary" native-type="submit">提交</van-button>
  </van-form>
</template>

<script>
import { updatePwd } from '@/api/workstation.js';
export default {
  data() {
    return {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      rules: {
        required: { required: true, message: '必填' },
        password: { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/, message: '不合法' }
      }
    };
  },
  methods: {
    onSubmit() {
      const o = this.oldPassword.trim();
      const n = this.newPassword.trim();
      const c = this.confirmPassword.trim();
      if (o === n) {
        this.$notify({ type: 'warning', message: '新密码不能与旧密码相同' });
      } else if (n !== c) {
        this.$notify({ type: 'warning', message: '请再次确认新密码' });
      } else {
        updatePwd(o, n).then(response => {
          // TODO
          console.log(response);
        });
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
