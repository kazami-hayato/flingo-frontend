<template>

  <div class="app-container">
    <div class="filter-container">
      <el-row>
        <el-col :span="2">
          <el-button style="margin-left: 10px;" type="primary" icon="el-icon-edit"
                     @click="dialogVisible = true">新增IP
          </el-button>
        </el-col>
        <el-col :span="2">
          <el-button
            class="el-icon-upload"
            size="medium"
            type="info"
            @click="uploadVisible=true">&nbsp导入学生信息
          </el-button>
        </el-col>
        <el-col :span="2">
          <el-button style="margin-left: 30px" type="success" class="el-icon-service"
                     @click="deleteChosen">&nbsp启动访问
          </el-button>
        </el-col>
        <el-col :span="2">
          <el-button style="margin-left: 30px;" type="danger" class="el-icon-circle-close"
                     @click="deleteChosen">&nbsp停止访问
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
        prop="add_date"
        label="添加日期"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="operator"
        label="操作人"
        show-overflow-tooltip>
      </el-table-column>

    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page"
                :limit.sync="listQuery.limit"
                @pagination="getList"/>
    <el-dialog
      title="IP输入框"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-form ref="IPForm" label-width="80px">
        <el-form-item label="输入IP">
          <el-input v-model="tempIP.ip"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="confirmAdd">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog
      title="导入学生信息面板"
      :visible.sync="uploadVisible"
      width="30%"
    >
      <el-container>
        <el-header>
          <el-button type="success" size="mini" class="el-icon-download">下载模板</el-button>
        </el-header>
        <el-main>
          <el-upload
            class="upload-demo"
            drag
            :name="'File'"
            :on-success="handleUpload"
            :file-list="fileList"
            :limit="1"
            action="/apis/v1/static/file"
          >
            <i class="el-icon-upload"/>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
        </el-main>
        <el-footer>
          <el-row type="flex" class="row-bg" justify="end">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </el-row>
        </el-footer>
      </el-container>
    </el-dialog>

  </div>
</template>

<script>
  import {addIP, getIPS, removeIP} from '@/api/apis'
  import {Current} from '@/utils/time'
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination

  export default {
    name: "index",
    components: {Pagination},
    data() {
      return {
        fileList: [],
        dialogVisible: false,
        uploadVisible: false,
        chosenList: [],
        tempIP: {
          ip: '',
          operator: this.$store.state.user.username,
          main_school: this.$store.state.user.main_school,
          sub_school: this.$store.state.user.sub_school,
          add_date: Current()
        },
        listQuery: {
          limit: 10,
          page: 1,
          main_school: this.$store.state.user.main_school,
          sub_school: this.$store.state.user.sub_school,
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
      handleUpload(response, File) {
        console.log(response)
      },
      getList() {
        getIPS(this.listQuery).then(response => {
          this.listData = response.data
          this.total = response.total
        })
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
