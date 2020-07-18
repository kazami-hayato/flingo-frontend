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
          <el-button class="filter-item" type="success" icon="el-icon-plus"
                     @click="shiftSelected">
            选中可见
          </el-button>
          <el-button class="filter-item" type="danger" icon="el-icon-minus"
                     @click="unshiftSelected">
            选中不可见
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
      <el-table-column label="精讲时间" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.norm_duration}}</span>
        </template>
      </el-table-column>
      <el-table-column label="精讲课程数" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.norm_sum}}</span>
        </template>
      </el-table-column>
      <el-table-column label="精讲价格（元）" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.norm_price}}</span>
        </template>
      </el-table-column>
      <el-table-column label="串讲价格（元）" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.cross_price}}</span>
        </template>
      </el-table-column>

      <el-table-column label="课程状态" width="150px" align="center" v-if="user_type<=2">
        <template slot-scope="{row}">
          <el-tag v-if="row.is_valid===1" type="success">分校可见</el-tag>
          <el-tag v-if="row.is_valid===0" type="info">分校不可见</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" minWidth="200" class-name="small-padding fixed-width"
                       v-if="user_type<=2">
        <template slot-scope="{row}">
          <!--          <el-button type="info" size="medium" @click="makeValid(row)">-->
          <!--            查看目录-->
          <!--          </el-button>-->

          <el-tooltip placement="left" content="使课程对所有分校可见" effect="dark">
            <el-button v-if="row.is_valid!==1"  size="medium" type="primary" @click="makeValid(row)">
              可见
            </el-button>
          </el-tooltip>
          <el-button v-if="row.is_valid!==0" size="medium" type="warning" @click="modifyCourse(row)">
            修改课程
          </el-button>
          <el-tooltip placement="top" content="使课程对所有分校不可见" effect="dark">
            <el-button v-if="row.is_valid!==0" size="medium" type="danger" @click="makeUnvalid(row)">
              不可见
            </el-button>
          </el-tooltip>
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
        <el-button type="primary" @click="postModify">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {getShiftCourses,getMainChosenCourses, getMainCourseSale, updateShiftCourse, unshiftCourse, makeValid} from '@/api/apis'
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination

  export default {
    name: 'chosen',
    components: {Pagination},
    data() {
      return {
        courseInfoVisible: false,
        courseInfo: {},
        listQuery: {
          page: 1,
          limit: 20,
          searchText: '',
          searchType: '1',
          main_school: this.$store.state.user.main_school,
          sub_school: this.$store.state.user.sub_school
        },
        total: 5,
        chosenList: [],
        list: [],
        user_type: this.$store.state.user.user_type
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        getMainChosenCourses(this.listQuery).then(response => {
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
          temp.push(item)
        });
        this.chosenList = temp
        console.log(this.chosenList)
      },
      searchCourses() {
        this.getList()
      },
      shiftAll() {

      },
      unshiftAll() {

      },
      shiftSelected() {
        this.chosenList.forEach(ele => {
          ele.is_valid = 1
          updateShiftCourse(ele).then(() => {

          })
        })
        this.getList()

      },
      unshiftSelected() {
        this.chosenList.forEach(ele => {
          ele.is_valid = 0
          updateShiftCourse(ele).then(() => {

          })
        })
        this.getList()

      },
      makeValid(row) {
        row.is_valid = 1
        updateShiftCourse(row).then(() => {
          this.getList()
        })
      },
      modifyCourse(row) {
        this.courseInfoVisible = true
        this.courseInfo = row
      },
      postModify() {
        this.courseInfoVisible = false
        updateShiftCourse(this.courseInfo).then(() => {
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 100)
          this.getList()

        })
      },
      makeUnvalid(row) {
        row.is_valid = 0
        updateShiftCourse(row).then(() => {
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 100)
          this.getList()
        })

      }

    }
  }
</script>
