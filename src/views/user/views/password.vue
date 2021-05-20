<template>
  <van-form @submit="onSubmit">
    <div class="van-cell-group__title"></div>
    <van-cell-group>
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
        :rules="[rules.required]"
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
    <!-- <div class="tips">8~16个字符，至少包含1个大写字母、1个小写字母、1个数字</div> -->
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
        const params = {
          oldPwd: o,
          newPwd: n,
          userId: JSON.parse(sessionStorage.getItem('user')).id,
          ruleId: JSON.parse(sessionStorage.getItem('user')).rid
        };
        updatePwd(params).then(response => {
          if (response.data.successful === 'true') {
            this.$toast({
              type: 'success',
              message: '修改成功',
              onClose: () => {
                sessionStorage.removeItem('token');
                sessionStorage.removeItem('user');
                this.$router.push({ name: 'login' });
              }
            });
          } else {
            this.$toast.fail('修改失败');
          }
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
