<template>

  <div class="app-container">
    <div class="filter-container">
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col>
          <el-button style="margin-left: 10px;" type="primary" icon="el-icon-edit"
                     @click="openCreateDialog">新增管理员
          </el-button>
        </el-col>
        <el-col align="right">
          <el-button style="margin-right: 1rem" @click="showCurrentUserName">在线用户:{{online.onlineNum}}</el-button>

          <el-button type="success" @click="passwordVisible=true">
            查询管理员密码
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
      <!--      <el-table-column-->
      <!--        type="selection"-->
      <!--        width="55">-->
      <!--      </el-table-column>-->
      <el-table-column
        type="index"
        label="序号"
        align="center"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户名"
        align="center"
        min-width="120">
      </el-table-column>
      <el-table-column
        label="类别"
        align="center"
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
        align="center"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="sub_school"
        label="分校名"
        align="center"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="register_date"
        label="注册日期"
        align="center"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label="状态"
        align="center"
        show-overflow-tooltip>
        <template slot-scope="{row}">
          <el-tag type="success" v-if="row.is_forbidden===0">已激活</el-tag>
          <el-tag type="danger" v-else>已禁用</el-tag>
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
        <el-form-item label="管理员类型" prop="user_type">
          <el-select v-model="tempAdmin.user_type" placeholder="请选择">
            <el-option
              v-for="item in userOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="输入主校名称" v-if="tempAdmin.user_type>=2" prop="main_school">
<!--          <el-input v-model="tempAdmin.main_school"/>-->
          <el-select v-model="tempAdmin.main_school" placeholder="请选择" @change="getAllSub(tempAdmin.main_school)">
            <el-option
              v-for="item in main_schools"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="输入分校名称" v-if="tempAdmin.user_type===3" prop="sub_school">
<!--          <el-input v-model="tempAdmin.sub_school" />-->
          <el-select v-model="tempAdmin.sub_school" placeholder="请选择">
            <el-option
              v-for="item in sub_schools"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="输入密码" prop="password">
          <el-input v-model="tempAdmin.password"/>
        </el-form-item>
        <el-form-item label="重新输入密码" prop="password_confirm">
          <el-input type="password" v-model="tempAdmin.password_confirm"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="createAdmin('tempAdmin')">确 定</el-button>
  </span>
    </el-dialog>

    <el-dialog :visible.sync="passwordVisible"
               title="找回密码" width="40%"
    >
      <el-input placeholder="请输入内容" v-model="adminQuery.username">
        <el-button slot="append" icon="el-icon-search" @click="searchAdminPwd"
                   style="background: #1890FF;color: #fff;border-radius: 0"/>
      </el-input>
      <div style="margin-top: 20px">
        <span>密码是：{{searchPassword}}</span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  // import {getAdmins, deleteAdmin, addAdmin, updateAdmin} from '@/api/apis'
  import {
    getAdminsSystem, getMainSchools, getSubSchools, getOnlineAdmin,
    getAdminPwd, createAdminsSystem, updateAdminsSystem, getOnlineAdminNames
  } from "@/api/system_apis"
  import Pagination from '@/components/Pagination'
  import {Current} from "@/utils/time"; // secondary package based on el-pagination

  export default {
    name: "admin",
    components: {Pagination},
    data() {
      return {
        onlineNum:0,
        online:{
          onlineNum:0,
          onlineSysName:'',
        },
        rules:{
          username:[{required: true, message: '请输入', trigger: 'blur'}],
          real_name:[{required: true, message: '请输入', trigger: 'blur'}],
          user_type:[{required: true, message: '请输入', trigger: 'blur'}],
          main_school:[{required: true, message: '请输入', trigger: 'blur'}],
          sub_school:[{required: true, message: '请输入', trigger: 'blur'}],
          password:[{required: true, message: '请输入', trigger: 'blur'}],
          password_confirm:[{required: true, message: '请输入', trigger: 'blur'}],
        },
        searchPassword: '',
        passwordVisible: false,
        adminQuery: {
          username: '',
          main_school: this.$store.state.user.main_school,
          sub_school: this.$store.state.user.sub_school
        },

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
        main_schools:[],
        sub_schools:[],
      }
    },
    created() {
      let user_type = this.$store.state.user.user_type
      getOnlineAdmin().then(response=>{
        this.online.onlineNum=response.data;
      })
      getOnlineAdminNames().then(response=>{
        this.online.onlineSysName=response.data;
      })
      console.log(user_type)
      this.userOptions.push({label: '分校管理员', value: 3})
      this.userOptions.push({label: '主校管理员', value: 2})
      this.userOptions.push({label: '系统管理员', value: 1})
      this.getList()
      this.main_schools=this.getAllMain()


    },
    methods: {
      /**
       * 现实在线人员
       */
      showCurrentUserName(){
        let a = "name:";
        for(let i=0; i<this.online.onlineSysName.length; i++){
          a+=this.online.onlineSysName[i]+"   ";
        }
        this.$alert(a, '在线人员', {
          confirmButtonText: '确定',
        });
      },
      getAllSub(main_school){
          getSubSchools({main_school:main_school}).then(response=>{
            this.sub_schools=response.data
          })
      },
      getAllMain(){
          getMainSchools().then(response=>{
            this.main_schools=response.data
          })
      },
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

      },
      createAdmin(formName) {
        if (this.tempAdmin.user_type === 2) {
          this.tempAdmin.sub_school = this.tempAdmin.main_school
        } else if (this.tempAdmin.user_type === 1) {
          this.tempAdmin.main_school = ''
          this.tempAdmin.sub_school = ''
        }
        let information = ''
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.tempAdmin.password === this.tempAdmin.password_confirm)
              createAdminsSystem(this.tempAdmin).then(response => {
                if (response.data !== 1)
                  this.$notify({
                    title: '错误',
                    message: response.data,
                    type: 'error',
                    duration: 2000
                  })
                this.tempAdmin= {
                  register_date: Current()
                },
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
          } else {
            console.log('error submit!!');
            return false;
          }
        });
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
      },
      searchAdminPwd() {
        getAdminPwd(this.adminQuery).then(res => {
          this.searchPassword = res.data
        })
      }
    }
  }
</script>

<style scoped>

</style>
