<template>
  <div class="app-container">
    <el-container>
      <el-header>
        <aside style="text-align: center">
          可以输入想要查询密码的用户名

        </aside>
      </el-header>
      <el-main>
        <el-row type="flex" class="row-bg" justify="center">
          <el-input v-model="searchText" placeholder="搜索用户" style="width: 600px"></el-input>
          <el-button icon="el-icon-search" circle style="margin-left: 3px" @click="handleSearch"></el-button>
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


    export default {
        name: "lookup",
        data() {
            return {
                visibility: false,
                searchText: '',
                password: 'www'
            }
        },
        methods: {
            handleSearch(){
              this.visibility=true
            }
        }
    }
</script>

<style scoped lang="scss">

</style>
