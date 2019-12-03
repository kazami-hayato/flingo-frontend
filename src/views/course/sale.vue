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
        <el-col :span="16" align="right">
          <el-button class="filter-item" type="success" icon="el-icon-plus"
                     @click="shiftSelected">
            上架已选
          </el-button>
          <el-button class="filter-item" type="danger" icon="el-icon-minus"
                     @click="unshiftSelected">
            下架已选
          </el-button>
          <el-button class="filter-item" type="success" icon="el-icon-plus"
                     @click="shiftAll">
            全部上架
          </el-button>
          <el-button class="filter-item" type="danger" icon="el-icon-minus"
                     @click="unshiftAll">
            全部下架
          </el-button>
        </el-col>
      </el-row>
    </div>

    <el-table
      :data="list"
      fit
      highlight-current-row
      style="width: 100%;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column width="55" type="selection" align="center"></el-table-column>
      <el-table-column label="课程号" prop="id" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.course_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="课程名" prop="id" align="center" width="200">
        <template slot-scope="{row}">
          <span>{{ row.course_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="精讲时间" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.norm_duration}}</span>
        </template>
      </el-table-column>
      <el-table-column label="精讲课程数" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.norm_num}}</span>
        </template>
      </el-table-column>
      <el-table-column label="精讲价格（元）" width="120px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.norm_price}}</span>
        </template>
      </el-table-column>
      <el-table-column label="串讲价格（元）" width="120px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.cross_price}}</span>
        </template>
      </el-table-column>
      <el-table-column label="选课数目" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.sales}}</span>
        </template>
      </el-table-column>

      <el-table-column label="课程状态" width="150px" align="center">
        <template slot-scope="{row}">
          <el-tag v-if="row.course_state===1" type="success">分校可见</el-tag>
          <el-tag v-if="row.course_state===0" type="info">分校不可见</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" minWidth="200" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="medium" @click="shiftCourse(row)">
            查看目录
          </el-button>
          <el-button v-if="row.course_state!=1" type="primary" size="medium" @click="shiftCourse(row)">
            可见
          </el-button>
          <el-button v-if="row.course_state!=0" size="medium" type="success" @click="modifyCourse(row)">
            修改课程
          </el-button>
          <el-button v-if="row.course_state!=0" size="medium" type="danger" @click="modifyCourse(row)">
            不可见
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
                @pagination="getList"/>


  </div>
</template>

<script>
    import {getCoursesByQuery, deleteCourseById} from '@/api/school-course'
    import Pagination from '@/components/Pagination' // secondary package based on el-pagination

    export default {
        name: 'sale',
        components: {Pagination},
        data() {
            return {
                searchText: '',
                listQuery: {
                    page: 1,
                    limit: 20,
                    req_table: 'main_course_table'
                },
                total: 5,
                chosenList: [],
                list: [
                    {
                        course_id: 1,
                        course_name: '高等数学',
                        course_brief: '',
                        update_time: '',
                        material_name: '',
                        norm_duration: 22,
                        norm_num: 12,
                        course_state: '未上架',
                    },
                    {
                        course_state: '已上架',
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
                getCoursesByQuery(this.listQuery).then(response => {
                    this.list = response.data
                    this.total = response.total
                    // 设置延时以便于优化
                    setTimeout(() => {
                        this.listLoading = false
                    }, 1.5 * 100)
                })
            },
            handleSelectionChange(val) {
                let temp = []
                val.forEach(item => {
                    temp.push(item.course_id)
                });
                this.chosenList = temp
                console.log(this.chosenList)
            },
            searchCourses() {
            },
            shiftAll() {

            },
            unshiftAll() {

            },
            shiftSelected() {

            },
            unshiftSelected() {

            },
            shiftCourse(row) {

            },
            modifyCourse(row) {

            }

        }
    }
</script>
