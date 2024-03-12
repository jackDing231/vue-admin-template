<template>
  <div class="login-container">
    <div class="logo" />
    <div class="form">
      <h1>登录</h1>
      <el-card shadow="never" class="login-card">
        <!--登录表单-->
        <!-- :model是v-bind的简写 -->
        <el-form ref="form" :model="loginForm" :rules="loginRules">
          <el-form-item prop="mobile">
            <el-input v-model="loginForm.mobile" placeholder="请输入手机号" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" show-password placeholder="请输入密码" />
          </el-form-item>
          <el-form-item prop="isAgree">
            <el-checkbox v-model="loginForm.isAgree">用户平台使用协议</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width: 350px;" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data() {
    return {
      loginForm: { // 登录表单数据
        mobile: process.env.NODE_ENV === 'development' ? '13800000002' : '',
        password: process.env.NODE_ENV === 'development' ? 'hm#qd@23!' : '',
        isAgree: process.env.NODE_ENV === 'development'
      },
      loginRules: { // 登录表单验证规则
        mobile: [{
          required: true,
          message: '请输入手机号',
          trigger: 'blur' // 失去焦点时验证
        }, {
          pattern: /^1[3-9]\d{9}$/, // 正则表达式
          message: '请输入正确的手机号', // 验证失败提示信息
          trigger: 'blur' // 失去焦点时验证
        }
        ],
        password: [{
          required: true, // 必填项
          message: '请输入密码', // 验证失败提示信息
          trigger: 'blur' // 失去焦点时验证
        }, {
          min: 6, // 最小长度
          max: 20, // 最大长度
          message: '密码长度在6到20个字符', // 验证失败提示信息
          trigger: 'blur' // 失去焦点时验证
        }
        ],
        // required只能检查null "" undefined
        isAgree: [{
          validator: (rule, value, callback) => {
            // rule规则
            // value检查的数据 true/false
            // callback函数  执行这个函数
            // 成功执行callback() 失败执行callback(new Error('错误信息'))
            if (value) {
              callback()
            } else {
              callback(new Error('请同意用户平台使用协议'))
            }
          }
        }]
      }
    }
  },
  methods: {
    login() { // 登录
      // 1.表单验证
      this.$refs.form.validate(async(valid) => {
        // valid验证结果
        if (valid) {
          // 验证成功
          console.log('校验通过')
          // 2.发送请求
          await this.$store.dispatch('user/login', this.loginForm)
          this.$router.push('/') // 跳转到首页
        }
      })
    }
  }
}
</script>
<style lang="scss">
.login-container {
  display: flex;
  align-items: stretch;
  height: 100vh;
  .logo {
    flex: 3;
    background: rgba(38, 72, 176) url(../../assets/common/login_back.png)
      no-repeat center / cover;
    border-top-right-radius: 60px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    padding: 0 100px;
    .icon {
      background: url(../../assets/common/logo.png) no-repeat 70px center /
        contain;
      width: 300px;
      height: 50px;
      margin-bottom: 50px;
    }
    p {
      color: #fff;
      font-size: 18px;
      margin-top: 20px;
      width: 300px;
      text-align: center;
    }
  }
  .form {
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 176px;
    .el-card {
      border: none;
      padding: 0;
    }
    h1 {
      padding-left: 20px;
      font-size: 24px;
    }
    .el-input {
      width: 350px;
      height: 44px;
      .el-input__inner {
        background: #f4f5fb;
      }
    }
    .el-checkbox {
      color:#606266;
    }
  }
}
</style>
