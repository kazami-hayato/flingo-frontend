<template>
  <div class="course-container">
    <el-table
      :data="courseData"
      style="width: 100%;padding: 20px"
      :row-class-name="tableRowClassName">
      <el-table-column
        prop="course_id"
        label="课程编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="course_name"
        label="课程名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="开课时间">
      </el-table-column>
      <el-table-column
        prop="end_time"
        label="到期时间">
      </el-table-column>
      <el-table-column
        prop="subscribe_student"
        label="选课学生姓名">
      </el-table-column>
      <el-table-column
        prop="course_period"
        label="考期">
      </el-table-column>
      <el-table-column
        prop="course_state"
        label="课程状态">
      </el-table-column>
      <el-table-column label="学习进度" align="center" minWidth="100" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <router-link :to="'/student/statistics/'+row.exam_id">
            <el-button type="success" size="medium" icon="el-icon-edit">
              查看进度
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
            @pagination="getStudyInfo"/>
<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }

</style>

<script>
    import {fetchAllStudents, createStudent, updateStudent, deleteStudent, setStudentCourse} from '@/api/student'

    export default {
        name: 'study',
        data() {
            return {
                total:3,
                listQuery: {
                    page: 1,
                    searchOn: false,
                    limit: 20,
                    searchText: ""
                },
               courseData:[
                   {course_name:'what',exam_id:9527}
                   ]
            }
        },
        created() {
            this.getStudyInfo()
            console.log(this.tableKey)
        },
        methods:{
            tableRowClassName({row, rowIndex}) {
                if (rowIndex === 1) {
                    return 'warning-row';
                } else if (rowIndex === 3) {
                    return 'success-row';
                }
                return '';
            },
            getStudyInfo(){
                // this.listLoading = true

                // fetchAllStudents(this.listQuery).then(response => {
                //     this.courseData = response.data.items
                //     console.log(this.courseData)
                //     this.total = response.data.total
                //     this.stFilterOptions = []
                //     response.data.stFilterOptions.forEach(chs => {
                //         this.stFilterOptions.push({"text": chs, value: chs})
                //     })
                //     // this.stFilterOptions=data.stFilterOptions
                //     // Just to simulate the time of the request
                //     setTimeout(() => {
                //         this.listLoading = false
                //     }, 1.5 * 100)
                // })
            },
        }
    }
</script>
