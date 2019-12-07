<template>

  <div class="app-container">
    <div class="filter-container">
      <el-row type="flex" class="row-bg" justify="space-between">

        <el-col>
          <el-button style="margin-left: 10px;" type="primary" icon="el-icon-edit"
                     @click="dialogVisible = true">新增IP
          </el-button>
          <el-button style="margin-left: 10px;" type="primary" icon="el-icon-edit"
                     @click="dialogVisible = true">批量导入
          </el-button>
          <el-button style="margin-left: 10px;" type="danger" icon="el-icon-remove"
                     @click="deleteChosen">删除IP
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
        prop="ip"
        label="IP地址"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="register_date"
        label="添加日期"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="register_admin"
        label="操作人"
        show-overflow-tooltip>
      </el-table-column>
    </el-table>
    <el-dialog
      title="IP输入框"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-form ref="IPForm" label-width="80px">
        <el-form-item label="输入IP">
          <el-input v-model="tempIP.ip"></el-input>
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
  import {addIP} from '@/api/apis'
    export default {
        name: "index",
        data() {
            return {
                dialogVisible: false,
                chosenList: [],
                tempIP: {
                    ip:''
                },
                listData: [{
                    id: 121,
                    ip: '172.1.6.8',
                    register_date: '2019-12-1 14:22:11',
                    register_admin: 'main_school'
                }, {
                    id: 121,
                    ip: '172.1.6.8',
                    register_date: '2019-12-1 14:22:11',
                    register_admin: 'main_school'
                }, {
                    id: 121,
                    ip: '172.1.6.8',
                    register_date: '2019-12-1 14:22:11',
                    register_admin: 'main_school'
                }, {
                    id: 121,
                    ip: '172.1.6.8',
                    register_date: '2019-12-1 14:22:11',
                    register_admin: 'main_school'
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
            deleteChosen() {

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
                console.log(this.$store.state.user)
                this.tempIP=Object.assign({},this.$store.state.user)
                console.log(this.tempIP)
                this.tempIP = ''
            }
        }
    }
</script>

<style scoped>

</style>
