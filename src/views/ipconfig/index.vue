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
        type="index"
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
        prop="operator"
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
    <el-button type="primary" @click="confirmAdd">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
    import {addIP, getIPS, removeIP} from '@/api/apis'

    export default {
        name: "index",

        data() {
            return {
                dialogVisible: false,
                chosenList: [],
                tempIP: {
                    ip: '',
                    operator: this.$store.state.user.username,
                    main_school: this.$store.state.user.main_school,
                    sub_school: this.$store.state.user.sub_school
                },
                listQuery: {
                    limit: 10,
                    page: 1,
                    main_school: this.$store.state.user.main_school,
                    sub_school: this.$store.state.user.sub_school
                    // operator:
                },
                listData: [],
                total: 0
            }
        },
        created() {
            this.getList()
        },
        methods: {
            getList() {
                getIPS(this.listQuery).then(response => {
                    this.listData = response.data
                    this.total = response.total
                })
                console.log(this.$store.state.user)
            },
            handleSelectionChange(val) {
                let temp = []
                val.forEach(item => {
                    temp.push(item.ip_id)
                });
                this.chosenList = temp
                console.log(this.chosenList)
            },
            deleteChosen() {
                this.chosenList.forEach(item => {
                    removeIP({ip_id: item}).then(() => {
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
            confirmAdd() {
                this.dialogVisible = false
                addIP(this.tempIP).then(() => {
                    this.getList()
                })

            }
        }
    }
</script>

<style scoped>

</style>
