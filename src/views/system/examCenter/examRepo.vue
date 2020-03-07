<template>
  <el-container>
    <el-main>
      <el-row type="flex" justify="space-between">
        <el-col :span="6">

          <el-input placeholder="请输入内容 模糊查询" v-model="listQuery.searchText">
            <el-button slot="append" icon="el-icon-search" @click="handleSearch"
                       style="background: #1890FF;color: #fff;border-radius: 0"/>
          </el-input>
        </el-col>
        <el-col :span="16" align="right">
          <el-button type="warning" class="el-icon-plus" size="medium" @click="openCreateTest">&nbsp新建试卷</el-button>

          <el-button type="danger" class="el-icon-minus" size="medium" @click="handleDelete">&nbsp删除选中</el-button>
        </el-col>
      </el-row>
      <el-table
        :data="tableData"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="序号"
          align="center"
          type="index">
        </el-table-column>
        <el-table-column
          label="试卷名"
          align="center"
          prop="exam_title">
        </el-table-column>

        <el-table-column
          label="试卷类型"
          align="center"
        >
          <template slot-scope="{row}">
            {{test_type[row.exam_type]}}
          </template>
        </el-table-column>
        <el-table-column
          label="创建时间"
          align="center">
          <template slot-scope="{row}">
            <span>{{ row.createtime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="所属课程"
          align="center"
          prop="course_name">
        </el-table-column>
        <el-table-column
          label="状态"
          align="center"
        >
          <template slot-scope="{row}">
            <el-tag type="success" v-if="row.is_shift===1">已经上架</el-tag>
            <el-tag type="info" v-else>未上架</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="试卷详情"
          align="center">
          <template slot-scope="{row}">
            <el-button class="el-icon-view" type="info" size="mini" @click="viewTest(row)"
                       v-if="row.exam_content===null||row.exam_content===''">&nbsp查看
            </el-button>
            <el-button class="el-icon-view" type="success" size="mini" @click="viewTest(row)" v-else>&nbsp查看</el-button>

          </template>
        </el-table-column>
        <el-table-column
          align="center"
          min-width="200"
          label="操作">
          <template slot-scope="{row}">
            <el-button
              class="el-icon-edit"
              size="mini"
              type="danger"
              v-if="row.is_shift===1"
              disabled
              @click="editTest(row)">&nbsp设置试卷
            </el-button>
            <el-button
              class="el-icon-edit"
              size="mini"
              type="success"
              v-else
              @click="setCourse(row)">&nbsp设置试卷
            </el-button>
            <el-button
              class="el-icon-upload"
              size="mini"
              type="warning"
              v-if="row.is_shift===null||row.is_shift!==1||row.exam_content===null||row.exam_content===''"
              @click="updateContent(row)">&nbsp更新试卷
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
                  @pagination="getList"/>

      <el-dialog
        title="新建试卷面板"
        :visible.sync="testVisible"
        width="40%"
      >

        <el-form :model="tempExam" label-width="140px" :label-position="'right'">
          <el-form-item label="试卷名" required>
            <el-input v-model="tempExam.exam_title" style="width: 200px"/>
          </el-form-item>
          <el-form-item label="试卷类型" required>
            <el-select v-model="tempExam.exam_type" placeholder="请选择">
              <el-option
                v-for="item in [1,2,3,4,5]"
                :key="item"
                :label="test_type[item]"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="试卷内容" required>
            <el-upload
              action="/apis/v1/system/excel2json"
              :name="'File'"
              :on-success="handleQuizUpload"
              :file-list="fileList">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传excel文件,xls/xlsx格式</div>
            </el-upload>
            <el-button type="success" size="mini" class="el-icon-download" @click="downloadTestTemp">下载模板</el-button>

          </el-form-item>
        </el-form>

        <el-footer>
          <el-row type="flex" class="row-bg" justify="end">
            <el-button @click="testVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleCreateTest">确 定</el-button>
          </el-row>
        </el-footer>
      </el-dialog>
      <el-dialog
        title="设置试卷课程"
        :visible.sync="editTestVisible"
        width="40%"
      >
        <el-form :model="tempExam" label-width="140px" :label-position="'center'">
          <el-form-item label="选中课程信息">
            <span>课程号：{{tempExam.match_course_id}}</span>
            <span style="margin-left: 5px">课程名：{{tempExam.course_name}}</span>
          </el-form-item>
          <el-table
            ref="courseTable"
            :data="courseInfo"
            tooltip-effect="dark"
            style="width: 80%;margin-left: 30px;margin-bottom:10px"
            :highlight-current-row="true"
            @current-change="handleCurrentChange">
            <el-table-column
              prop="course_id"
              label="课程号"
              width="120">
            </el-table-column>
            <el-table-column
              prop="course_name"
              label="课程名"
              width="120">
            </el-table-column>
          </el-table>
          <pagination v-show="course_total>0" :total="course_total" :page.sync="courseQuery.page"
                      :limit.sync="courseQuery.limit"
                      @pagination="getCourses"/>
        </el-form>
        <el-footer>
          <el-row type="flex" class="row-bg" justify="end">
            <el-button @click="editTestVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleEdit">确 定</el-button>
          </el-row>
        </el-footer>
      </el-dialog>

      <el-dialog
        title="更新试卷内容面板"
        :visible.sync="updateTestVisible"
        width="30%"
      >
        <el-container>
          <el-header>
            <el-button type="success" size="mini" class="el-icon-download" @click="downloadTestTemp">下载模板</el-button>
          </el-header>
          <el-main>
            <el-upload
              class="upload-demo"
              drag
              action="/apis/v1/system/excel2json"
              :name="'File'"
              :on-success="handleUpdateSuccess"
              :file-list="fileList">
              <i class="el-icon-upload"/>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </el-upload>
          </el-main>
          <el-footer>
            <el-row type="flex" class="row-bg" justify="end">
              <el-button @click="updateTestVisible = false">取 消</el-button>
              <el-button type="primary" @click="handleUpdateContent">确 定</el-button>
            </el-row>
          </el-footer>
        </el-container>
      </el-dialog>

    </el-main>
  </el-container>
</template>

<script>
  import {parseTime} from '@/utils/index.js'
  import {
    createExam,
    deleteExam,
    modifyExam,
    getExams,
    getSystemCoursesByQuery,
    getAllCoursesInfo
  } from '@/api/system_apis'
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination
  import {mapGetters} from 'vuex'
  import StuCourseDetail from "../../admin/student/component/StuCourseDetail";

  export default {
    name: "ExamRepo",
    components: {StuCourseDetail, Pagination},
    data() {
      return {
        chosenExam:undefined,
        updateTestVisible: false,
        test_type: [
          '',
          '测验一',
          '测验二',
          '测验三',
          '测验四',
          '综合测验',
        ],
        editTestVisible: false,
        testVisible: false,
        tempExam: {},
        dialogVisible: false,
        fileList: [],
        total: 0,
        listQuery: {
          searchType: '1',
          searchText: '',
          limit: 10,
          page: 0
        },
        multipleSelection: [],
        tableData: [],

        course_total: 0,
        courseInfo: [],
        courseQuery: {
          searchType: '1',
          searchText: '',
          page: 1,
          limit: 20,
        },
      }
    },
    created() {
      this.getList()
    },
    methods: {
      handleUpdateContent() {
        this.updateTestVisible=false
      },
      handleUpdateSuccess(response, file) {
        this.chosenExam.exam_content = response.data
        console.log(this.chosenExam)
        modifyExam(this.chosenExam).then(response=>{
          this.updateTestVisible=false
          this.getList()
          this.$notify({
            type:'success',
            message:'更新完成，请查看数据'
          })
        })
      },
      openCreateTest() {
        this.testVisible = true
        this.tempExam = {}
      },
      updateContent(row) {
        this.updateTestVisible = true
        this.chosenExam=row
      },
      downloadTestTemp() {
        window.open('/cdn/exam_template.xlsx')
      },
      editTest(row) {

      },
      handleCurrentChange(val) {
        if (val !== null) {
          this.tempExam.match_course_id = val.course_id
          this.tempExam.course_name = val.course_name
        }
      },
      getCourses() {
        getSystemCoursesByQuery(this.courseQuery).then(response => {
          this.courseInfo = response.data
          this.course_total = response.total
        })
      },
      handleSearch() {
        this.getList()
      },
      handleQuizUpload(response, file) {
        this.tempExam.exam_content = response.data
      },
      handleCreateTest() {
        if (this.tempExam.exam_type == null)
          this.$message({
            message: '试卷类型不为空',
            type: 'error',
            duration: 1000
          })
        else
          createExam(this.tempExam).then(response => {
            if (response.data === 1)
              this.$notify({
                title: '成功',
                message: '添加成功',
                type: 'success'
              });
            else
              this.$notify({
                title: '失败',
                message: '已存在',
                type: 'error'
              });
            this.getList()
            this.testVisible = false
            this.fileList = []
          })
      },
      handleUpload(response, file) {

      },
      setCourse(row) {
        this.tempExam = Object.assign({}, row)
        this.getCourses()
        this.editTestVisible = true

      },
      viewTest(row) {
        this.$router.push({
          name: 'ExamInfo',
          params: {examination_id: row.examination_id}
        })
      },
      handleEdit() {
        modifyExam(this.tempExam).then(() => {
          this.editTestVisible = false
          this.getList()
        })
      },
      handleDelete() {
        this.$confirm('此操作将删除未上架课程试卷，已上架无法删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.multipleSelection.forEach(item => {
            if (item.is_shift !== 1)
              deleteExam(item).then(() => {
                this.getList()
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              })
          })


        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },

      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      getList() {
        getExams(this.listQuery).then(response => {
          this.tableData = response.data
          this.total = response.total
        })
      }
    }
  }
</script>

<style scoped>

  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }

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
