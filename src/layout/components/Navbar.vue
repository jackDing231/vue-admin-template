<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img v-if="avatar" :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
          <span v-else class="avatar-name">{{ name?.charAt(0) }}</span>
          <span class="name">{{ name }}</span>
          <i class="el-icon-setting" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <a target="_blank" href="https://github.com/PanJiaChen/vue-admin-template/">
            <el-dropdown-item>项目地址</el-dropdown-item>
          </a>
          <el-dropdown-item @click.native="dialogVisible = true">修改密码</el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">注销</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog
      title="修改密码"
      :visible.sync="dialogVisible"
      width="500px"
      @close="btnCancel"
    >
      <el-form ref="form" :model="passForm" :rules="passRules" label-width="90px">
        <el-form-item label="原密码" prop="oldPassword">
          <el-input v-model="passForm.oldPassword" show-password style="width: 80%;" />
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="passForm.newPassword" show-password style="width: 80%;" />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="passForm.confirmPassword" show-password style="width: 80%;" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="btnCancel">取 消</el-button>
        <el-button type="primary" @click="btnOK">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { updatePassword } from '@/api/user'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      dialogVisible: false,
      passForm: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      passRules: {
        oldPassword: [{
          required: true,
          message: '请输入原密码',
          trigger: 'blur'
        }, {
          min: 6, // 最小长度
          max: 20, // 最大长度
          message: '密码长度在6到20个字符', // 验证失败提示信息
          trigger: 'blur' // 失去焦点时验证
        }],
        newPassword: [{
          required: true,
          message: '请输入新密码',
          trigger: 'blur'
        }, {
          min: 6, // 最小长度
          max: 20, // 最大长度
          message: '密码长度在6到20个字符', // 验证失败提示信息
          trigger: 'blur' // 失去焦点时验证
        }],
        confirmPassword: [{
          required: true,
          message: '请确认密码',
          trigger: 'blur'
        }, {
          min: 6, // 最小长度
          max: 20, // 最大长度
          message: '密码长度在6到20个字符', // 验证失败提示信息
          trigger: 'blur' // 失去焦点时验证
        }, {
          // 这里必须要用箭头函数
          validator: (rule, value, callback) => {
            if (value !== this.passForm.newPassword) { // 如果两次输入的密码不一致
              callback(new Error('两次输入的密码不一致')) // 返回错误
            } else {
              callback() // 返回正确
            }
          } // 验证密码是否一致
        }]
      }
    }
  },
  computed: {
    ...mapGetters([
      // 引入图像和用户名称
      'sidebar',
      'avatar',
      'name'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push('/login')
    },
    btnOK() {
      this.$refs.form.validate(async valid => { // 校验
        if (valid) { // 如果校验通过
          const { oldPassword, newPassword } = this.passForm
          await updatePassword({ oldPassword, newPassword })
          // 修改成功，失败的话axios会处理
          this.$message({
            message: '密码修改成功',
            type: 'success'
          })
          this.$refs.form.resetFields() // 重置表单，element-ui的方法
          this.dialogVisible = false // 关闭弹窗
        } else { // 如果校验不通过
          return false // 阻止表单提交
        }
      })
    },
    btnCancel() {
      this.$refs.form.resetFields() // 重置表单，element-ui的方法
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        display: flex;
        align-items: center;

        .name {
          margin: 0 10px;
          font-size: 16px;
          cursor: pointer;
        }

        .el-icon-setting {
          margin: 0 10px;
          font-size: 20px;
        }

        .user-avatar {
          cursor: pointer;
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }

        .avatar-name {
          width: 30px;
          height: 30px;
          background-color: #04c9be;
          border-radius: 50%;
          text-align: center;
          line-height: 30px;
          color: #fff;
          margin-right: 4px;
          cursor: pointer;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
