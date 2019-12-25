<template>
  <div class="app-container">
    <el-container>
      <el-header>
        <aside style="text-align: center">
          可以输入想要查询密码的用户名/身份证/考号
        </aside>
      </el-header>
      <el-main>
        <el-row type="flex" class="row-bg" justify="center">
          <div style="margin-top: 15px;width: 500px">
            <el-input placeholder="请输入内容" v-model="passwordQuery.searchText">
              <el-button slot="append" icon="el-icon-search"  @click="handleSearch" style="background: #1890FF;color: #fff;border-radius: 0"/>
            </el-input>
          </div>
        </el-row>
        <el-row type="flex" class="row-bg" justify="center">
          <el-dialog
            title="密码"
            width="20%"
            :visible.sync="visibility">
            <div style="align-content: center">考号：{{searchStudent.exam_id}}</div>
            <div style="align-content: center">姓名：{{searchStudent.real_name}}</div>

            <div style="align-content: center">密码：{{searchStudent.password}}</div>
          </el-dialog>

        </el-row>
      </el-main>
    </el-container>

  </div>
</template>

<script>
  import {getPasswordSystem} from '@/api/system_apis'

  export default {
    name: "lookup",
    data() {
      return {
        visibility: false,
        searchText: '',
        searchStudent:{},
        passwordQuery: {
          searchText: ''
        }
      }
    },
    methods: {
      handleSearch() {
        getPasswordSystem(this.passwordQuery).then(response => {
          this.searchStudent = response.data
        })
        this.visibility = true
      }
    }
  }
</script>

<style scoped lang="scss">
  .el-select .el-input {
    width: 130px;
  }

  .input-with-select .el-input-group__prepend {
    background-color: dodgerblue;
    color: #4dd9d5;
  }
</style>
