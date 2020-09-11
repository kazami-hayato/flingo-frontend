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
<!--        <el-table-column-->
<!--          label="考期ID"-->
<!--          align="center"-->
<!--          prop="tag_id">-->
<!--        </el-table-column>-->
        <el-table-column
          label="考期名"
          min-width="150"
          align="center"
          prop="tag_name">
        </el-table-column>
        <el-table-column
          label="考期创建时间"
          min-width="200"
          align="center"
          prop="tag_createtime">
        </el-table-column>
        <el-table-column
          label="考期过期时间"
          align="center"
          min-width="220"
          prop="tag_overtime">
        </el-table-column>
        <el-table-column
          label="考期状态"
          min-width="120"
          align="center">
          <template slot-scope="{row}">
            <el-tag type="warning" v-if="row.active===0" >历史考期</el-tag>
            <el-tag type="success" v-else >当前考期</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          min-width="600"
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
              v-if="row.active===1"
              class="el-icon-upload"
              size="mini"
              type="primary"
              @click="courseVisible=true">&nbsp导入选课信息
            </el-button>

            <el-button
              v-if="row.active===1"
              class="el-icon-upload"
              size="mini"
              type="primary"
              @click="zipVisible=true">&nbsp导入学生照片压缩包
            </el-button>
            <el-button
              size="mini"
              v-if="row.active!==1"
              type="warning"
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
              :headers="headers"
              action="/apis/v1/static/uploadStu">
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

      <el-dialog
        title="导入选课信息面板"
        :visible.sync="courseVisible"
        width="30%"
      >
        <el-container>
          <el-header>
            <el-button type="success" size="mini" class="el-icon-download" @click="downloadStuCourse">下载模板</el-button>
          </el-header>
          <el-main>
            <el-upload
              class="upload-demo"
              drag
              :name="'File'"
              :on-success="handleUpload"
              :file-list="fileList"
              :limit="1"
              :headers="headers"
              action="/apis/v1/static/upstucourse">
              <i class="el-icon-upload"/>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </el-upload>
          </el-main>
          <el-footer >
            <el-row type="flex" class="row-bg" justify="end">
              <el-button @click="courseVisible = false">取 消</el-button>
              <el-button type="primary" @click="courseVisible = false">确 定</el-button>
            </el-row>
          </el-footer>
        </el-container>
      </el-dialog>
      <el-dialog
        title="导入压缩包面板"
        :visible.sync="zipVisible"
        width="30%"
      >
        <el-container>
          <el-main>
            <el-upload
              class="upload-demo"
              :headers = "headers"
              drag
              :name="'File'"
              :on-success="handleUpload"
              :file-list="fileList"
              :limit="1"
              action="/apis/v1/static/uploadzip">
              <i class="el-icon-upload"/>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </el-upload>
          </el-main>
          <el-footer >
            <el-row type="flex" class="row-bg" justify="end">
              <el-button @click="zipVisible = false">取 消</el-button>
              <el-button type="primary" @click="zipVisible = false">确 定</el-button>
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
  import axios from 'axios'
  import {saveAs} from "file-saver";
  import request from "@/utils/requestFile";
  import { getToken } from '../../../utils/auth'

  export default {
    name: "tag",
    components: {StuCourseDetail, Pagination},
    data() {
      return {
        reportQuery: {
          main_school: this.$store.state.user.main_school,
          sub_school: this.$store.state.user.sub_school,
          user_type : this.$store.state.user.user_type,
          tag: '',
        },
        dialogVisible: false,
        fileList: [],
        fileList1: [],
        total: 0,
        listQuery: {
          limit: 10,
          page: 0
        },
        multipleSelection: [],
        tableData: [],
        courseVisible:false,
        zipVisible:false,
        headers:{
          'X-Token':getToken()
        },
      }
    },
    created() {
      this.getList()
    },
    methods: {
      downloadStuCourse(){
        window.open('/cdn/stucourse_template.xls')
      },
      downloadStu(){
        window.open('/cdn/stu_template.xls')
      },
      handleUpload(response, file) {
        this.$notify({
          title: '上传成功',
          message: response.message,
          type: 'success',
          duration: 3000
        })

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
      },
      handleExport(row) {
        this.reportQuery.tag = row.tag_name
        const filename=this.reportQuery.main_school+'_'+this.reportQuery.sub_school+'_'
          +this.reportQuery.tag+'_学生成绩表.xls'
        request({
          url: '/apis/v1/static/down_current',
          method: 'get',
          params: this.reportQuery,
          responseType: 'blob'     //接收类型设置，否者返回字符型
        }).then(res=>{
          console.log(res.data)//定义文件名等相关信息
          saveAs(res.data,filename)
        })
      },
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
