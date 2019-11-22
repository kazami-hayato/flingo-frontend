<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row type="flex" justify="space-between">
        <el-col :span="12">
          <el-input v-model="searchText" placeholder="可输入 课程名/课程代码" style="width: 200px;" class="filter-item"/>
          <el-button class="filter-item" type="primary" icon="el-icon-search" @click="searchCourses">
            查找
          </el-button>
        </el-col>
        <!--        <el-col :span="16" align="right">-->
        <!--          <el-button class="filter-item" type="success" icon="el-icon-plus"-->
        <!--                     @click="onSectionCourses">-->
        <!--            上架已选-->
        <!--          </el-button>-->
        <!--          <el-button class="filter-item" type="warning" icon="el-icon-minus"-->
        <!--                     @click="offSectionCourses">-->
        <!--            下架已选-->
        <!--          </el-button>-->
        <!--          <el-button class="filter-item" type="success" icon="el-icon-plus"-->
        <!--                     @click="onAllCourses">-->
        <!--            全部上架-->
        <!--          </el-button>-->
        <!--          <el-button class="filter-item" type="warning" icon="el-icon-minus"-->
        <!--                     @click="offAllCourses">-->
        <!--            全部下架-->
        <!--          </el-button>-->
        <!--        </el-col>-->
      </el-row>
    </div>
    <el-col :span="16">
      <el-table
        :data="courseList"
        fit
        highlight-current-row
        style="width: 100%;"
      >
        <!--      <el-table-column width="55" type="selection" align="center"></el-table-column>-->
        <el-table-column label="课程号" prop="id" align="center" width="140">
          <template slot-scope="{row}">
            <span>{{ row.course_id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="课程名" prop="id" align="center" width="180">
          <template slot-scope="{row}">
            <span>{{ row.course_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="考期设置" prop="id" align="center" width="180">
          <template slot-scope="{row}">
            <span>{{ row.exam_date }}</span>
          </template>
        </el-table-column>

        <el-table-column label="状态" prop="sub_school" align="center" width="200">
          <template slot-scope="{row}">
            <span>{{ row.course_status }}</span>
          </template>
        </el-table-column>
        <el-table-column label="有效天数" prop="gender" align="center" width="200">
          <template slot-scope="{row}">
            <span>{{ row.valid_days }}</span>
          </template>
        </el-table-column>
        <el-table-column label="选课数量" prop="student_name" align="center" width="150">
          <template slot-scope="{row}">
            <span>{{ row.chstu_num}}</span>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
                  @pagination="getList"/>
    </el-col>

  </div>
</template>

<script>
    import {fetchList, fetchPv, createArticle, updateArticle,} from '@/api/article'
    import {fetchAllStudents, createStudent, updateStudent, deleteStudent, setStudentCourse} from '@/api/student'
    import {fetchAllCourses, createCourse, updateCourse, deleteCourse} from '@/api/course'

    import waves from '@/directive/waves' // waves directive
    import {parseTime} from '@/utils'
    import Pagination from '@/components/Pagination' // secondary package based on el-pagination
    import XLSX from 'xlsx'

    export default {
        name: 'sale',
        components: {Pagination},
        data() {
            return {
                searchText: '',
                listQuery: {},
                total: 5,
                courseList: [
                    {
                        course_name: '高等数学'
                    }
                ]
            }
        },
        created() {
            this.getList()
        },
        methods: {
            getList() {

            },
            searchCourses() {

            }

        }
    }
</script>
