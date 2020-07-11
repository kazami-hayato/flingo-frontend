<template>
  <el-container>
    <el-main>
      <el-row type="flex" justify="end">
        <el-button type="warning" class="el-icon-plus" size="medium" @click="tagVisible=true">&nbsp新建考期</el-button>

        <el-button type="danger" class="el-icon-minus" size="medium" @click="handleDelete">&nbsp删除选中</el-button>
      </el-row>
      <el-table
        :data="tableData"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column type="expand">
          <template slot-scope="{row}">
            <StuCourseDetail :tag="row" style="width: 100%;max-height: 2700px"/>
          </template>
        </el-table-column>
        <el-table-column
          label="序号"
          align="center"
          type="index">
        </el-table-column>
        <el-table-column
          label="考期ID"
          align="center"
          prop="tag_id">
        </el-table-column>
        <el-table-column
          label="考期名"
          align="center"
          prop="tag_name">
        </el-table-column>
        <el-table-column
          label="考期创建时间"
          align="center"
          prop="tag_createtime">
        </el-table-column>
        <el-table-column
          label="考期过期时间"
          align="center"
          prop="tag_overtime">
        </el-table-column>
        <el-table-column
          label="考期状态"
          align="center">
          <template slot-scope="{row}">
            <el-tag type="warning" v-if="row.active===0">历史考期</el-tag>
            <el-tag type="success" v-else>当前考期</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          min-width="200"
          label="操作">
          <template slot-scope="{row}">
            <el-button
              v-if="row.active===1"
              class="el-icon-edit-outline"
              size="mini"
              type="success"
              @click="editTag(row)">&nbsp修改考期信息
            </el-button>
            <el-button
              v-if="row.active!==1"
              size="mini"
              type="success"
              class="el-icon-download"
              @click="handleExport(row)">&nbsp导出成绩
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
                  @pagination="getList"/>
      <el-dialog
        title="导入学生信息面板"
        :visible.sync="dialogVisible"
        width="30%"
      >
        <el-container>
          <el-header>
            <el-button type="success" size="mini" class="el-icon-download" @click="downloadStu">下载模板</el-button>
          </el-header>
          <el-main>
            <el-upload
              class="upload-demo"
              drag
              :name="'File'"
              :on-success="handleUpload"
              :file-list="fileList"
              :limit="1"
              action="/apis/v1/static/file">
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

      <el-dialog
        title="新建考期面板"
        :visible.sync="tagVisible"
        width="40%"
      >
        <el-form :model="tempTag" label-width="140px" :label-position="'right'">
          <el-form-item label="考期名" required>
            <el-input v-model="tempTag.tag_name" style="width: 200px"/>
          </el-form-item>
          <el-form-item label="考期结束时间" required>
            <el-date-picker
              v-model="tempTag.tag_overtime"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
        </el-form>
        <el-footer>
          <el-row type="flex" class="row-bg" justify="end">
            <el-button @click="tagVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleCreateTag">确 定</el-button>
          </el-row>
        </el-footer>
      </el-dialog>
      <el-dialog
        title="修改考期面板"
        :visible.sync="editTagVisible"
        width="40%"
      >
        <el-form :model="tempTag" label-width="140px" :label-position="'right'">
          <el-form-item label="考期结束时间" required>
            <el-date-picker
              v-model="tempTag.tag_overtime"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
        </el-form>
        <el-footer>
          <el-row type="flex" class="row-bg" justify="end">
            <el-button @click="editTagVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleEdit">确 定</el-button>
          </el-row>
        </el-footer>
      </el-dialog>

    </el-main>
  </el-container>
</template>

<script>
  import {getTags} from '@/api/apis'
  import {createTag, getHistoryReport, deleteTag, modifyTag} from '@/api/system_apis'
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination
  import {mapGetters} from 'vuex'
  import {FileSaver, saveAs} from 'file-saver'
  import StuCourseDetail from "./component/StuCourseDetail";
  import request from '@/utils/requestFile'


  export default {
    name: "AllTags",
    components: {StuCourseDetail, Pagination},
    data() {
      return {
        reportQuery: {
          main_school: '',
          sub_school: '',
          user_type : this.$store.state.user.user_type,
          tag: '',
        },
        editTagVisible: false,
        tagVisible: false,
        tempTag: {},
        dialogVisible: false,
        fileList: [],
        total: 0,
        listQuery: {
          limit: 10,
          page: 0
        },
        multipleSelection: [],
        tableData: []
      }
    },
    created() {
      this.getList()
    },
    methods: {
      downloadStu(){
        window.open('/cdn/stu_template.xls')
      },
      handleCreateTag() {
        console.log(this.tempTag)
        createTag(this.tempTag).then(() => {
          this.getList()
          this.tagVisible = false
        })
      },
      handleUpload(response, file) {

      },
      editTag(row) {
        this.editTagVisible = true
        this.tempTag = row
      },
      handleEdit() {
        modifyTag(this.tempTag).then(() => {
          this.editTagVisible = false
          this.tempTag = {}
          this.getList()
        })
      },
      handleDelete() {
        this.$confirm('此操作将永久删除考期, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.multipleSelection.forEach(item => {
            deleteTag(item).then(() => {
            })
          })
          this.getList()
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },
      handleExport(row) {
        this.reportQuery.tag = row.tag_name
        const filename=this.reportQuery.main_school+'_'+this.reportQuery.sub_school+'_'
          +this.reportQuery.tag+'_学生成绩表.xls'

        request({
          url: '/apis/v1/static/down_history',
          method: 'get',
          params: this.reportQuery,
          responseType: 'blob'     //接收类型设置，否者返回字符型
        }).then(res=>{
          console.log(res.data)//定义文件名等相关信息
          saveAs(res.data.data,filename)
        })

/*        axios({
          url: '/apis/v1/static/down_history',
          method: 'get',
          params: this.reportQuery,
          responseType: 'blob'     //接收类型设置，否者返回字符型
        })
          .then(res => {
            console.log(res)//定义文件名等相关信息
            saveAs(res.data,filename)
          })*/
      },

      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      getList() {
        getTags(this.listQuery).then(response => {
          this.tableData = response.data
          this.total = response.total
        })
      }
    }
  }
</script>

<style scoped>
  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
