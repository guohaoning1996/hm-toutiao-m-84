<template>
  <div class="page-login">
    <van-nav-bar left-arrow
                 @click-left="$router.back()"
                 title="登 录"></van-nav-bar>
    <van-cell-group>
      <van-field label="手机号"
                 @blur="checkMobile"
                 :error-message="errMsg.mobile"
                 v-model="loginForm.mobile"
                 placeholder="请输入手机号" />
      <van-field label="验证码"
                 @blur="checkCode"
                 :error-message="errMsg.code"
                 v-model="loginForm.code"
                 placeholder="请输入验证码">
        <van-button class="p5"
                    slot="button"
                    size="mini"
                    type="primary">
          发送验证码
        </van-button>
      </van-field>
    </van-cell-group>
    <div class="btn_box">
      <van-button type="info"
                  @click="login"
                  block
                  round>登 录</van-button>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
import { mapMutations } from 'vuex'
export default {
  name: 'user-login',
  data () {
    return {
      // 表单数据
      loginForm: {
        mobile: '',
        code: ''
      },
      errMsg: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    checkMobile () {
      // 非空判断
      if (!this.loginForm.mobile) {
        this.errMsg.mobile = '请输入手机号'
        return false
      }
      // 格式判断
      if (!/^1[3-9]\d{9}$/.test(this.loginForm.mobile)) {
        this.errMsg.mobile = '请输入正确手机号'
        return false
      }
      // 成功
      this.errMsg.mobile = ''
    },
    checkCode () {
      // 非空判断
      if (!this.loginForm.code) {
        this.errMsg.code = '请输入验证码'
        return false
      }
      // 格式判断
      if (!/^\d{6}$/.test(this.loginForm.code)) {
        this.errMsg.code = '请输入正确验证码'
        return false
      }
      // 成功
      this.errMsg.code = ''
    },
    async login () {
      this.checkMobile()
      this.checkCode()
      if (this.errMsg.mobile || this.errMsg.code) {
        return false
      }
      try {
        const data = await login(this.loginForm)
        this.setUser(data)
        const { redirectUrl } = this.$route.query
        this.$router.push(redirectUrl || '/user')
      } catch (e) {
        this.$toast.fail('手机号或验证码错误')
      }
    },
    ...mapMutations(['setUser'])
  }
  // 当输入焦点后，获取输入框的值。进行校验，失败的话给输入框绑定error-message属性赋值，成功清除值
  // 对应整个表单进行校验，获取每一项表单元素的值进行校验，同上
}
</script>

<style scoped lang='less'>
.p5 {
  padding: 0 5px;
}
.btn_box {
  padding: 10px;
  .van-button {
    height: 32px;
    line-height: 30px;
  }
}
</style>
