<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row type="flex" justify="space-between">
        <el-col :span="6">
          <el-input placeholder="请输入内容" v-model="listQuery.searchText">
            <el-select v-model="listQuery.searchType" slot="prepend" placeholder="请选择"
                       style="width: 130px;background: #1890FF;color: #fff">
              <el-option label="课程号" value='1'/>
              <el-option label="课程名" value='2'/>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="searchCourses"
                       style="background: #1890FF;color: #fff;border-radius: 0"/>
          </el-input>
        </el-col>
        <el-col :span="16" align="right">
          <el-button class="filter-item" type="danger" icon="el-icon-minus"
                     @click="unvalidSelected">
            下架已选
          </el-button>
        </el-col>
      </el-row>
    </div>

    <el-table
      :data="list"
      fit
      v-loading="listLoading"
      highlight-current-row
      style="width: 100%;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column width="55" type="selection" align="center"/>
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
      <el-table-column label="课程简介" width="250px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.course_brief}}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.create_time | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="教材名称" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.material_name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="精讲时间" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.norm_duration}}</span>
        </template>
      </el-table-column>
      <el-table-column label="精讲课程数" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.norm_sum}}</span>
        </template>
      </el-table-column>
      <el-table-column label="课程状态" width="150px" align="center">
        <template slot-scope="{row}">
          <el-tag v-if="row.is_Subscribe===1" type="success">已上架</el-tag>
          <el-tag v-if="row.is_Subscribe===0" type="info">未上架</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" minWidth="300" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button size="medium" type="info" @click="lookDetail(row)">
            查看详情
          </el-button>
          <el-button v-if="row.is_Subscribe!==1" type="primary" size="medium" @click="validTheCourse(row)">
            上架课程
          </el-button>

          <el-button v-if="row.is_Subscribe!==0" size="medium" type="danger" @click="unvalidTheCourse(row)">
            下架课程
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
                @pagination="getList"/>
    <el-dialog title="修改课程" :visible.sync="courseInfoVisible">
      <el-form :model="courseInfo">
        <el-form-item label="精讲价格" :label-width="'120px'">
          <el-input v-model="courseInfo.norm_price" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="串讲价格" :label-width="'120px'">
          <el-input v-model="courseInfo.cross_price" autocomplete="off"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="courseInfoVisible = false">取 消</el-button>
        <el-button type="primary" @click="postValidCourse">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {getCourses,getSubCourses, getMainCourseBySearch, getvalidCourseById, unvalidCourse, validCourse} from '@/api/apis'
  import Pagination from '@/components/Pagination/index'

  export default {
    name: 'SubCourseInfo',
    components: {Pagination},
    data() {
      return {
        courseInfoVisible: false,
        courseInfo: {},
        listLoading: true,
        listQuery: {
          main_school: this.$store.state.user.main_school,
          sub_school: this.$store.state.user.sub_school,
          searchText: '',
          searchType: '1',
          page: 1,
          limit: 20,
        },
        total: 0,
        chosenList: [],
        list: undefined,
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        getSubCourses(this.listQuery).then(response => {
          this.list = response.data
          this.total = response.total
          setTimeout(() => {
            this.listLoading = false
          }, 1000)
        })
      },
      handleSelectionChange(val) {
        let temp = []
        val.forEach(item => {
          temp.push(item.course_id)
        });
        this.chosenList = temp
      },
      searchCourses() {
        if (this.listQuery.searchText === '') this.getList()
        else
          getSubCourses(this.listQuery).then(response => {
            this.list = response.data
            this.total = response.total
          })
      },
      validAll() {
      },
      unvalidAll() {
      },
      validSelected() {

        this.chosenList.forEach(item => {
          validCourse(row).then(() => {
          })
        })
        this.getList()
      },
      unvalidSelected() {
        this.chosenList.forEach(item => {
          unvalidCourse({course_id: item}).then(() => {
          })
        })
        this.getList()
      },
      validTheCourse(row) {
        row.sub_school=this.$store.state.user.sub_school
        this.courseInfoVisible = true
        this.courseInfo = row
      },
      postValidCourse() {
        const theCourse = Object.assign(this.courseInfo, {main_school: this.$store.state.user.main_school})
        console.log(theCourse)
        validCourse(theCourse).then(() => {
          this.courseInfoVisible = false
          this.getList()
        })

      },
      unvalidTheCourse(row) {
        unvalidCourse(row).then(() => {
        })
        this.getList()
      },
      lookDetail(row) {
      }
    }
  }
</script>
