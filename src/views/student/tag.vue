<template>
  <el-container>
    <el-main>
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
          align="center"
          min-width="300"
          label="操作">
          <template slot-scope="{row}">
            <el-button
              v-if="row.active===1"
              class="el-icon-upload"
              size="mini"
              type="success"
              @click="dialogVisible=true">&nbsp导入学生信息
            </el-button>

            <el-button
              size="mini"
              type="warning"
              class="el-icon-download"
              @click="handleImportStu(row)">&nbsp导出成绩
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
              action="/apis/v1/static/file">
              <i class="el-icon-upload"/>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </el-upload>
          </el-main>
          <el-footer >
            <el-row type="flex" class="row-bg" justify="end">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </el-row>
          </el-footer>
        </el-container>
      </el-dialog>

    </el-main>
  </el-container>
</template>

<script>
  import {getTags} from '@/api/apis'
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination
  import {mapGetters} from 'vuex'
  import StuCourseDetail from "./component/StuCourseDetail";

  export default {
    name: "tag",
    components: {StuCourseDetail, Pagination},
    data() {
      return {
        dialogVisible: false,
        fileList: [],
        fileList1: [],
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
      handleUpload(response, file) {

      },
      handleImportStu(row) {
        //导入学生信息到该考期
      },
      handleImportCourse(row) {

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
