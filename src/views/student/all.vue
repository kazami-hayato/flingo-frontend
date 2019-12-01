<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row type="flex" justify="space-between">
        <el-col :span="12">
          <el-input v-model="searchFilterText" placeholder="可输入 姓名/手机号/准考证号" style="width: 200px;" class="filter-item"
                    @keyup.enter.native="filterText"/>
          <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="filterText">
            查找
          </el-button>
        </el-col>
        <el-col :span="16" align="right">
          <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit"
                     @click="handleCreate">
            增加学员
          </el-button>
          <el-button class="filter-item" style="margin-left: 10px;" type="danger" icon="el-icon-edit"
                     @click="handleDelete">
            删除学员
          </el-button>
          <el-button class="filter-item" type="success" icon="el-icon-upload"
                     @click="handleImportStu">
            导入学员
          </el-button>
          <el-button class="filter-item" type="warning" icon="el-icon-download"
                     @click="handleExport">
            导出学员
          </el-button>
          <el-button class="filter-item" type="success" icon="el-icon-plus"
                     @click="handleSubscribe">
            批量开课
          </el-button>
          <el-button class="filter-item" type="warning" icon="el-icon-plus"
                     @click="handleImportCourse">
            批量导入课程
          </el-button>
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
      <el-table-column width="55" type="selection" align="center"></el-table-column>
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
      <el-table-column label="学校" prop="sub_school" align="center" width="300"
                       :filters="stFilterOptions" :filter-method="filterTag" filter-placement="bottom-end">
        <template slot-scope="{row}">
          <span>{{ row.sub_school }}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别" prop="gender" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.gender }}</span>
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
      <el-table-column label="操作" align="center" minWidth="370" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="medium" @click="handleUpdate(row)">
            修改个人信息
          </el-button>
          <router-link :to="'/student/'+row.exam_id">
            <el-button type="success" size="medium" icon="el-icon-edit">
              查看课程
            </el-button>
          </router-link>
<!--          <el-button size="medium" type="danger" @click="handleCourseReview(row)">-->
<!--            查看课程-->
<!--          </el-button>-->
          <el-button size="medium" type="danger" @click="handleCourseAdd(row)">
            新增课程
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
                @pagination="getList"/>
    <!--修改信息和新增-->
    <el-dialog :title="textMap[StuFormStatus]" :visible.sync="StuFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px"
               style="width: 500px; margin-left:50px;">
        <el-form-item label="准考证号" prop="exam_id">
          <el-input v-model.number="temp.exam_id" placeholder="请输入准考证号"/>
        </el-form-item>
        <el-form-item label="学员分组" prop="sub_school">
          <el-select v-model="temp.sub_school" class="filter-item" placeholder="请选择">
            <el-option v-for="item in schoolOptions" :key="item" :label="item" :value="item"/>
          </el-select>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="temp.gender" class="filter-item" placeholder="请选择">
            <el-option v-for="item in genderOptions" :key="item" :label="item" :value="item"/>
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
    <!--导入文件-->
    <el-dialog :title="importMap[importFormStatus]" :visible.sync="ImportFormVisible">
      <el-form>
        <el-upload
          class="uploadFile"
          ref="upload"
          accept=".xls,.xlsx"
          action=""
          :http-request="parseXls"
          :limit="1"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-change="onUploadChange"
          :before-remove="beforeRemove"
          :file-list="fileList"
          :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
          <div slot="tip" class="el-upload__tip">只能上传xls/xlsx文件</div>
        </el-upload>
      </el-form>
    </el-dialog>
    <!-- 批量开课-->
    <el-dialog :title="subscribeMap[subscribeFormStatus]" :visible.sync="subscribeFormVisible">
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
            label="课程号"
            width="120">
            <template slot-scope="scope">{{ scope.row.course_id }}</template>
          </el-table-column>
          <el-table-column
            prop="course_name"
            label="课程名"
            width="120">
          </el-table-column>
          <el-table-column
            prop="course_type"
            label="课程类别"
            show-overflow-tooltip>
          </el-table-column>
        </el-table>
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
    import {fetchList, fetchPv, createArticle, updateArticle,} from '@/api/article'
    import {fetchAllStudents, createStudent, updateStudent, deleteStudent, setStudentCourse} from '@/api/student'
    import {fetchAllCourses, createCourse, updateCourse, deleteCourse} from '@/api/school-course'

    import waves from '@/directive/waves' // waves directive
    import {parseTime} from '@/utils'
    import Pagination from '@/components/Pagination' // secondary package based on el-pagination
    import XLSX from 'xlsx'

    export default {
        name: 'all',
        components: {Pagination},
        directives: {waves},
        data() {
            return {
                //
                tableKey: 0,
                //学生表
                list: null,
                //总数
                total: 0,
                //缓冲状态
                listLoading: true,
                //分页请求
                listQuery: {
                    page: 1,
                    searchOn: false,
                    limit: 20,
                    sub_school: undefined,
                    title: undefined,
                    phone: undefined,
                    student_name: undefined,
                    exam_id: undefined,
                    searchText: ""
                },
                //选中
                multipleSelection: [],
                //搜索
                searchFilterText: "",
                //分组过滤
                stFilterOptions: [],
                //对话框分组选项
                schoolOptions: ['a', 'b', 'c'],
                //对话框性别
                genderOptions: ['男', '女'],
                //新建学生数据模板
                temp: {
                    register_date: new Date(),
                },
                //学生对话框信息
                StuFormVisible: false,
                StuFormStatus: '',
                textMap: {
                    update: '修改学员信息',
                    create: '创建新学员'
                },
                //文件导入对话框信息
                ImportFormVisible: false,
                importFormStatus: '',
                importMap: {
                    student: '导入学员',
                    course: '导入选课信息'
                },
                //批量开课
                courseSelection: [],
                subscribeFormVisible: false,
                subscribeFormStatus: '',
                subscribeMap: {
                    default: '批量开课',
                    add: '新增课程'
                },
                subscribeTemp: {},
                courseInfo: [{
                    course_id: '101',
                    course_name: '高等数学',
                    course_type: '基础课程'
                },],
                //文件上传 [{name,url}]
                fileList: [],
                rules: {
                    exam_id: [{type: 'number', required: true, message: '不为空且必须是数字', trigger: 'change'}],
                    sub_school: [{required: true, message: '不能为空', trigger: 'change'}],
                    gender: [{required: true, message: '不能为空', trigger: 'blur'}],
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
            readerXls(rawFile) {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader()
                    reader.onload = e => {
                        const data = e.target.result
                        const workbook = XLSX.read(data, {type: 'array'})
                        const firstSheetName = workbook.SheetNames[0]
                        const worksheet = workbook.Sheets[firstSheetName]
                        const header = this.getHeaderRow(worksheet)
                        const results = XLSX.utils.sheet_to_json(worksheet)
                        const failed_list = []
                        if (this.importFormStatus === '导入学员') {
                            results.forEach(item => {
                                createStudent(item).then(response => {
                                    if (response.status === -1) failed_list.push(response.failed_id)
                                })
                            })
                        } else {
                            results.forEach(item => {
                                //item {exam_id,courses|courses_name}
                                setStudentCourse(item).then(response => {
                                    if (response.status === -1) failed_list.push(response.failed_id)
                                })
                            })
                        }
                        if (failed_list.length == 0)
                            this.$notify({
                                title: '成功',
                                message: '创建成功',
                                type: 'success',
                                duration: 2000
                            })
                        else
                            this.$notify({
                                title: '失败',
                                message: '导入excel失败 :' + failed_list,
                                type: 'error',
                                duration: 2000
                            })
                        console.log(results)
                        this.getList()

                    }
                    reader.readAsArrayBuffer(rawFile)
                })
            },
            isExcel(file) {
                return /\.(xlsx|xls|csv)$/.test(file.name)
            },
            submitUpload() {
                //实际上还是调用原生trigger
                this.$refs.upload.submit();
            },
            //请求数据
            getList() {
                this.listLoading = true

                fetchAllStudents(this.listQuery).then(response => {
                    this.list = response.data.items
                    this.total = response.data.total
                    this.stFilterOptions = []
                    response.data.stFilterOptions.forEach(chs => {
                        this.stFilterOptions.push({"text": chs, value: chs})
                    })
                    // this.stFilterOptions=data.stFilterOptions
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
            handleCreate() {
                this.resetTemp()
                this.StuFormStatus = 'create'
                this.StuFormVisible = true
                this.$nextTick(() => {
                    this.$refs['dataForm'].clearValidate()
                })
            }
            ,
            createData() {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        console.log(this.temp)
                        // 发送到后端 并返回完整数据
                        createStudent(this.temp).then(() => {
                            this.list.unshift(this.temp)
                            this.StuFormVisible = false
                            this.$notify({
                                title: '成功',
                                message: '创建成功',
                                type: 'success',
                                duration: 2000
                            })
                        })
                    }
                })
            }
            ,
            handleDelete() {
                this.multipleSelection.forEach(exam_id => {
                    deleteStudent(exam_id).then(() => {
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

                // let id_array = []
                // this.list.forEach(item => {
                //     if(item.status==true)console.log(item.id)
                // })
                // const index = this.list.indexOf(row)
                // this.list.splice(index, 1)
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
                        tempData.register_date = +new Date(tempData.register_date) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
                        updateStudent(tempData).then(() => {
                            for (const v of this.list) {
                                if (v.id === this.temp.id) {
                                    const index = this.list.indexOf(v)
                                    this.list.splice(index, 1, this.temp)
                                    break
                                }
                            }
                            this.StuFormVisible = false
                            this.$notify({
                                title: 'Success',
                                message: 'Update Successfully',
                                type: 'success',
                                duration: 2000
                            })
                        })
                    }
                })
            }
            ,
            handleImportStu() {
                this.importFormStatus = 'student'
                this.ImportFormVisible = true
            },
            handleImportCourse() {
                this.importFormStatus = 'course'
                this.ImportFormVisible = true
            }
            ,
            handleSubscribe() {
                this.subscribeFormStatus = 'default'
                this.subscribeFormVisible = true

            },
            postSubscribe() {
                this.multipleSelection.forEach(stuEId => {
                    // let tempStudent = this.list.filter(stu => {
                    //     return stu.exam_id === stuEId
                    // })[0]
                    // console.log(tempStudent)
                    // tempStudent.courses = tempStudent.courses.concat(this.courseSelection)

                    this.courseSelection.forEach(cid => {
                        let temp = {'exam_id': stuEId, 'course_id': cid}
                        setStudentCourse(temp).then(response => {
                        })
                    })

                })
                this.subscribeFormVisible = false
            },
            handleExport() {
                import('@/vendor/Export2Excel').then(excel => {
                    const tHeader = ['ID', '准考证号', '学员分组', '性别', '姓名', '手机', '身份证号', '注册日期']
                    const filterVal = ['id', 'exam_id', 'sub_school', 'gender', 'student_name', 'phone', 'id_card', 'register_date']
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
            filterTag(value, row) {
                return row.sub_school === value;
            }
            ,
            filterText() {
                this.listQuery.page = 1
                this.listQuery.searchOn = true
                this.listQuery.searchText = this.searchFilterText
                this.getList()
            }
        }
    }
</script>
