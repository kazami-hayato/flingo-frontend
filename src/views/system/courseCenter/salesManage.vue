<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row type="flex" justify="space-between">
        <el-col :span="6">
          <el-input placeholder="请输入内容" v-model="listQuery.searchText">
            <el-button slot="append" icon="el-icon-search" @click="searchCourses"
                       style="background: #1890FF;color: #fff;border-radius: 0"/>
          </el-input>
        </el-col>
        <el-col :span="16" align="right">
          <el-badge :value="sumSelected" class="item icon-shopping" type="primary">
            <el-button size="large">销量</el-button>
          </el-badge>
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
      <el-table-column type="index" label="序号"/>
      <el-table-column label="课程号" prop="id" align="center">
        <template slot-scope="{row}">
          <span>{{ row.course_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="课程名" prop="id" align="center" >
        <template slot-scope="{row}">
          <span>{{ row.course_name }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="main_school" label="主校名称"/>
      <el-table-column prop="sub_school" label="分校名称"/>
      <el-table-column label="选课数目" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.sales}}</span>
        </template>
      </el-table-column>

    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
                @pagination="getList"/>
  </div>
</template>

<script>
  import {getCoursesSale} from '@/api/system_apis'
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination

  export default {
    name: 'SalesManage',
    components: {Pagination},
    computed:{
      sumSelected:function () {
        let sum=0
        this.chosenList.forEach(item=>{
          sum+=item.sales
        })
        return sum
      }
    },
    data() {
      return {
        courseInfoVisible: false,
        courseInfo: {},
        listQuery: {
          page: 1,
          limit: 20,
          searchText: '',
        },
        total: 5,
        chosenList: [],
        list: []
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        getCoursesSale(this.listQuery).then(response => {
          this.list = response.data
          this.total = response.total
          // 设置延时以便于优化
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 100)
        })
      },
      handleSelectionChange(val) {
        this.chosenList=val
      },
      searchCourses() {
        this.getList()
      },
      shiftSelected() {
        this.chosenList.forEach(ele => {
          ele.is_valid = 1
          updateShiftCourse(ele).then(() => {

          })
        })
        this.getList()

      }
    }
  }
</script>
