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
              <el-select v-model="passwordQuery.searchType" slot="prepend" placeholder="请选择" style="width: 130px;background: #1890FF;color: #fff">
                <el-option label="用户名/考号" value='1'/>
                <el-option label="身份证" value='2'/>
              </el-select>
              <el-button slot="append" icon="el-icon-search"  @click="handleSearch" style="background: #1890FF;color: #fff"/>
            </el-input>
          </div>
          <!--          <el-input v-model="searchText" placeholder="搜索用户" style="width: 600px"/>-->
          <!--          <el-button icon="el-icon-search" circle style="margin-left: 3px" @click="handleSearch"/>-->
        </el-row>
        <el-row type="flex" class="row-bg" justify="center">
          <el-dialog
            title="密码"

            width="20%"
            :visible.sync="visibility">
            <div style="align-content: center">{{password}}</div>
          </el-dialog>

        </el-row>
      </el-main>
    </el-container>

  </div>
</template>

<script>
  import {getPasswordByParams} from '@/api/apis'

  export default {
    name: "lookup",
    data() {
      return {
        visibility: false,
        searchText: '',
        password: '',
        searchType: '',
        passwordQuery: {
          main_school: this.$store.state.user.main_school,
          sub_school: this.$store.state.user.sub_school,
          searchType: '1',
          searchText: ''
        }
      }
    },
    methods: {
      handleSearch() {
        getPasswordByParams(this.passwordQuery).then(response => {
          this.password = response.data
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
