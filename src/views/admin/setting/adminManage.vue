<template>

  <div class="app-container">
    <div class="filter-container">
      <el-row type="flex" class="row-bg" justify="space-between">

        <el-col>
          <el-button style="margin-left: 10px;" type="primary" icon="el-icon-edit"
                     @click="openCreateDialog">新增管理员
          </el-button>
          <!--          <el-button style="margin-left: 10px;" type="primary" icon="el-icon-edit"-->
          <!--                     @click="dialogVisible = true">批量导入-->
          <!--          </el-button>-->
          <el-button style="margin-left: 10px;" type="danger" icon="el-icon-remove"
                     @click="deleteChosen">删除管理员
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
          <el-tag v-if="row.is_forbidden===0" type="success">激活</el-tag>
          <el-tag v-else type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="success" size="medium" v-if="row.is_forbidden!==0" @click="activeThis(row)">
            激活账号
          </el-button>
          <el-button type="danger" size="medium" v-else @click="forbidThis(row)">
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
      <el-form ref="tempAdmin" :model="tempAdmin" label-width="150px" :rules="rules">
        <el-form-item label="输入管理员登录名" prop="username">
          <el-input v-model="tempAdmin.username"/>
        </el-form-item>
        <el-form-item label="输入管理员姓名" prop="real_name">
          <el-input v-model="tempAdmin.real_name"/>
        </el-form-item>
        <el-form-item label="是否分校管理员" prop="is_sub">
          <el-switch
            v-model="tempAdmin.is_sub"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
        <el-form-item  label="选择分校" v-if="tempAdmin.is_sub===true" prop="sub_school">
          <el-select v-model="tempAdmin.sub_school" placeholder="请选择" >
            <el-option
              v-for="item in SubschoolOptions"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="输入管理员密码" prop="password">
          <el-input v-model="tempAdmin.password"/>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="createAdmin('tempAdmin')">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import {getAdmins, deleteAdmin, addAdmin, updateAdmin} from '@/api/apis'
  import {getSubSchools} from '@/api/system_apis'
  import Pagination from '@/components/Pagination'
  import {Current} from "@/utils/time"; // secondary package based on el-pagination

  export default {
    name: "admin",
    components: {Pagination},
    data() {
      return {
        rules:{
          username:[{required: true, message: '请输入', trigger: 'blur'}],
          real_name:[{required: true, message: '请输入', trigger: 'blur'}],
          sub_school:[{required: true, message: '请输入', trigger: 'blur'}],
          password:[{required: true, message: '请输入', trigger: 'blur'}],
        },
        SubschoolOptions: [],
        userOptions: [],
        dialogVisible: false,
        tempAdmin: {
          main_school: this.$store.state.user.main_school,
          register_date: Current(),
          user_type: 2,
          is_sub: true
        },
        chosenList: [],
        listQuery: {
          limit: 10,
          page: 1,
          main_school: this.$store.state.user.main_school,
          sub_school: this.$store.state.user.sub_school
        },
        listData: [],
        total: 0,


      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        getAdmins(this.listQuery).then(response => {
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
      deleteChosen() {
        this.chosenList.forEach(item => {
          deleteAdmin({user_id: item}).then(() => {
            this.getList()

          })
        })
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

        getSubSchools({main_school: this.$store.state.user.main_school}).then(response => {
          this.SubschoolOptions = response.data
        })
        // this.SubschoolOptions = [...new Set(this.listData.map(item => item.sub_school))];
        // console.log(this.SubschoolOptions)
        //
        // let temp = []
        // this.SubschoolOptions.forEach(item => {
        //   if (item !== this.listQuery.main_school) {
        //     temp.push(item)
        //   }
        // })
        // this.SubschoolOptions = temp
        // console.log(this.SubschoolOptions)
      },
      createAdmin(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dialogVisible = false
            if (this.tempAdmin.is_sub === true) {
              this.tempAdmin.user_type = 3
            } else
              this.tempAdmin.sub_school = this.tempAdmin.main_school

            addAdmin(this.tempAdmin).then(() => {
              this.getList()
              this.tempAdmin = {
                main_school: this.$store.state.user.main_school,
                register_date: Current(),
                user_type: 2,
                is_sub: true
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        })

      },
      activeThis(row) {
        row.is_forbidden = 0
        updateAdmin(row).then(() => {
          this.getList()
        })

      },
      forbidThis(row) {
        row.is_forbidden = 1
        updateAdmin(row).then(() => {
          this.getList()
        })
      }
    }
  }
</script>

<style scoped>

</style>
