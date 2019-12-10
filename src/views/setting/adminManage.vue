<template>

  <div class="app-container">
    <div class="filter-container">
      <el-row type="flex" class="row-bg" justify="space-between">

        <el-col>
          <el-button style="margin-left: 10px;" type="primary" icon="el-icon-edit"
                     @click="dialogVisible = true">新增管理员
          </el-button>
          <!--          <el-button style="margin-left: 10px;" type="primary" icon="el-icon-edit"-->
          <!--                     @click="dialogVisible = true">批量导入-->
          <!--          </el-button>-->
          <el-button style="margin-left: 10px;" type="danger" icon="el-icon-remove"
                     @click="forbiddenChosen">禁用管理员
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
        prop="id"
        label="序号"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="admin_name"
        label="用户名"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="admin_type"
        label="类别"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="main_name"
        label="主校名"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="sub_name"
        label="分校名"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="register_date"
        label="注册日期"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <router-link :to="'/setting/'+row.id">
            <el-button type="primary" size="medium">
              详细信息
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="IP输入框"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-form ref="IPForm" label-width="80px">
        <el-form-item label="输入IP">
          <el-input v-model="tempIP"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addIP">确 定</el-button>
  </span>
  </el-dialog>
  </div>
</template>

<script>
    export default {
        name: "admin",
        data() {
            return {
                dialogVisible: false,
                chosenList: [],
                tempIP: '',
                listData: [{
                    id: 121,
                    admin_name: 'xxs',
                    admin_type: '主校',
                    main_name: 'whu',
                    sub_name: 'whue',
                    register_date: '2019-12-1 14:22:11',
                }]
            }
        },
        methods: {
            handleSelectionChange(val) {
                let temp = []
                val.forEach(item => {
                    temp.push(item.id)
                });
                this.chosenList = temp
                console.log(this.chosenList)
            },
            forbiddenChosen() {

            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {
                    });
            },
            addIP() {
                this.dialogVisible = false
                console.log(this.tempIP)
                this.tempIP = ''
            }
        }
    }
</script>

<style scoped>

</style>
