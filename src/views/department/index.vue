<template>
  <div class="container">
    <div class="app-container">
      <el-tree :expand-on-click-node="false" default-expand-all :data="depts" :props="defaultProps">
        <!-- 节点结构 -->
        <!-- v-slot="{ node, data }" 智能用在template -->
        <template v-slot="{ data }">
          <el-row style="width: 100%;height: 40px;" type="flex" justify="space-between" align="middle">
            <el-col>{{ data.name }}</el-col>
            <el-col :span="4">
              <span class="tree-manager">{{ data.managerName }}</span>
              <el-dropdown @command="operateDept($event, data.id)">
                <span class="el-dropdown-link">
                  操作<i class="el-icon-arrow-down el-icon--right" />
                </span>
                <!-- 下拉菜单选项 -->
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="add">添加子部门</el-dropdown-item>
                  <el-dropdown-item command="edit">编辑部门</el-dropdown-item>
                  <el-dropdown-item command="delete">删除部门</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </template>
      </el-tree>
    </div>
    <add-dept ref="addDept" v-loading="loading" :current-node-id="currentNodeId" :show-dialog.sync="showDialog" @updateDepartment="getDepartment" />
  </div>
</template>
<script>
import { deleteDepartment, getDepartment } from '@/api/department'
import { listToTree } from '@/utils'
import addDept from './components/add-dept.vue'
export default {
  name: 'Department',
  components: { addDept },
  data() {
    return {
      depts: [{
        name: '传智教育',
        managerName: '张三',
        children: [{
          name: '总裁办',
          managerName: '李四'
        }, {
          name: '行政部',
          managerName: '王五'
        }, {
          name: '财务部',
          managerName: '赵六'
        }]
      }],
      defaultProps: {
        label: 'name',
        children: 'children'
      },
      showDialog: false,
      currentNodeId: null, // 存储当前点击的id
      loading: false
    }
  },
  created() {
    this.getDepartment()
  },
  methods: {
    async getDepartment() { // 获取部门数据
      const result = await getDepartment() // 获取部门数据
      this.depts = listToTree(result, 0) // 将数据转换为树形结构
    },
    operateDept(command, id) { // 操作部门
      if (command === 'add') { // 添加子部门
        this.showDialog = true // 显示弹层
        this.currentNodeId = id
      } else if (command === 'edit') { // 编辑部门
        // 编辑部门
        this.showDialog = true // 显示弹层
        this.currentNodeId = id // 记录id
        this.loading = true
        setTimeout(() => {
          this.loading = false
        }, 1000)
        // 更新props-异步动作
        // 直接调用子组件的方法  同步的方法
        // 要在子组件获取数据
        // 父组件调用子组件的方法
        // this.$refs.addDept等同于子组件的this
        this.$nextTick(() => {
          this.$refs.addDept.getDepartmentDetail()
        })
      } else if (command === 'delete') { // 删除部门
        this.$confirm('此操作将永久删除该部门, 是否继续?', '提示', { // 确认删除
          confirmButtonText: '确定', // 确定按钮的文本
          cancelButtonText: '取消', // 取消按钮的文本
          type: 'warning' // 警告类型
        }).then(async() => { // 确认删除
          // 发送请求删除部门
          await deleteDepartment(id) // 删除部门
          // 提示删除成功
          this.$message({
            type: 'success',
            message: '删除成功!'
          }) // 提示删除成功
          // 刷新页面
          this.getDepartment() // 获取部门数据
        }).catch(() => {}) // 取消删除
      }
    }
  }
}
</script>
<style scoped>
.app-container {
  padding: 30px 140px;
  font-size: 14px;
}
.tree-manager {
  width: 50%;
  display: inline-block;
  margin: 10px;
}
</style>
