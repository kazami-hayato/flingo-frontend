<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row>
        <el-col :span="16">
          <el-row type="flex" justify="start">
            <el-input placeholder="请输入内容" v-model="listQuery.searchText" style="max-width: 400px">
              <el-button slot="append" icon="el-icon-search" @click="handleSearch"
                         style="background: #1890FF;color: #fff;border-radius: 0"/>
            </el-input>

          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row type="flex" justify="end">
            <el-button class="filter-item" type="success" icon="el-icon-download"
                       @click="handleExport">
              导出学生信息
            </el-button>
            <el-button class="filter-item" type="success" icon="el-icon-download"
                       @click="handleExport">
              导出成绩
            </el-button>
            <!--            <el-button class="filter-item" type="success" icon="el-icon-plus"-->
            <!--                       @click="handleSubscribe">-->
            <!--              批量开课-->
            <!--            </el-button>-->
          </el-row>
        </el-col>
      </el-row>

    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column type="expand">
        <template slot-scope="{row}">
          <StudentDetail style="width: 100%;max-height: 1600px" :student-info="row"/>
        </template>
      </el-table-column>

      <el-table-column label="序号" prop="id" align="center" width="140" type="index">
      </el-table-column>
      <el-table-column label="准考证号" prop="id" align="center" width="180">
        <template slot-scope="{row}">
          <span>{{ row.stu.exam_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属主校" prop="sub_school" align="center" width="180">
        <template slot-scope="{row}">
          <span>{{ row.stu.main_school }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属分校" prop="sub_school" align="center" width="180">
        <template slot-scope="{row}">
          <span>{{ row.stu.sub_school }}</span>
        </template>
      </el-table-column>
      <el-table-column label="考期" prop="tag" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.stu.tag }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" prop="student_name" align="center" width="150">
        <template slot-scope="{row}">
          <span>{{ row.stu.real_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机" prop="phone" align="center" minWidth="200">
        <template slot-scope="{row}">
          <span>{{ row.stu.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="注册日期" prop="register_date" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.stu.register_date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" minWidth="200" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            修改
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
                @pagination="getList"/>
    <!--修改信息和新增-->
    <el-dialog :title="'修改学生信息'" :visible.sync="StuFormVisible">
      <el-form ref="dataForm" :model="temp" label-position="left" label-width="100px"
               style="width: 500px; margin-left:50px;">
        <el-form-item label="主校名" prop="sub_school">
          <el-input v-model="temp.main_school" class="filter-item" placeholder="请输入主校名称"/>
        </el-form-item>
        <el-form-item label="分校名" prop="sub_school">
          <el-input v-model="temp.sub_school" class="filter-item" placeholder="请输入分校名称"/>
        </el-form-item>
        <el-form-item label="姓名" prop="student_name">
          <el-input v-model="temp.real_name" placeholder="请输入姓名"/>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model.number="temp.phone" placeholder="请输入手机"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="StuFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="updateData">
          确定
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>

  import {getStudentsSystem, createStudentSystem, updateStudentSystem} from '@/api/system_apis'

  import {parseTime} from '@/utils'
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination
  // import XLSX from 'xlsx'
  import StudentDetail from "./component/StudentDetail";

  export default {
    name: 'TagInfo',
    components: {StudentDetail, Pagination},
    data() {
      return {
        //
        tableKey: 0,
        //学生表
        list: [],
        //总数
        total: 0,
        //缓冲状态
        listLoading: true,
        //分页请求
        listQuery: {
          page: 1,
          limit: 20,
          searchText: '',
          sMainSchool: '',
          sSubSchool: '',
        },
        course_total: 0,
        courseQuery: {
          page: 1,
          searchText: '',
          limit: 10,
        },
        //选中
        multipleSelection: [],
        //新建学生数据模板
        temp: {},
        //学生对话框信息
        StuFormVisible: false,
        StuFormStatus: '',
        //文件导入对话框信息
        ImportFormVisible: false,
        //批量开课
        courseSelection: [],
        subscribeFormVisible: false,
        subscribeFormStatus: '',
        subscribeMap: {
          default: '批量开课',
          add: '新增课程'
        },
        subscribeTemp: {},
        courseInfo: [],

      }
    },
    created() {
      this.getList()
      console.log(this.tableKey)
    },
    methods: {
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
      //请求数据
      handleSearch(){
        this.getList()
      },
      getList() {
        this.listLoading = true
        getStudentsSystem(this.listQuery).then(response => {
          this.list = response.data
          this.total = response.total
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 100)
        })

      },
      resetTemp() {
        this.temp = {}
      }
      ,
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            console.log(this.temp)
            // 发送到后端 并返回完整数据
            createStudentSystem(this.temp).then(() => {
              this.StuFormVisible = false
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
              this.getList()
            })
          }
        })
      }
      ,
      //操作 更新 查看课程 开课
      handleUpdate(row) {
        this.temp = Object.assign({}, row.stu) // copy obj
        this.StuFormVisible = true
      }
      ,
      handleCourseReview(row) {

      },
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            const tempData = Object.assign({}, this.temp)
            updateStudentSystem(tempData).then(() => {
              this.StuFormVisible = false
              this.getList()
              this.$notify({
                title: '成功',
                message: '更新成功',
                type: 'success',
                duration: 2000
              })
            })
          }
        })
      },
      handleSubscribe() {
        this.subscribeFormStatus = 'default'
        this.subscribeFormVisible = true
        this.getCourses()
      },

      filterSubschool(value, row) {
        return row.sub_school === value;
      }
      ,
      handleExport() {
      }
    },
  }
</script>
<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
