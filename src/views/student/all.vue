<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row>
        <el-col :span="12">
          <el-row type="flex" justify="start">
            <el-input v-model="searchText" placeholder="输入 姓名/手机号/准考证号" style="width: 200px" class="filter-item"
                      @keyup.enter.native="handleSearch"/>

            <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleSearch">
            </el-button>
            <el-select v-model="sMainSchool" placeholder="主校选择" clearable style="margin-left: 5px;width: 150px">
              <el-option
                v-for="item in MainschoolOptions"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
            <el-select v-model="sSubSchool" placeholder="分校选择" clearable style="margin-left: 5px;width: 150px">
              <el-option
                v-for="item in SubschoolOptions"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
            <el-button v-waves class="filter-item" type="primary" @click="handleFilter">
              过滤
            </el-button>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row type="flex" justify="end">
            <el-button class="filter-item" type="warning" icon="el-icon-download"
                       @click="handleExport">
              导出学生信息
            </el-button>
            <el-button class="filter-item" type="warning" icon="el-icon-download"
                       @click="handleExport">
              导出成绩
            </el-button>
            <el-button class="filter-item" type="success" icon="el-icon-plus"
                       @click="handleSubscribe">
              批量开课
            </el-button>
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
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="expand">
        <template slot-scope="{row}">
          <StudentDetail style="width: 100%;height: 1600px" :student-info="row"></StudentDetail>
        </template>
      </el-table-column>
      <el-table-column width="55" type="selection" align="center">
      </el-table-column>
      <el-table-column label="序号" prop="id" align="center" width="140">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="准考证号" prop="id" align="center" width="180">
        <template slot-scope="{row}">
          <span>{{ row.exam_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属主校" prop="sub_school" align="center" width="180">
        <template slot-scope="{row}">
          <span>{{ row.main_school }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属分校" prop="sub_school" align="center" width="180">
        <template slot-scope="{row}">
          <span>{{ row.sub_school }}</span>
        </template>
      </el-table-column>
      <el-table-column label="考期" prop="tag" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.tag }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" prop="student_name" align="center" width="150">
        <template slot-scope="{row}">
          <span>{{ row.student_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机" prop="phone" align="center" minWidth="200">
        <template slot-scope="{row}">
          <span>{{ row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="注册日期" prop="register_date" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.register_date | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
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
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px"
               style="width: 500px; margin-left:50px;">
        <el-form-item label="准考证号" prop="exam_id">
          <el-input v-model.number="temp.exam_id" placeholder="请输入准考证号"/>
        </el-form-item>
        <el-form-item label="学校名" prop="sub_school">
          <el-select v-model="temp.sub_school" class="filter-item" placeholder="请选择">
            <el-option v-for="item in SubschoolOptions" :key="item.value" :label="item.value" :value="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名" prop="student_name">
          <el-input v-model="temp.student_name" placeholder="请输入姓名"/>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model.number="temp.phone" placeholder="请输入手机"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="StuFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="StuFormStatus==='create'?createData():updateData()">
          确定
        </el-button>
      </div>
    </el-dialog>
    <el-dialog :title="'批量开课'" :visible.sync="subscribeFormVisible">
      <el-form ref="subscribeForm" :model="subscribeTemp" label-position="left" label-width="100px"
               style="width: 500px; margin-left:50px;">
        <el-form-item label="选中学生数量" prop="exam_id">
          <span>{{multipleSelection.length}}</span>
        </el-form-item>
        <el-table
          ref="courseTable"
          :data="courseInfo"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleCoursesChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="course_id"
            label="课程号"
            width="120">
            <!--            <template slot-scope="scope">{{ scope.row.course_id }}</template>-->
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
      <div slot="footer" class="dialog-footer">
        <el-button @click="subscribeFormVisible = false">
          取消开课
        </el-button>
        <el-button type="primary" @click="postSubscribe">
          确定开课
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
    import {
        getStudents,
        createStudent,
        updateStudent,
        deleteStudent,
        setStudentCourse,
        getShiftCourses,
        getStudentDetail
    } from "@/api/apis";
    import waves from '@/directive/waves' // waves directive
    import {parseTime} from '@/utils'
    import Pagination from '@/components/Pagination' // secondary package based on el-pagination
    import XLSX from 'xlsx'
    import StudentDetail from "./component/StudentDetail";

    export default {
        name: 'all',
        components: {StudentDetail, Pagination},
        directives: {waves},
        data() {
            return {
                //
                tableKey: 0,
                //学生表
                list: [],
                sMainSchool: '',
                sSubSchool: '',
                //总数
                total: 0,
                //缓冲状态
                listLoading: true,
                //分页请求
                listQuery: {
                    page: 1,
                    limit: 20,
                    searchText: ''
                },
                courseQuery: {
                    page: 1,
                    limit: 10,
                },
                //选中
                multipleSelection: [],
                //搜索
                searchText: "",
                //分校过滤
                SubschoolOptions: [],
                MainschoolOptions: [],

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
                course_total: 1,

                //文件上传 [{name,url}]
                fileList: [],
                rules: {
                    exam_id: [{type: 'number', required: true, message: '不为空且必须是数字', trigger: 'change'}],
                    sub_school: [{required: true, message: '不能为空', trigger: 'change'}],
                    tag: [{required: true, message: '不能为空', trigger: 'blur'}],
                    student_name: [{required: true, message: '不能为空', trigger: 'change'}],
                    phone: [{type: 'number', required: true, message: '不为空且必须是数字', trigger: 'change'}],
                },
                //状态
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
            //文件上传相关
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${file.name}？`);
            },
            onUploadChange(file) {
                console.log(file.raw.type)
            },
            //实际上上传按钮的函数
            parseXls(param) {
                this.readerXls(param.file)
                this.ImportFormVisible = false
            },
            getHeaderRow(sheet) {
                const headers = []
                const range = XLSX.utils.decode_range(sheet['!ref'])
                let C
                const R = range.s.r
                /* start in the first row */
                for (C = range.s.c; C <= range.e.c; ++C) { /* walk every column in the range */
                    const cell = sheet[XLSX.utils.encode_cell({c: C, r: R})]
                    /* find the cell in the first row */
                    let hdr = 'UNKNOWN ' + C // <-- replace with your desired default
                    if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
                    headers.push(hdr)
                }
                return headers
            },
            //请求数据
            getList() {
                this.listLoading = true

                getStudents(this.listQuery).then(response => {
                    this.list = response.data
                    this.total = response.total
                    this.schoolOptions = []
                    response.schoolOptions.forEach(chs => {
                        this.schoolOptions.push({"text": chs, value: chs})
                    })
                    // this.schoolOptions=data.schoolOptions
                    // Just to simulate the time of the request
                    setTimeout(() => {
                        this.listLoading = false
                    }, 1.5 * 100)
                })
            }
            ,
            resetTemp() {
                this.temp = {}
            }
            ,
            handleCoursesChange(val) {
                let temp = []
                val.forEach(item => {
                    temp.push(item.course_id)
                });
                this.courseSelection = temp
                console.log(this.courseSelection)
            },
            handleSelectionChange(val) {
                let temp = []
                val.forEach(item => {
                    temp.push(item.exam_id)
                });
                this.multipleSelection = temp
                console.log(this.multipleSelection)
            }
            ,
            // 接口留着以后用
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.courseTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.courseTable.clearSelection();
                }
            }
            ,
            createData() {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        console.log(this.temp)
                        // 发送到后端 并返回完整数据
                        createStudent(this.temp).then(() => {
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
            handleDelete() {
                this.multipleSelection.forEach(exam_id => {
                    deleteStudent({exam_id: exam_id}).then(() => {
                        const index = this.multipleSelection.indexOf(exam_id)
                        if (index !== -1) this.multipleSelection.splice(index, 1)
                    })
                })
                console.log(this.multipleSelection)
                this.$notify({
                    title: '成功',
                    message: '删除数据完成',
                    type: 'success',
                    duration: 2000
                })
                this.getList()
            }
            ,
            //操作 更新 查看课程 开课
            handleUpdate(row) {
                this.temp = Object.assign({}, row) // copy obj
                this.temp.register_date = new Date(this.temp.register_date)
                this.StuFormStatus = 'update'
                this.StuFormVisible = true
                this.$nextTick(() => {
                    this.$refs['dataForm'].clearValidate()
                })
            }
            ,
            handleCourseReview(row) {

            },
            handleCourseAdd(row) {
                // console.log('oo')
                this.multipleSelection = [row.exam_id]
                console.log(this.multipleSelection)
                this.subscribeFormVisible = true
                this.subscribeFormStatus = 'add'
            },
            updateData() {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        const tempData = Object.assign({}, this.temp)
                        updateStudent(tempData).then(() => {
                            this.StuFormVisible = false
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
            getCourses() {
                console.log(this.$store.state.user)
                getShiftCourses(this.courseQuery).then(response => {
                    this.courseInfo = response.data
                })
            },
            postSubscribe() {
                this.multipleSelection.forEach(stuEId => {
                    this.courseSelection.forEach(cid => {
                        let temp = {'exam_id': stuEId, 'course_id': cid, status: 1}
                        setStudentCourse(temp).then(response => {
                            console.log(temp)
                        })
                    })

                })
                this.$notify({
                    title: '成功',
                    message: '选课成功',
                    type: 'success',
                    duration: 2000
                })

                this.subscribeFormVisible = false
            },
            handleExport() {
                import('@/vendor/Export2Excel').then(excel => {
                    const tHeader = ['ID', '准考证号', '分校名', '性别', '姓名', '手机', '身份证号', '注册日期']
                    const filterVal = ['id', 'exam_id', 'sub_school', 'tag', 'student_name', 'phone', 'id_card', 'register_date']
                    const data = this.formatJson(filterVal, this.list)
                    excel.export_json_to_excel({
                        header: tHeader,
                        data,
                        filename: 'student'
                    })
                    // this.downloadLoading = false
                })
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => {
                    if (j === 'register_date') {
                        return parseTime(v[j])
                    } else {
                        return v[j]
                    }
                }))
            }
            ,
            filterSubschool(value, row) {
                return row.sub_school === value;
            }
            ,
            handleSearch() {
                this.listQuery.page = 1
                this.listQuery.searchText = this.searchText
                this.getList()
            }
            , handleFilter() {

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
