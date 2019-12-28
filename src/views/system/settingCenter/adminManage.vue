<template>

  <div class="app-container">
    <div class="filter-container">
      <el-row type="flex" class="row-bg" justify="space-between">

        <el-col>
          <el-button style="margin-left: 10px;" type="primary" icon="el-icon-edit"
                     @click="openCreateDialog">新增管理员
          </el-button>
        </el-col>
      </el-row>
    </div>
    <el-table
      ref="multipleTable"
      :data="listData"
      tooltip-effect="dark"
      style="width: 100% ;padding: 20px"
      fit
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        type="index"
        label="序号"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户名"
        min-width="120">
      </el-table-column>
      <el-table-column
        label="类别"
        min-width="120">
        <template slot-scope="{row}">
          <div v-if="row.user_type===1">系统管理员</div>
          <div v-if="row.user_type===2">主校管理员</div>
          <div v-if="row.user_type===3">分校管理员</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="main_school"
        label="主校名"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="sub_school"
        label="分校名"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="register_date"
        label="注册日期"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label="状态"
        show-overflow-tooltip>
        <template slot-scope="{row}">
          <el-tag v-if="row.is_forbidden===0">已激活</el-tag>
          <el-tag v-else>已禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="success" size="medium" v-if="row.is_forbidden!==0" @click="activeThis(row)">
            激活账号
          </el-button>
          <el-button type="warning" size="medium" v-else @click="forbidThis(row)">
            禁用账号
          </el-button>
        </template>
      </el-table-column>

    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
                @pagination="getList"/>
    <el-dialog
      title="管理员输入框"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-form ref="IPForm" label-width="150px">
        <el-form-item label="输入管理员登录名">
          <el-input v-model="tempAdmin.username"/>
        </el-form-item>
        <el-form-item label="输入管理员姓名">
          <el-input v-model="tempAdmin.real_name"/>
        </el-form-item>
        <el-form-item label="输入主校名称">
          <el-input v-model="tempAdmin.main_school"/>
        </el-form-item>
        <el-form-item label="输入分校名称">
          <el-input v-model="tempAdmin.sub_school"/>
        </el-form-item>
        <el-form-item label="输入密码">
          <el-input v-model="tempAdmin.password"/>
        </el-form-item>
        <el-form-item label="输入分校名称">
          <el-input type="password" v-model="tempAdmin.password_confirm"/>
        </el-form-item>
        <el-row>
          <label style="margin-left: 65px">管理员类型</label>
          <el-select v-model="tempAdmin.user_type" placeholder="请选择" style="margin-left: 15px">
            <el-option
              v-for="item in userOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="createAdmin">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  // import {getAdmins, deleteAdmin, addAdmin, updateAdmin} from '@/api/apis'
  import {getAdminsSystem, createAdminsSystem, updateAdminsSystem} from "@/api/system_apis"
  import Pagination from '@/components/Pagination'
  import {Current} from "@/utils/time"; // secondary package based on el-pagination

  export default {
    name: "admin",
    components: {Pagination},
    data() {
      return {
        SubschoolOptions: new Set(),
        MainschoolOptions: new Set(),
        userOptions: [],
        dialogVisible: false,
        tempAdmin: {
          register_date: Current()
        },
        chosenList: [],
        listQuery: {
          limit: 10,
          page: 1,
          searchText: ''
        },
        listData: [],
        total: 0,

      }
    },
    created() {
      let user_type = this.$store.state.user.user_type
      console.log(user_type)
      this.userOptions.push({label: '分校管理员', value: 3})
      this.userOptions.push({label: '主校管理员', value: 2})
      this.userOptions.push({label: '系统管理员', value: 1})
      this.getList()
    },
    methods: {
      getList() {
        getAdminsSystem(this.listQuery).then(response => {
          this.listData = response.data
          this.total = response.total
        })

      },
      handleSelectionChange(val) {
        let temp = []
        val.forEach(item => {
          temp.push(item.user_id)
        });
        this.chosenList = temp
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
      openCreateDialog() {
        this.dialogVisible = true
        this.MainschoolOptions = [...new Set(this.listData.map(item => item.main_school))]
        this.SubschoolOptions = [...new Set(this.listData.map(item => item.sub_school))]
      },
      createAdmin() {
        if (this.tempAdmin.user_type === 2) {
          this.tempAdmin.sub_school = this.tempAdmin.main_school
        } else if (this.tempAdmin === 1) {
          this.tempAdmin.main_school = ''
          this.tempAdmin.sub_school = ''
        }
        let information = ''
        if (this.tempAdmin.password === this.tempAdmin.password_confirm)
          createAdminsSystem(this.tempAdmin).then(response => {
            if(response.data!==1)
              this.$notify({
                title: '错误',
                message: response.data,
                type: 'error',
                duration: 2000
              })
            this.getList()
            this.dialogVisible = false
          })
        else {
          this.$notify({
            title: '警告',
            message: '两次输入密码不一致',
            type: 'warning',
            duration: 2000
          })
        }
      },
      activeThis(row) {
        row.is_forbidden = 0
        updateAdminsSystem(row).then(() => {
          this.getList()
        })

      },
      forbidThis(row) {
        row.is_forbidden = 1
        updateAdminsSystem(row).then(() => {
          this.getList()
        })
      }
    }
  }
</script>

<style scoped>

</style>
