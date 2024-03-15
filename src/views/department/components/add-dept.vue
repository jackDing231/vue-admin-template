<template>
  <el-dialog :title="showTitle" :visible="showDialog" @close="close">
    <el-form ref="form" label-width="120px" :model="formData" :rules="formRules">
      <el-form-item prop="name" label="部门名称">
        <el-input v-model="formData.name" placeholder="2-10个字符" style="width:80%" size="mini" />
      </el-form-item>
      <el-form-item prop="code" label="部门编码">
        <el-input v-model="formData.code" placeholder="2-10个字符" style="width:80%" size="mini" />
      </el-form-item>
      <el-form-item prop="managerId" label="部门负责人">
        <el-select v-model="formData.managerId" placeholder="请选择负责人" style="width:80%" size="mini">
          <el-option v-for="item in managerList" :key="item.id" :label="item.username" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item prop="introduce" label="部门描述">
        <el-input v-model="formData.introduce" type="textarea" placeholder="1-100个字符" :rows="4" style="width:80%" size="mini" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="btnOK">确定</el-button>
        <el-button @click="close()">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { getDepartment, getManagerList, addDepartment, getDepartmentDetail, updateDepartment } from '@/api/department'

export default {
  name: 'AddDept',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    currentNodeId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      formData: {
        code: '', // 部门编码
        introduce: '', // 部门介绍
        managerId: '', // 部门负责人
        name: '', // 部门名称
        pid: '' // 上级部门
      },
      formRules: {
        code: [{
          required: true,
          message: '部门编码不能为空',
          trigger: 'blur'
        }, {
          min: 2,
          max: 10,
          message: '长度在 2 到 10 个字符',
          trigger: 'blur'
        }, {
          validator: async(rule, value, callback) => {
            let result = await getDepartment()
            // 判断是否为编辑模式
            if (this.formData.id) {
              result = result.filter(item => item.id !== this.formData.id)
            }
            if (result.some(item => item.code === value)) { // 部门编码不能重复
              callback(new Error('部门编码不能重复'))
            } else {
              callback() // 验证通过
            }
          },
          trigger: 'blur'
        }], // 部门编码
        introduce: [{
          required: true,
          message: '部门介绍不能为空',
          trigger: 'blur'
        }, {
          min: 1,
          max: 100,
          message: '长度在 1 到 100 个字符',
          trigger: 'blur'
        }], // 部门介绍
        managerId: [{
          required: true,
          message: '部门负责人不能为空',
          trigger: 'blur'
        }], // 部门负责人
        name: [{
          required: true,
          message: '部门名称不能为空',
          trigger: 'blur'
        }, {
          min: 2,
          max: 10,
          message: '长度在 2 到 10 个字符',
          trigger: 'blur'
        }, {
          validator: async(rule, value, callback) => {
            let result = await getDepartment()
            // 判断是否为编辑模式
            if (this.formData.id) {
              result = result.filter(item => item.id !== this.formData.id)
            }
            if (result.some(item => item.name === value)) { // 部门名称不能重复
              callback(new Error('部门名称不能重复'))
            } else {
              callback() // 验证通过
            }
          },
          trigger: 'blur'
        }] // 部门名称
      },
      managerList: [] // 部门负责人列表
    }
  },
  computed: {
    showTitle() {
      return this.formData.id ? '编辑部门' : '新增部门'
    } // 弹窗标题
  },
  created() {
    this.getManagerList()
  },
  methods: {
    close() {
      // resetFields只能重置模板中绑定的数据
      this.formData.id = null // 清空id
      this.formData.pid = null // 清空pid
      this.$refs.form.resetFields() // 重置表单
      this.$emit('update:showDialog', false)
    },
    async getManagerList() {
      this.managerList = await getManagerList()
    },
    btnOK() {
      this.$refs.form.validate(async valid => { // 校验表单
        if (valid) { // 校验通过
          let msg = '新增'
          if (this.formData.id) {
            // 编辑模式
            msg = '更新'
            await updateDepartment(this.formData) // 更新部门信息
          } else {
            // 新增模式
            await addDepartment({ ...this.formData, pid: this.currentNodeId }) // 新增部门
          }
          // 通知父组件更新
          this.$emit('updateDepartment')
          this.$message({
            message: `${msg}部门成功`,
            type: 'success'
          })
          this.close()
        }
      })
    },
    async getDepartmentDetail() {
      this.formData = await getDepartmentDetail(this.currentNodeId)
    }
  }
}
</script>
